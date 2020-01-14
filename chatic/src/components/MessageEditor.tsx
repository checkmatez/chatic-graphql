import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { InputAccessoryView, StyleSheet, TextInput, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

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
    <InputAccessoryView>
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
          <FontAwesome name="send" color="white" size={26} />
        </BorderlessButton>
      </View>
    </InputAccessoryView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  messageInput: {
    flex: 1,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
