import { ApolloServer, gql, IResolvers, UserInputError } from 'apollo-server'
import * as jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_EXPIRES_IN, ENV } from './config/constants'
import { ChatRoom, Message, User } from './config/database'
import { Context, TokenPayload } from './types/index'

const typeDefs = gql`
  type Query {
    serviceDescription: String!
    me: User
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
    me: (parent, args, context, info) => {
      if (!context.userId) {
        return null
      }
      return context.User.query().findById(context.userId)
    },
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
  context: ({ req }) => {
    let userId = null
    const authorization = req.get('authorization')
    if (authorization) {
      const token = authorization.replace('Bearer ', '')
      try {
        const payload = jwt.verify(token, ENV.APP_SECRET) as TokenPayload
        userId = payload.userId
      } catch (error) {}
    }

    return { ChatRoom, Message, User, userId }
  },
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
