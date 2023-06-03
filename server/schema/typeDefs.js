const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type ProductType {
    _id: ID
    name: String
    category: Category
  }
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    productType: ProductType
    category: Category
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    product(id: ID!): Product
    categories: [Category]
    user: User
    productType(id: ID!): ProductType
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ):
  ****Update user????***
    
  }
`;

module.exports = typeDefs;
