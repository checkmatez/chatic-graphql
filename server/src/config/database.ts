import Knex from 'knex'
import { Model } from 'objection'

import { ENV } from './constants'
import ChatRoom from '../models/chat-room'
import Message from '../models/message'
import User from '../models/user'

export const knex = Knex({
  client: 'pg',
  connection: {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    database: ENV.DB_NAME,
    user: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
  },
  searchPath: ['knex', 'public'],
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
  },
  debug: true,
  asyncStackTraces: true,
})

Model.knex(knex)

export { ChatRoom, Message, User }
