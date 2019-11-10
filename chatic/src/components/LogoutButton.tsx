import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => (
  <BorderlessButton
    onPress={async () => {
      await AsyncStorage.clear();
      onPress();
    }}
    style={{
      marginLeft: 10,
    }}
  >
    <SimpleLineIcons name="logout" color="white" size={24} />
  </BorderlessButton>
);
