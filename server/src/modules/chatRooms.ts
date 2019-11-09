import { gql, withFilter } from 'apollo-server'

import {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers,
} from './../types/graphql'
import { EventName } from '../config/constants'

export const typeDefs = gql`
  extend type Query {
    chatRooms(skip: Int = 0, limit: Int = 20): ChatRoomsConnection!
  }

  type ChatRoomsConnection {
    nodes: [ChatRoom!]!
    total: Int!
  }

  type ChatRoom {
    id: ID!
    name: String!
  }
`

const chatRooms: QueryResolvers['chatRooms'] = async (
  _,
  { skip, limit },
  { userId, ChatRoom },
) => {
  const { results: nodes, total } = await ChatRoom.query()
    .orderBy('name')
    .range(skip, skip + limit - 1)

  return { nodes, total }
}

export const resolvers = {
  Query: {
    chatRooms,
  },
}
