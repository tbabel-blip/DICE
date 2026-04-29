import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontFamily, Spacing } from '../../lib/theme';

type ObHeaderProps = {
  onBack: () => void;
  progress: number;
  step: string;
};

export function ObHeader({ onBack, progress, step }: ObHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.back} onPress={onBack}>←</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${progress}%` as any }]} />
      </View>
      <Text style={styles.label}>{step}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row:    { flexDirection: 'row', alignItems: 'center', paddingTop: 58, paddingBottom: 28, paddingHorizontal: Spacing[5] },
  back:   { width: 44, height: 44, backgroundColor: Colors.glassMintBg, borderWidth: 1, borderColor: Colors.glassMintBorder, borderRadius: 12, textAlign: 'center', lineHeight: 44, fontSize: 20, color: Colors.mint },
  barBg:  { flex: 1, height: 4, backgroundColor: 'rgba(223,246,224,0.15)', borderRadius: 2, marginHorizontal: 16 },
  barFill:{ height: '100%', backgroundColor: Colors.mint, borderRadius: 2 },
  label:  { fontFamily: FontFamily.bold, fontSize: 11, color: Colors.textMuted },
});
