import { gql, UserInputError } from 'apollo-server'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'

import { ACCESS_TOKEN_EXPIRES_IN, ENV } from '../config/constants'
import { Context, TokenPayload } from '../types/context'
import { MutationResolvers } from './../types/graphql'

export const typeDefs = gql`
  extend type Query {
    me: User!
  }

  extend type Mutation {
    login(username: String!, password: String!): LoginResult!
  }

  type User {
    id: ID!
    username: String!
    avatarUrl: String!
  }

  type LoginResult {
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

const login: MutationResolvers['login'] = async (
  parent,
  { username, password },
  { User },
  info,
) => {
  if (username.length < 3) {
    throw new UserInputError('Имя пользователя минимум 3 символа')
  }
  if (password.length < 3) {
    throw new UserInputError('Пароль минимум 3 символа')
  }
  let user = await User.query().findOne({ username })

  if (user) {
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new UserInputError('Неправильный логин или пароль')
    }
  } else {
    const passwordHash = await bcrypt.hash(password, 10)
    user = await User.query()
      .insert({ username, password: passwordHash })
      .returning('*')
  }

  const payload: TokenPayload = { userId: user.id }
  const accessToken = jwt.sign(payload, ENV.APP_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })

  return {
    accessToken,
    user: { ...user, avatarUrl: '' },
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
