// src/hooks/useLandingAnimes.ts
import { useEffect, useState } from "react";
import { Anime } from "../types";

export const useLandingAnimes = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/landing-animes`);
        if (!res.ok) throw new Error("Fetch failed");

        const data: Anime[] = await res.json();
        setAnimes(data);
      } catch (err) {
        setError("❌ Failed to load anime data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  return { animes, loading, error };
};
