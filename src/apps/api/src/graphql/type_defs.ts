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
  }

  type CreateReviewResult {
    success: Boolean!
    error: String
  }

  type GetUserByEmailResult {
    success: Boolean!
    error: String
    data: User
  }

  type getReviewByUsernameResult {
    success: Boolean!
    error: String
    data: Review
  }

  type Mutation {
    createUser(data: CreateUserInput!): CreateUserResult!
  }

  type Mutation {
    createReview(data: CreateReviewInput!): CreateReviewResult!
  }

  type Query {
    getUserByEmail(email: String!): GetUserByEmailResult!
  }

  type Query {
    getReviewByUsername(username: String!): getReviewByUsernameResult!
  }
`;
