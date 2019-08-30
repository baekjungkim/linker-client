import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation onLogin($token: String!) {
    onLogin(token: $token) @client
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $password: String!
    $name: String!
    $phone: String!
    $avatarUrl: String
    $provider: String
    $kakaoId: Int
    $googleId: Int
  ) {
    createAccount(
      email: $email
      password: $password
      name: $name
      phone: $phone
      avatarUrl: $avatarUrl
      provider: $provider
      kakaoId: $kakaoId
      googleId: $googleId
    )
  }
`;
