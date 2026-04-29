import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Colors, FontFamily, FontSize, Spacing, Gradients, Radii } from '../../lib/theme';
import { useOnboarding } from '../../context/OnboardingContext';
import { ObHeader } from '../../components/ui/ObHeader';

const SHOW_ME   = ['Men', 'Women', 'Non-binary', 'Other'];
const DISTANCES = ['5 km', '10 km', '25 km', '50 km', '100+ km'];

export default function ObPreferencesScreen() {
  const router = useRouter();
  const { data, setField } = useOnboarding();

  const toggleShowMe = (opt: string) => {
    const next = data.showMe.includes(opt)
      ? data.showMe.filter(x => x !== opt)
      : [...data.showMe, opt];
    setField('showMe', next);
  };

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ObHeader onBack={() => router.back()} progress={80} step="4 of 5" />
        <GlassCard variant="mint" style={styles.card}>
          <Text style={styles.title}>Your preferences</Text>
          <Text style={styles.sub}>You can change these any time</Text>

          <Text style={styles.sectionLabel}>SHOW ME</Text>
          <View style={styles.grid}>
            {SHOW_ME.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.chip, data.showMe.includes(opt) && styles.chipActive]}
                onPress={() => toggleShowMe(opt)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipLabel, data.showMe.includes(opt) && styles.chipLabelActive]}>{opt}</Text>
                {data.showMe.includes(opt) && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 22 }]}>AGE RANGE</Text>
          <View style={styles.ageRow}>
            <View style={styles.ageField}>
              <Text style={styles.ageFieldLabel}>FROM</Text>
              <Text style={styles.ageVal}>{data.ageMin}</Text>
            </View>
            <Text style={styles.ageSep}>–</Text>
            <View style={styles.ageField}>
              <Text style={styles.ageFieldLabel}>TO</Text>
              <Text style={styles.ageVal}>{data.ageMax}</Text>
            </View>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 22 }]}>MAX DISTANCE</Text>
          <View style={styles.chips}>
            {DISTANCES.map(d => (
              <TouchableOpacity
                key={d}
                style={[styles.distChip, data.distance === d && styles.distChipActive]}
                onPress={() => setField('distance', d)}
                activeOpacity={0.8}
              >
                <Text style={[styles.distLabel, data.distance === d && styles.distLabelActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            label="Finish setup"
            onPress={() => router.push('/(onboarding)/permissions')}
            disabled={data.showMe.length === 0}
            style={styles.btn}
          />
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
  sectionLabel:    { fontFamily: FontFamily.extrabold, fontSize: 10, color: Colors.textMuted, letterSpacing: 1.5, marginBottom: 10 },
  grid:            { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip:            { flexBasis: '47%', flexGrow: 1, padding: 16, backgroundColor: Colors.glassMintBg, borderWidth: 1.5, borderColor: Colors.glassMintBorder, borderRadius: Radii.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  chipActive:      { backgroundColor: 'rgba(223,246,224,0.18)', borderColor: Colors.peach },
  chipLabel:       { fontFamily: FontFamily.semibold, fontSize: FontSize.md, color: Colors.textSecondary },
  chipLabelActive: { color: Colors.mint },
  check:           { fontFamily: FontFamily.bold, fontSize: 13, color: Colors.peach },
  ageRow:          { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ageField:        { flex: 1, backgroundColor: Colors.glassMintBg, borderWidth: 1.5, borderColor: Colors.glassMintBorder, borderRadius: 14, padding: 12, alignItems: 'center' },
  ageFieldLabel:   { fontFamily: FontFamily.bold, fontSize: 9, color: Colors.textMuted, letterSpacing: 1, marginBottom: 4 },
  ageVal:          { fontFamily: FontFamily.bold, fontSize: 22, color: Colors.mint },
  ageSep:          { fontFamily: FontFamily.regular, fontSize: 20, color: 'rgba(223,246,224,0.35)' },
  chips:           { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  distChip:        { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 20 },
  distChipActive:  { backgroundColor: Colors.glassPeachBg, borderColor: Colors.glassPeachBorder },
  distLabel:       { fontFamily: FontFamily.semibold, fontSize: 12, color: Colors.textMuted },
  distLabelActive: { color: Colors.mint },
  btn:             { marginTop: 28 },
});
