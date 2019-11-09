import React from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';

import { Button } from '../components/Button';
import { COLORS } from '../config/styles';
import { useRegisterMutation } from '../types/graphql';
import { NavigationInjectedProps } from 'react-navigation';
import { ACCESS_TOKEN_KEY } from '../config/constants';

export const RegisterScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const [isSettingToken, setIsSettingToken] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [register, { loading, error }] = useRegisterMutation({
    variables: { username },
    onCompleted: async data => {
      setIsSettingToken(true);
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.register.accessToken);
      setIsSettingToken(false);
      navigation.navigate('App');
    },
  });

  return (
    <View style={styles.root}>
      <TextInput
        value={username}
        placeholder="GitHub username"
        keyboardType="default"
        maxLength={30}
        autoFocus
        blurOnSubmit
        // placeholderTextColor={COLORS.basic.dim}
        // selectionColor={COLORS.basic.dim}
        underlineColorAndroid="transparent"
        textBreakStrategy="highQuality"
        onChangeText={value => setUsername(value)}
        style={styles.input}
      />
      {error && <Text>{error.message}</Text>}
      <View style={styles.buttonContainer}>
        <Button
          title="Войти"
          onPress={() => register()}
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
