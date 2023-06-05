const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
    user: User
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Auth {
    token: ID
    user: User
  }
type Query {
  categories: [Category]
  getUsers: [User]
  getProducts: [Product]
}
 
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
  
    addProduct(
      name: String!
      description: String
      image: String
      price: Float!
      categoryId: ID!
      userId: ID!
    ): Product
    
  }
`;

module.exports = typeDefs;
