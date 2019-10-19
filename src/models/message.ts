import { RelationMappings } from 'objection'

import BaseModel from './base-model'

class Message extends BaseModel {
  public static tableName = 'messages'

  public static relationMappings: RelationMappings = {}

  public text!: string
}

export default Message
