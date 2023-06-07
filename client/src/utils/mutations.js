import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String!, $image: String!, $price: Float!, $categoryId: ID!, $userId: ID!) {
    addProduct(name: $name, description: $description, image: $image, price: $price, categoryId: $categoryId, userId: $userId) {
      _id
      name
      description
      image
      price
      category {
        _id
        name
      }
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;