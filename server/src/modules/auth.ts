import { Context } from '../types/context'
import { gql, UserInputError } from 'apollo-server'
import * as jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_EXPIRES_IN, ENV } from '../config/constants'
import { TokenPayload } from '../types/context'
import { MutationResolvers, QueryResolvers } from './../types/graphql'

export const typeDefs = gql`
  extend type Query {
    me: User!
  }

  extend type Mutation {
    register(username: String!): RegisterResult!
  }

  type User {
    id: ID!
    username: String!
    avatarUrl: String!
  }

  type RegisterResult {
    accessToken: String!
    user: User!
  }
`

const me = async (_, __, context: Context) => {
  if (!context.userId) {
    return undefined
  }
  const user = await context.User.query().findById(context.userId)
  return user
}

const register: MutationResolvers['register'] = async (
  parent,
  args,
  context,
  info,
) => {
  const user = await context.getGithubUser(args.username)
  console.log('TCL: user', user)
  if (!user) {
    throw new UserInputError('Такого пользователя нет')
  }
  await context.User.query().upsertGraph({
    id: user.id,
    username: user.name,
    password: '1',
  })

  const payload: TokenPayload = { userId: user.id }
  const accessToken = jwt.sign(payload, ENV.APP_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })

  return {
    accessToken,
    user: { ...user, username: user.name },
  }
}

export const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    register,
  },
}
