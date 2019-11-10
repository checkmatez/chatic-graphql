import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { COLORS } from '../config/styles';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';
import { ChatRoomScreen } from '../screens/ChatRoomScreen';
import { ChatRoomsScreen } from '../screens/ChatRoomsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { LogoutButton } from './LogoutButton';

const AppStack = createStackNavigator(
  {
    ChatRooms: {
      screen: ChatRoomsScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Доклады`,
        headerLeft: () => <LogoutButton onPress={() => navigation.navigate('Auth')} />,
      }),
    },
    ChatRoom: {
      screen: ChatRoomScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name,
      }),
    },
  },
  {
    initialRouteName: 'ChatRooms',
    defaultNavigationOptions: {
      headerTruncatedBackTitle: 'Назад',
      headerStyle: { backgroundColor: COLORS.backgroundDeep, borderBottomWidth: 0 },
      headerTitleStyle: { color: 'white' },
    },
  },
);
const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null } },
});

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export const AppContainer = createAppContainer(SwitchNavigator);
