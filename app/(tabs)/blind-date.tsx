import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';
import { Button } from '../../components/ui/Button';

type Stage = 'join' | 'waiting' | 'matched';

function formatTime(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

const HOW_ROWS = [
  { n: '1', text: 'Enter the daily pool of single people near you' },
  { n: '2', text: 'Get matched on personality, not photos' },
  { n: '3', text: 'Chat for 48 hrs, then decide if you want to meet' },
];

const SHARED_VALUES = ['Quality time', 'Late nights', 'Music lover', 'Adventurous'];

export default function BlindDateScreen() {
  const router = useRouter();
  const [stage, setStage]       = useState<Stage>('join');
  const [poolSecs, setPoolSecs] = useState(9257);

  useEffect(() => {
    if (stage !== 'waiting') return;
    const t = setInterval(() => setPoolSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [stage]);

  // ── JOIN ──
  if (stage === 'join') return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.centerScroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.diceAnim}>🎲</Text>
        <Text style={styles.bigTitle}>Blind Date</Text>
        <Text style={styles.bigSub}>Get matched on personality,{'\n'}not photos</Text>
        <View style={styles.howCard}>
          <Text style={styles.howCardLabel}>HOW IT WORKS</Text>
          {HOW_ROWS.map(r => (
            <View key={r.n} style={styles.howRow}>
              <View style={styles.howBullet}><Text style={styles.howBulletText}>{r.n}</Text></View>
              <Text style={styles.howText}>{r.text}</Text>
            </View>
          ))}
        </View>
        <Button label="Join today's pool" onPress={() => setStage('waiting')} variant="peach" style={styles.mainBtn} />
        <Text style={styles.hint}>Pool resets daily at midnight</Text>
      </ScrollView>
    </LinearGradient>
  );

  // ── WAITING ──
  if (stage === 'waiting') return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.centerScroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.diceAnim, { fontSize: 64 }]}>🎲</Text>
        <Text style={styles.waitTitle}>You're in the pool</Text>
        <Text style={styles.waitSub}>Matching in progress…{'\n'}we'll notify you when it's time</Text>
        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>POOL EXPIRES IN</Text>
          <Text style={styles.timerVal}>{formatTime(poolSecs)}</Text>
          <Text style={styles.timerHint}>~47 people in pool near you</Text>
        </View>
        <View style={styles.howCard}>
          <Text style={styles.howCardLabel}>WHILE YOU WAIT</Text>
          <View style={styles.howRow}><View style={styles.howBullet}><Text style={styles.howBulletText}>✓</Text></View><Text style={styles.howText}>Keep your app open for real-time matching</Text></View>
          <View style={styles.howRow}><View style={styles.howBullet}><Text style={styles.howBulletText}>✓</Text></View><Text style={styles.howText}>Your photos stay hidden until both agree to reveal</Text></View>
        </View>
        <Button label="Simulate: got a match →" onPress={() => setStage('matched')} variant="ghost" style={styles.mainBtn} />
        <Button label="Leave pool" onPress={() => setStage('join')} variant="textLink" />
      </ScrollView>
    </LinearGradient>
  );

  // ── MATCHED ──
  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.centerScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.compatRing}>
          <Text style={styles.compatPct}>87%</Text>
          <Text style={styles.compatLbl}>COMPATIBLE</Text>
        </View>
        <Text style={styles.matchedTitle}>You matched!</Text>
        <Text style={styles.matchedSub}>You and your match are 87% compatible based on your answers and preferences</Text>
        <View style={[styles.howCard, { backgroundColor: Colors.glassPeachBg, borderColor: Colors.glassPeachBorder }]}>
          <Text style={styles.howCardLabel}>YOUR SHARED VALUES</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {SHARED_VALUES.map(v => (
              <View key={v} style={styles.valuePill}>
                <Text style={styles.valuePillText}>{v}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.hint}>You have 48 hours to chat before photos are revealed</Text>
        <Button label="Start chatting →" onPress={() => {}} variant="peach" style={styles.mainBtn} />
        <Button label="Not interested" onPress={() => setStage('join')} variant="textLink" />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:          { flex: 1 },
  centerScroll:    { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, paddingTop: 60, paddingBottom: 120 },
  diceAnim:        { fontSize: 72, marginBottom: 16 },
  bigTitle:        { fontFamily: FontFamily.black, fontSize: 36, color: Colors.mint, letterSpacing: -1, textAlign: 'center', marginBottom: 6 },
  bigSub:          { fontFamily: FontFamily.regular, fontSize: 15, color: Colors.textPrimary, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  howCard:         { width: '100%', backgroundColor: Colors.glassBg, borderWidth: 1, borderColor: Colors.glassBorder, borderRadius: 20, padding: 20, marginBottom: 20 },
  howCardLabel:    { fontFamily: FontFamily.extrabold, fontSize: 10, color: Colors.peach, letterSpacing: 1.5, marginBottom: 14 },
  howRow:          { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  howBullet:       { width: 26, height: 26, borderRadius: 13, backgroundColor: Colors.glassPeachBg, borderWidth: 1, borderColor: Colors.glassPeachBorder, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  howBulletText:   { fontFamily: FontFamily.extrabold, fontSize: 11, color: Colors.peach },
  howText:         { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.mint, lineHeight: 18, flex: 1 },
  mainBtn:         { width: '100%', marginBottom: 10 },
  hint:            { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.textMuted, textAlign: 'center', marginBottom: 16 },
  timerCard:       { width: '100%', backgroundColor: Colors.glassPeachBg, borderWidth: 1, borderColor: Colors.glassPeachBorder, borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 20 },
  timerLabel:      { fontFamily: FontFamily.extrabold, fontSize: 10, color: Colors.peach, letterSpacing: 1.5, marginBottom: 8 },
  timerVal:        { fontFamily: FontFamily.black, fontSize: 38, color: Colors.mint, letterSpacing: -1 },
  timerHint:       { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.textMuted, marginTop: 8 },
  waitTitle:       { fontFamily: FontFamily.black, fontSize: 28, color: Colors.mint, letterSpacing: -0.5, textAlign: 'center', marginBottom: 6 },
  waitSub:         { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.textPrimary, textAlign: 'center', lineHeight: 21, marginBottom: 28 },
  compatRing:      { width: 120, height: 120, borderRadius: 60, backgroundColor: Colors.glassPeachBg, borderWidth: 3, borderColor: Colors.peach, alignItems: 'center', justifyContent: 'center', marginBottom: 20, shadowColor: Colors.peach, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, shadowRadius: 32, elevation: 10 },
  compatPct:       { fontFamily: FontFamily.black, fontSize: 38, color: Colors.peach },
  compatLbl:       { fontFamily: FontFamily.bold, fontSize: 9, color: 'rgba(255,194,133,0.7)', letterSpacing: 1.5, marginTop: 3 },
  matchedTitle:    { fontFamily: FontFamily.black, fontSize: 34, color: Colors.peach, letterSpacing: -1, textAlign: 'center', marginBottom: 8 },
  matchedSub:      { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.textPrimary, textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  valuePill:       { paddingVertical: 5, paddingHorizontal: 12, backgroundColor: 'rgba(255,194,133,0.12)', borderWidth: 1, borderColor: Colors.glassPeachBorder, borderRadius: 20 },
  valuePillText:   { fontFamily: FontFamily.semibold, fontSize: 11, color: Colors.peach },
});
