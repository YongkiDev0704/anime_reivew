import { gql } from "@apollo/client";


export const GET_REVIEW_ANIME_DATA_BY_ID = gql`
    query GetReviewAnimeDataById($id: Int!) {
        Media(
            id: $id, 
            type: ANIME, 
            isAdult: false, 
            countryOfOrigin: "JP"
        ) {
        id
        title {
            romaji
            english
        }
        averageScore
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
`
export const GET_RELATED_CONTENT_ANIME = gql`
  query getAnimeByGenre($genre: String!, $page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      media(
      genre: $genre
      sort: SCORE_DESC
      type: ANIME
      isAdult: false
      countryOfOrigin: "JP"
      ) {
        id
        title {
          english
          romaji
        }
        score
        genres
        coverImage {
          large
        }
      }
    }
  }
`;

export const GET_WHATS_NEW_ANIME = gql`
  query GetWhatsNewAnime(
    $season: MediaSeason!
    $seasonYear: Int!
    $page: Int!
    $perPage: Int!
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        season: $season
        seasonYear: $seasonYear
        type: ANIME
        isAdult: false
        countryOfOrigin: "JP"
        sort: SCORE_DESC
      ) {
        id
        title {
          romaji
          english
        }
        genres
        coverImage {
          large
        }
        averageScore
      }
    }
  }
`;

export const GET_RELATED_ANIME = gql`
  query GetRelatedAnime($genres: [String], $excludeId: Int) {
    Page(perPage: 5) {
      media(
        genre_in: $genres
        id_not: $excludeId
        type: ANIME
        sort: [SCORE_DESC, START_DATE_DESC]
        startDate_greater: 20200101
      ) {
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

export const GET_NEW_ANIME = gql`
  query GetRecentHighRatedAnime {
    Page(perPage: 5) {
      media(
        type: ANIME
        sort: [SCORE_DESC, START_DATE_DESC]
        startDate_greater: 20240101
      ) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        averageScore
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

