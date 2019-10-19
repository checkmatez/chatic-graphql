import { gql } from 'apollo-server'

import { MutationResolvers, QueryResolvers } from './../types/graphql'

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
    text: String!
    sender: User!
    chatRoom: ChatRoom!
  }

  type ChatRoom {
    id: ID!
    name: String!
  }
`

const chatRoomMessages: QueryResolvers['chatRoomMessages'] = async (
  _,
  { chatId, skip, limit },
  { userId, Message },
) => {
  const { results: nodes, total } = await Message.query()
    .where('chat_room_id', chatId)
    .range(skip, skip + limit - 1)

  return { nodes, total }
}

const sendMessage: MutationResolvers['sendMessage'] = async (
  _,
  { data: { text, chatId } },
  { Message, userId },
) => {
  const message = await Message.query().insertGraph(
    {
      text,
      chatRoom: { id: chatId },
      author: { id: userId! },
    },
    { relate: true },
  )
  console.log('TCL: message', message)
  return message
}

export const resolvers = {
  Query: {
    chatRoomMessages,
  },
  Mutation: {
    sendMessage,
  },
}
