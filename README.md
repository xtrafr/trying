# xtra — Premium Portfolio

A modern, high-performance portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Featuring smooth animations, immersive visuals, and Apple-inspired minimalist design.

![Portfolio Preview](https://via.placeholder.com/1200x630/000000/0db76b?text=xtra+Portfolio)

## ✨ Features

- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type safety and better DX
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for buttery-smooth animations
- **Responsive Design** — perfect across mobile, tablet, and desktop
- **SEO Optimized** with meta tags and Open Graph support
- **Performance Focused** — 90+ Lighthouse scores
- **Dark Theme** with green accent palette
- **Scroll Animations** — sections reveal on scroll
- **Parallax Effects** — depth and dimension
- **Interactive Components** — magnetic buttons, hover states
- **Preloader Animation** — elegant loading experience

## 🎨 Design Principles

### Apple-Inspired Aesthetics
- Generous whitespace and breathing room
- Clean typography hierarchy with fluid scaling
- Subtle, purposeful animations
- Premium feel with dark background
- Single accent color (green) for focus

### Color Palette
```css
Primary Green: #0db76b
Dark Green: #0a9456
Light Green: #10d97f
Background: #000000
Secondary BG: #0a0a0a
Text: #f5f5f7
Secondary Text: #86868b
```

### Typography
- System font stack (-apple-system, SF Pro Display)
- Fluid sizing with clamp() for responsive text
- Hero: 2.5rem → 5.5rem
- Section titles: 2.5rem → 4rem
- Clear hierarchy and readability

## 🚀 Tech Stack

- **Framework**: Next.js 14.1.0
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.0
- **Build Tool**: Turbopack (Next.js)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
xtra-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Home page
│   │   └── providers.tsx        # Client providers
│   ├── components/
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── Navbar.tsx           # Sticky navigation
│   │   └── Preloader.tsx        # Loading animation
│   ├── sections/
│   │   ├── About.tsx            # About section
│   │   ├── Contact.tsx          # Contact section
│   │   ├── Expertise.tsx        # Tech stack grid
│   │   ├── Hero.tsx             # Hero section
│   │   └── Projects.tsx         # Featured projects
│   └── lib/
│       ├── data.ts              # Content data (projects, tech, etc)
│       └── utils.ts             # Utility functions
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
├── next.config.js               # Next.js config
└── package.json                 # Dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 🎯 Key Components

### Navbar
- Fixed position with auto-hide on scroll down
- Active section indicator with smooth underline
- Smooth scroll to sections
- Glassmorphism effect with backdrop blur

### Hero Section
- Animated gradient blobs in background
- Staggered fade-in animations
- Pulsing availability badge
- Dual CTA buttons
- Scroll indicator

### Expertise Section
- 6 technology categories
- 36+ technologies listed
- Hover animations on tech cards
- Scroll-triggered reveals
- Grid layout responsive to all screens

### Projects Section
- Featured work with detailed descriptions
- Parallax image effects
- Hover state transformations
- Technology tags
- External links to live projects

### About Section
- Personal introduction
- Stats showcase (experience, projects, satisfaction)
- Centered content layout
- Animated stat counters on scroll

### Contact Section
- 4 contact methods (Email, GitHub, Twitter, LinkedIn)
- Card-based layout
- Animated arrows on hover
- Interactive hover states

## 📝 Customization

### Update Content
Edit `/src/lib/data.ts` to customize:
- Projects
- Technologies/Expertise
- Stats
- Contact methods

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  green: {
    DEFAULT: "#0db76b",  // Change primary color
    dark: "#0a9456",
    light: "#10d97f",
  },
}
```

### Modify Animations
Edit individual section files or adjust global animation settings in `tailwind.config.ts`:
```typescript
animation: {
  'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
```
Upload `.next` folder to any Node.js hosting service.

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **Optimized images and fonts**
- **Code splitting and lazy loading**

## 🎨 Design Inspiration

- [apple.com](https://apple.com/macbook-pro) — Clean minimalism
- [linear.app](https://linear.app) — Smooth animations
- [vercel.com](https://vercel.com) — Modern aesthetics
- [rauno.me](https://rauno.me) — Creative interactions
- [unfold.co](https://unfold.co) — Visual depth

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👨‍💻 Author

**xtra**
- Portfolio: [xtra.dev](https://xtra.dev)
- GitHub: [@xtra](https://github.com/xtra)
- Twitter: [@xtra](https://twitter.com/xtra)

---

Built with ❤️ in Spain using Next.js, TypeScript, and Framer Motion.