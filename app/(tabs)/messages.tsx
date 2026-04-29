import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors, FontFamily, FontSize, Spacing, Gradients } from '../../lib/theme';

const MATCHES = [
  { id: 1, name: 'Aria',        initial: 'A', preview: "Hey! I saw you like late-night drives too 🚗", unread: true,  bg: ['#7a1a2a','#3a0808'] as const, isBlind: false },
  { id: 2, name: 'Layla',       initial: 'L', preview: "Say hi to get things started ✨",              unread: false, bg: ['#8B1C1C','#5a1010'] as const, isBlind: false },
  { id: 3, name: 'Blind Match', initial: '🎲',preview: "Hey! This is so exciting…",                   unread: true,  bg: ['#7a1020','#2a0606'] as const, isBlind: true  },
];

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.count}>{MATCHES.filter(m => m.unread).length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {MATCHES.map(m => (
          <TouchableOpacity
            key={m.id}
            style={[styles.row, m.isBlind && styles.rowBlind]}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            {/* Avatar */}
            <LinearGradient colors={m.bg} style={styles.avatar}>
              <Text style={styles.initial}>{m.initial}</Text>
            </LinearGradient>

            {/* Text */}
            <View style={styles.textCol}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{m.name}</Text>
                {m.isBlind && (
                  <View style={styles.blindBadge}>
                    <Text style={styles.blindBadgeText}>BLIND DATE</Text>
                  </View>
                )}
                {m.unread && <View style={styles.dot} />}
              </View>
              <Text style={[styles.preview, m.unread && styles.previewBold]} numberOfLines={1}>{m.preview}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:         { flex: 1 },
  header:         { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 62, paddingHorizontal: Spacing[6], paddingBottom: 16 },
  title:          { fontFamily: FontFamily.black, fontSize: FontSize['4xl'], color: Colors.mint, letterSpacing: -1 },
  count:          { fontFamily: FontFamily.bold, fontSize: 14, color: Colors.textMuted, paddingBottom: 4 },
  scroll:         { paddingBottom: 120 },
  row:            { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, marginHorizontal: 16, marginBottom: 10, backgroundColor: Colors.glassBg, borderWidth: 1, borderColor: Colors.glassBorder, borderRadius: 18 },
  rowBlind:       { borderColor: Colors.glassPeachBorder, backgroundColor: Colors.glassPeachBg },
  avatar:         { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  initial:        { fontFamily: FontFamily.extrabold, fontSize: 20, color: Colors.peach },
  textCol:        { flex: 1, minWidth: 0 },
  nameRow:        { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name:           { fontFamily: FontFamily.bold, fontSize: 15, color: Colors.mint },
  dot:            { width: 9, height: 9, borderRadius: 5, backgroundColor: Colors.peach, marginLeft: 'auto' },
  preview:        { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.textSecondary, marginTop: 3 },
  previewBold:    { fontFamily: FontFamily.semibold, color: Colors.textPrimary },
  blindBadge:     { paddingVertical: 2, paddingHorizontal: 5, backgroundColor: Colors.glassPeachBg, borderWidth: 1, borderColor: Colors.glassPeachBorder, borderRadius: 6 },
  blindBadgeText: { fontFamily: FontFamily.extrabold, fontSize: 8, color: Colors.peach, letterSpacing: 1 },
});
