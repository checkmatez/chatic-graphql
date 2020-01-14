import { cleanEnv } from 'envalid'

export const ENV = cleanEnv(
  process.env,
  {
    APP_SECRET: { type: 'string', _parse: String },
    DB_HOST: { type: 'string', _parse: String },
    DB_PORT: { type: 'number', _parse: Number },
    DB_NAME: { type: 'string', _parse: String },
    DB_USERNAME: { type: 'string', _parse: String },
    DB_PASSWORD: { type: 'string', _parse: String },
    PORT: { type: 'number', _parse: Number },
    GITHUB_TOKEN: { type: 'string', _parse: String },
    GITHUB_CLIENT_ID: { type: 'string', _parse: String },
    GITHUB_CLIENT_SECRET: { type: 'string', _parse: String },
    SUPER_USER_ID: { type: 'string', _parse: String },
  },
  { dotEnvPath: null, strict: true },
)

/** expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d" */
export const ACCESS_TOKEN_EXPIRES_IN: number | string = '1d'

export enum EventName {
  CHAT_MESSAGE_ADDED = 'CHAT_MESSAGE_ADDED',
}
