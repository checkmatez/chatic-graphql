import { gql, makeExecutableSchema } from 'apollo-server'
import merge from 'lodash/merge'

import { resolvers as authResolvers, typeDefs as authTypeDefs } from './auth'
import {
  resolvers as messagesResolvers,
  typeDefs as messagesTypeDefs,
} from './messages'

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
`

const resolvers = {
  Query: {
    serviceDescription: (): string => 'Классный чатик 😝',
  },
  Mutation: {
    noop: () => null,
  },
}

export const schema = makeExecutableSchema({
  typeDefs: [typeDef, authTypeDefs, messagesTypeDefs],
  resolvers: merge(resolvers, authResolvers, messagesResolvers),
})
