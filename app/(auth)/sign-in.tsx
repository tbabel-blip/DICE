import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';

const DELAYS = [100, 220, 340, 460, 640];

function LogoLetter({ source, delay, style }: { source: any; delay: number; style?: any }) {
  const translateY = useSharedValue(-60);
  const opacity    = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(delay, withSpring(0, { damping: 8, stiffness: 140, mass: 1.1 }));
    opacity.value    = withDelay(delay, withSpring(1, { damping: 20, stiffness: 200 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity:   opacity.value,
  }));

  return (
    <Animated.View style={[animStyle, style]}>
      <Image source={source} style={styles.letterImg} resizeMode="contain" />
    </Animated.View>
  );
}

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    const { error: authError } = await signIn(email, password);
    setLoading(false);
    if (authError) setError(authError);
  };

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <View style={{ width: 44 }} />
            <View style={styles.logoRow}>
              <LogoLetter source={require('../../assets/images/D_letter.png')} delay={DELAYS[0]} />
              <View style={{ position: 'relative' }}>
                <LogoLetter source={require('../../assets/images/I_letter.png')} delay={DELAYS[1]} />
                <LogoLetter source={require('../../assets/images/Heart.png')} delay={DELAYS[4]} style={styles.heartOverlay} />
              </View>
              <LogoLetter source={require('../../assets/images/C_letter.png')} delay={DELAYS[2]} />
              <LogoLetter source={require('../../assets/images/E_letter.png')} delay={DELAYS[3]} />
            </View>
            <View style={{ width: 44 }} />
          </View>

          <GlassCard variant="mint" style={styles.card}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
            <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" containerStyle={styles.inputGap} />
            <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" containerStyle={styles.inputGap} />
            {error ? <Text style={styles.errorMsg}>{error}</Text> : null}
            <Button label="Sign in" onPress={handleSignIn} loading={loading} style={styles.btnTop} />
            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divLabel}>or</Text>
              <View style={styles.divLine} />
            </View>
            <Button label="G  Continue with Google" onPress={() => {}} variant="ghost" style={styles.socialBtn} />
            <Button label="New here? Create account →" onPress={() => router.push('/(auth)/sign-up')} variant="ghost" />
          </GlassCard>

          <Text style={styles.footer}>
            No account?{' '}
            <Text style={styles.footerLink} onPress={() => router.push('/(auth)/sign-up')}>Create one</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingBottom: 28, paddingHorizontal: Spacing[5] },
  logoRow: { flexDirection: 'row', alignItems: 'flex-end', height: 52 },
  letterImg: { height: 48, width: 38 },
  heartOverlay: { position: 'absolute', top: -2, left: 6 },
  card: { marginHorizontal: Spacing[5] },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize['3xl'], color: Colors.textPrimary, marginBottom: 6 },
  subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textMuted, marginBottom: 24 },
  inputGap: { marginBottom: 12 },
  errorMsg: { fontFamily: FontFamily.semibold, fontSize: FontSize.sm, color: Colors.peach, marginTop: 8, textAlign: 'center' },
  btnTop: { marginTop: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18, marginBottom: 14 },
  divLine: { flex: 1, height: 1, backgroundColor: 'rgba(223, 246, 224, 0.15)' },
  divLabel: { fontFamily: FontFamily.bold, fontSize: 10, color: 'rgba(223, 246, 224, 0.40)', letterSpacing: 1 },
  socialBtn: { marginBottom: 10 },
  footer: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: 'rgba(223, 246, 224, 0.50)', textAlign: 'center', marginTop: 20 },
  footerLink: { fontFamily: FontFamily.bold, color: Colors.mint },
});
