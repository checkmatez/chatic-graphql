import { RelationMappings } from 'objection'

import BaseModel from './base-model'

class User extends BaseModel {
  public static tableName = 'users'

  public static relationMappings: RelationMappings = {}

  public username!: string
  public password!: string
}

export default User
