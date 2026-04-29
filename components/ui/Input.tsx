import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colors, FontFamily, FontSize, Radii } from '../../lib/theme';

type InputProps = TextInputProps & {
  error?: string;
  containerStyle?: ViewStyle;
};

export function Input({ error, containerStyle, style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);
  const borderColor = useSharedValue(Colors.glassMintBorder);

  const animStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  const onFocus = () => {
    setFocused(true);
    borderColor.value = withTiming(error ? 'rgba(255, 194, 133, 0.70)' : Colors.peach, {
      duration: 200,
    });
    props.onFocus?.({} as any);
  };

  const onBlur = () => {
    setFocused(false);
    borderColor.value = withTiming(
      error ? 'rgba(255, 194, 133, 0.70)' : Colors.glassMintBorder,
      { duration: 200 }
    );
    props.onBlur?.({} as any);
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.inputWrapper, animStyle, error && styles.inputError]}>
        <TextInput
          {...props}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[styles.input, style]}
          placeholderTextColor={Colors.textPlaceholder}
        />
      </Animated.View>
      {error ? <Text style={styles.errorMsg}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: Colors.glassMintBg,
    borderWidth: 1.5,
    borderColor: Colors.glassMintBorder,
    borderRadius: Radii.md,
    overflow: 'hidden',
  },
  input: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: 'rgba(255, 194, 133, 0.70)',
  },
  errorMsg: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.xs,
    color: Colors.peach,
    marginTop: 4,
    marginLeft: 2,
  },
});
