/**
 * DICE Design System — React Native Theme
 * Translated from colors_and_type.css + HTML component previews
 *
 * Usage:
 *   import { Colors, Typography, Spacing, Radii, Shadows, Borders, Springs } from './theme';
 */

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// ─── Brand Colors ──────────────────────────────────────────────────────────────

export const Colors = {
  // Core brand
  crimson:      '#C73A3A',   // Tomato Jam — primary brand / main bg
  crimsonDeep:  '#8B1C1C',   // Deep Crimson — placeholders, deep shadows
  mint:         '#DFF6E0',   // Frosted Mint — primary text, primary button fill
  peach:        '#FFC285',   // Peach Glow — accent, CTAs, active states
  jet:          '#2D2A32',   // Charcoal-purple — reserved for dark surfaces
  black:        '#0B0202',
  white:        '#FFFFFF',

  // Background
  bg:           '#C73A3A',   // Solid bg (native; use LinearGradient for full effect)

  // Glass surfaces — rgba strings (use with backgroundColor)
  glassBg:            'rgba(255, 255, 255, 0.10)',
  glassBgHover:       'rgba(255, 255, 255, 0.16)',
  glassBorder:        'rgba(255, 255, 255, 0.15)',
  glassBorderStrong:  'rgba(255, 255, 255, 0.28)',

  // Mint-tinted glass (auth cards)
  glassMintBg:        'rgba(223, 246, 224, 0.10)',
  glassMintBorder:    'rgba(223, 246, 224, 0.20)',

  // Peach-tinted glass (bullets, badges)
  glassPeachBg:       'rgba(255, 194, 133, 0.15)',
  glassPeachBorder:   'rgba(255, 194, 133, 0.40)',

  // Overlays
  overlayDark:        'rgba(26, 4, 4, 0.78)',    // Tab bar, modal backdrop
  overlayMatch:       'rgba(139, 28, 28, 0.94)',  // Match modal overlay

  // Text hierarchy
  textPrimary:        '#DFF6E0',                   // Frosted Mint
  textSecondary:      'rgba(223, 246, 224, 0.72)',
  textMuted:          'rgba(223, 246, 224, 0.45)',
  textPlaceholder:    'rgba(223, 246, 224, 0.30)',
  textOnPeach:        '#C73A3A',                   // Crimson on peach bg
  textWhite:          '#FFFFFF',

  // Semantic
  accent:             '#FFC285',                   // = peach
  accentGlow:         'rgba(255, 194, 133, 0.45)',
  error:              '#FFC285',                   // errors shown in peach
  unreadDot:          '#FFC285',
} as const;


// ─── LinearGradient props (expo-linear-gradient) ───────────────────────────────
// Usage: <LinearGradient colors={Gradients.bg.colors} locations={Gradients.bg.locations} style={...} />

export const Gradients = {
  bg: {
    colors:    ['#C73A3A', '#000000'] as const,
    locations: [0, 0.75]              as const,
    start:     { x: 0, y: 0 }        as const,
    end:       { x: 0, y: 1 }        as const,
  },
} as const;


// ─── Border Radii ──────────────────────────────────────────────────────────────

export const Radii = {
  xs:   8,    // small badges
  sm:   12,   // back buttons, small chips
  md:   14,   // buttons, inputs
  lg:   16,   // menu items, message rows
  xl:   20,   // stat cards
  '2xl': 24,  // main glass cards, swipe cards
  pill: 999,  // fully rounded pills
} as const;


// ─── Spacing ───────────────────────────────────────────────────────────────────

export const Spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
} as const;


// ─── Shadows ───────────────────────────────────────────────────────────────────
// Use with spread operator: <View style={[styles.card, Shadows.md]} />

export const Shadows = {
  sm: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 4  },
    shadowOpacity: 0.18,
    shadowRadius:  8,
    elevation:     4,   // Android
  },
  md: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 8  },
    shadowOpacity: 0.35,
    shadowRadius:  20,
    elevation:     8,
  },
  lg: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.50,
    shadowRadius:  24,
    elevation:     12,
  },
  peach: {
    shadowColor:   '#FFC285',
    shadowOffset:  { width: 0, height: 6  },
    shadowOpacity: 0.45,
    shadowRadius:  18,
    elevation:     6,
  },
  peachMatch: {
    shadowColor:   '#FFC285',
    shadowOffset:  { width: 0, height: 0  },
    shadowOpacity: 0.60,
    shadowRadius:  20,
    elevation:     10,
  },
} as const;


