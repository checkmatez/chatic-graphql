import React from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';

import { Button } from '../components/Button';
import { COLORS } from '../config/styles';
import { useLoginMutation, useLoginWithGithubMutation } from '../types/graphql';
import { NavigationInjectedProps } from 'react-navigation';
import { ACCESS_TOKEN_KEY } from '../config/constants';

const GITHUB_CLIENT_ID = '872d280ffc87179458cc';
const redirectUrl = AuthSession.getRedirectUrl();
const authUrl =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${GITHUB_CLIENT_ID}` +
  `&scope=read:user` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}`;

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
  const [loginWithGithub, loginResult] = useLoginWithGithubMutation({
    onCompleted: async data => {
      setIsSettingToken(true);
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.loginWithGithub.accessToken);
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
          disabled={isSettingToken || loading || !username.length || !password.length}
          loading={loading}
        />
        <Button
          title="Авторизоваться через Github"
          onPress={async () => {
            const result = await AuthSession.startAsync({
              authUrl,
            });
            if (result.type === 'success') {
              await loginWithGithub({ variables: { code: result.params.code } });
            }
          }}
          // disabled={isSettingToken || loading || !username.length || !password.length}
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
    fontSize: 22,
    color: COLORS.default,
    marginVertical: 24,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.default,
  },
});
