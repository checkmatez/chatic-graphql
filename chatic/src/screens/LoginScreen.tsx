import React from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';

import { Button } from '../components/Button';
import { COLORS } from '../config/styles';
import { useLoginMutation } from '../types/graphql';
import { NavigationInjectedProps } from 'react-navigation';
import { ACCESS_TOKEN_KEY } from '../config/constants';

export const LoginScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const [isSettingToken, setIsSettingToken] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [login, { loading, error }] = useLoginMutation({
    variables: { username, password },
    onCompleted: async data => {
      setIsSettingToken(true);
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.login.accessToken);
      setIsSettingToken(false);
      navigation.navigate('App');
    },
  });

  return (
    <View style={styles.root}>
      <TextInput
        value={username}
        placeholder="Логин для входа"
        keyboardType="default"
        maxLength={30}
        autoFocus
        blurOnSubmit
        underlineColorAndroid="transparent"
        textBreakStrategy="highQuality"
        onChangeText={value => setUsername(value)}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Пароль"
        keyboardType="default"
        autoCompleteType="password"
        maxLength={30}
        secureTextEntry
        autoFocus
        blurOnSubmit
        underlineColorAndroid="transparent"
        textBreakStrategy="highQuality"
        onChangeText={value => setPassword(value)}
        style={styles.input}
      />
      {error && <Text>{error.message}</Text>}
      <View style={styles.buttonContainer}>
        <Button
          title="Войти"
          onPress={() => login()}
          disabled={isSettingToken || loading || !username.length}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 150,
    marginHorizontal: 50,
  },
  buttonContainer: {
    marginVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 21,
    color: COLORS.default,
    marginVertical: 24,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.default,
  },
});
