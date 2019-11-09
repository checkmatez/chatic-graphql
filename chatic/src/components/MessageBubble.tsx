import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

import { COLORS } from '../config/styles';

interface MessageBubbleProps {
  id: string;
  text: string;
  sentAt: Date;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sentAt }) => {
  const slideFromLeft = React.useRef(new Animated.Value(-1)).current;
  console.log({ sentAt });

  React.useEffect(() => {
    Animated.spring(slideFromLeft, {
      toValue: 0,
      speed: 7,
      bounciness: 12,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.message,
        {
          transform: [
            {
              translateX: slideFromLeft.interpolate({
                inputRange: [-1, 0],
                outputRange: [-300, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.messageDate}>
        {formatDistanceToNow(new Date(sentAt), { locale: ru, addSuffix: true })}
      </Text>
      <Text style={styles.messageText}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  message: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: COLORS.backgroundDeep,
    borderRadius: 8,
    flex: 0,
    alignSelf: 'flex-start',
  },
  messageDate: {
    color: 'white',
    fontSize: 12,
  },
  messageText: {
    color: 'white',
    fontSize: 20,
  },
});
