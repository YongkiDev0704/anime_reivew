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
  username: string,
  ratingScore: number,
  reviewComment: string,
  userIcon?: string,
  date: Date;
}