const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tool {
    _id: ID
    name: String
    description: String
    price: Float
  }

  type Query {
    getTool(id: ID!): Tool
    getAllTools: [Tool]
  }
`;

module.exports = typeDefs;
