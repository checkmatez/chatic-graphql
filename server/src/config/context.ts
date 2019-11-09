import { Context } from './../types/context'
import { ApolloServerExpressConfig } from 'apollo-server-express'
import * as jwt from 'jsonwebtoken'

import { ENV } from './constants'
import { ChatRoom, Message, User } from './database'
import { TokenPayload } from '../types/context'
import { pubsub } from './pubsub'
import fetch from 'node-fetch'

const getGithubUser = (name: string) =>
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ENV.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
  query user($name: String!){
    user(login: $name) {
      id
      name
      avatarUrl
    }
  }
  `,
      variables: { name },
    }),
  })
    .then(response => response.json())
    .then(result => result.data.user)

export const context: ApolloServerExpressConfig['context'] = ({
  req,
}): Context => {
  let userId: null | string = null
  if (req) {
    const authorization = req.get('authorization')
    if (authorization) {
      const token = authorization.replace('Bearer ', '')
      try {
        const payload = jwt.verify(token, ENV.APP_SECRET) as TokenPayload
        userId = payload.userId
      } catch (error) {}
    }
  }

  return {
    userId,
    pubsub,
    ChatRoom,
    Message,
    User,
    getGithubUser,
  }
}
