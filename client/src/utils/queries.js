import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
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
      name
      price
      user {
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

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
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
