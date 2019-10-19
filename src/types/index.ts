import { ChatRoom, Message, User } from '../config/database'

export interface Context {
  userId: string | null
  ChatRoom: typeof ChatRoom
  Message: typeof Message
  User: typeof User
}

export interface TokenPayload {
  userId: string
}
