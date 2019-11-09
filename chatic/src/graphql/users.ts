import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation register($username: String!) {
    register(username: $username) {
      accessToken
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;
