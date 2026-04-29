import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Colors, FontFamily, FontSize, Spacing, Gradients, Shadows } from '../../lib/theme';

const MENU = [
  { icon: '✎', title: 'Edit profile',       sub: 'Photos, prompts, bio',          route: '/(onboarding)/photos'      },
  { icon: '⚙', title: 'Preferences',        sub: 'Age, distance, who you see',    route: '/(onboarding)/preferences' },
  { icon: '🛡', title: 'Safety Center',     sub: 'Tips, report, block',           route: null                        },
  { icon: '⚙', title: 'Settings & account', sub: 'Email, notifications, logout',  route: null                        },
];

export default function ProfileScreen() {
  const router   = useRouter();
  const { signOut } = useAuth();

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* Hero card */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
          <LinearGradient colors={['rgba(255,194,133,0.12)', 'rgba(139,28,28,0.8)']} style={styles.heroGrad}>
            <Text style={styles.heroInitial}>S</Text>
          </LinearGradient>
          <View style={styles.heroOverlay} />
          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>Sophia, 24</Text>
            <Text style={styles.heroSub}>VIEW YOUR PROFILE</Text>
          </View>
        </TouchableOpacity>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>12</Text>
            <Text style={styles.statLbl}>MATCHES</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: Colors.textMuted, opacity: 0.4 }]}>••</Text>
            <Text style={styles.statLbl}>LIKES</Text>
            <View style={styles.lockBadge}>
              <Text style={styles.lockText}>UPGRADE</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {MENU.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuRow}
              onPress={() => item.route && router.push(item.route as any)}
              activeOpacity={0.8}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={signOut} activeOpacity={0.8}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:       { flex: 1 },
  scroll:       { paddingBottom: 120 },
  header:       { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 62, paddingHorizontal: Spacing[5], paddingBottom: 20 },
  title:        { fontFamily: FontFamily.black, fontSize: FontSize['4xl'], color: Colors.mint, letterSpacing: -1 },
  settingsBtn:  { width: 44, height: 44, backgroundColor: Colors.glassMintBg, borderWidth: 1, borderColor: Colors.glassMintBorder, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  settingsIcon: { fontSize: 18, color: Colors.mint },
  heroCard:     { marginHorizontal: Spacing[5], borderRadius: 24, overflow: 'hidden', aspectRatio: 16/11, ...Shadows.md },
  heroGrad:     { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroInitial:  { fontFamily: FontFamily.black, fontSize: 80, color: Colors.peach },
  heroOverlay:  { position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', backgroundColor: 'rgba(0,0,0,0.55)' },
  heroInfo:     { position: 'absolute', bottom: 18, left: 20, right: 20 },
  heroName:     { fontFamily: FontFamily.black, fontSize: 26, color: '#fff', letterSpacing: -0.5 },
  heroSub:      { fontFamily: FontFamily.bold, fontSize: 11, color: Colors.peach, letterSpacing: 1, marginTop: 4 },
  statsRow:     { flexDirection: 'row', gap: 12, marginHorizontal: Spacing[5], marginTop: 14 },
  statCard:     { flex: 1, padding: 16, borderRadius: 20, backgroundColor: Colors.glassBg, borderWidth: 1, borderColor: Colors.glassBorder, position: 'relative' },
  statVal:      { fontFamily: FontFamily.black, fontSize: 32, color: Colors.mint, letterSpacing: -0.5 },
  statLbl:      { fontFamily: FontFamily.bold, fontSize: 10, color: Colors.textMuted, letterSpacing: 1, marginTop: 4 },
  lockBadge:    { position: 'absolute', top: 10, right: 10, paddingVertical: 3, paddingHorizontal: 6, backgroundColor: Colors.glassPeachBg, borderWidth: 1, borderColor: Colors.glassPeachBorder, borderRadius: 7 },
  lockText:     { fontFamily: FontFamily.black, fontSize: 7, color: Colors.peach, letterSpacing: 1 },
  menu:         { marginHorizontal: Spacing[5], marginTop: 16, gap: 10 },
  menuRow:      { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: Colors.glassBg, borderWidth: 1, borderColor: Colors.glassBorder, borderRadius: 16, padding: 14 },
  menuIcon:     { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.glassPeachBg, borderWidth: 1, borderColor: Colors.glassPeachBorder, alignItems: 'center', justifyContent: 'center' },
  menuIconText: { fontSize: 16, color: Colors.peach },
  menuTitle:    { fontFamily: FontFamily.bold, fontSize: 14, color: Colors.mint },
  menuSub:      { fontFamily: FontFamily.regular, fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  menuArrow:    { fontSize: 22, color: Colors.textMuted, fontWeight: '300' },
  signOutBtn:   { marginHorizontal: Spacing[5], marginTop: 16, backgroundColor: 'rgba(255,194,133,0.08)', borderWidth: 1, borderColor: 'rgba(255,194,133,0.25)', borderRadius: 16, padding: 14, alignItems: 'center' },
  signOutText:  { fontFamily: FontFamily.bold, fontSize: 13, color: Colors.peach },
});
