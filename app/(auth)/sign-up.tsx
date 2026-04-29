import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirm) { setError('Please fill in all fields'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    const { error: authError } = await signUp(email, password);
    setLoading(false);
    if (authError) { setError(authError); return; }
    // On success go to onboarding
    router.replace('/(onboarding)/name');
  };

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.backBtn} onPress={() => router.back()}>←</Text>
            <Text style={styles.logoText}>DICE</Text>
            <View style={{ width: 44 }} />
          </View>

          <GlassCard variant="mint" style={styles.card}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Join Dice and find your match</Text>

            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              containerStyle={styles.inputGap}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              containerStyle={styles.inputGap}
            />
            <Input
              placeholder="Confirm password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              autoCapitalize="none"
              containerStyle={styles.inputGap}
            />

            {error ? <Text style={styles.errorMsg}>{error}</Text> : null}

            <Button label="Create account" onPress={handleSignUp} loading={loading} style={styles.btnTop} />

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divLabel}>or</Text>
              <View style={styles.divLine} />
            </View>

            <Button label="G  Continue with Google" onPress={() => {}} variant="ghost" />
          </GlassCard>

          <Text style={styles.footer}>
            Already have an account?{' '}
            <Text style={styles.footerLink} onPress={() => router.back()}>Sign in</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 40 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingBottom: 28, paddingHorizontal: Spacing[5],
  },
  backBtn: {
    width: 44, height: 44, backgroundColor: Colors.glassMintBg,
    borderWidth: 1, borderColor: Colors.glassMintBorder, borderRadius: 12,
    textAlign: 'center', lineHeight: 44, fontSize: 20, color: Colors.mint,
  },
  logoText: { fontFamily: FontFamily.black, fontSize: 32, color: Colors.mint, letterSpacing: -1 },
  card: { marginHorizontal: Spacing[5] },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize['3xl'], color: Colors.textPrimary, marginBottom: 6 },
  subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textMuted, marginBottom: 24 },
  inputGap: { marginBottom: 12 },
  errorMsg: { fontFamily: FontFamily.semibold, fontSize: FontSize.sm, color: Colors.peach, marginTop: 8, textAlign: 'center' },
  btnTop: { marginTop: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18, marginBottom: 14 },
  divLine: { flex: 1, height: 1, backgroundColor: 'rgba(223, 246, 224, 0.15)' },
  divLabel: { fontFamily: FontFamily.bold, fontSize: 10, color: 'rgba(223, 246, 224, 0.40)', letterSpacing: 1 },
  footer: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: 'rgba(223, 246, 224, 0.50)', textAlign: 'center', marginTop: 20 },
  footerLink: { fontFamily: FontFamily.bold, color: Colors.mint },
});
