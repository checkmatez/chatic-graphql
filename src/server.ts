import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    serviceDescription: String!
  }
`

const resolvers = {
  Query: {
    serviceDescription: (): string => 'Классный чатик 😝'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const start = async (): Promise<void> => {
  const {url} = await server.listen({ port: process.env.PORT ?? 4000 })
  console.log(`🚀  Server ready at ${url}`)
}

start()
