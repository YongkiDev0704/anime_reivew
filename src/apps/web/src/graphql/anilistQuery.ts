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
      type: ANIME
      isAdult: false
      countryOfOrigin: "JP"
      sort: SCORE_DESC
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
