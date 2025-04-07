import { gql } from "@apollo/client";

// updatedAt is a number, not a string.
// new Date(Number(updatedAt value)) typecast might help.

// Get all the reviews for the anime with Anilist API's id
export const GET_REVIEWS_BY_ANILISTID = gql`
  query GetReviewsByAnilistId($anilist_id: Int!) {
    getReviewsByAnilistId(anilist_id: $anilist_id) {
      success
      data {
        id
        username
        review_rating
        review_comment
        updatedAt
      }
      error
    }
  }
`;

export const GET_REVIEWS_BY_USERNAME = gql`
  query GetReviewsByUsername($username: String!) {
    getReviewsByUsername(username: $username) {
      success
      data {
        id
        username
        review_rating
        review_comment
        updatedAt
      }
      error
    }
  }
`;