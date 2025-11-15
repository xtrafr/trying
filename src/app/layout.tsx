import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const outfit = Outfit({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "xtra.wtf",
  description: "xtra - Frontend developer specializing in React, Next.js, and TypeScript. Building fast, modern websites with clean animations and exceptional design.",
  keywords: [
    "xtra",
    "xtra developer",
    "xtra wtf",
    "xtra.wtf",
    "xtra frontend",
    "xtra portfolio",
    "frontend developer", 
    "web developer", 
    "react developer",
    "nextjs developer",
    "next.js developer",
    "typescript developer",
    "javascript developer",
    "freelance developer",
    "web designer",
    "UI developer",
    "UX developer",
    "framer motion",
    "web animations", 
    "gsap developer",
    "WebGL developer",
    "3D web developer",
    "creative developer",
    "portfolio website",
    "modern web design",
    "responsive design",
    "tailwind css",
    "react animations",
  ],
  authors: [{ name: "xtra", url: "https://xtra.wtf" }],
  creator: "xtra",
  publisher: "xtra",
  openGraph: {
    title: "xtra.wtf",
    description: "Frontend developer building fast, modern websites with React and Next.js.",
    url: "https://xtra.wtf",
    siteName: "xtra.wtf",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "xtra - Frontend Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "xtra.wtf",
    description: "Frontend developer building fast, modern websites with React and Next.js.",
    images: ["/og-image.jpg"],
    creator: "@xtra",
    site: "@xtra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  alternates: {
    canonical: "https://xtra.wtf",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0db76b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/website icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/website icon.png" />
        <script 
          defer 
          src="https://umami.tail824e95.ts.net/script.js" 
          data-website-id="1a57c962-9471-4b01-bbf6-550544b88494"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              
              window.addEventListener('load', function() {
                window.scrollTo(0, 0);
              });
              
              window.addEventListener('beforeunload', function() {
                window.scrollTo(0, 0);
              });
              
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
              });
              
              document.addEventListener('keydown', function(e) {
                if (e.keyCode == 123 || 
                    (e.ctrlKey && e.shiftKey && e.keyCode == 73) || 
                    (e.ctrlKey && e.shiftKey && e.keyCode == 74) || 
                    (e.ctrlKey && e.keyCode == 85) ||
                    (e.metaKey && e.altKey && e.keyCode == 73) ||
                    (e.metaKey && e.altKey && e.keyCode == 74)) {
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "xtra",
              "alternateName": ["xtra developer", "xtra wtf"],
              "url": "https://xtra.wtf",
              "jobTitle": "Frontend Developer",
              "description": "Frontend developer specializing in React, Next.js, and modern web technologies.",
              "knowsAbout": [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Frontend Development",
                "Web Design",
                "Framer Motion",
                "GSAP",
                "WebGL",
                "Tailwind CSS"
              ],
              "sameAs": [
                "https://github.com/xtrafr",
                "https://xtra.wtf"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            })
          }}
        />
      </head>
      <body className={outfit.className}>
        <Script
          id="console-clear"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalLog = console.log;
                const originalWarn = console.warn;
                const originalError = console.error;
                const originalInfo = console.info;
                
                console.log = console.warn = console.info = function() {};
                console.error = function(...args) {
                  const message = args.join(' ');
                  if (!message.includes('Failed to send') && !message.includes('contact request')) {
                    return;
                  }
                };
                
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    console.clear();
                    console.log('%c✓ All started successfully', 'color: #0db76b; font-size: 14px; font-weight: bold;');
                  }, 100);
                });
              })();
            `,
          }}
        />
        <Providers>{children}</Providers>
        <Analytics mode={process.env.NODE_ENV === 'production' ? 'production' : 'development'} debug={false} />
      </body>
    </html>
  );
}