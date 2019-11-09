import { gql, makeExecutableSchema } from 'apollo-server'
import { GraphQLDateTime } from 'graphql-iso-date'
import merge from 'lodash/merge'

import { resolvers as authResolvers, typeDefs as authTypeDefs } from './auth'
import {
  resolvers as messagesResolvers,
  typeDefs as messagesTypeDefs,
} from './messages'
import {
  resolvers as chatRoomsResolvers,
  typeDefs as chatRoomsTypeDefs,
} from './chatRooms'

const typeDef = gql`
  type Query {
    serviceDescription: String!
  }

  type Mutation {
    noop: Boolean @deprecated(reason: "Dont use")
  }

  type Subscription {
    noop: Boolean @deprecated(reason: "Dont use")
  }

  scalar DateTime
`

const resolvers = {
  Query: {
    serviceDescription: (): string => 'Классный чатик 😝',
  },
  Mutation: {
    noop: () => null,
  },
  DateTime: GraphQLDateTime,
}

export const schema = makeExecutableSchema({
  typeDefs: [typeDef, authTypeDefs, messagesTypeDefs, chatRoomsTypeDefs],
  resolvers: merge(
    resolvers,
    authResolvers,
    messagesResolvers,
    chatRoomsResolvers,
  ),
})
