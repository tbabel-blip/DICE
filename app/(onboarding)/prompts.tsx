import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';
import { useOnboarding } from '../../context/OnboardingContext';
import { ObHeader } from '../../components/ui/ObHeader';

const PROMPTS = [
  'My love language is…',
  "On weekends you'll find me…",
  'The way to my heart is…',
  "I'm looking for someone who…",
  'My ideal first date is…',
  'Unpopular opinion…',
];

export default function ObPromptsScreen() {
  const router = useRouter();
  const { data, setField } = useOnboarding();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [draft, setDraft]       = useState('');

  const answered = data.prompts;
  const count    = answered.length;

  const confirm = (q: string) => {
    if (!draft.trim()) return;
    setField('prompts', [...answered, { q, a: draft.trim() }]);
    setExpanded(null);
    setDraft('');
  };

  const remove = (q: string) => {
    setField('prompts', answered.filter(p => p.q !== q));
  };

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ObHeader onBack={() => router.back()} progress={80} step="4 of 5" />
        <GlassCard variant="mint" style={styles.card}>
          <Text style={styles.title}>Your story in 3 prompts</Text>
          <Text style={styles.sub}>Pick 3 and answer them · {count}/3 answered</Text>

          {answered.map(({ q, a }) => (
            <View key={q} style={styles.answeredCard}>
              <Text style={styles.answeredQ}>{q}</Text>
              <Text style={styles.answeredA}>{a}</Text>
              <TouchableOpacity style={styles.removeBtn} onPress={() => remove(q)}>
                <Text style={styles.removeBtnText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}

          {count < 3 && (
            <>
              <Text style={styles.sectionLabel}>CHOOSE {3 - count} MORE</Text>
              {PROMPTS.filter(p => !answered.find(a => a.q === p)).map(q => (
                <View key={q}>
                  <TouchableOpacity
                    style={[styles.promptRow, expanded === q && styles.promptRowActive]}
                    onPress={() => { setExpanded(expanded === q ? null : q); setDraft(''); }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.promptText}>{q}</Text>
                    {expanded === q && <Text style={styles.check}>✓</Text>}
                  </TouchableOpacity>
                  {expanded === q && (
                    <View style={styles.inputArea}>
                      <TextInput style={styles.textarea} value={draft} onChangeText={setDraft} placeholder="Type your answer…" placeholderTextColor={Colors.textPlaceholder} multiline maxLength={150} autoFocus />
                      <View style={styles.inputFooter}>
                        <Text style={styles.charCount}>{draft.length}/150</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={() => confirm(q)}>
                          <Text style={styles.addBtnText}>Add ✓</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}

          <Button label="Continue" onPress={() => router.push('/(onboarding)/preferences')} disabled={count < 3} style={styles.btn} />
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
  sub:             { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 16 },
  answeredCard:    { backgroundColor: 'rgba(223,246,224,0.12)', borderWidth: 1.5, borderColor: Colors.peach, borderRadius: 14, padding: 14, marginBottom: 10, position: 'relative' },
  answeredQ:       { fontFamily: FontFamily.bold, fontSize: 11, color: Colors.peach, letterSpacing: 0.5, marginBottom: 4 },
  answeredA:       { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.mint, lineHeight: 20 },
  removeBtn:       { position: 'absolute', top: 8, right: 10 },
  removeBtnText:   { fontSize: 18, color: 'rgba(223,246,224,0.6)' },
  sectionLabel:    { fontFamily: FontFamily.extrabold, fontSize: 10, color: Colors.textMuted, letterSpacing: 1, marginBottom: 10 },
  promptRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: 'rgba(223,246,224,0.07)', borderWidth: 1, borderColor: 'rgba(223,246,224,0.12)', borderRadius: 12, marginBottom: 8 },
  promptRowActive: { borderColor: 'rgba(223,246,224,0.25)' },
  promptText:      { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.mint, flex: 1, lineHeight: 20 },
  check:           { fontFamily: FontFamily.bold, fontSize: 13, color: Colors.peach, marginLeft: 8 },
  inputArea:       { backgroundColor: 'rgba(223,246,224,0.08)', borderWidth: 1, borderColor: 'rgba(223,246,224,0.18)', borderRadius: 12, padding: 12, marginBottom: 8, marginTop: -4 },
  textarea:        { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.mint, minHeight: 50, lineHeight: 21 },
  inputFooter:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  charCount:       { fontFamily: FontFamily.regular, fontSize: 10, color: Colors.textMuted },
  addBtn:          { backgroundColor: Colors.mint, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14 },
  addBtnText:      { fontFamily: FontFamily.bold, fontSize: 12, color: Colors.crimson },
  btn:             { marginTop: 16 },
});
