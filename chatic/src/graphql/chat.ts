import gql from 'graphql-tag';

export const CHAT_ROOMS = gql`
  query chatRooms($skip: Int, $limit: Int) {
    chatRooms(skip: $skip, limit: $limit) {
      nodes {
        id
        name
      }
      total
    }
  }
`;

const MESSAGE = gql`
  fragment MessageFields on Message {
    id
    text
    sentAt
  }
`;

export const CHAT_MESSAGES = gql`
  query chatRoomMessages($chatId: ID!) {
    chatRoomMessages(chatId: $chatId) {
      nodes {
        ...MessageFields
      }
      total
    }
  }
  ${MESSAGE}
`;

export const CHAT_SUBSCRIPTION = gql`
  subscription chatMessageAdded($chatId: ID!) {
    chatMessageAdded(chatId: $chatId) {
      ...MessageFields
    }
  }
  ${MESSAGE}
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      ...MessageFields
    }
  }
  ${MESSAGE}
`;
