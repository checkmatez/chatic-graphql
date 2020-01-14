import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;

export const LOGIN_WITH_GITHUB_MUTATION = gql`
  mutation loginWithGithub($code: String!) {
    loginWithGithub(code: $code) {
      accessToken
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;
