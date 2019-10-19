import { Model, RelationMappings } from 'objection'

import BaseModel from './base-model'
import User from './user'
import ChatRoom from './chat-room'

class Message extends BaseModel {
  public static tableName = 'messages'

  public static relationMappings: RelationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'messages.author_id',
        to: 'users.id',
      },
    },
    chatRoom: {
      relation: Model.BelongsToOneRelation,
      modelClass: ChatRoom,
      join: {
        from: 'messages.chat_room_id',
        to: 'chat_rooms.id',
      },
    },
  }

  public text!: string
  public chatRoom!: ChatRoom
  public author!: User
}

export default Message
