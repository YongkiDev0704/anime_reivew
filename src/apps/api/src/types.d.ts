export type Anime = {
  title: string;
  type: "tv" | "movie";
  genres: string[];
  contentRating: string | null;
  logoUrl: string | null;
  posterUrls: string[];     
  backdropUrls: string[];   
};
