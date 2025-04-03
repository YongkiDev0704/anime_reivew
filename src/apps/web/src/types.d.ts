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
  username: string;
  ratingScore: number;
  reviewComment: string;
  userIcon?: string;
  date: Date;
}

// AniList API's Animation Info type definition
export type AniListInfo = {
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