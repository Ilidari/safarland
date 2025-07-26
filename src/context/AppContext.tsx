"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { translations, LanguageCode } from '@/lib/translations';

type User = {
  name: string;
  email: string;
};

type Theme = 'light' | 'dark';

type AppContextType = {
  language: LanguageCode;
  isRTL: boolean;
  changeLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  theme: Theme;
  toggleTheme: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('fa');
  const [isRTL, setIsRTL] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem('language') as LanguageCode | null;
    if (storedLang) {
      changeLanguage(storedLang);
    } else {
      changeLanguage('fa');
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        setTheme(storedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    }
  }, [isMounted]);

  const changeLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    setIsRTL(['fa', 'ar'].includes(lang));
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations[LanguageCode]];
    if (translation) return translation;

    const fallbackTranslation = translations.en[key as keyof typeof translations['en']];
    return fallbackTranslation || key;
  };

  const signIn = (userData: User) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };
  
  const fontClass = isRTL ? 'font-vazir' : 'font-body';

  useEffect(() => {
    if (isMounted) {
        document.documentElement.lang = language;
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.className = theme;
        document.body.className = `${fontClass} antialiased`;
    }
  }, [language, isRTL, theme, fontClass, isMounted]);

  const value = { language, changeLanguage, t, isRTL, user, signIn, signOut, theme, toggleTheme };

  if (!isMounted) {
    return null;
  }

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  );
};
