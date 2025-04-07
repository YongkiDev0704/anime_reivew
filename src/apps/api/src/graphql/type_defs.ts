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
    _id: ID!
    username: String
    review_rating: Float!
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
    review_rating: Float!
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
    review_rating: Float!
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

  type Mutation {
    createUser(data: CreateUserInput!): CreateUserResult!
  }

  type Mutation {
    createReview(data: CreateReviewInput!): CreateReviewResult!
  }

  type Mutation {
    editReview(data: EditReviewInput!): EditReviewResult!
  }

  type Query {
    getUserByEmail(email: String!): GetUserByEmailResult!
  }

  type Query {
    getReviewsByUsername(username: String!): GetRevieswByUsernameResult!
  }
    
  type Query {
    getReviewsByAnilistId(anilist_id: Int!): GetReviewsByAnilistIdResult!
  }
`;
