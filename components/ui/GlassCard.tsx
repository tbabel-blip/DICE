import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Radii, Spacing } from '../../lib/theme';

type GlassCardProps = {
  children: React.ReactNode;
  variant?: 'default' | 'mint';
  style?: ViewStyle;
  padding?: number;
};

export function GlassCard({
  children,
  variant = 'default',
  style,
  padding = Spacing[6],
}: GlassCardProps) {
  const isMint = variant === 'mint';

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderColor: isMint ? Colors.glassMintBorder : Colors.glassBorder,
        },
        style,
      ]}
    >
      <BlurView
        intensity={40}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: Radii['2xl'] }]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: Radii['2xl'],
            backgroundColor: isMint ? Colors.glassMintBg : Colors.glassBg,
          },
        ]}
      />
      <View style={{ padding, position: 'relative' }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Radii['2xl'],
    borderWidth: 1,
    overflow: 'hidden',
  },
});
