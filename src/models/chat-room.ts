import { RelationMappings } from 'objection'

import BaseModel from './base-model'

class ChatRoom extends BaseModel {
  public static tableName = 'chat_rooms'

  public static relationMappings: RelationMappings = {}

  public name!: string
}

export default ChatRoom
