export type Anime = {
  title: string;
  type: "tv" | "movie";
  genres: string[];
  contentRating: string | null;
  logoUrl: string;
  posterUrls: string[];
  backdropUrls: string[];
};


export type Review = {
  id: number;
  username: string;
  review_rating: number;
  review_comment: string;
  userIcon?: string;
  updatedAt: number;
}

// AniList API's Animation Info type definition
export type AniListAnimeDetail = {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  description: string | null;
      episodes: number | null;
      startDate: {
        year: number;
        month: number | null;
        day: number | null;
      } | null;
  season: string;
  genres: string[] | null;
  coverImage: {
        large: string;
      };
  bannerImage: string | null;
}