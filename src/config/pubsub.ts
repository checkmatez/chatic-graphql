import { PostgresPubSub } from 'graphql-postgres-subscriptions'

import { ENV } from '../config/constants'

export const pubsub = new PostgresPubSub({
  user: ENV.DB_USERNAME,
  host: ENV.DB_HOST,
  database: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
  port: ENV.DB_PORT,
})
