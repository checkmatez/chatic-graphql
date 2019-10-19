import { ApolloServer } from 'apollo-server'

import { context } from './config/context'
import { schema } from './modules/_schema'

const server = new ApolloServer({
  schema,
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
