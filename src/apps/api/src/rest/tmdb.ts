import { Router } from "express";
import { fetchLandingAnimes } from "./services/fetchLandingAnimes";

export const tmdbRouter: Router = Router();

let cache: any[] | null = null;
let lastFetched = 0;
const TTL = 24 * 60 * 60 * 1000;

tmdbRouter.get("/landing-animes", async (_req, res) => {
  const now = Date.now();
  const expired = now - lastFetched > TTL;

  if (!cache || expired) {
    console.log("⏳ Fetching fresh data from TMDB...");
    try {
      cache = await fetchLandingAnimes();
      lastFetched = now;
    } catch (err) {
      console.error("❌ Failed to fetch from TMDB:", err);
      return res.status(500).json({ error: "TMDB fetch failed" });
    }
  } else {
    console.log("✅ Serving data from cache");
  }

  res.json(cache);
});
