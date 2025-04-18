import axios from "axios";

import { Anime } from "../../types";

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

const animeTitles = [
  "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
  "Frieren: Beyond Journey's End",
  "Solo Leveling",
];

export const fetchLandingAnimes = async (): Promise<Anime[]> => {
  const result = await Promise.all(
    animeTitles.map(async (title) => {

      const tvSearch = await axios.get(`${TMDB_BASE}/search/tv`, {
        params: { api_key: TMDB_API_KEY, query: title },
        timeout: 5000, 
      });

      let entry = tvSearch.data.results[0];
      let type: "tv" | "movie" = "tv";

      if (!entry || entry.vote_average < 2) {
        const movieSearch = await axios.get(`${TMDB_BASE}/search/movie`, {
          params: { api_key: TMDB_API_KEY, query: title },
          timeout: 5000, 
        });
        entry = movieSearch.data.results[0];
        type = "movie";
      }

      if (!entry) return null;

      const [detail, imageRes, ratingRes] = await Promise.all([
        axios.get(`${TMDB_BASE}/${type}/${entry.id}`, {
          params: { api_key: TMDB_API_KEY },
          timeout: 5000,
        }),
        axios.get(`${TMDB_BASE}/${type}/${entry.id}/images`, {
          params: { api_key: TMDB_API_KEY },
          timeout: 5000, 
        }),
        axios.get(
          type === "tv"
            ? `${TMDB_BASE}/tv/${entry.id}/content_ratings`
            : `${TMDB_BASE}/movie/${entry.id}/release_dates`,
          { 
            params: { api_key: TMDB_API_KEY },
            timeout: 5000,
          }
        ),
      ]);

      const genres = detail.data.genres.map((g: any) => g.name);
      const logo = imageRes.data.logos.find((img: any) => img.iso_639_1 === "en");
      const posterUrls = imageRes.data.posters?.filter((p: any) => p.iso_639_1 === null && p.width >= 1000).map(
        (p: any) => `${IMG_BASE}${p.file_path}`) || [];
      const backdropUrls = imageRes.data.backdrops.map(
        (b: any) => `${IMG_BASE}${b.file_path}`
      );

      const contentRating =
        type === "tv"
          ? ratingRes.data.results.find((r: any) => r.iso_3166_1 === "US")?.rating || null
          : ratingRes.data.results
              .find((r: any) => r.iso_3166_1 === "US")
              ?.release_dates?.[0]?.certification || null;

      return {
        title: entry.name || entry.title,
        type,
        genres,
        contentRating,
        logoUrl: logo ? `${IMG_BASE}${logo.file_path}` : null,
        posterUrls,
        backdropUrls,
      };
    })
  );

  return result.filter(Boolean) as Anime[];
};
