import { AuthenticationError } from 'apollo-server'
import { allow, and, not, or, rule, shield } from 'graphql-shield'

import { Context } from '../types/context'
import { ENV } from '../config/constants'

// Rules
const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { userId }: Context) => userId !== null,
)

const isAdmin = rule()(
  async (parent, args, { userId }: Context, info) =>
    userId === ENV.SUPER_USER_ID,
)

// Permissions
export const permissions = shield(
  {
    Mutation: {
      chatRoomCreate: and(isAuthenticated, isAdmin),
      sendMessage: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
    fallbackRule: allow,
    fallbackError: new AuthenticationError('Требуется авторизация'),
  },
)
