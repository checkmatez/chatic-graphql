import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'

import { context } from './config/context'
import { schema } from './modules/_schema'
import { permissions } from './middleware/permissions'

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
  formatError: (err: Error) => {
    console.log('TCL: err', err)

    return err
  },
})

const start = async (): Promise<void> => {
  const { url } = await server.listen({ port: process.env.PORT || 4000 })
  console.log(`🚀  Server ready at ${url}`)
}

start()
