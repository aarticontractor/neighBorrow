const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
    parent: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
    user: User
    start_date: String
    end_date: String
  }
  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    image: String
  }
  type Auth {
    token: ID
    user: User
  }
  
type Query {
  getCategory: [Category]
  getUsers: [User]
  
  getProducts: [Product]
  getProductByID(productId: ID!): Product
  order(_id: ID!): Order
  checkout(products: [ID]!): checkout
}
extend type Query {
  getProducts: [Product]
  getProductByID(productId: ID!): Product
  getUserByID(userId: ID!): User
  
}
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      image: String
    ): Auth
  
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      image: String
    ): User
    addProduct(
      name: String
      description: String
      image: String
      price: Float
      categoryId: ID
      userId: ID
      start_date: String
      end_date: String
    ): Product
    updateUserAvatar(image: String!, userId: ID!): User

    addCategory(
      name: String!
    ): Category

    deleteProduct(productId: ID!): Product

    updateProduct(_id: ID!, quantity: Int!): Product
    
    login(
      email: String!, 
      password: String!
      ): Auth
  }
  type checkout {
    session: ID
  }
`;

module.exports = typeDefs;
