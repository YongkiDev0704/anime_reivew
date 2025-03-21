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
    rating: Float!
    comment: String!
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

  type GetUserByEmailResult {
    success: Boolean!
    error: String!
    data: User
  }

  type Mutation {
    createUser(data: CreateUserInput!): CreateUserResult!
  }

  type Query {
    getUserByEmail(email: String!): GetUserByEmailResult!
  }
`;
