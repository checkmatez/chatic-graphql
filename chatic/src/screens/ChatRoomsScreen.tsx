import React from 'react';
import { AsyncStorage, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { NavigationInjectedProps } from 'react-navigation';

import { COLORS } from '../config/styles';
import { ChatRoom, useChatRoomsQuery } from '../types/graphql';
import { ChatRoomItem } from '../components/ChatRoomItem';

export const ChatRoomsScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const { data, networkStatus, error, refetch } = useChatRoomsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const keyExtractor = (chatRoom: ChatRoom) => chatRoom.id;

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
        data={data?.chatRooms.nodes ?? []}
        renderItem={({ item }) => (
          <ChatRoomItem
            id={item.id}
            name={item.name}
            onPress={() => navigation.navigate('ChatRoom', { id: item.id, name: item.name })}
          />
        )}
        keyExtractor={keyExtractor}
        refreshControl={refreshControl}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={{ paddingTop: 10 }}
      />
      <RectButton
        // style={styles.orderContainer}
        onPress={() => AsyncStorage.clear()}
      >
        <View
          style={[
            // styles.mainContainer,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 25,
            },
          ]}
        >
          <Text>Очистить AsyncStorage</Text>
        </View>
      </RectButton>
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
