import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Colors, FontFamily, FontSize, Spacing, Gradients, Springs } from '../../lib/theme';
import { Button } from '../../components/ui/Button';

const { width: SW } = Dimensions.get('window');

const CARDS = [
  { id: 1, name: 'Aria',  age: 22, bio: '"Lover of late-night drives and good playlists"', bg: ['#8B1C1C', '#5a1010'] as const },
  { id: 2, name: 'Layla', age: 23, bio: '"I judge people by their coffee order"',          bg: ['#7a1a2a', '#3a0808'] as const },
  { id: 3, name: 'Sofia', age: 25, bio: '"Sundays = brunch and no plans"',                 bg: ['#6a1020', '#2a0606'] as const },
];

function MatchModal({ name, onMessage, onKeep }: { name: string; onMessage: () => void; onKeep: () => void }) {
  return (
    <View style={modal.overlay}>
      <View style={modal.photos}>
        <View style={[modal.photo, modal.self, { backgroundColor: '#C73A3A' }]} />
        <View style={[modal.photo, modal.theirs, { backgroundColor: '#8B1C1C' }]} />
      </View>
      <Text style={modal.title}>It's a match!</Text>
      <Text style={modal.sub}>You and <Text style={{ color: '#fff', fontWeight: '800' }}>{name}</Text> liked each other</Text>
      <Button label="Send a message" onPress={onMessage} variant="peach" style={{ width: '100%', marginBottom: 0 }} />
      <Button label="Keep swiping" onPress={onKeep} variant="textLink" />
    </View>
  );
}

const modal = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.overlayMatch, alignItems: 'center', justifyContent: 'center', padding: 32, zIndex: 200 },
  photos:  { flexDirection: 'row', marginBottom: 36 },
  photo:   { width: 110, height: 145, borderRadius: 70, borderWidth: 4, borderColor: Colors.peach, shadowColor: Colors.peach, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 12 },
  self:    { transform: [{ rotate: '-6deg' }] },
  theirs:  { transform: [{ rotate: '6deg' }, { translateX: -28 }] },
  title:   { fontFamily: FontFamily.black, fontSize: 44, color: Colors.peach, letterSpacing: -1, marginBottom: 8 },
  sub:     { fontFamily: FontFamily.regular, fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 40, lineHeight: 22 },
});

