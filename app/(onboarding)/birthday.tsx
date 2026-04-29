import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';
import { useOnboarding } from '../../context/OnboardingContext';
import { ObHeader } from '../../components/ui/ObHeader';

export default function ObBirthdayScreen() {
  const router = useRouter();
  const { data, setField } = useOnboarding();

  // Parse existing dob
  const parts = data.dob ? data.dob.split('-') : ['', '', ''];
  const yyyy = parts[0] || '';
  const mm   = parts[1] || '';
  const dd   = parts[2] || '';

  const updateDob = (newYyyy: string, newMm: string, newDd: string) => {
    if (newYyyy && newMm && newDd) {
      setField('dob', `${newYyyy}-${newMm.padStart(2,'0')}-${newDd.padStart(2,'0')}`);
    }
  };

  const age = yyyy.length === 4 ? new Date().getFullYear() - parseInt(yyyy) : null;
  const valid = mm && dd && yyyy.length === 4 && age !== null && age >= 18;

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ObHeader onBack={() => router.back()} progress={40} step="2 of 5" />
        <GlassCard variant="mint" style={styles.card}>
          <Text style={styles.title}>When's your birthday?</Text>
          <Text style={styles.sub}>You must be 18 or older to use Dice</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.dateLabel}>MM</Text>
              <TextInput style={styles.dateInput} value={mm} onChangeText={v => updateDob(yyyy, v, dd)} keyboardType="number-pad" maxLength={2} placeholderTextColor={Colors.textPlaceholder} placeholder="—" />
            </View>
            <Text style={styles.sep}>/</Text>
            <View style={styles.dateField}>
              <Text style={styles.dateLabel}>DD</Text>
              <TextInput style={styles.dateInput} value={dd} onChangeText={v => updateDob(yyyy, mm, v)} keyboardType="number-pad" maxLength={2} placeholderTextColor={Colors.textPlaceholder} placeholder="—" />
            </View>
            <Text style={styles.sep}>/</Text>
            <View style={[styles.dateField, { flex: 1.6 }]}>
              <Text style={styles.dateLabel}>YYYY</Text>
              <TextInput style={styles.dateInput} value={yyyy} onChangeText={v => updateDob(v, mm, dd)} keyboardType="number-pad" maxLength={4} placeholderTextColor={Colors.textPlaceholder} placeholder="——" />
            </View>
          </View>
          {age !== null && (
            <Text style={[styles.ageHint, { color: age >= 18 ? Colors.peach : 'rgba(255,100,100,0.8)' }]}>
              {age >= 18 ? `${age} years old` : 'You must be 18 or older'}
            </Text>
          )}
          <Button label="Continue" onPress={() => router.push('/(onboarding)/gender')} disabled={!valid} style={styles.btn} />
        </GlassCard>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:    { flex: 1 },
  scroll:    { paddingBottom: 40 },
  card:      { marginHorizontal: Spacing[5] },
  title:     { fontFamily: FontFamily.bold, fontSize: FontSize['3xl'], color: Colors.textPrimary, marginBottom: 6 },
  sub:       { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textMuted, marginBottom: 24 },
  dateRow:   { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  dateField: { flex: 1, backgroundColor: Colors.glassMintBg, borderWidth: 1.5, borderColor: Colors.glassMintBorder, borderRadius: 14, padding: 12, alignItems: 'center' },
  dateLabel: { fontFamily: FontFamily.bold, fontSize: 9, color: Colors.textMuted, letterSpacing: 1.5, marginBottom: 4 },
  dateInput: { fontFamily: FontFamily.semibold, fontSize: 20, color: Colors.mint, textAlign: 'center', width: '100%' },
  sep:       { fontFamily: FontFamily.regular, fontSize: 22, color: 'rgba(223,246,224,0.35)', paddingBottom: 12 },
  ageHint:   { fontFamily: FontFamily.semibold, fontSize: 13, marginTop: 10 },
  btn:       { marginTop: 24 },
});
