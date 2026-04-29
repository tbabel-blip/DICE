import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors, FontFamily, FontSize, Radii, Shadows, Springs } from '../../lib/theme';

type ButtonVariant = 'primary' | 'peach' | 'ghost' | 'signout' | 'textLink';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96, Springs.snappy);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, Springs.snappy);
  };

  const containerStyle = [
    styles.base,
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const labelStyle = [styles.baseText, styles[`${variant}Text` as keyof typeof styles], textStyle];

  if (variant === 'textLink') {
    return (
      <AnimatedTouchable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        activeOpacity={0.7}
        style={[styles.textLink, animStyle, style]}
      >
        <Text style={[styles.textLinkText, textStyle]}>{label}</Text>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      activeOpacity={1}
      style={[containerStyle, animStyle]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.crimson : Colors.mint}
          size="small"
        />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    borderRadius: Radii.md,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.md,
  },
  disabled: {
    opacity: 0.4,
  },

  // ── Primary (mint fill)
  primary: {
    backgroundColor: Colors.mint,
    ...Shadows.sm,
  },
  primaryText: {
    color: Colors.crimson,
    fontFamily: FontFamily.bold,
    letterSpacing: 0.3,
  },

  // ── Peach CTA
  peach: {
    backgroundColor: Colors.peach,
    ...Shadows.peach,
  },
  peachText: {
    color: Colors.crimson,
    fontFamily: FontFamily.extrabold,
    letterSpacing: 0.5,
  },

  // ── Ghost
  ghost: {
    backgroundColor: Colors.glassMintBg,
    borderWidth: 1,
    borderColor: Colors.glassMintBorder,
  },
  ghostText: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.base,
  },

  // ── Sign out
  signout: {
    backgroundColor: 'rgba(255, 194, 133, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 194, 133, 0.25)',
    borderRadius: Radii.lg,
  },
  signoutText: {
    color: Colors.peach,
    fontFamily: FontFamily.bold,
    fontSize: FontSize.sm,
    letterSpacing: 0.3,
  },

  // ── Text link
  textLink: {
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  textLinkText: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
    color: 'rgba(255, 255, 255, 0.45)',
  },
});
