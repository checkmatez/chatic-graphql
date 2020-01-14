import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { Context } from './context'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   **/
  DateTime: Date
}

export type ChatRoom = {
  __typename?: 'ChatRoom'
  id: Scalars['ID']
  name: Scalars['String']
}

export type ChatRoomsConnection = {
  __typename?: 'ChatRoomsConnection'
  nodes: Array<ChatRoom>
  total: Scalars['Int']
}

export type LoginResult = {
  __typename?: 'LoginResult'
  accessToken: Scalars['String']
  user: User
}

export type Message = {
  __typename?: 'Message'
  id: Scalars['ID']
  sentAt: Scalars['DateTime']
  text: Scalars['String']
  sender: User
  chatRoom: ChatRoom
}

export type MessagesConnection = {
  __typename?: 'MessagesConnection'
  nodes: Array<Message>
  total: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  noop?: Maybe<Scalars['Boolean']>
  login: LoginResult
  loginWithGithub: LoginResult
  sendMessage: Message
  chatRoomCreate: ChatRoom
}

export type MutationLoginArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

export type MutationLoginWithGithubArgs = {
  code: Scalars['String']
}

export type MutationSendMessageArgs = {
  data: SendMessageInput
}

export type MutationChatRoomCreateArgs = {
  name: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  serviceDescription: Scalars['String']
  me: User
  chatRoomMessages: MessagesConnection
  chatRooms: ChatRoomsConnection
}

export type QueryChatRoomMessagesArgs = {
  chatId: Scalars['ID']
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryChatRoomsArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type SendMessageInput = {
  text: Scalars['String']
  chatId: Scalars['ID']
}

export type Subscription = {
  __typename?: 'Subscription'
  noop?: Maybe<Scalars['Boolean']>
  chatMessageAdded: Message
}

export type SubscriptionChatMessageAddedArgs = {
  chatId: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  username: Scalars['String']
  avatarUrl: Scalars['String']
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  User: ResolverTypeWrapper<User>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  MessagesConnection: ResolverTypeWrapper<MessagesConnection>
  Message: ResolverTypeWrapper<Message>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  ChatRoom: ResolverTypeWrapper<ChatRoom>
  ChatRoomsConnection: ResolverTypeWrapper<ChatRoomsConnection>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  LoginResult: ResolverTypeWrapper<LoginResult>
  SendMessageInput: SendMessageInput
  Subscription: ResolverTypeWrapper<{}>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  String: Scalars['String']
  User: User
  ID: Scalars['ID']
  Int: Scalars['Int']
  MessagesConnection: MessagesConnection
  Message: Message
  DateTime: Scalars['DateTime']
  ChatRoom: ChatRoom
  ChatRoomsConnection: ChatRoomsConnection
  Mutation: {}
  Boolean: Scalars['Boolean']
  LoginResult: LoginResult
  SendMessageInput: SendMessageInput
  Subscription: {}
}>

export type ChatRoomResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ChatRoom'] = ResolversParentTypes['ChatRoom']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type ChatRoomsConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ChatRoomsConnection'] = ResolversParentTypes['ChatRoomsConnection']
> = ResolversObject<{
  nodes?: Resolver<Array<ResolversTypes['ChatRoom']>, ParentType, ContextType>
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}>

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type LoginResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
}>

export type MessageResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  sentAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  chatRoom?: Resolver<ResolversTypes['ChatRoom'], ParentType, ContextType>
}>

export type MessagesConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['MessagesConnection'] = ResolversParentTypes['MessagesConnection']
> = ResolversObject<{
  nodes?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  noop?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  login?: Resolver<
    ResolversTypes['LoginResult'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'username' | 'password'>
  >
  loginWithGithub?: Resolver<
    ResolversTypes['LoginResult'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginWithGithubArgs, 'code'>
  >
  sendMessage?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, 'data'>
  >
  chatRoomCreate?: Resolver<
    ResolversTypes['ChatRoom'],
    ParentType,
    ContextType,
    RequireFields<MutationChatRoomCreateArgs, 'name'>
  >
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  serviceDescription?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  chatRoomMessages?: Resolver<
    ResolversTypes['MessagesConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryChatRoomMessagesArgs, 'chatId' | 'skip' | 'limit'>
  >
  chatRooms?: Resolver<
    ResolversTypes['ChatRoomsConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryChatRoomsArgs, 'skip' | 'limit'>
  >
}>

export type SubscriptionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  noop?: SubscriptionResolver<
    Maybe<ResolversTypes['Boolean']>,
    'noop',
    ParentType,
    ContextType
  >
  chatMessageAdded?: SubscriptionResolver<
    ResolversTypes['Message'],
    'chatMessageAdded',
    ParentType,
    ContextType,
    RequireFields<SubscriptionChatMessageAddedArgs, 'chatId'>
  >
}>

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  ChatRoom?: ChatRoomResolvers<ContextType>
  ChatRoomsConnection?: ChatRoomsConnectionResolvers<ContextType>
  DateTime?: GraphQLScalarType
  LoginResult?: LoginResultResolvers<ContextType>
  Message?: MessageResolvers<ContextType>
  MessagesConnection?: MessagesConnectionResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
