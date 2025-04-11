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

export const WRITE_NEW_USER_REVIEW = gql`
  mutation WriteNewUserReview(
      $username: String!,
      $review_rating: String!,
      $review_comment: String!,
      $review_password: String,
      $anilist_id: Int!,
      $anime_name: String!
  ) {
    createReview(
      data: {
        username: $username,
        review_rating: $review_rating,
        review_comment: $review_comment,
        review_password: $review_password,
        anilist_id: $anilist_id,
        anime_name: $anime_name
    }) {
        success
        error
      }
  }
`;

export const EDIT_USER_REVIEW = gql`
  mutation EditUserReview(
    $id: ID!
    $review_rating: String!
    $review_comment: String!
    $review_password: String!
  ) {
    editReview(
    data: {
      _id: $id,
      review_rating: $review_rating,
      review_comment: $review_comment,
      review_password: $review_password,
    }) {
        success
        error  
    }  
  }
`;