"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { t } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "#work", label: t.nav.work },
    { href: "#expertise", label: t.nav.expertise },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
        backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          style={{
            backgroundImage: `linear-gradient(to top, color-mix(in srgb, var(--accent-color) 5%, transparent), transparent, transparent)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Logo/Brand */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[2.5rem] font-black text-gradient mb-3 tracking-[-0.02em] leading-none">xtra</div>
            <p className="text-[15px] text-text-secondary/70 leading-[1.6] max-w-xs">
              {t.footer.availableDescription}
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-[13px] font-bold text-text uppercase tracking-[0.1em] mb-3">{t.footer.quickLinks}</h3>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium text-text-secondary/70 transition-all duration-300 w-fit group"
                  style={{
                    color: undefined,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                  }}
                >
                  <span className="relative">
                    {link.label}
                    <span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[13px] font-bold text-text uppercase tracking-[0.1em] mb-3">{t.footer.status}</h3>
            <div className="flex flex-col gap-4">
              <div 
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl w-fit"
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
                  className="text-[13px] font-bold uppercase tracking-[0.05em]"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {t.footer.availableForWork}
                </span>
              </div>
              <p className="text-[14px] text-text-secondary/60 leading-[1.6]">
                {t.footer.availableDescription}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="h-[1px] mb-10"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-[13px] text-text-secondary/50 font-medium">
            © {currentYear} xtra. {t.footer.allRightsReserved}
          </div>
          
          <div className="flex items-center gap-3 text-[13px] text-text-secondary/40">
            <span className="px-3 py-1.5 rounded-lg" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {t.footer.builtWith}
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}