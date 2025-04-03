import { gql } from "@apollo/client";

// Testing Review Query
// 나중에 anime.id 로 찾아오게끔 전부 변경 필요
export const GET_REVIEW_BY_USERNAME = gql`
  query GetReviewByUsername($username: String!) {
    getReviewByUsername(username: $username) {
      success
      error
      data {
        _id
        username
        review_rating
        review_comment
      }
    }
  }
`;