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
        averageScore
      }
    }
  }
`;
