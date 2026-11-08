// Local dev server — replaces `npx http-server` + Vercel for local testing.
// Serves static files AND runs /api/state using your .env.local credentials.
// Usage: node server.js  (default port 8080)

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Redis } from "@upstash/redis";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

// ── Load .env.local ──────────────────────────────────────────────────────────
const envPath = path.join(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    // Strip surrounding quotes from value
    let val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = val;
  }
  console.log("✅ Loaded .env.local");
} else {
  console.warn("⚠️  No .env.local found — Upstash calls will fail.");
}

// ── Redis client ─────────────────────────────────────────────────────────────
function getRedisClient() {
  const url   = process.env.UPSTASH_REDIS_REST_URL  || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Missing Upstash Redis credentials in .env.local");
  return new Redis({ url, token });
}

const STATE_KEY = process.env.STATE_KEY || "app-state";

// ── MIME types ───────────────────────────────────────────────────────────────
const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".css":  "text/css",
  ".png":  "image/png",
  ".ico":  "image/x-icon",
  ".svg":  "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};

// ── /api/state handler (mirrors api/state.js exactly) ───────────────────────
async function apiStateHandler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-secret, Authorization, x-base-version, If-Match");
  res.setHeader("Access-Control-Expose-Headers", "ETag, x-version, x-updated-at");

  if (req.method === "OPTIONS") {
    res.writeHead(204); res.end(); return;
  }

  const appSecret = process.env.APP_SECRET || process.env.SYNC_SECRET;
  if (appSecret) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const clientSecret = req.headers["x-secret"] || url.searchParams.get("secret");
    if (!clientSecret || clientSecret !== appSecret) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized: Invalid or missing sync secret." }));
      return;
    }
  }

  let redis;
  try {
    redis = getRedisClient();
  } catch (err) {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Upstash Redis not configured.", details: err.message }));
    return;
  }

  try {
    if (req.method === "GET") {
      const state = await redis.get(STATE_KEY);
      if (!state || typeof state !== "object") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("{}"); return;
      }
      const version   = (state._syncMeta && typeof state._syncMeta.version   === "number") ? state._syncMeta.version   : 1;
      const updatedAt = (state._syncMeta && typeof state._syncMeta.updatedAt === "number") ? state._syncMeta.updatedAt : Date.now();
      res.setHeader("ETag",        `"${version}"`);
      res.setHeader("x-version",   String(version));
      res.setHeader("x-updated-at", String(updatedAt));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(state)); return;
    }

    if (req.method === "POST") {
      const raw = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end",  () => resolve(data));
        req.on("error", reject);
      });
      let body;
      try { body = JSON.parse(raw); } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON body" })); return;
      }
      if (!body || typeof body !== "object") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Body must be a JSON object" })); return;
      }

      const current = await redis.get(STATE_KEY);
      let currentVersion = 0;
      if (current && typeof current === "object") {
        currentVersion = (current._syncMeta && typeof current._syncMeta.version === "number") ? current._syncMeta.version : 1;
      }

      const rawBaseVer = req.headers["x-base-version"]
        || (req.headers["if-match"] ? req.headers["if-match"].replace(/["W/]/g, "") : null)
        || body._baseVersion;
      const clientBaseVersion = rawBaseVer != null ? parseInt(rawBaseVer, 10) : null;

      if (clientBaseVersion != null && !isNaN(clientBaseVersion) && clientBaseVersion > 0 && currentVersion > clientBaseVersion) {
        res.writeHead(409, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Conflict", code: "CONCURRENCY_CONFLICT", currentVersion, clientBaseVersion }));
        return;
      }

      delete body._baseVersion;
      const nextVersion = Math.max(currentVersion + 1, (clientBaseVersion || 0) + 1);
      body._syncMeta = { version: nextVersion, updatedAt: Date.now() };

      await redis.set(STATE_KEY, body);
      res.setHeader("ETag",      `"${nextVersion}"`);
      res.setHeader("x-version", String(nextVersion));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, version: nextVersion, savedAt: Date.now() }));
      return;
    }

    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  } catch (err) {
    console.error("Redis error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Redis operation failed", details: err.message }));
  }
}

// ── Static file handler ──────────────────────────────────────────────────────
function staticHandler(req, res) {
  let urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

  const filePath = path.join(__dirname, urlPath);
  const ext      = path.extname(filePath);
  const mime     = MIME[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found: " + urlPath);
    } else {
      res.writeHead(200, { "Content-Type": mime });
      res.end(data);
    }
  });
}

// ── Server ───────────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;
  if (urlPath === "/api/state") {
    apiStateHandler(req, res);
  } else {
    staticHandler(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Dev server running at http://localhost:${PORT}`);
  console.log(`   /api/state  → Upstash Redis`);
  console.log(`   /*          → static files\n`);
});
