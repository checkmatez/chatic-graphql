import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   **/
  DateTime: Date;
};

export type ChatRoom = {
  __typename?: "ChatRoom";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ChatRoomsConnection = {
  __typename?: "ChatRoomsConnection";
  nodes: Array<ChatRoom>;
  total: Scalars["Int"];
};

export type LoginResult = {
  __typename?: "LoginResult";
  accessToken: Scalars["String"];
  user: User;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  sentAt: Scalars["DateTime"];
  text: Scalars["String"];
  sender: User;
  chatRoom: ChatRoom;
};

export type MessagesConnection = {
  __typename?: "MessagesConnection";
  nodes: Array<Message>;
  total: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  noop?: Maybe<Scalars["Boolean"]>;
  login: LoginResult;
  loginWithGithub: LoginResult;
  sendMessage: Message;
  chatRoomCreate: ChatRoom;
};

export type MutationLoginArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type MutationLoginWithGithubArgs = {
  code: Scalars["String"];
};

export type MutationSendMessageArgs = {
  data: SendMessageInput;
};

export type MutationChatRoomCreateArgs = {
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  serviceDescription: Scalars["String"];
  me: User;
  chatRoomMessages: MessagesConnection;
  chatRooms: ChatRoomsConnection;
};

export type QueryChatRoomMessagesArgs = {
  chatId: Scalars["ID"];
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryChatRoomsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type SendMessageInput = {
  text: Scalars["String"];
  chatId: Scalars["ID"];
};

export type Subscription = {
  __typename?: "Subscription";
  noop?: Maybe<Scalars["Boolean"]>;
  chatMessageAdded: Message;
};

export type SubscriptionChatMessageAddedArgs = {
  chatId: Scalars["ID"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  username: Scalars["String"];
  avatarUrl: Scalars["String"];
};

export type ChatRoomsQueryVariables = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type ChatRoomsQuery = { __typename?: "Query" } & {
  chatRooms: { __typename?: "ChatRoomsConnection" } & Pick<
    ChatRoomsConnection,
    "total"
  > & {
      nodes: Array<{ __typename?: "ChatRoom" } & Pick<ChatRoom, "id" | "name">>;
    };
};

export type MessageFieldsFragment = { __typename?: "Message" } & Pick<
  Message,
  "id" | "text" | "sentAt"
>;

export type ChatRoomMessagesQueryVariables = {
  chatId: Scalars["ID"];
};

export type ChatRoomMessagesQuery = { __typename?: "Query" } & {
  chatRoomMessages: { __typename?: "MessagesConnection" } & Pick<
    MessagesConnection,
    "total"
  > & { nodes: Array<{ __typename?: "Message" } & MessageFieldsFragment> };
};

export type ChatMessageAddedSubscriptionVariables = {
  chatId: Scalars["ID"];
};

export type ChatMessageAddedSubscription = { __typename?: "Subscription" } & {
  chatMessageAdded: { __typename?: "Message" } & MessageFieldsFragment;
};

export type SendMessageMutationVariables = {
  data: SendMessageInput;
};

export type SendMessageMutation = { __typename?: "Mutation" } & {
  sendMessage: { __typename?: "Message" } & MessageFieldsFragment;
};

export type LoginMutationVariables = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginResult" } & Pick<LoginResult, "accessToken"> & {
      user: { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "avatarUrl"
      >;
    };
};

export type LoginWithGithubMutationVariables = {
  code: Scalars["String"];
};

export type LoginWithGithubMutation = { __typename?: "Mutation" } & {
  loginWithGithub: { __typename?: "LoginResult" } & Pick<
    LoginResult,
    "accessToken"
  > & {
      user: { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "avatarUrl"
      >;
    };
};

export const MessageFieldsFragmentDoc = gql`
  fragment MessageFields on Message {
    id
    text
    sentAt
  }
`;
export const ChatRoomsDocument = gql`
  query chatRooms($skip: Int, $limit: Int) {
    chatRooms(skip: $skip, limit: $limit) {
      nodes {
        id
        name
      }
      total
    }
  }
`;

/**
 * __useChatRoomsQuery__
 *
 * To run a query within a React component, call `useChatRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useChatRoomsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ChatRoomsQuery,
    ChatRoomsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ChatRoomsQuery, ChatRoomsQueryVariables>(
    ChatRoomsDocument,
    baseOptions
  );
}
export function useChatRoomsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ChatRoomsQuery,
    ChatRoomsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ChatRoomsQuery, ChatRoomsQueryVariables>(
    ChatRoomsDocument,
    baseOptions
  );
}
export type ChatRoomsQueryHookResult = ReturnType<typeof useChatRoomsQuery>;
export type ChatRoomsLazyQueryHookResult = ReturnType<
  typeof useChatRoomsLazyQuery
>;
export type ChatRoomsQueryResult = ApolloReactCommon.QueryResult<
  ChatRoomsQuery,
  ChatRoomsQueryVariables
>;
export const ChatRoomMessagesDocument = gql`
  query chatRoomMessages($chatId: ID!) {
    chatRoomMessages(chatId: $chatId) {
      nodes {
        ...MessageFields
      }
      total
    }
  }
  ${MessageFieldsFragmentDoc}
`;

/**
 * __useChatRoomMessagesQuery__
 *
 * To run a query within a React component, call `useChatRoomMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatRoomMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ChatRoomMessagesQuery,
    ChatRoomMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ChatRoomMessagesQuery,
    ChatRoomMessagesQueryVariables
  >(ChatRoomMessagesDocument, baseOptions);
}
export function useChatRoomMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ChatRoomMessagesQuery,
    ChatRoomMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ChatRoomMessagesQuery,
    ChatRoomMessagesQueryVariables
  >(ChatRoomMessagesDocument, baseOptions);
}
export type ChatRoomMessagesQueryHookResult = ReturnType<
  typeof useChatRoomMessagesQuery
>;
export type ChatRoomMessagesLazyQueryHookResult = ReturnType<
  typeof useChatRoomMessagesLazyQuery
>;
export type ChatRoomMessagesQueryResult = ApolloReactCommon.QueryResult<
  ChatRoomMessagesQuery,
  ChatRoomMessagesQueryVariables
>;
export const ChatMessageAddedDocument = gql`
  subscription chatMessageAdded($chatId: ID!) {
    chatMessageAdded(chatId: $chatId) {
      ...MessageFields
    }
  }
  ${MessageFieldsFragmentDoc}
`;

/**
 * __useChatMessageAddedSubscription__
 *
 * To run a query within a React component, call `useChatMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessageAddedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatMessageAddedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    ChatMessageAddedSubscription,
    ChatMessageAddedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    ChatMessageAddedSubscription,
    ChatMessageAddedSubscriptionVariables
  >(ChatMessageAddedDocument, baseOptions);
}
export type ChatMessageAddedSubscriptionHookResult = ReturnType<
  typeof useChatMessageAddedSubscription
>;
export type ChatMessageAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  ChatMessageAddedSubscription
>;
export const SendMessageDocument = gql`
  mutation sendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      ...MessageFields
    }
  }
  ${MessageFieldsFragmentDoc}
`;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SendMessageMutation,
    SendMessageMutationVariables
  >(SendMessageDocument, baseOptions);
}
export type SendMessageMutationHookResult = ReturnType<
  typeof useSendMessageMutation
>;
export type SendMessageMutationResult = ApolloReactCommon.MutationResult<
  SendMessageMutation
>;
export type SendMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>;
export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LoginWithGithubDocument = gql`
  mutation loginWithGithub($code: String!) {
    loginWithGithub(code: $code) {
      accessToken
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;

/**
 * __useLoginWithGithubMutation__
 *
 * To run a mutation, you first call `useLoginWithGithubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithGithubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithGithubMutation, { data, loading, error }] = useLoginWithGithubMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginWithGithubMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginWithGithubMutation,
    LoginWithGithubMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LoginWithGithubMutation,
    LoginWithGithubMutationVariables
  >(LoginWithGithubDocument, baseOptions);
}
export type LoginWithGithubMutationHookResult = ReturnType<
  typeof useLoginWithGithubMutation
>;
export type LoginWithGithubMutationResult = ApolloReactCommon.MutationResult<
  LoginWithGithubMutation
>;
export type LoginWithGithubMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginWithGithubMutation,
  LoginWithGithubMutationVariables
>;
