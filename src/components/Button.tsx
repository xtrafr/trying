"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
}: ButtonProps) {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[24px] px-6 sm:px-8 py-3.5 sm:py-4 text-[15px] font-semibold transition-all duration-300 select-none leading-none min-h-[48px]",
        variant === "primary" &&
          "border hover:brightness-110 active:scale-[0.98]",
        variant === "secondary" &&
          "bg-transparent text-text border hover:active:scale-[0.98]",
        className
      )}
      style={{
        background: variant === "primary" ? "var(--accent-color)" : undefined,
        color: variant === "primary" ? '#ffffff' : undefined,
        borderColor: variant === "primary" 
          ? "rgba(255, 255, 255, 0.3)" 
          : "rgba(255, 255, 255, 0.3)",
        backdropFilter: variant === "secondary" ? "blur(30px) saturate(180%)" : undefined,
        WebkitBackdropFilter: variant === "secondary" ? "blur(30px) saturate(180%)" : undefined,
        boxShadow: variant === "primary" 
          ? `0 4px 30px color-mix(in srgb, var(--accent-color) 40%, transparent), inset 0 0 20px rgba(255, 255, 255, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.2)`
          : "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.25)",
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -3,
        boxShadow: variant === "primary"
          ? `0 8px 40px color-mix(in srgb, var(--accent-color) 60%, transparent), inset 0 0 30px rgba(255, 255, 255, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.3)`
          : `0 8px 40px color-mix(in srgb, var(--accent-color) 25%, transparent), inset 0 0 30px rgba(255, 255, 255, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3)`,
        borderColor: `rgba(255, 255, 255, 0.5)`,
      }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span className="relative z-10">{children}</span>
      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Component>
  );
}