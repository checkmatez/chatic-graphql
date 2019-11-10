import { gql } from 'apollo-server'

import { MutationResolvers, QueryResolvers } from './../types/graphql'

export const typeDefs = gql`
  extend type Query {
    chatRooms(skip: Int = 0, limit: Int = 20): ChatRoomsConnection!
  }

  extend type Mutation {
    chatRoomCreate(name: String!): ChatRoom!
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

const chatRoomCreate: MutationResolvers['chatRoomCreate'] = async (
  _,
  { name },
  { ChatRoom },
) => {
  const chatRoom = await ChatRoom.query().insert({ name })
  return chatRoom
}

export const resolvers = {
  Query: {
    chatRooms,
  },
  Mutation: {
    chatRoomCreate,
  },
}
