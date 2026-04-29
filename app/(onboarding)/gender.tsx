import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Colors, FontFamily, FontSize, Spacing, Gradients, Radii } from '../../lib/theme';
import { useOnboarding } from '../../context/OnboardingContext';
import { ObHeader } from '../../components/ui/ObHeader';

const OPTIONS = ['Man', 'Woman', 'Non-binary', 'Other'];

export default function ObGenderScreen() {
  const router = useRouter();
  const { data, setField } = useOnboarding();

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ObHeader onBack={() => router.back()} progress={40} step="2 of 5" />
        <GlassCard variant="mint" style={styles.card}>
          <Text style={styles.title}>How do you identify?</Text>
          <Text style={styles.sub}>This helps us find your best matches</Text>
          <View style={styles.grid}>
            {OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.chip, data.gender === opt && styles.chipActive]}
                onPress={() => setField('gender', opt)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipLabel, data.gender === opt && styles.chipLabelActive]}>{opt}</Text>
                {data.gender === opt && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <Button label="Continue" onPress={() => router.push('/(onboarding)/photos')} disabled={!data.gender} style={styles.btn} />
        </GlassCard>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:          { flex: 1 },
  scroll:          { paddingBottom: 40 },
  card:            { marginHorizontal: Spacing[5] },
  title:           { fontFamily: FontFamily.bold, fontSize: FontSize['3xl'], color: Colors.textPrimary, marginBottom: 6 },
  sub:             { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textMuted, marginBottom: 24 },
  grid:            { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip:            { flexBasis: '47%', flexGrow: 1, padding: 16, backgroundColor: Colors.glassMintBg, borderWidth: 1.5, borderColor: Colors.glassMintBorder, borderRadius: Radii.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  chipActive:      { backgroundColor: 'rgba(223,246,224,0.18)', borderColor: Colors.peach },
  chipLabel:       { fontFamily: FontFamily.semibold, fontSize: FontSize.md, color: Colors.textSecondary },
  chipLabelActive: { color: Colors.mint },
  check:           { fontFamily: FontFamily.bold, fontSize: 13, color: Colors.peach },
  btn:             { marginTop: 24 },
});
