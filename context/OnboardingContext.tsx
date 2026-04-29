import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export type OnboardingData = {
  name:        string;
  dob:         string;       // 'YYYY-MM-DD'
  gender:      string;       // 'Man' | 'Woman' | 'Non-binary' | 'Other'
  photos:      string[];     // URLs after upload (empty for now)
  prompts:     { q: string; a: string }[];
  showMe:      string[];     // ['Women'] etc
  ageMin:      number;
  ageMax:      number;
  distance:    string;       // '25 km' etc
};

type OnboardingContextType = {
  data: OnboardingData;
  setField: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  save: () => Promise<{ error: string | null }>;
  saving: boolean;
};

// ─── Default values ───────────────────────────────────────────────────────────

const DEFAULTS: OnboardingData = {
  name:     '',
  dob:      '',
  gender:   '',
  photos:   [],
  prompts:  [],
  showMe:   [],
  ageMin:   18,
  ageMax:   32,
  distance: '25 km',
};

// ─── Context ──────────────────────────────────────────────────────────────────

const OnboardingContext = createContext<OnboardingContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [data, setData]     = useState<OnboardingData>(DEFAULTS);
  const [saving, setSaving] = useState(false);

  const setField = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  // ── Save all onboarding data to Supabase users table
  const save = async (): Promise<{ error: string | null }> => {
    if (!user) return { error: 'Not logged in' };

    setSaving(true);

    // Build pref_flags bitmask from preferences
    // bits 37-43 = pref_min_age - 18, bits 44-50 = pref_max_age - 18
    // bits 33-36 = gender preference one-hot (1=Man, 2=Woman, 4=Non-binary, 8=Other)
    const genderBit: Record<string, number> = {
      'Men': 1, 'Women': 2, 'Non-binary': 4, 'Other': 8,
    };
    let prefGenderBits = 0;
    data.showMe.forEach(g => { prefGenderBits |= (genderBit[g] ?? 0); });

    const minAgeOffset = Math.max(0, data.ageMin - 18);
    const maxAgeOffset = Math.max(0, data.ageMax - 18);

    const prefFlags =
      BigInt(prefGenderBits) << 33n |
      BigInt(minAgeOffset)   << 37n |
      BigInt(maxAgeOffset)   << 44n;

    // lifestyle_flags bit 31 = active user flag
    const lifestyleFlags = 1n << 31n;

    // pref_max_distance in miles from km string
    const distKm = parseInt(data.distance.replace(/[^0-9]/g, '')) || 25;
    const distMiles = Math.round(distKm * 0.621371);

    const { error } = await supabase
      .from('users')
      .update({
        name:              data.name,
        dob:               data.dob,
        bio:               '',
        photos:            data.photos,
        prompts:           data.prompts,
        pref_flags:        prefFlags.toString(),
        lifestyle_flags:   lifestyleFlags.toString(),
        pref_min_age:      data.ageMin,
        pref_max_age:      data.ageMax,
        pref_max_distance: distMiles,
      })
      .eq('id', user.id);

    setSaving(false);

    if (error) return { error: error.message };
    return { error: null };
  };

  return (
    <OnboardingContext.Provider value={{ data, setField, save, saving }}>
      {children}
    </OnboardingContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used inside <OnboardingProvider>');
  return ctx;
}