// ─── Typography ────────────────────────────────────────────────────────────────
// Load fonts via expo-google-fonts:
//   import { useFonts, Nunito_400Regular, Nunito_700Bold, ... } from '@expo-google-fonts/nunito';

export const FontFamily = {
  regular:    'Nunito_400Regular',
  medium:     'Nunito_500Medium',
  semibold:   'Nunito_600SemiBold',
  bold:       'Nunito_700Bold',
  extrabold:  'Nunito_800ExtraBold',
  black:      'Nunito_900Black',
} as const;

export const FontSize = {
  xs:   11,
  sm:   12,
  base: 14,
  md:   15,
  lg:   16,
  xl:   20,
  '2xl': 22,
  '3xl': 26,
  '4xl': 34,
  '5xl': 36,
  '6xl': 44,
} as const;

/** Semantic text styles — spread directly into StyleSheet definitions */
export const Typography = {
  hero: {
    fontFamily:     FontFamily.black,
    fontSize:       FontSize['6xl'],
    lineHeight:     FontSize['6xl'] * 1.0,
    letterSpacing:  -1,
    color:          Colors.textPrimary,
  },
  display: {
    fontFamily:     FontFamily.black,
    fontSize:       FontSize['5xl'],
    lineHeight:     FontSize['5xl'] * 1.1,
    letterSpacing:  -1,
    color:          Colors.textPrimary,
  },
  title: {
    fontFamily:     FontFamily.black,
    fontSize:       FontSize['4xl'],
    lineHeight:     FontSize['4xl'] * 1.1,
    letterSpacing:  -0.5,
    color:          Colors.textPrimary,
  },
  heading: {
    fontFamily:     FontFamily.bold,
    fontSize:       FontSize['3xl'],
    lineHeight:     FontSize['3xl'] * 1.2,
    letterSpacing:  -0.5,
    color:          Colors.textPrimary,
  },
  subheading: {
    fontFamily:     FontFamily.bold,
    fontSize:       FontSize.lg,
    lineHeight:     FontSize.lg * 1.3,
    color:          Colors.textPrimary,
  },
  body: {
    fontFamily:     FontFamily.regular,
    fontSize:       FontSize.base,
    lineHeight:     FontSize.base * 1.5,
    color:          Colors.textPrimary,
  },
  bodyMd: {
    fontFamily:     FontFamily.regular,
    fontSize:       FontSize.md,
    lineHeight:     FontSize.md * 1.5,
    color:          Colors.textPrimary,
  },
  label: {
    fontFamily:     FontFamily.extrabold,
    fontSize:       FontSize.xs,
    lineHeight:     FontSize.xs * 1.4,
    letterSpacing:  1,
    color:          Colors.textPrimary,
  },
  caption: {
    fontFamily:     FontFamily.regular,
    fontSize:       FontSize.sm,
    lineHeight:     FontSize.sm * 1.5,
    color:          Colors.textSecondary,
  },
} as const satisfies Record<string, TextStyle>;


// ─── Spring Animation Configs (react-native-reanimated) ────────────────────────
// Usage: withSpring(value, Springs.snappy)

export const Springs = {
  /** Modals, card entries — smooth */
  gentle: { damping: 20, stiffness: 100,  mass: 1.0 },
  /** Buttons, small interactions — quick */
  snappy: { damping: 18, stiffness: 200,  mass: 0.8 },
  /** Card snap-back — very fast */
  fast:   { damping: 15, stiffness: 280,  mass: 0.6 },
  /** Logo drop — playful overshoot */
  bounce: { damping:  8, stiffness: 140,  mass: 1.1 },
} as const;

/** Logo letter stagger delays (ms) */
export const LogoStaggerDelays = [0, 100, 220, 360, 500, 640] as const;


// ─── Press Scale Values ────────────────────────────────────────────────────────

export const PressScale = {
  button:     0.96,   // Primary / ghost buttons
  menuItem:   0.97,   // Menu rows, message rows
  actionBtn:  0.88,   // Swipe like / nope buttons
  enter:      1.02,   // Hover-in hint (rare)
} as const;


