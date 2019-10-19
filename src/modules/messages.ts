import { gql, UserInputError } from 'apollo-server'
import * as jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_EXPIRES_IN, ENV } from '../config/constants'
import { TokenPayload } from '../types/context'
import { MutationResolvers, QueryResolvers } from './../types/graphql'

export const typeDefs = gql`
  extend type Mutation {
    sendMessage(data: SendMessageInput!): Message!
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
  Mutation: {
    sendMessage,
  },
}
