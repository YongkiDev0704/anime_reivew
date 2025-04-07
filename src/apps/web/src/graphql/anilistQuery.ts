import { gql } from "@apollo/client";


export const GET_REVIEW_ANIME_DATA_BY_ID = gql`
    query GetReviewAnimeDataById($id: Int!) {
        Media(id: $id, type: ANIME, isAdult: false, countryOfOrigin: "JP") {
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
`