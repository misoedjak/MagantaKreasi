"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "id" | "en";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  setLang: () => {},
  toggleLang: () => {},
});

const STORAGE_KEY = "maganta_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("id");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "id") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // Ignore storage access issues
    }
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // Ignore storage access issues
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "id" ? "en" : "id");
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
