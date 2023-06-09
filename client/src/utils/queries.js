import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      image
      category {
        _id
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getProducts {
      category {
        name
        parent
      }
      description
      image
      start_date
      end_date
      name
      price
      user {
        _id
        email
        firstName
        lastName
      }
      _id
    }
  }
`;


export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;


export const GET_CATEGORIES = gql`
query GetCategory {
    getCategory {
      name
      parent
      _id
    }
  }
`;

export const GET_USER = gql`
query Query($userId: ID!) {
  getUserByID(userId: $userId) {
    _id
    email
    firstName
    image
    lastName
  }
}
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      image
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;