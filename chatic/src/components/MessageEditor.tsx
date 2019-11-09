import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { COLORS } from '../config/styles';
import { useSendMessageMutation } from '../types/graphql';

interface MessageEditorProps {
  chatId: string;
}

export const MessageEditor: React.FC<MessageEditorProps> = ({ chatId }) => {
  const [message, setMessage] = React.useState('');
  const [sendMessage, { loading }] = useSendMessageMutation({
    variables: { data: { text: message, chatId } },
    onCompleted: () => {
      setMessage('');
    },
  });
  const handleSend = () => {
    sendMessage();
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        placeholder="Сообщение"
        keyboardType="default"
        returnKeyType="send"
        maxLength={100}
        blurOnSubmit
        underlineColorAndroid="transparent"
        textBreakStrategy="highQuality"
        onChangeText={value => setMessage(value)}
        onSubmitEditing={handleSend}
        style={styles.messageInput}
      />
      <BorderlessButton onPress={loading ? undefined : handleSend} style={styles.sendButton}>
        <View />
      </BorderlessButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  messageInput: {
    flex: 1,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  sendButton: {
    backgroundColor: 'purple',
    borderRadius: 20,
    marginLeft: 10,
    width: 40,
    height: 40,
  },
});
