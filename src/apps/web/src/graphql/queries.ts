import { gql } from "@apollo/client";

export const GET_TRENDING_ANIME = gql`
  query GetTrendingAnime {
    Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        averageScore
      }
    }
  }
`;

export const GET_LATEST_ANIME = gql`
  query GetLatestAnime {
    Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: UPDATED_AT_DESC, isAdult: false, status: RELEASING, countryOfOrigin: JP) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        averageScore
        genres
      }
    }
  }
`;


export const GET_RECOMMENDED_ANIME = gql`
  query GetRecommendedAnime {
    Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: SCORE_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        averageScore
      }
    }
  }
`;
