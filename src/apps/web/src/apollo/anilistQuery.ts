import { gql } from "@apollo/client";

// Anime List Query with required Data
export const GET_ANIME_LIST = gql`
  query GetAnimeList($seasonYear: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(seasonYear: $seasonYear, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        episodes
        startDate {
          year
          month
          day
        }
        season
        genres
        coverImage {
          large
        }
        bannerImage
      }
    }
  }
`;

export const GET_ANIME_LIST_TEST = gql`
    query {
    Page(page: 1, perPage: 10) {
        media(seasonYear: 2024, type: ANIME) {
        id
        title {
            romaji
            english
        }
        description
        episodes
        startDate {
            year
            month
            day
        }
        season
        genres
        coverImage {
            large
        }
        bannerImage
        }
    }
    }
`;