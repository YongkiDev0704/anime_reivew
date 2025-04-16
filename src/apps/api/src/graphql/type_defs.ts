import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";
import gql from "graphql-tag";

export const typeDefs: IExecutableSchemaDefinition["typeDefs"] = gql`
  enum UserRole {
    Admin
    Normal
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    userRole: UserRole
  }
  
  type Review {
    id: ID!
    username: String
    review_rating: String!
    review_comment: String!
    review_password: String
    anilist_id: Int!
    anime_name: String!
    updatedAt: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
    userRole: UserRole!
  }

  type CreateUserResult {
    success: Boolean!
    error: String
  }

  input CreateReviewInput {
    username: String
    review_rating: String!
    review_comment: String!
    review_password: String
    anilist_id: Int!
    anime_name: String!
  }
  
  type CreateReviewResult {
    success: Boolean!
    error: String
  }
    
  input EditReviewInput {
    _id: ID!
    review_rating: String!
    review_comment: String!
    review_password: String!
  }

  type EditReviewResult {
    success: Boolean!
    error: String
  }

  type GetUserByEmailResult {
    success: Boolean!
    error: String
    data: User
  }

  type GetRevieswByUsernameResult {
    success: Boolean!
    error: String
    data: [Review!]!
  }

  type GetReviewsByAnilistIdResult {
    success: Boolean!
    error: String
    data: [Review!]!
  }

  type ReviewAverageResult {
    averageRating: String!
    totalReviews: Int!
  }

  type GetReviewAverageByAnilistIdResponse {
    success: Boolean!
    error: String
    data: ReviewAverageResult
  }

  input DeleteReviewInput {
    _id: ID!
    review_password: String!
  }

  type DeleteReviewResult {
    success: Boolean!
    error: String
  }

  type Mutation {
    createReview(data: CreateReviewInput!): CreateReviewResult!
    createUser(data: CreateUserInput!): CreateUserResult!
    editReview(data: EditReviewInput!): EditReviewResult!
    deleteReview(data: DeleteReviewInput!): DeleteReviewResult!
  }

  type Query {
    getUserByEmail(email: String!): GetUserByEmailResult!
    getReviewsByUsername(username: String!): GetRevieswByUsernameResult!
    getReviewsByAnilistId(anilist_id: Int!): GetReviewsByAnilistIdResult!
    getReviewAverageByAnilistId(anilist_id: Int!): GetReviewAverageByAnilistIdResponse!
  }

`;
