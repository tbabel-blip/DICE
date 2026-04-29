import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const SUPABASE_URL = 'https://yludhqzqmjasgjbgctms.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdWRocXpxbWphc2dqYmdjdG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3ODI0MzIsImV4cCI6MjA5MTM1ODQzMn0.GhWRebOuD24xEd3creTK-DF3OfQ5lSOEgDOW7Cmk8Vs';

// Use AsyncStorage on native, localStorage on web (guard against SSR)
const getStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem:    (key: string) => Promise.resolve(typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null),
      setItem:    (key: string, value: string) => Promise.resolve(typeof localStorage !== 'undefined' ? localStorage.setItem(key, value) : undefined),
      removeItem: (key: string) => Promise.resolve(typeof localStorage !== 'undefined' ? localStorage.removeItem(key) : undefined),
    };
  }
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  return AsyncStorage;
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage:            getStorage(),
    autoRefreshToken:   true,
    persistSession:     true,
    detectSessionInUrl: false,
  },
});
