import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, FontFamily, Radii } from '../../lib/theme';

type BadgeVariant = 'comingSoon' | 'upgrade' | 'blindDate' | 'unread';

type BadgeProps = {
  variant: BadgeVariant;
  label?: string;
  style?: ViewStyle;
};

export function Badge({ variant, label, style }: BadgeProps) {
  if (variant === 'unread') {
    return <View style={[styles.unreadDot, style]} />;
  }

  return (
    <View style={[styles.base, styles[variant], style]}>
      <Text style={[styles.baseText, styles[`${variant}Text` as keyof typeof styles]]}>
        {label ?? defaultLabels[variant]}
      </Text>
    </View>
  );
}

const defaultLabels: Partial<Record<BadgeVariant, string>> = {
  comingSoon: 'COMING SOON',
  upgrade:    'UPGRADE',
  blindDate:  'BLIND DATE',
};

const styles = StyleSheet.create({
  base: {
    paddingVertical:   5,
    paddingHorizontal: 12,
    borderRadius:      20,
    borderWidth:       1,
    alignSelf:         'flex-start',
  },
  baseText: {
    fontFamily:    FontFamily.extrabold,
    fontSize:      9,
    letterSpacing: 1.5,
  },

  comingSoon: {
    borderColor:     Colors.glassBorderStrong,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  comingSoonText: {
    color: Colors.textMuted,
  },

  upgrade: {
    borderColor:     Colors.glassPeachBorder,
    backgroundColor: Colors.glassPeachBg,
  },
  upgradeText: {
    color: Colors.peach,
  },

  blindDate: {
    borderColor:     Colors.glassPeachBorder,
    backgroundColor: Colors.glassPeachBg,
  },
  blindDateText: {
    color: Colors.peach,
  },

  unreadDot: {
    width:           9,
    height:          9,
    borderRadius:    5,
    backgroundColor: Colors.peach,
  },
});