export default function DiscoverScreen() {
  const [cards, setCards] = useState(CARDS);
  const [showMatch, setShowMatch] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate     = useSharedValue(0);
  const likeOpacity = useSharedValue(0);
  const nopeOpacity = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));
  const likeStyle = useAnimatedStyle(() => ({ opacity: likeOpacity.value }));
  const nopeStyle = useAnimatedStyle(() => ({ opacity: nopeOpacity.value }));

  const dismissCard = (dir: 'left' | 'right') => {
    const isLike = dir === 'right';
    translateX.value = withTiming(isLike ? SW * 1.5 : -SW * 1.5, { duration: 300 });
    rotate.value     = withTiming(isLike ? 20 : -20, { duration: 300 });
    setTimeout(() => {
      translateX.value = 0;
      translateY.value = 0;
      rotate.value     = 0;
      likeOpacity.value = 0;
      nopeOpacity.value = 0;
      const newCount = swipeCount + 1;
      setSwipeCount(newCount);
      setCards(prev => {
        const [, ...rest] = prev;
        return [...rest, prev[0]];
      });
      if (isLike && newCount % 2 === 0) setShowMatch(true);
    }, 310);
  };

  const pan = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.3;
      rotate.value     = e.translationX * 0.06;
      likeOpacity.value = Math.max(0, e.translationX / 100);
      nopeOpacity.value = Math.max(0, -e.translationX / 100);
    })
    .onEnd(e => {
      if (e.translationX > 100)       runOnJS(dismissCard)('right');
      else if (e.translationX < -100) runOnJS(dismissCard)('left');
      else {
        translateX.value  = withSpring(0, Springs.fast);
        translateY.value  = withSpring(0, Springs.fast);
        rotate.value      = withSpring(0, Springs.fast);
        likeOpacity.value = withTiming(0);
        nopeOpacity.value = withTiming(0);
      }
    });

  const top  = cards[0];
  const back = cards[1];

  return (
    <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>DICE</Text>
      </View>

      {/* Card stack */}
      <View style={styles.cardArea}>
        {/* Back card */}
        {back && (
          <LinearGradient colors={back.bg} style={[styles.card, styles.cardBack]}>
            <View style={styles.cardScrim} />
            <View style={styles.cardInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.cardName}>{back.name}</Text>
                <Text style={styles.cardAge}>{back.age}</Text>
              </View>
              <Text style={styles.cardBio}>{back.bio}</Text>
            </View>
          </LinearGradient>
        )}

        {/* Top card */}
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.card, styles.cardTop, cardStyle]}>
            <LinearGradient colors={top.bg} style={StyleSheet.absoluteFill} />
            {/* Stamps */}
            <Animated.View style={[styles.stamp, styles.stampLike, likeStyle]}>
              <Text style={styles.stampTextLike}>LIKE</Text>
            </Animated.View>
            <Animated.View style={[styles.stamp, styles.stampNope, nopeStyle]}>
              <Text style={styles.stampTextNope}>NOPE</Text>
            </Animated.View>
            <View style={styles.cardScrim} />
            <View style={styles.cardInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.cardName}>{top.name}</Text>
                <Text style={styles.cardAge}>{top.age}</Text>
              </View>
              <Text style={styles.cardBio}>{top.bio}</Text>
              <Text style={styles.tapHint}>Tap for more ↑</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actBtn, styles.actNope]} onPress={() => dismissCard('left')} activeOpacity={0.8}>
          <Text style={styles.actIcon}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actBtn, styles.actLike]} onPress={() => dismissCard('right')} activeOpacity={0.8}>
          <Text style={[styles.actIcon, { color: Colors.peach }]}>♥</Text>
        </TouchableOpacity>
      </View>

      {/* Match modal */}
      {showMatch && (
        <MatchModal
          name={top.name}
          onMessage={() => setShowMatch(false)}
          onKeep={() => setShowMatch(false)}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen:       { flex: 1 },
  header:       { paddingTop: 56, paddingBottom: 6, alignItems: 'center' },
  logoText:     { fontFamily: FontFamily.black, fontSize: 32, color: Colors.mint, letterSpacing: -1 },
  cardArea:     { flex: 1, marginHorizontal: 16, marginBottom: 10, maxHeight: 510 },
  card:         { position: 'absolute', inset: 0, borderRadius: 24, overflow: 'hidden' },
  cardBack:     { transform: [{ scale: 0.96 }, { translateY: 10 }], zIndex: 1 },
  cardTop:      { zIndex: 2 },
  cardScrim:    { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, backgroundColor: 'rgba(0,0,0,0.72)' },
  cardInfo:     { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 22, paddingBottom: 24 },
  cardName:     { fontFamily: FontFamily.extrabold, fontSize: 28, color: '#fff', letterSpacing: -0.5 },
  cardAge:      { fontFamily: FontFamily.regular, fontSize: 22, color: 'rgba(255,255,255,0.85)', marginLeft: 10 },
  cardBio:      { fontFamily: FontFamily.regular, fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 20 },
  tapHint:      { fontFamily: FontFamily.bold, fontSize: 11, color: 'rgba(255,194,133,0.85)', letterSpacing: 1, marginTop: 10 },
  stamp:        { position: 'absolute', top: 40, paddingVertical: 10, paddingHorizontal: 14, borderWidth: 4, borderRadius: 10 },
  stampLike:    { left: 22, borderColor: Colors.peach, transform: [{ rotate: '-12deg' }] },
  stampNope:    { right: 22, borderColor: '#fff', transform: [{ rotate: '12deg' }] },
  stampTextLike:{ fontFamily: FontFamily.black, fontSize: 28, color: Colors.peach, letterSpacing: 2 },
  stampTextNope:{ fontFamily: FontFamily.black, fontSize: 28, color: '#fff', letterSpacing: 2 },
  actions:      { flexDirection: 'row', justifyContent: 'center', gap: 36, paddingBottom: 104 },
  actBtn:       { width: 64, height: 64, borderRadius: 32, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  actNope:      { backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.5)' },
  actLike:      { backgroundColor: Colors.glassPeachBg, borderColor: 'rgba(255,194,133,0.6)' },
  actIcon:      { fontSize: 26, color: '#fff' },
});
