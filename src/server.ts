import {
  ApolloServer,
  gql,
  IResolvers,
  ApolloError,
  UserInputError,
} from 'apollo-server'
import * as jwt from 'jsonwebtoken'

import { ChatRoom, Message, User } from './config/database'
import { UniqueViolationError } from 'db-errors'
import { Context, TokenPayload } from './types/index'
import { ENV, ACCESS_TOKEN_EXPIRES_IN } from './config/constants'

const typeDefs = gql`
  type Query {
    serviceDescription: String!
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }

  type User {
    id: ID!
    username: String!
  }

  type LoginResult {
    accessToken: String!
    user: User!
  }
`

const resolvers: IResolvers<any, Context> = {
  Query: {
    serviceDescription: (): string => 'Классный чатик 😝',
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      const user = await context.User.query().findOne(args)
      console.log('TCL: user', user)
      if (!user) {
        throw new UserInputError('Неправильный логин или пароль')
      }

      const payload: TokenPayload = { userId: user.id }
      const accessToken = jwt.sign(payload, ENV.APP_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      })

      return {
        accessToken,
        user,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { ChatRoom, Message, User },
  formatError: (err: Error) => {
    console.log('TCL: err', err)

    return err
  },
})

const start = async (): Promise<void> => {
  const { url } = await server.listen({ port: process.env.PORT || 4000 })
  console.log(`🚀  Server ready at ${url}`)
}

start()
