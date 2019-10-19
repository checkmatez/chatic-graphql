import { AuthenticationError } from 'apollo-server'
import { allow, and, not, or, rule, shield } from 'graphql-shield'

import { Context } from '../types/context'

// Rules
const isAuthenticated = rule()(
  async (parent, args, { userId }: Context) => userId !== null,
)

// Permissions
export const permissions = shield(
  {
    Mutation: {
      sendMessage: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
    fallbackRule: allow,
    fallbackError: new AuthenticationError('Требуется авторизация'),
  },
)
