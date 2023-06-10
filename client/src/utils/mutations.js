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
        image
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $image: String,) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, image: $image,) {
      token
      user {
        _id
        firstName
        lastName
        email
        image
      }
    }
  }
`;


export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String!, $image: String!, $price: Float!, $categoryId: ID!, $userId: ID!, $start_date: String!, $end_date: String!) {
    addProduct(name: $name, description: $description, image: $image, price: $price, categoryId: $categoryId, userId: $userId, start_date: $start_date, end_date: $end_date) {
      _id
      name
      description
      image
      price
      start_date
      end_date
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

export const UPDATE_USER_AVATAR = gql`
  mutation updateUserAvatar($image: String!, $userId: ID!) {
    updateUserAvatar(image: $image, userId: $userId) {
      _id
      image
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      _id
    }
  }
`;
