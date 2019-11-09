import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { COLORS } from '../config/styles';

interface ChatRoomItemProps {
  id: string;
  name: string;
  onPress: () => void;
}

export const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ id, name, onPress }) => (
  <RectButton onPress={onPress}>
    <View style={styles.chatRoomItemContainer}>
      <Image
        source={{ uri: 'https://avatars1.githubusercontent.com/u/16280445?s=460&v=4' }}
        style={styles.talkImage}
        resizeMode="center"
      />
      <View>
        <Text style={styles.talkText}>{name}</Text>
        <Text style={styles.talkAuthor}>{name}</Text>
      </View>
    </View>
  </RectButton>
);

const styles = StyleSheet.create({
  chatRoomItemContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundDeep,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  talkImage: {
    width: 80,
    height: 80,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
  talkText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  talkAuthor: {
    marginTop: 5,
    fontSize: 18,
    color: 'white',
  },
});
