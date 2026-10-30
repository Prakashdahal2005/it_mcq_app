import { Redis } from "@upstash/redis";

// Determine Redis client from standard Upstash or Vercel KV environment variables
function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis credentials. Please connect Upstash Redis in Vercel Storage or set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel Settings.");
  }

  return new Redis({ url, token });
}

const STATE_KEY = process.env.STATE_KEY || "app-state";

export default async function handler(req, res) {
  // Set CORS headers for cross-device & PWA compatibility
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-secret, Authorization, x-base-version, If-Match");
  res.setHeader("Access-Control-Expose-Headers", "ETag, x-version, x-updated-at");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Optional Passcode Protection:
  // If APP_SECRET (or SYNC_SECRET) is set in Vercel environment variables,
  // require the client to supply matching 'x-secret' header.
  // If no secret is configured in Vercel, requests are allowed open.
  const appSecret = process.env.APP_SECRET || process.env.SYNC_SECRET;
  if (appSecret) {
    const clientSecret = req.headers["x-secret"] || req.query?.secret;
    if (!clientSecret || clientSecret !== appSecret) {
      return res.status(401).json({
        error: "Unauthorized: Invalid or missing sync secret. Please configure your passcode in settings."
      });
    }
  }

  // Initialize Redis
  let redis;
  try {
    redis = getRedisClient();
  } catch (err) {
    console.error("Redis initialization failed:", err);
    return res.status(503).json({
      error: "Upstash Redis connection not configured. Please connect Upstash Redis in Vercel Storage or set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
      details: err.message
    });
  }

  try {
    if (req.method === "GET") {
      const state = await redis.get(STATE_KEY);
      if (!state || typeof state !== "object") {
        return res.status(200).json({});
      }
      const version = (state._syncMeta && typeof state._syncMeta.version === "number") ? state._syncMeta.version : 1;
      const updatedAt = (state._syncMeta && typeof state._syncMeta.updatedAt === "number") ? state._syncMeta.updatedAt : Date.now();
      res.setHeader("ETag", `"${version}"`);
      res.setHeader("x-version", String(version));
      res.setHeader("x-updated-at", String(updatedAt));
      return res.status(200).json(state);
    }

    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return res.status(400).json({ error: "Invalid JSON body" });
        }
      }

      if (!body || typeof body !== "object") {
        return res.status(400).json({ error: "Request body must be a valid JSON object" });
      }

      // Check current state in Redis to verify version
      const current = await redis.get(STATE_KEY);
      let currentVersion = 0;
      if (current && typeof current === "object") {
        currentVersion = (current._syncMeta && typeof current._syncMeta.version === "number") ? current._syncMeta.version : 1;
      }

      // Client can send baseVersion via header (x-base-version or If-Match) or in body
      const rawBaseVer = req.headers["x-base-version"] || (req.headers["if-match"] ? req.headers["if-match"].replace(/["W\/]/g, "") : null) || body._baseVersion;
      const clientBaseVersion = rawBaseVer != null ? parseInt(rawBaseVer, 10) : null;

      // Optimistic concurrency control: if client specifies a baseVersion and current version is newer, return 409 Conflict
      if (clientBaseVersion != null && !isNaN(clientBaseVersion) && clientBaseVersion > 0 && currentVersion > clientBaseVersion) {
        return res.status(409).json({
          error: "Conflict: Cloud state has been updated by another device. Please merge with latest version.",
          code: "CONCURRENCY_CONFLICT",
          currentVersion: currentVersion,
          clientBaseVersion: clientBaseVersion
        });
      }

      delete body._baseVersion;
      const nextVersion = Math.max(currentVersion + 1, (clientBaseVersion || 0) + 1);
      body._syncMeta = {
        version: nextVersion,
        updatedAt: Date.now()
      };

      // Save state to Upstash Redis
      await redis.set(STATE_KEY, body);
      res.setHeader("ETag", `"${nextVersion}"`);
      res.setHeader("x-version", String(nextVersion));
      return res.status(200).json({ ok: true, version: nextVersion, savedAt: Date.now() });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("Redis operation error:", err);
    return res.status(500).json({
      error: "Failed to communicate with Redis",
      details: err.message
    });
  }
}
