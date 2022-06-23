const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    bookCount: Int
    _id: ID!
    username: String!
    email: String
    savedBooks: [Book]
  }
  type Book {
    description: String
    title: String!
    bookId: ID!
    authors: [String]
    image: String!
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    title: String!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;