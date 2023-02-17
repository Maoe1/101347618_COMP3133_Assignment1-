const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String!
  password: String!
}

type Query {
  hello: String
  login(username: String!, password: String!): String
}

type Mutation {
  signup(username: String!, email: String!, password: String!): User!
}


`;

module.exports = { typeDefs };