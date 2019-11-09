import { PubSub } from 'apollo-server'

import { ChatRoom, Message, User } from '../config/database'

export interface Context {
  userId: string | null
  pubsub: PubSub
  ChatRoom: typeof ChatRoom
  Message: typeof Message
  User: typeof User
  getGithubUser: (name: string) => Promise<any>
}

export interface TokenPayload {
  userId: string
}
