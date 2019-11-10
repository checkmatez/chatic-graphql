import { gql, withFilter } from 'apollo-server'

import {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers,
} from './../types/graphql'
import { EventName } from '../config/constants'

export const typeDefs = gql`
  extend type Query {
    chatRoomMessages(
      chatId: ID!
      skip: Int = 0
      limit: Int = 20
    ): MessagesConnection!
  }

  extend type Mutation {
    sendMessage(data: SendMessageInput!): Message!
  }

  extend type Subscription {
    chatMessageAdded(chatId: ID!): Message!
  }

  type MessagesConnection {
    nodes: [Message!]!
    total: Int!
  }

  input SendMessageInput {
    text: String!
    chatId: ID!
  }

  type Message {
    id: ID!
    sentAt: DateTime!
    text: String!
    sender: User!
    chatRoom: ChatRoom!
  }
`

const chatRoomMessages = async (
  _,
  { chatId, skip, limit },
  { userId, Message },
) => {
  const { results: nodes, total } = await Message.query()
    .where('chat_room_id', chatId)
    .range(skip, skip + limit - 1)

  return { nodes, total }
}

const sendMessage = async (
  _,
  { data: { text, chatId } },
  { Message, userId, pubsub },
) => {
  const message = await Message.query()
    .insertGraph(
      {
        text,
        chatRoom: { id: chatId },
        author: { id: userId! },
      },
      { relate: true },
    )
    .returning('*')
  await pubsub.publish(EventName.CHAT_MESSAGE_ADDED, {
    chatMessageAdded: message,
  })

  return message
}

const chatMessageAdded: SubscriptionResolvers['chatMessageAdded'] = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(EventName.CHAT_MESSAGE_ADDED),
    ({ chatMessageAdded }, { chatId }) =>
      chatMessageAdded.chatRoomId === chatId,
  ),
}

export const resolvers = {
  Query: {
    chatRoomMessages,
  },
  Mutation: {
    sendMessage,
  },
  Subscription: {
    chatMessageAdded,
  },
  Message: {
    sentAt: ({ createdAt }) => createdAt,
  },
}
