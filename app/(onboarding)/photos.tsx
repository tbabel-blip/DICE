import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Colors, FontFamily, FontSize, Spacing, Gradients, Radii } from '../../lib/theme';

function ObHeader({ onBack, progress, step }: { onBack: () => void; progress: number; step: string }) {
  return (
    <View style={hdr.row}>
      <Text style={hdr.back} onPress={onBack}>←</Text>
      <View style={hdr.barBg}><View style={[hdr.barFill, { width: `${progress}%` }]} /></View>
      <Text style={hdr.label}>{step}</Text>
    </View>
  );
}
const hdr = StyleSheet.create({
  row:    { flexDirection: 'row', alignItems: 'center', paddingTop: 58, paddingBottom: 28, paddingHorizontal: Spacing[5] },
  back:   { width: 44, height: 44, backgroundColor: Colors.glassMintBg, borderWidth: 1, borderColor: Colors.glassMintBorder, borderRadius: 12, textAlign: 'center', lineHeight: 44, fontSize: 20, color: Colors.mint },
  barBg:  { flex: 1, height: 4, backgroundColor: 'rgba(223,246,224,0.15)', borderRadius: 2, marginHorizontal: 16 },
  barFill:{ height: '100%', backgroundColor: Colors.mint, borderRadius: 2 },
  label:  { fontFamily: FontFamily.bold, fontSize: 11, color: Colors.textMuted } as any,
});

export default function ObPhotosScreen() {
  const router = useRouter();
  const [filled, setFilled] = useState([true, true, false, false, false, false]);

  const toggle = (i: number) => {
    if (i === 0) return; // main photo always stays
    const next = [...filled];
    next[i] = !next[i];
    setFilled(next);
  };

  const count = filled.filter(Boolean).length;

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ObHeader onBack={() => router.back()} progress={60} step="3 of 5" />
        <GlassCard variant="mint" style={styles.card}>
          <Text style={styles.title}>Add your photos</Text>
          <Text style={styles.sub}>Add at least 1 · Tap to add more</Text>
          <View style={styles.grid}>
            {filled.map((f, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.slot, f && styles.slotFilled]}
                onPress={() => toggle(i)}
                activeOpacity={0.8}
              >
                {f ? (
                  <>
                    <View style={[styles.slotBg, { backgroundColor: i === 0 ? '#C73A3A' : '#8B1C1C' }]} />
                    {i === 0 && (
                      <View style={styles.mainBadge}>
                        <Text style={styles.mainBadgeText}>MAIN</Text>
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    <Text style={styles.plus}>+</Text>
                    <Text style={styles.hint}>ADD</Text>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.countHint}>{count} photo{count !== 1 ? 's' : ''} added {count >= 1 ? '✓' : ''}</Text>
          <Button
            label="Continue"
            onPress={() => router.push('/(onboarding)/prompts')}
            disabled={count < 1}
            style={styles.btn}
          />
        </GlassCard>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:        { flex: 1 },
  scroll:        { paddingBottom: 40 },
  card:          { marginHorizontal: Spacing[5] },
  title:         { fontFamily: FontFamily.bold, fontSize: FontSize['3xl'], color: Colors.textPrimary, marginBottom: 6 },
  sub:           { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 18 },
  grid:          { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slot:          { width: '31%', aspectRatio: 3/4, borderRadius: 14, borderWidth: 1.5, borderStyle: 'dashed', borderColor: 'rgba(223,246,224,0.22)', backgroundColor: 'rgba(223,246,224,0.06)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  slotFilled:    { borderStyle: 'solid', borderColor: 'rgba(223,246,224,0.20)' },
  slotBg:        { ...StyleSheet.absoluteFillObject },
  mainBadge:     { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: 3, alignItems: 'center' },
  mainBadgeText: { fontFamily: FontFamily.extrabold, fontSize: 8, color: Colors.mint, letterSpacing: 1 },
  plus:          { fontSize: 24, color: 'rgba(223,246,224,0.35)' },
  hint:          { fontFamily: FontFamily.bold, fontSize: 8, color: 'rgba(223,246,224,0.3)', letterSpacing: 0.8, marginTop: 3 },
  countHint:     { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.textMuted, textAlign: 'center', marginTop: 12 },
  btn:           { marginTop: 18 },
});
