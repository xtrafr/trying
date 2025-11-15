"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, Translations, translations } from "@/lib/translations";

type Theme = "dark" | "light";

interface AccentColor {
  name: string;
  value: string;
  gradient: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const accentColors = [
  { name: "Green", value: "#0db76b", gradient: "from-green-500 to-emerald-500" },
  { name: "Blue", value: "#3b82f6", gradient: "from-blue-500 to-cyan-500" },
  { name: "Purple", value: "#a855f7", gradient: "from-purple-500 to-pink-500" },
  { name: "Orange", value: "#f97316", gradient: "from-orange-500 to-red-500" },
  { name: "Red", value: "#ef4444", gradient: "from-red-500 to-rose-500" },
  { name: "Cyan", value: "#06b6d4", gradient: "from-cyan-500 to-teal-500" },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<Theme>("dark");
  const [accentColor, setAccentColor] = useState<AccentColor>(accentColors[0]);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedAccentColor = localStorage.getItem("accentColor");
    const savedLanguage = localStorage.getItem("language") as Language;

    if (savedAccentColor) {
      const color = accentColors.find((c) => c.value === savedAccentColor);
      if (color) {
        setAccentColor(color);
      }
    }

    if (savedLanguage && ["en", "es", "fr", "de"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("accentColor", accentColor.value);
    document.documentElement.style.setProperty("--accent-color", accentColor.value);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = translations[language];

  return (
    <ThemeContext.Provider value={{ theme, setTheme: () => {}, accentColor, setAccentColor, language, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
