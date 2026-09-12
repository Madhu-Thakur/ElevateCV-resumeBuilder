// Vercel serverless entrypoint.
//
// Why this file exists:
// - Local dev runs `server/server.js` (long-lived Node process + app.listen).
// - Vercel is serverless: there is no long-lived process, so `app.listen`
//   never serves traffic. With Project Root Directory = `server`, Vercel only
//   creates functions from `api/*.js`. Without this file there is no function,
//   so every route (including /api/health) returns 404 NOT_FOUND.
// - This entrypoint reuses the SAME Express app from `../app` (no duplicated
//   routes) and ensures MongoDB is connected (cached across invocations).
// - `server/vercel.json` rewrites all incoming paths to this function so the
//   real Express router (including /api/health) handles them.

const app = require("../app");
const connectDB = require("../config/db");

// Ensure a single shared connection attempt across warm invocations.
let dbPromise = null;

const ensureDB = () => {
  // Health checks must stay reachable even if the DB is down,
  // so callers decide whether a DB failure is fatal (see below).
  if (!dbPromise) {
    dbPromise = connectDB().catch((err) => {
      // Reset so the next invocation retries the connection.
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
};

// Routes that can answer without a database round-trip.
const BYPASS_DB_PREFIXES = ["/api/health", "/api-docs"];

const bypassesDB = (url = "") => {
  const path = url.split("?")[0];
  return BYPASS_DB_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/")
  );
};

module.exports = async (req, res) => {
  // /api/health and Swagger docs stay reachable even when MongoDB is
  // unreachable/misconfigured. All real API routes connect first so
  // controllers always run with a live connection.
  if (!bypassesDB(req.url)) {
    try {
      await ensureDB();
    } catch (err) {
      console.error("MongoDB connection failed:", err.message);
      // NOTE: `res` here is the raw serverless response (Express has not run
      // yet), so Express helpers like res.status/res.json do not exist.
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, message: "Database connection failed" }));
      return;
    }
  }

  return app(req, res);
};

