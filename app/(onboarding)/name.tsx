import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';
import { useOnboarding } from '../../context/OnboardingContext';
import { ObHeader } from '../../components/ui/ObHeader';

export default function ObNameScreen() {
  const router = useRouter();
  const { data, setField } = useOnboarding();

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ObHeader onBack={() => router.back()} progress={20} step="1 of 5" />
        <GlassCard variant="mint" style={styles.card}>
          <Text style={styles.title}>What's your name?</Text>
          <Text style={styles.sub}>This is how you'll appear to others</Text>
          <Input
            placeholder="Your name"
            value={data.name}
            onChangeText={v => setField('name', v)}
            autoCapitalize="words"
            style={{ fontSize: 17 }}
          />
          <Button
            label="Continue"
            onPress={() => router.push('/(onboarding)/birthday')}
            disabled={!data.name.trim()}
            style={styles.btn}
          />
        </GlassCard>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 40 },
  card:   { marginHorizontal: Spacing[5] },
  title:  { fontFamily: FontFamily.bold, fontSize: FontSize['3xl'], color: Colors.textPrimary, marginBottom: 6 },
  sub:    { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textMuted, marginBottom: 24 },
  btn:    { marginTop: 24 },
});
