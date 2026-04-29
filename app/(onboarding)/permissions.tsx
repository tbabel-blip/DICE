import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';
import { useOnboarding } from '../../context/OnboardingContext';
import { ObHeader } from '../../components/ui/ObHeader';

const PERMS = [
  { id: 'location', icon: '📍', title: 'Find people near you',  desc: "We use your location to show matches nearby. Your exact location is never shared." },
  { id: 'notifs',   icon: '🔔', title: 'Never miss a match',    desc: "Get notified when someone likes you back or sends a message. Only what matters." },
];

export default function ObPermissionsScreen() {
  const router = useRouter();
  const { save, saving } = useOnboarding();
  const [granted, setGranted] = useState<string[]>([]);
  const [error, setError]     = useState('');

  const grant = (id: string) =>
    setGranted(prev => prev.includes(id) ? prev : [...prev, id]);

  const handleFinish = async () => {
    setError('');
    const { error: saveError } = await save();
    if (saveError) {
      setError(saveError);
      return;
    }
    router.replace('/(tabs)/discover');
  };

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ObHeader onBack={() => router.back()} progress={100} step="5 of 5" />
        <GlassCard variant="mint" style={styles.card}>
          <Text style={styles.title}>One last thing</Text>
          <Text style={styles.sub}>Allow these for the full Dice experience. You can change them in Settings any time.</Text>

          {PERMS.map(p => (
            <View key={p.id} style={[styles.permTile, granted.includes(p.id) && styles.permGranted]}>
              <View style={styles.permTop}>
                <Text style={styles.permIcon}>{p.icon}</Text>
                <View style={styles.permBody}>
                  <Text style={styles.permTitle}>{p.title}</Text>
                  <Text style={styles.permDesc}>{p.desc}</Text>
                </View>
              </View>
              {granted.includes(p.id) ? (
                <Text style={styles.grantedText}>✓ Allowed</Text>
              ) : (
                <TouchableOpacity style={styles.allowBtn} onPress={() => grant(p.id)} activeOpacity={0.8}>
                  <Text style={styles.allowBtnText}>Allow</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {error ? <Text style={styles.errorMsg}>{error}</Text> : null}

          <Button
            label="Get started →"
            onPress={handleFinish}
            loading={saving}
            style={styles.btn}
          />
          <Button
            label="Skip for now"
            onPress={handleFinish}
            variant="textLink"
          />
        </GlassCard>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:      { flex: 1 },
  scroll:      { paddingBottom: 40 },
  card:        { marginHorizontal: Spacing[5] },
  title:       { fontFamily: FontFamily.bold, fontSize: FontSize['3xl'], color: Colors.textPrimary, marginBottom: 6 },
  sub:         { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textMuted, marginBottom: 24 },
  permTile:    { backgroundColor: 'rgba(223,246,224,0.08)', borderWidth: 1.5, borderColor: 'rgba(223,246,224,0.15)', borderRadius: 18, padding: 16, marginBottom: 12 },
  permGranted: { borderColor: 'rgba(223,246,224,0.35)', backgroundColor: 'rgba(223,246,224,0.12)' },
  permTop:     { flexDirection: 'row', gap: 14, marginBottom: 12 },
  permIcon:    { fontSize: 26 },
  permBody:    { flex: 1 },
  permTitle:   { fontFamily: FontFamily.bold, fontSize: 15, color: Colors.mint, marginBottom: 4 },
  permDesc:    { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.textMuted, lineHeight: 18 },
  allowBtn:    { backgroundColor: Colors.mint, borderRadius: 10, padding: 10, alignItems: 'center' },
  allowBtnText:{ fontFamily: FontFamily.bold, fontSize: 13, color: Colors.crimson },
  grantedText: { fontFamily: FontFamily.bold, fontSize: 13, color: Colors.peach, textAlign: 'center', marginTop: 4 },
  errorMsg:    { fontFamily: FontFamily.semibold, fontSize: 12, color: Colors.peach, textAlign: 'center', marginTop: 8 },
  btn:         { marginTop: 20 },
});
