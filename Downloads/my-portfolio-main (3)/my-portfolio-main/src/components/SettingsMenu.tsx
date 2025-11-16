"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Language } from "@/lib/translations";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export default function SettingsMenu() {
  const { accentColor, setAccentColor, language, setLanguage, t } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"color" | "language">("color");
  const [showSettings, setShowSettings] = useState(false); // wait for preloader
  const menuRef = useRef<HTMLDivElement>(null);

  // show settings button after preloader (1.8s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSettings(true);
    }, 2000); // slightly after preloader ends

    return () => clearTimeout(timer);
  }, []);

  const accentColors = [
    { name: "Green", value: "#0db76b", gradient: "from-green-500 to-emerald-500" },
    { name: "Blue", value: "#3b82f6", gradient: "from-blue-500 to-cyan-500" },
    { name: "Purple", value: "#a855f7", gradient: "from-purple-500 to-pink-500" },
    { name: "Orange", value: "#f97316", gradient: "from-orange-500 to-red-500" },
    { name: "Red", value: "#ef4444", gradient: "from-red-500 to-rose-500" },
    { name: "Cyan", value: "#06b6d4", gradient: "from-cyan-500 to-teal-500" },
    { name: "Pink", value: "#ec4899", gradient: "from-pink-500 to-rose-500" },
    { name: "Teal", value: "#14b8a6", gradient: "from-teal-500 to-cyan-500" },
    { name: "Amber", value: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
    { name: "Lime", value: "#84cc16", gradient: "from-lime-500 to-green-500" },
    { name: "Indigo", value: "#6366f1", gradient: "from-indigo-500 to-purple-500" },
    { name: "Rose", value: "#f43f5e", gradient: "from-rose-500 to-pink-500" },
  ];


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleColorSelect = (color: typeof accentColors[0]) => {
    setAccentColor(color);
  };


  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleResetToDefault = () => {
    const defaultColor = accentColors[0];
    setAccentColor(defaultColor);
    setLanguage("en");
  };

  return (
    <>
      {showSettings && ( // only show after preloader
      <motion.div
        ref={menuRef}
        className="fixed bottom-8 right-8 z-[9999]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-4 rounded-[22px] shadow-2xl group"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
            backdropFilter: 'blur(80px) saturate(180%) brightness(1.2)',
            WebkitBackdropFilter: 'blur(80px) saturate(180%) brightness(1.2)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.15)`,
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.svg
            className="w-6 h-6"
            style={{ color: 'var(--accent-color)', filter: 'drop-shadow(0 2px 8px color-mix(in srgb, var(--accent-color) 40%, transparent))' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </motion.svg>
          
          {/* Subtle glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, color-mix(in srgb, var(--accent-color) 15%, transparent) 0%, transparent 70%)`,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute bottom-20 right-0 w-[320px] max-h-[calc(100vh-140px)] overflow-y-auto rounded-[24px] shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(18, 18, 20, 0.96) 0%, rgba(12, 12, 14, 0.94) 100%)',
                backdropFilter: 'blur(80px) saturate(180%) brightness(1.12)',
                WebkitBackdropFilter: 'blur(80px) saturate(180%) brightness(1.12)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 0 0.5px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Header section */}
              <div 
                className="px-5 py-4 border-b sticky top-0 z-10"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[17px] font-semibold text-text tracking-[-0.01em]">Settings</h3>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Content section */}
              <div className="p-4">

                <div 
                  className="flex gap-1 mb-4 p-1 rounded-[14px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <motion.button
                    onClick={() => setActiveTab("color")}
                    className="flex-1 py-2 px-3 rounded-[11px] font-medium text-xs relative overflow-hidden transition-all"
                    whileHover={{ scale: activeTab === "color" ? 1 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeTab === "color" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-[11px]"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.07) 100%)',
                          border: '0.5px solid rgba(255, 255, 255, 0.15)',
                          boxShadow: `0 2px 8px color-mix(in srgb, var(--accent-color) 20%, rgba(0, 0, 0, 0.3)), inset 0 0.5px 1px rgba(255, 255, 255, 0.15)`,
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10" style={{ color: activeTab === "color" ? 'var(--accent-color)' : 'rgb(var(--text-secondary))', textShadow: activeTab === "color" ? '0 1px 4px color-mix(in srgb, var(--accent-color) 25%, transparent)' : 'none', fontWeight: activeTab === "color" ? 600 : 500 }}>
                      Colors
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => setActiveTab("language")}
                    className="flex-1 py-2 px-3 rounded-[11px] font-semibold text-[12px] relative overflow-hidden transition-all"
                    whileHover={{ scale: activeTab === "language" ? 1 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeTab === "language" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-[11px]"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.07) 100%)',
                          border: '0.5px solid rgba(255, 255, 255, 0.15)',
                          boxShadow: `0 2px 8px color-mix(in srgb, var(--accent-color) 20%, rgba(0, 0, 0, 0.3)), inset 0 0.5px 1px rgba(255, 255, 255, 0.15)`,
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10" style={{ color: activeTab === "language" ? 'var(--accent-color)' : 'rgb(var(--text-secondary))', textShadow: activeTab === "language" ? '0 1px 4px color-mix(in srgb, var(--accent-color) 25%, transparent)' : 'none', fontWeight: activeTab === "language" ? 600 : 500 }}>
                      Language
                    </span>
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "color" && (
                    <motion.div
                      key="color"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-4 gap-2.5">
                        {accentColors.map((color) => (
                          <motion.button
                            key={color.value}
                            onClick={() => handleColorSelect(color)}
                            className="group relative aspect-square rounded-[14px] overflow-hidden"
                            style={{
                              background: color.value,
                              border: accentColor.value === color.value 
                                ? `2.5px solid rgba(255, 255, 255, 0.5)`
                                : '1.5px solid rgba(255, 255, 255, 0.15)',
                              boxShadow: accentColor.value === color.value 
                                ? `0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 0 5px ${color.value}, 0 6px 20px color-mix(in srgb, ${color.value} 60%, rgba(0, 0, 0, 0.5)), inset 0 1px 2px rgba(255, 255, 255, 0.3)`
                                : '0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
                            }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            {/* Glossy effect */}
                            <div 
                              className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                              }}
                            />
                            
                            {/* Selected checkmark */}
                            <AnimatePresence>
                              {accentColor.value === color.value && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                  className="absolute inset-0 flex items-center justify-center z-10"
                                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                >
                                  <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Color name tooltip on hover */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap pointer-events-none"
                              style={{
                                background: 'rgba(0, 0, 0, 0.9)',
                                color: 'white',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                              }}
                            >
                              {color.name}
                            </motion.div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "language" && (
                    <motion.div
                      key="language"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-1.5">
                        {languages.map((lang) => (
                          <motion.button
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang.code)}
                            className="w-full py-2.5 px-3 rounded-[12px] font-semibold transition-all relative overflow-hidden group"
                            style={{
                              background: language === lang.code 
                                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                              border: language === lang.code 
                                ? `1.5px solid color-mix(in srgb, var(--accent-color) 50%, rgba(255, 255, 255, 0.15))`
                                : '1px solid rgba(255, 255, 255, 0.06)',
                              boxShadow: language === lang.code 
                                ? `0 2px 8px color-mix(in srgb, var(--accent-color) 25%, rgba(0, 0, 0, 0.3)), inset 0 0.5px 1px rgba(255, 255, 255, 0.12)`
                                : '0 0.5px 2px rgba(0, 0, 0, 0.15), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.04)',
                            }}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                          >
                            <span className="relative z-10 flex items-center justify-between">
                              <span className="flex items-center gap-2.5">
                                <span className="text-base">{lang.flag}</span>
                                <span 
                                  className="text-[13px] font-semibold"
                                  style={{ 
                                    color: language === lang.code ? 'var(--accent-color)' : 'rgb(var(--text-primary))',
                                    textShadow: language === lang.code ? '0 1px 4px color-mix(in srgb, var(--accent-color) 25%, transparent)' : 'none',
                                    fontWeight: language === lang.code ? 600 : 500
                                  }}
                                >
                                  {lang.name}
                                </span>
                              </span>
                              <AnimatePresence>
                                {language === lang.code && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                  >
                                    <svg
                                      className="w-3.5 h-3.5"
                                      style={{ color: 'var(--accent-color)' }}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Reset to Default button */}
              <div className="px-4 pb-4 pt-2">
                <motion.button
                  onClick={handleResetToDefault}
                  className="w-full py-2.5 px-3 rounded-[12px] font-semibold transition-all relative overflow-hidden group text-[12px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2), inset 0 0.5px 1px rgba(255, 255, 255, 0.08)',
                  }}
                  whileHover={{ scale: 1.005, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                  whileTap={{ scale: 0.995 }}
                >
                  <span className="relative z-10 text-text-secondary">Reset to Default</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      )} {/* end showSettings conditional */}
    </>
  );
}
