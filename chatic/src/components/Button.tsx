import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { COLORS } from '../config/styles';

interface ButtonProps extends ViewProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  ...viewProps
}) => {
  const content = loading ? (
    <View>
      <ActivityIndicator size="small" />
    </View>
  ) : (
    <View>
      <Text style={[styles.buttonText, disabled && styles.inversedText]}>
        {title.toUpperCase()}
      </Text>
    </View>
  );

  if (disabled) {
    return (
      <View style={[styles.button, styles.disabled, style]} {...viewProps}>
        {content}
      </View>
    );
  }

  return (
    <RectButton style={[styles.button, style]} onPress={onPress} {...viewProps}>
      {content}
    </RectButton>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 11,
    paddingVertical: 13,
    borderRadius: 17,
    backgroundColor: COLORS.default,
  },
  disabled: {
    backgroundColor: COLORS.wash,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  inversedText: {
    color: COLORS.default,
  },
});
