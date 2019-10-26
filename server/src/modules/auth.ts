import { gql, UserInputError } from 'apollo-server'
import * as jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_EXPIRES_IN, ENV } from '../config/constants'
import { TokenPayload } from '../types/context'
import { MutationResolvers, QueryResolvers } from './../types/graphql'

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
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

const me: QueryResolvers['me'] = async (parent, args, context, info) => {
  if (!context.userId) {
    return null
  }
  const user = await context.User.query().findById(context.userId)
  return user
}

const login: MutationResolvers['login'] = async (
  parent,
  args,
  context,
  info,
) => {
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
}

export const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
  },
}
