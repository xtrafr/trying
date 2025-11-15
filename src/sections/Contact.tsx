"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Script from "next/script";

type ContactMethod = "discord" | "form";

export default function Contact() {
  const ref = useRef(null);
  const discordCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const discordButtonRef = useRef<HTMLDivElement>(null);
  const formButtonRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod | null>(null);
  const [discordUsername, setDiscordUsername] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  
  const [discordHovered, setDiscordHovered] = useState(false);
  const [formHovered, setFormHovered] = useState(false);
  const [discordButtonHovered, setDiscordButtonHovered] = useState(false);
  const [formButtonHovered, setFormButtonHovered] = useState(false);
  const [discordTransform, setDiscordTransform] = useState({
    currentRX: 0,
    currentRY: 0,
    targetRX: 0,
    targetRY: 0,
  });
  const [formTransform, setFormTransform] = useState({
    currentRX: 0,
    currentRY: 0,
    targetRX: 0,
    targetRY: 0,
  });
  const [discordButtonTransform, setDiscordButtonTransform] = useState({
    currentRX: 0,
    currentRY: 0,
    targetRX: 0,
    targetRY: 0,
  });
  const [formButtonTransform, setFormButtonTransform] = useState({
    currentRX: 0,
    currentRY: 0,
    targetRX: 0,
    targetRY: 0,
  });

  useEffect(() => {
    const discordCard = discordCardRef.current;
    const formCard = formCardRef.current;
    const discordButton = discordButtonRef.current;
    const formButton = formButtonRef.current;

    const setupParallax = (
      card: HTMLDivElement,
      setTransform: React.Dispatch<React.SetStateAction<{
        currentRX: number;
        currentRY: number;
        targetRX: number;
        targetRY: number;
      }>>,
      setHovered: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        setTransform((prev) => ({
          ...prev,
          targetRY: deltaX * 6,
          targetRX: -deltaY * 6,
        }));
      };

      const handleMouseLeave = () => {
        setHovered(false);
        setTransform((prev) => ({
          ...prev,
          targetRY: 0,
          targetRX: 0,
        }));
      };

      const handleMouseEnter = () => {
        setHovered(true);
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
      card.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
        card.removeEventListener("mouseenter", handleMouseEnter);
      };
    };

    let cleanupDiscord: (() => void) | undefined;
    let cleanupForm: (() => void) | undefined;
    let cleanupDiscordButton: (() => void) | undefined;
    let cleanupFormButton: (() => void) | undefined;

    if (discordCard) {
      cleanupDiscord = setupParallax(discordCard, setDiscordTransform, setDiscordHovered);
    }
    if (formCard) {
      cleanupForm = setupParallax(formCard, setFormTransform, setFormHovered);
    }
    if (discordButton) {
      cleanupDiscordButton = setupParallax(discordButton, setDiscordButtonTransform, setDiscordButtonHovered);
    }
    if (formButton) {
      cleanupFormButton = setupParallax(formButton, setFormButtonTransform, setFormButtonHovered);
    }

    return () => {
      if (cleanupDiscord) cleanupDiscord();
      if (cleanupForm) cleanupForm();
      if (cleanupDiscordButton) cleanupDiscordButton();
      if (cleanupFormButton) cleanupFormButton();
    };
  }, [selectedMethod]);

  useEffect(() => {
    const discordCard = discordCardRef.current;
    const formCard = formCardRef.current;
    const discordButton = discordButtonRef.current;
    const formButton = formButtonRef.current;

    const lerpFactor = 0.15;
    let animationFrame: number;

    const animate = () => {
      setDiscordTransform((prev) => {
        const newState = {
          currentRX: prev.currentRX + (prev.targetRX - prev.currentRX) * lerpFactor,
          currentRY: prev.currentRY + (prev.targetRY - prev.currentRY) * lerpFactor,
          targetRX: prev.targetRX,
          targetRY: prev.targetRY,
        };

        if (discordCard) {
          discordCard.style.transform = `perspective(1000px) rotateY(${newState.currentRY}deg) rotateX(${newState.currentRX}deg)`;
        }

        return newState;
      });

      setFormTransform((prev) => {
        const newState = {
          currentRX: prev.currentRX + (prev.targetRX - prev.currentRX) * lerpFactor,
          currentRY: prev.currentRY + (prev.targetRY - prev.currentRY) * lerpFactor,
          targetRX: prev.targetRX,
          targetRY: prev.targetRY,
        };

        if (formCard) {
          formCard.style.transform = `perspective(1000px) rotateY(${newState.currentRY}deg) rotateX(${newState.currentRX}deg)`;
        }

        return newState;
      });

      setDiscordButtonTransform((prev) => {
        const newState = {
          currentRX: prev.currentRX + (prev.targetRX - prev.currentRX) * lerpFactor,
          currentRY: prev.currentRY + (prev.targetRY - prev.currentRY) * lerpFactor,
          targetRX: prev.targetRX,
          targetRY: prev.targetRY,
        };

        if (discordButton) {
          discordButton.style.transform = `perspective(1000px) rotateY(${newState.currentRY}deg) rotateX(${newState.currentRX}deg)`;
        }

        return newState;
      });

      setFormButtonTransform((prev) => {
        const newState = {
          currentRX: prev.currentRX + (prev.targetRX - prev.currentRX) * lerpFactor,
          currentRY: prev.currentRY + (prev.targetRY - prev.currentRY) * lerpFactor,
          targetRX: prev.targetRX,
          targetRY: prev.targetRY,
        };

        if (formButton) {
          formButton.style.transform = `perspective(1000px) rotateY(${newState.currentRY}deg) rotateX(${newState.currentRX}deg)`;
        }

        return newState;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleDiscordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!discordUsername.trim()) {
      setMessage("Please enter your Discord username");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // @ts-ignore - Track contact form submission
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('Contact Form Submit', {
          username: discordUsername,
        });
      }

      // @ts-ignore - EmailJS is loaded via script
      await window.emailjs.send("service_j6pvx11", "template_mlaydof", {
        discord_username: discordUsername,
        message: `New contact request from Discord user: ${discordUsername}`,
      });
      
      setMessage("Sent! Opening Discord...");
      
      // @ts-ignore - Track successful contact
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('Contact Success', {
          username: discordUsername,
        });
      }
      
      setTimeout(() => {
        window.open("https://discord.gg/sMjPPaKk", "_blank");
        setDiscordUsername("");
        setMessage("");
      }, 1000);
    } catch (error) {
      console.error("Failed to send:", error);
      setMessage("Failed to send. Please try again.");
      
      // @ts-ignore - Track contact error
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('Contact Error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setMessage("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // @ts-ignore - Track form submission
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('Contact Form Submit', {
          method: 'email',
          name: formData.name,
        });
      }

      // @ts-ignore - EmailJS is loaded via script
      await window.emailjs.send("service_j6pvx11", "template_twbdofq", {
        name: formData.name,
        email: formData.email,
        time: new Date().toLocaleString(),
        message: formData.message,
      });
      
      setMessage("Sent! I'll get back to you soon.");
      
      // @ts-ignore - Track successful contact
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('Contact Success', {
          method: 'email',
        });
      }
      
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setMessage("");
        setSelectedMethod(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to send:", error);
      setMessage("Failed to send. Please try again.");
      
      // @ts-ignore - Track contact error
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('Contact Error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        onLoad={() => {
          // @ts-ignore
          window.emailjs.init("ew4sdnAetu5sy1faq");
        }}
      />
      <section
        id="contact"
        ref={ref}
        className="relative overflow-hidden bg-bg-secondary px-4 sm:px-6 py-16 sm:py-20 md:py-32"
      >
        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12 text-center"
          >
            <h2 className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Let&apos;s Talk
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto px-4 sm:px-0"
          >
            <AnimatePresence mode="wait">
              {!selectedMethod ? (
                <motion.div
                  key="method-selection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                >
                  <div
                    ref={discordButtonRef}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.button
                      onClick={() => setSelectedMethod("discord")}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        boxShadow: discordButtonHovered
                          ? "0 0 50px rgba(88, 101, 242, 0.3), 0 0 100px rgba(88, 101, 242, 0.15)"
                          : "0 0 0 rgba(0,0,0,0)"
                      }}
                      transition={{ 
                        boxShadow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                      }}
                      className="w-full group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-tertiary p-8 hover:border-[#5865F2]/30 transition-all duration-500"
                    >
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-[#5865F2]/10 p-3 flex items-center justify-center group-hover:bg-[#5865F2]/15 transition-all duration-500">
                        <Image
                          src="/discord.svg"
                          alt="Discord"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-text mb-2">Discord</h3>
                        <p className="text-sm text-text-secondary/60">Quick chat via Discord</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </motion.button>
                  </div>

                  <div
                    ref={formButtonRef}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.button
                      onClick={() => setSelectedMethod("form")}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        boxShadow: formButtonHovered
                          ? "0 0 50px rgba(13, 183, 107, 0.3), 0 0 100px rgba(13, 183, 107, 0.15)"
                          : "0 0 0 rgba(0,0,0,0)"
                      }}
                      transition={{ 
                        boxShadow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                      }}
                      className="w-full group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-tertiary p-8 hover:border-green/30 transition-all duration-500"
                    >
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-green/10 p-3 flex items-center justify-center group-hover:bg-green/15 transition-all duration-500">
                        <svg className="w-8 h-8 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-text mb-2">Email Form</h3>
                        <p className="text-sm text-text-secondary/60">Send me a detailed message</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </motion.button>
                  </div>
                </motion.div>
              ) : selectedMethod === "discord" ? (
                <motion.div
                  key="discord-form"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    ref={discordCardRef}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.form
                      onSubmit={handleDiscordSubmit}
                      animate={{ 
                        boxShadow: discordHovered 
                          ? "0 0 50px rgba(88, 101, 242, 0.4), 0 0 100px rgba(88, 101, 242, 0.25)"
                          : "0 0 0 rgba(0,0,0,0)"
                      }}
                      transition={{ 
                        boxShadow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-secondary p-6 sm:p-8 hover:border-[#5865F2]/30 transition-all duration-500"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedMethod(null);
                        }}
                        className="absolute top-4 right-4 z-50 text-text-secondary/60 hover:text-text transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="relative z-10 space-y-5 sm:space-y-6">
                        <motion.div 
                          className="flex justify-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#5865F2]/10 p-3 transition-colors duration-300 group-hover:bg-[#5865F2]/15">
                            <Image
                              src="/discord.svg"
                              alt="Discord icon"
                              width={32}
                              height={32}
                              className="object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </motion.div>

                        <div className="text-center space-y-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-text">Discord Contact</h3>
                          <p className="text-xs sm:text-sm text-text-secondary/60">Enter your Discord username</p>
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            value={discordUsername}
                            onChange={(e) => setDiscordUsername(e.target.value)}
                            placeholder="username#1234"
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-bg-secondary border border-white/[0.08] text-sm sm:text-base text-text placeholder:text-text-secondary/40 focus:outline-none focus:border-[#5865F2]/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        {message && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm sm:text-base font-medium shadow-lg ${
                              message.includes("Failed") || message.includes("Please")
                                ? "bg-red-500/10 border border-red-500/30 text-red-400"
                                : "bg-green/10 border border-green/30 text-green"
                            }`}
                          >
                            {message.includes("Failed") || message.includes("Please") ? (
                              <motion.svg 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </motion.svg>
                            ) : (
                              <motion.svg 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.05 }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </motion.svg>
                            )}
                            <span>{message}</span>
                          </motion.div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-6 py-3 sm:py-3.5 rounded-lg bg-[#5865F2] text-sm sm:text-base font-medium text-white transition-all duration-300 hover:bg-[#7289DA] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <motion.div className="flex gap-1">
                                  {[0, 1, 2].map((i) => (
                                    <motion.div
                                      key={i}
                                      className="h-1.5 w-1.5 rounded-full bg-white"
                                      animate={{
                                        opacity: [0.3, 1, 0.3],
                                      }}
                                      transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                      }}
                                    />
                                  ))}
                                </motion.div>
                                <span>Sending</span>
                              </>
                            ) : (
                              <>
                                <span>Send & Open Discord</span>
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </motion.form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    ref={formCardRef}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.form
                      onSubmit={handleFormSubmit}
                      animate={{ 
                        boxShadow: formHovered 
                          ? "0 0 50px rgba(13, 183, 107, 0.4), 0 0 100px rgba(13, 183, 107, 0.25)"
                          : "0 0 0 rgba(0,0,0,0)"
                      }}
                      transition={{ 
                        boxShadow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-secondary p-6 sm:p-8 hover:border-green/30 transition-all duration-500"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedMethod(null);
                        }}
                        className="absolute top-4 right-4 z-50 text-text-secondary/60 hover:text-text transition-colors"
                      >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="relative z-10 space-y-5 sm:space-y-6">
                      <div className="flex justify-center">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green/10 p-3">
                          <svg className="w-8 h-8 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>

                      <div className="text-center space-y-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-text">Email Me</h3>
                        <p className="text-xs sm:text-sm text-text-secondary/60">Fill out the form below</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your Name"
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-white/[0.08] text-sm sm:text-base text-text placeholder:text-text-secondary/40 focus:outline-none focus:border-green/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Your Email"
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-white/[0.08] text-sm sm:text-base text-text placeholder:text-text-secondary/40 focus:outline-none focus:border-green/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Your Message"
                            required
                            disabled={isSubmitting}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-white/[0.08] text-sm sm:text-base text-text placeholder:text-text-secondary/40 focus:outline-none focus:border-green/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                          />
                        </div>
                      </div>

                      {message && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm sm:text-base font-medium shadow-lg ${
                            message.includes("Failed") || message.includes("Please")
                              ? "bg-red-500/10 border border-red-500/30 text-red-400"
                              : "bg-green/10 border border-green/30 text-green"
                          }`}
                        >
                          {message.includes("Failed") || message.includes("Please") ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          <span>{message}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 sm:py-3.5 rounded-lg bg-green text-sm sm:text-base font-medium text-white transition-all duration-300 hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <motion.div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="h-1.5 w-1.5 rounded-full bg-white"
                                    animate={{
                                      opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                      delay: i * 0.2,
                                      ease: "easeInOut",
                                    }}
                                  />
                                ))}
                              </motion.div>
                              <span>Sending</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </motion.form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
