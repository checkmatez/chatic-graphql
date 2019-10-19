import { ApolloServerExpressConfig } from 'apollo-server-express'
import * as jwt from 'jsonwebtoken'

import { ENV } from './constants'
import { ChatRoom, Message, User } from './database'
import { TokenPayload } from '../types/context'

export const context: ApolloServerExpressConfig['context'] = ({ req }) => {
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
}
