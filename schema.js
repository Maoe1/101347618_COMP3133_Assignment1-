const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String!
  password: String!
}


type Employee {
  id: ID!
  first_name: String!
  last_name: String!
  email: String!
  gender: String!
  salary: Float!
}

type AddEmployeePayload {
  success: Boolean!
  message: String!
  employee: Employee
}

type AddUserPayload {
  success: Boolean!
  message: String!
  user: User
}

type SearchEmployeePayload {
  success: Boolean!
  message: String
  employee: Employee
}

input UpdateEmployeeInput {
  first_name: String
  last_name: String
  email: String
  gender: String
  salary: Float
}

type UpdateEmployeePayload {
  success: Boolean!
  message: String
  employee: Employee
}

type DeleteEmployeePayload {
  success: Boolean!
  message: String!
  employee: Employee
}



type Query {
  hello: String
  login(username: String!, password: String!): String
  employees: [Employee!]!
  searchEmployee(id: ID!): SearchEmployeePayload!
}

type Mutation {
  signup(username: String!, email: String!, password: String!): AddUserPayload!
  addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): AddEmployeePayload!
  updateEmployee(id: ID!, input: UpdateEmployeeInput!): UpdateEmployeePayload!
  deleteEmployee(id: ID!): DeleteEmployeePayload!
}




`;

module.exports = { typeDefs };