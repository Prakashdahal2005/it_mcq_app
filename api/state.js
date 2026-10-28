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
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-secret, Authorization");

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
      return res.status(200).json(state ?? {});
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

      // Save state to Upstash Redis
      await redis.set(STATE_KEY, body);
      return res.status(200).json({ ok: true, savedAt: Date.now() });
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
