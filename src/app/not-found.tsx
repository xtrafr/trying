"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-black text-gradient mb-4">404</h1>
          <h2 className="text-3xl font-bold text-text mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
