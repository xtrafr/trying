"use client";

/**
 * Contact Section, get in touch form with 3D tilt
 * @author xtra
 * 
 * form card tilts with mouse movement (parallax effect),
 * tilt stops when you're typing so it doesn't distract,
 * discord modal for quick contact
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Script from "next/script";
import { useTheme } from "@/context/ThemeContext";

declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, params: Record<string, string>) => Promise<void>;
    };
    umami?: {
      track: (event: string, data?: Record<string, any>) => void;
    };
  }
}

export default function Contact() {
  const { t } = useTheme();
  const ref = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [discordUsername, setDiscordUsername] = useState("");
  const [discordStatus, setDiscordStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [transform, setTransform] = useState({
    currentRX: 0,
    currentRY: 0,
    targetRX: 0,
    targetRY: 0, // parallax state
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // mouse tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      if (isTyping) return; // don't tilt while typing
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      setTransform((prev) => ({
        ...prev,
        targetRY: deltaX * 5,
        targetRX: -deltaY * 5,
      }));
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // reset to flat
      setTransform((prev) => ({
        ...prev,
        targetRY: 0,
        targetRX: 0,
      }));
    };

    const handleMouseEnter = () => {
      if (!isTyping) { // only tilt if not typing
        setIsHovered(true);
      }
    };

    const lerpFactor = isTyping ? 0.15 : 0.1; // smoother when typing
    let animationFrame: number;

    // animation loop
    const animate = () => {
      setTransform((prev) => {
        const newState = {
          currentRX: prev.currentRX + (prev.targetRX - prev.currentRX) * lerpFactor,
          currentRY: prev.currentRY + (prev.targetRY - prev.currentRY) * lerpFactor,
          targetRX: isTyping ? 0 : prev.targetRX, // force flat when typing
          targetRY: isTyping ? 0 : prev.targetRY,
        };

        if (card) {
          card.style.transform = `perspective(1000px) rotateY(${newState.currentRY}deg) rotateX(${newState.currentRX}deg)`;
        }

        return newState;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);
    animate();

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, [isTyping]);

  const handleDiscordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDiscordStatus("submitting");
    
    try {
      if (typeof window !== 'undefined' && window.emailjs) {
        await window.emailjs.send("service_j6pvx11", "template_mlaydof", {
          discord_username: discordUsername,
          message: `New contact request from Discord user: ${discordUsername}`,
        });
      }
      
      setDiscordStatus("success");
      
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('Discord Contact', {
          username: discordUsername,
        });
      }
      
      setTimeout(() => {
        window.open("https://discord.gg/sMjPPaKk", "_blank");
      }, 500);
      
      setTimeout(() => {
        setShowDiscordModal(false);
        setDiscordUsername("");
        setDiscordStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Failed to send Discord contact", error);
      setDiscordStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-bg px-6 py-20 md:py-32"
    >
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.emailjs) {
            window.emailjs.init("ew4sdnAetu5sy1faq");
          }
        }}
      />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 15%, transparent) 0%, color-mix(in srgb, var(--accent-color) 5%, transparent) 100%)`,
              border: `1px solid color-mix(in srgb, var(--accent-color) 30%, transparent)`,
              boxShadow: `0 0 30px color-mix(in srgb, var(--accent-color) 20%, transparent), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            }}
          >
            <span className="relative flex h-3 w-3">
              <span 
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: 'var(--accent-color)' }}
              />
              <span 
                className="relative inline-flex h-3 w-3 rounded-full shadow-lg"
                style={{ 
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: `0 4px 12px color-mix(in srgb, var(--accent-color) 50%, transparent)`,
                }}
              />
            </span>
            <span 
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: 'var(--accent-color)' }}
            >
              {t.contact.availableForWork}
            </span>
          </motion.div>

          <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            {t.contact.letsTalk}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary/70 max-w-2xl mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </motion.div>

        <div
          ref={cardRef}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              boxShadow: isHovered
                ? `0 0 80px color-mix(in srgb, var(--accent-color) 40%, transparent), 0 0 120px color-mix(in srgb, var(--accent-color) 20%, transparent), 0 20px 60px 0 rgba(0, 0, 0, 0.5), inset 0 2px 2px 0 rgba(255, 255, 255, 0.12)`
                : '0 12px 48px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              boxShadow: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(80px) saturate(220%) brightness(1.15)',
              WebkitBackdropFilter: 'blur(80px) saturate(220%) brightness(1.15)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-30">
              <div 
                className="absolute inset-0 bg-gradient-to-br via-transparent animate-pulse"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, color-mix(in srgb, var(--accent-color) 20%, transparent), transparent, color-mix(in srgb, var(--accent-color) 20%, transparent))`,
                }}
              />
            </div>

            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-text/80 mb-2">
                      {t.contact.fullName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-5 py-4 rounded-xl text-text font-medium transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(40px)',
                      }}
                      onFocus={(e) => {
                        setIsTyping(true);
                        e.target.style.borderColor = `color-mix(in srgb, var(--accent-color) 50%, transparent)`;
                        e.target.style.boxShadow = `0 0 20px color-mix(in srgb, var(--accent-color) 20%, transparent)`;
                      }}
                      onBlur={(e) => {
                        setIsTyping(false);
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder={t.contact.fullNamePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text/80 mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-5 py-4 rounded-xl text-text font-medium transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(40px)',
                      }}
                      onFocus={(e) => {
                        setIsTyping(true);
                        e.target.style.borderColor = `color-mix(in srgb, var(--accent-color) 50%, transparent)`;
                        e.target.style.boxShadow = `0 0 20px color-mix(in srgb, var(--accent-color) 20%, transparent)`;
                      }}
                      onBlur={(e) => {
                        setIsTyping(false);
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-text/80 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl text-text font-medium transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(40px)',
                    }}
                    onFocus={(e) => {
                      setIsTyping(true);
                      e.target.style.borderColor = `color-mix(in srgb, var(--accent-color) 50%, transparent)`;
                      e.target.style.boxShadow = `0 0 20px color-mix(in srgb, var(--accent-color) 20%, transparent)`;
                    }}
                    onBlur={(e) => {
                      setIsTyping(false);
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || status === "success"}
                  className="w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: status === "success" 
                      ? `var(--accent-color)`
                      : `var(--accent-color)`,
                    color: '#ffffff',
                    boxShadow: `0 8px 32px color-mix(in srgb, var(--accent-color) 40%, transparent), inset 0 1px 2px rgba(255, 255, 255, 0.2)`,
                  }}
                  whileHover={!isSubmitting && status !== "success" ? { 
                    scale: 1.02,
                    boxShadow: `0 12px 48px color-mix(in srgb, var(--accent-color) 60%, transparent), inset 0 1px 2px rgba(255, 255, 255, 0.3)`,
                  } : {}}
                  whileTap={!isSubmitting && status !== "success" ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t.contact.sending}
                    </span>
                  ) : status === "success" ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t.contact.messageSent}
                    </span>
                  ) : (
                    t.contact.sendMessage
                  )}
                </motion.button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-center gap-6">
                <p className="text-text-secondary/60 text-sm">{t.contact.or} {t.contact.preferQuickChat}</p>
                <button
                  onClick={() => setShowDiscordModal(true)}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    background: 'rgba(88, 101, 242, 0.1)',
                    border: '1px solid rgba(88, 101, 242, 0.3)',
                    color: '#5865F2',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(88, 101, 242, 0.2)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(88, 101, 242, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(88, 101, 242, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  {t.contact.joinDiscordServer}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Discord Modal */}
        {showDiscordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setShowDiscordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md p-6 md:p-8 rounded-3xl mx-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(88, 101, 242, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDiscordModal(false)}
                className="absolute top-4 right-4 text-text/50 hover:text-text transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-4"
                  style={{
                    background: 'rgba(88, 101, 242, 0.2)',
                    border: '1px solid rgba(88, 101, 242, 0.4)',
                  }}
                >
                  <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="#5865F2">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-text mb-2">{t.contact.letsConnect}</h3>
                <p className="text-sm md:text-base text-text-secondary/70">{t.contact.discordPlaceholder}</p>
              </div>

              <form onSubmit={handleDiscordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="discord" className="block text-sm font-semibold text-text/80 mb-2">
                    {t.contact.discordUsername}
                  </label>
                  <input
                    type="text"
                    id="discord"
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    required
                    placeholder="username#0000"
                    className="w-full px-5 py-4 rounded-xl text-text font-medium transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(40px)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(88, 101, 242, 0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(88, 101, 242, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={discordStatus !== "idle"}
                  className="w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300"
                  style={{
                    background: discordStatus === "success" 
                      ? `linear-gradient(135deg, var(--accent-color) 0%, color-mix(in srgb, var(--accent-color) 80%, #000000) 100%)`
                      : 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                    color: '#ffffff',
                    boxShadow: discordStatus === "success"
                      ? `0 8px 32px color-mix(in srgb, var(--accent-color) 40%, transparent)`
                      : '0 8px 32px rgba(88, 101, 242, 0.4)',
                  }}
                  whileHover={discordStatus === "idle" ? { 
                    scale: 1.02,
                    boxShadow: '0 12px 48px rgba(88, 101, 242, 0.6)',
                  } : {}}
                  whileTap={discordStatus === "idle" ? { scale: 0.98 } : {}}
                >
                  {discordStatus === "submitting" ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t.contact.sending}
                    </span>
                  ) : discordStatus === "success" ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t.contact.connecting}
                    </span>
                  ) : (
                    t.contact.send
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