// ─── Reusable StyleSheet Blocks ────────────────────────────────────────────────
// Import and spread into your component StyleSheets.

export const DiceStyles = StyleSheet.create({

  // ── Screen root
  screen: {
    flex:            1,
    backgroundColor: Colors.bg,
  },

  // ── Glass card (standard)
  card: {
    backgroundColor: Colors.glassBg,
    borderWidth:     1,
    borderColor:     Colors.glassBorder,
    borderRadius:    Radii['2xl'],
    padding:         Spacing[6],
    // Note: backdrop blur not supported in RN — use @react-native-community/blur
    // or blur overlay for equivalent effect
  },

  // ── Glass card — mint tint (auth screens)
  cardMint: {
    backgroundColor: Colors.glassMintBg,
    borderWidth:     1,
    borderColor:     Colors.glassMintBorder,
    borderRadius:    Radii['2xl'],
    padding:         Spacing[6],
  },

  // ── Buttons

  btnPrimary: {
    backgroundColor: Colors.mint,
    borderRadius:    Radii.md,
    paddingVertical: 15,
    paddingHorizontal: Spacing[6],
    alignItems:      'center',
    justifyContent:  'center',
    width:           '100%',
    ...Shadows.sm,
  },
  btnPrimaryText: {
    fontFamily:    FontFamily.bold,
    fontSize:      FontSize.md,
    color:         Colors.textOnPeach,
    letterSpacing: 0.3,
  },

  btnPeach: {
    backgroundColor: Colors.peach,
    borderRadius:    Radii.md,
    paddingVertical: 15,
    paddingHorizontal: Spacing[6],
    alignItems:      'center',
    justifyContent:  'center',
    width:           '100%',
    ...Shadows.peach,
  },
  btnPeachText: {
    fontFamily:    FontFamily.extrabold,
    fontSize:      FontSize.md,
    color:         Colors.crimson,
    letterSpacing: 0.5,
  },

  btnGhost: {
    backgroundColor: Colors.glassMintBg,
    borderWidth:     1,
    borderColor:     Colors.glassMintBorder,
    borderRadius:    Radii.md,
    paddingVertical: 14,
    paddingHorizontal: Spacing[6],
    alignItems:      'center',
    justifyContent:  'center',
    width:           '100%',
  },
  btnGhostText: {
    fontFamily: FontFamily.semibold,
    fontSize:   FontSize.base,
    color:      Colors.textPrimary,
  },

  btnSocial: {
    backgroundColor:  Colors.glassMintBg,
    borderWidth:      1,
    borderColor:      Colors.glassMintBorder,
    borderRadius:     Radii.md,
    paddingVertical:  12,
    paddingHorizontal: Spacing[5],
    flexDirection:    'row',
    alignItems:       'center',
    justifyContent:   'center',
    gap:              8,
    width:            '100%',
  },
  btnSocialText: {
    fontFamily: FontFamily.semibold,
    fontSize:   FontSize.sm,
    color:      Colors.textPrimary,
  },

  // Swipe action buttons (circle icon)
  btnActionNope: {
    width:           60,
    height:          60,
    borderRadius:    30,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth:     2,
    borderColor:     'rgba(255, 255, 255, 0.50)',
    alignItems:      'center',
    justifyContent:  'center',
  },
  btnActionLike: {
    width:           60,
    height:          60,
    borderRadius:    30,
    backgroundColor: Colors.glassPeachBg,
    borderWidth:     2,
    borderColor:     'rgba(255, 194, 133, 0.60)',
    alignItems:      'center',
    justifyContent:  'center',
  },

  btnSignOut: {
    backgroundColor: 'rgba(255, 194, 133, 0.08)',
    borderWidth:     1,
    borderColor:     'rgba(255, 194, 133, 0.25)',
    borderRadius:    Radii.lg,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems:      'center',
  },
  btnSignOutText: {
    fontFamily:    FontFamily.bold,
    fontSize:      FontSize.sm,
    color:         Colors.peach,
    letterSpacing: 0.3,
  },

  btnTextLink: {
    paddingVertical: 10,
    alignItems:      'center',
  },
  btnTextLinkLabel: {
    fontFamily: FontFamily.semibold,
    fontSize:   FontSize.sm,
    color:      'rgba(255, 255, 255, 0.55)',
  },

  // ── Input field
  input: {
    backgroundColor: Colors.glassMintBg,
    borderWidth:     1.5,
    borderColor:     Colors.glassMintBorder,
    borderRadius:    Radii.md,
    color:           Colors.textPrimary,
    fontFamily:      FontFamily.regular,
    fontSize:        FontSize.md,
    paddingVertical: 15,
    paddingHorizontal: Spacing[4],
    width:           '100%',
  },
  inputFocused: {
    borderColor: Colors.peach,
  },
  inputError: {
    borderColor: 'rgba(255, 194, 133, 0.70)',
  },
  inputErrorMsg: {
    fontFamily:    FontFamily.semibold,
    fontSize:      FontSize.xs,
    color:         Colors.peach,
    marginTop:     4,
    marginLeft:    2,
  },

  // ── Divider with "or"
  dividerRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
  },
  dividerLine: {
    flex:            1,
    height:          1,
    backgroundColor: 'rgba(223, 246, 224, 0.15)',
  },
  dividerLabel: {
    fontFamily:    FontFamily.bold,
    fontSize:      FontSize.xs,
    color:         'rgba(223, 246, 224, 0.40)',
    letterSpacing: 1,
  },

  // ── Tab bar
  tabBar: {
    flexDirection:   'row',
    backgroundColor: Colors.overlayDark,
    borderWidth:     1,
    borderColor:     'rgba(255, 255, 255, 0.10)',
    borderRadius:    28,
    paddingVertical: 10,
    paddingHorizontal: Spacing[4],
    gap:             8,
  },
  tabItem: {
    paddingVertical:   10,
    paddingHorizontal: 18,
    borderRadius:      20,
    alignItems:        'center',
    gap:               4,
  },
  tabItemActive: {
    backgroundColor: 'rgba(255, 194, 133, 0.10)',
  },
  tabLabel: {
    fontFamily: FontFamily.bold,
    fontSize:   FontSize.xs,
    color:      Colors.textMuted,
  },
  tabLabelActive: {
    color: Colors.peach,
  },

  // ── Menu item (profile settings rows)
  menuItem: {
    flexDirection:   'row',
    alignItems:      'center',
    gap:             14,
    backgroundColor: Colors.glassBg,
    borderWidth:     1,
    borderColor:     Colors.glassBorder,
    borderRadius:    Radii.lg,
    padding:         14,
  },
  menuIcon: {
    width:           40,
    height:          40,
    borderRadius:    12,
    backgroundColor: Colors.glassPeachBg,
    borderWidth:     1,
    borderColor:     Colors.glassPeachBorder,
    alignItems:      'center',
    justifyContent:  'center',
  },
  menuTitle: {
    fontFamily: FontFamily.bold,
    fontSize:   FontSize.base,
    color:      Colors.textPrimary,
  },
  menuSub: {
    fontFamily: FontFamily.regular,
    fontSize:   FontSize.xs,
    color:      Colors.textMuted,
    marginTop:  3,
  },
  menuArrow: {
    fontFamily: FontFamily.regular,
    fontSize:   22,
    color:      'rgba(223, 246, 224, 0.30)',
  },

  // ── Stat cards
  statCard: {
    flex:            1,
    backgroundColor: Colors.glassBg,
    borderWidth:     1,
    borderColor:     Colors.glassBorder,
    borderRadius:    Radii.xl,
    padding:         Spacing[4],
  },
  statValue: {
    fontFamily:    FontFamily.black,
    fontSize:      FontSize['4xl'],
    color:         Colors.textPrimary,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily:    FontFamily.bold,
    fontSize:      10,
    color:         Colors.textMuted,
    letterSpacing: 1,
    marginTop:     4,
  },

  // ── Swipe card
  swipeCard: {
    borderRadius:    20,
    overflow:        'hidden',
    backgroundColor: Colors.crimsonDeep,
    ...Shadows.lg,
  },
  swipeCardScrim: {
    position:        'absolute',
    bottom:          0,
    left:            0,
    right:           0,
    height:          120,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    padding:         16,
    justifyContent:  'flex-end',
  },
  swipeCardName: {
    fontFamily:    FontFamily.extrabold,
    fontSize:      FontSize['3xl'],
    color:         Colors.white,
    letterSpacing: -0.3,
  },
  swipeHint: {
    fontFamily:    FontFamily.bold,
    fontSize:      10,
    color:         'rgba(255, 194, 133, 0.85)',
    letterSpacing: 1,
    marginTop:     6,
  },

  // Stamp overlays
  stampLike: {
    position:     'absolute',
    top:          12,
    left:         12,
    borderWidth:  3,
    borderColor:  Colors.peach,
    borderRadius: Radii.xs,
    paddingVertical:   4,
    paddingHorizontal: 8,
    transform:    [{ rotate: '-12deg' }],
  },
  stampNope: {
    position:     'absolute',
    top:          12,
    right:        12,
    borderWidth:  3,
    borderColor:  Colors.mint,
    borderRadius: Radii.xs,
    paddingVertical:   4,
    paddingHorizontal: 8,
    transform:    [{ rotate: '12deg' }],
  },
  stampText: {
    fontFamily:    FontFamily.black,
    fontSize:      FontSize.lg,
    letterSpacing: 2,
    color:         Colors.peach,
  },

  // ── Message row
  messageRow: {
    flexDirection:   'row',
    alignItems:      'center',
    gap:             12,
    backgroundColor: Colors.glassBg,
    borderWidth:     1,
    borderColor:     Colors.glassBorder,
    borderRadius:    Radii.lg,
    padding:         14,
  },
  avatar: {
    width:           48,
    height:          48,
    borderRadius:    24,
    backgroundColor: Colors.glassPeachBg,
    borderWidth:     1,
    borderColor:     Colors.glassPeachBorder,
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatarText: {
    fontFamily: FontFamily.extrabold,
    fontSize:   FontSize.xl,
    color:      Colors.peach,
  },
  unreadDot: {
    width:           9,
    height:          9,
    borderRadius:    5,
    backgroundColor: Colors.peach,
    marginLeft:      'auto',
  },

  // ── Badges / pills
  badgeComingSoon: {
    paddingVertical:   5,
    paddingHorizontal: 12,
    borderRadius:      20,
    borderWidth:       1,
    borderColor:       Colors.glassBorderStrong,
    backgroundColor:   'rgba(255, 255, 255, 0.04)',
  },
  badgeComingSoonText: {
    fontFamily:    FontFamily.extrabold,
    fontSize:      9,
    color:         Colors.textMuted,
    letterSpacing: 1.5,
  },
  badgeUpgrade: {
    paddingVertical:   5,
    paddingHorizontal: 12,
    borderRadius:      20,
    borderWidth:       1,
    borderColor:       Colors.glassPeachBorder,
    backgroundColor:   Colors.glassPeachBg,
  },
  badgeUpgradeText: {
    fontFamily:    FontFamily.extrabold,
    fontSize:      9,
    color:         Colors.peach,
    letterSpacing: 1.5,
  },
  lockBadge: {
    paddingVertical:   2,
    paddingHorizontal: 6,
    borderRadius:      6,
    borderWidth:       1,
    borderColor:       Colors.glassPeachBorder,
    backgroundColor:   Colors.glassPeachBg,
    alignSelf:         'flex-start',
    marginTop:         6,
  },
  lockBadgeText: {
    fontFamily:    FontFamily.black,
    fontSize:      8,
    color:         Colors.peach,
    letterSpacing: 1,
  },
});


// ─── Convenience: placeholderTextColor prop ─────────────────────────────────────
// Usage: <TextInput placeholderTextColor={PlaceholderColor} ... />
export const PlaceholderColor = Colors.textPlaceholder;


// ─── activeOpacity values for TouchableOpacity ──────────────────────────────────
export const ActiveOpacity = {
  button:   0.80,
  menuItem: 0.75,
  subtle:   0.85,
} as const;

// ─── Aliases for screens using old names ─────────────────────────────────────
export const COLORS       = Colors;
export const FONT         = FontFamily;
export const FONTS        = { serif: FontFamily.black, body: FontFamily.regular, family: 'Nunito' };
export const RADIUS       = Radii;
export const SPACE        = Spacing;
export const SPRING       = Springs;
export const SPRING_SNAPPY = Springs.snappy;
export const SPRING_GENTLE = Springs.gentle;
export const SPRING_FAST   = Springs.fast;
export const SPRING_BOUNCE = Springs.bounce;
export const WEB_GRADIENT  = {};
export const shared        = DiceStyles;
