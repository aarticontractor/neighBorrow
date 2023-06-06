import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      _id
      name
      description
      price
      image
    }
  }
`;

export const QUERY_CHECKOUT = gql``;