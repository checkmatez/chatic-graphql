import { gql, makeExecutableSchema } from 'apollo-server'
import merge from 'lodash/merge'

import { resolvers as authResolvers, typeDefs as authTypeDefs } from './auth'

const typeDef = gql`
  type Query {
    serviceDescription: String!
  }

  type Mutation {
    noop: Boolean
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
  typeDefs: [typeDef, authTypeDefs],
  resolvers: merge(resolvers, authResolvers),
})
