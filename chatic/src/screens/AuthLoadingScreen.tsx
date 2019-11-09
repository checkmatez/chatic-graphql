import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { ACCESS_TOKEN_KEY } from '../config/constants';

export const AuthLoadingScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  React.useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      navigation.navigate(accessToken ? 'App' : 'Auth');
    };
    checkToken();
  }, [navigation]);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
