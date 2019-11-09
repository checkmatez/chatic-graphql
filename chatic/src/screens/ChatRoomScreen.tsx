import React from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationInjectedProps } from 'react-navigation';

import { COLORS } from '../config/styles';
import { CHAT_SUBSCRIPTION } from '../graphql/chat';
import { useChatRoomMessagesQuery } from '../types/graphql';
import { MessageBubble } from '../components/MessageBubble';
import { MessageEditor } from '../components/MessageEditor';

interface ChatRoomScreenParams {
  id: string;
}

export const ChatRoomScreen: React.FC<NavigationInjectedProps<ChatRoomScreenParams>> = ({
  navigation,
}) => {
  const chatId = navigation.state.params!.id;
  const { subscribeToMore, refetch, data, networkStatus } = useChatRoomMessagesQuery({
    variables: { chatId },
    notifyOnNetworkStatusChange: true,
  });

  const scrollRef = React.useRef<any>(null);

  const chatRoomUpdater = (prev: any, { subscriptionData }: any) => {
    if (!subscriptionData.data) {
      return prev;
    }
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd();
      }
    }, 500);
    const newMessage = subscriptionData.data.chatMessageAdded;

    return {
      ...prev,
      chatRoomMessages: {
        ...prev.chatRoomMessages,
        nodes: [...prev.chatRoomMessages.nodes, newMessage],
      },
    };
  };

  React.useEffect(() => {
    return subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      variables: { chatId },
      updateQuery: chatRoomUpdater,
    });
  }, [chatId]);

  const keyExtractor = (message: any) => message.id;

  const refreshControl = (
    <RefreshControl enabled refreshing={networkStatus === 4} onRefresh={refetch} />
  );

  const listEmpty = () => (
    <View>
      <Text>Комнат пока нет</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <FlatList
        data={data?.chatRoomMessages.nodes ?? []}
        renderItem={({ item }) => (
          <MessageBubble id={item.id} text={item.text} sentAt={item.sentAt} />
        )}
        keyExtractor={keyExtractor}
        refreshControl={refreshControl}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={{ paddingTop: 10 }}
        ref={scrollRef}
      />
      <MessageEditor chatId={chatId} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
