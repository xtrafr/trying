# Xenos Services Website - Design & Implementation Prompt

## Overview
A premium, modern e-commerce website for digital gaming services featuring advanced 3D parallax effects, smooth animations, and a sophisticated dark theme with cyan/blue accent colors. Built with React, Vite, and cutting-edge animation libraries.

## Design Philosophy

### Visual Aesthetic
- **Dark Theme**: Deep space-like background (`#0a0e1a`) with subtle gradients
- **Color Palette**: Cyan/primary (`#06b6d4`) as the main accent, with blue gradients (`#3b82f6`)
- **Glassmorphism**: Frosted glass effects using `backdrop-filter: blur()` with semi-transparent backgrounds
- **Minimalist**: Clean, uncluttered layouts with generous whitespace
- **Premium Feel**: Subtle glows, shadows, and depth effects to convey quality

### Typography
- **Font**: Inter (Google Fonts) - clean, modern sans-serif
- **Hierarchy**: Large, bold headings with gradient text effects
- **Readability**: Optimized line heights and letter spacing for dark backgrounds

## Technical Stack

### Core Technologies
- **React 18** with functional components and hooks
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for declarative animations
- **Lenis** for buttery-smooth scroll animations
- **Lucide React** for modern iconography

### Performance Optimizations
- Code splitting with React.lazy() for below-the-fold components
- Image lazy loading with progressive enhancement
- Service Worker for offline caching
- Manual chunk splitting (vendor, motion, icons, scroll)
- Terser minification with console removal in production

## Key Interactive Components

### 1. ParallaxCard Component
**Advanced 3D Parallax Effect with Physics-Based Animation**

**How it works:**
- Uses `requestAnimationFrame` for 60fps smooth animations
- Calculates mouse position relative to card center
- Applies smooth lerp (linear interpolation) with easing functions for natural movement
- Implements 3D transforms: `perspective()`, `rotateX()`, `rotateY()`, `scale3d()`
- Separate parallax layer for background images that moves independently
- Dynamic perspective calculation based on rotation for depth

**Technical Details:**
```javascript
// Smooth lerp with easing
const lerpFactor = 0.12 // Balanced for smooth movement
s.currentRX += (targetRX - s.currentRX) * lerpFactor

// 3D Transform with dynamic perspective
transform: `perspective(${perspective}px) 
           rotateY(${s.currentRY}deg) 
           rotateX(${s.currentRX}deg) 
           scale3d(${s.currentScale}, ${s.currentScale}, ${s.currentScale})`

// Image parallax with depth
transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${depth})`
```

**Features:**
- Smooth spring-like return to center when mouse leaves
- Hover scale effect (1.03x)
- Distance-based falloff for natural movement
- Respects `prefers-reduced-motion` for accessibility

### 2. TiltCard Component
**3D Tilt Effect with Glare Reflection**

**How it works:**
- Calculates mouse position relative to card center
- Maps mouse position to rotation angles (X and Y axes)
- Applies perspective transform for 3D effect
- Dynamic glare effect that follows mouse cursor
- Smooth transitions using cubic-bezier easing

**Technical Details:**
```javascript
// Calculate rotation based on mouse position
const rotateX = (mouseY / (rect.height / 2)) * -tiltStrength
const rotateY = (mouseX / (rect.width / 2)) * tiltStrength

// Glare effect with radial gradient
background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, 
           rgba(255,255,255,${glareOpacity}), transparent 50%)`

// 3D Transform
transform: `perspective(1000px) 
           rotateX(${transform.rotateX}deg) 
           rotateY(${transform.rotateY}deg) 
           scale3d(${transform.scale}, ${transform.scale}, ${transform.scale})`
```

**Variants:**
- `ProductTiltCard`: For product cards with stronger tilt (9deg) and more glare
- `FeatureTiltCard`: For feature cards with subtle tilt (6deg)

### 3. Smooth Scrolling (Lenis)
**Buttery-Smooth Scroll Experience**

- Custom easing function: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- Integrated with `requestAnimationFrame` for smooth 60fps scrolling
- Respects scroll restoration preferences
- Stops during modal interactions to prevent conflicts

### 4. Custom Cursor
**Desktop-Only Custom Cursor**

- Only enabled on fine pointer devices (mouse/trackpad)
- Smooth tracking with `translate3d()` for GPU acceleration
- Cyan glow effect matching brand colors
- Hidden on mobile/touch devices

## Modern Design Elements

### Glassmorphism
```css
background: rgba(30, 41, 59, 0.5);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid rgba(6, 182, 212, 0.2);
```

### Gradient Text
```css
background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

### Glow Effects
```css
text-shadow: 0 0 4px rgba(34, 211, 238, 0.18),
             0 0 10px rgba(6, 182, 212, 0.14);
filter: drop-shadow(0 1px 8px rgba(6, 182, 212, 0.08));
```

### Card Hover Effects
- Subtle lift animation (`translateY(-8px)`)
- Scale on hover (1.02x - 1.05x)
- Border color transitions
- Shadow intensification
- Glare reflection (on tilt cards)

## Animation Strategy

### Principles
1. **Performance First**: Use `transform` and `opacity` only (GPU-accelerated)
2. **Smooth Easing**: Custom cubic-bezier curves for natural motion
3. **Staggered Animations**: Delay animations for sequential reveals
4. **Respect Preferences**: Honor `prefers-reduced-motion`
5. **60fps Target**: All animations target smooth 60fps

### Animation Libraries
- **Framer Motion**: For declarative component animations
- **RequestAnimationFrame**: For custom parallax and scroll effects
- **CSS Transitions**: For simple hover states

### Common Patterns
```javascript
// Staggered entrance
transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}

// Smooth hover
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: 'spring', stiffness: 400, damping: 25 }}

// Scroll-triggered
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

## Color System

### Primary Colors
- **Cyan**: `#06b6d4` (main brand color)
- **Blue**: `#3b82f6` (gradient accent)
- **Dark**: `#0a0e1a` (background)
- **Dark Card**: `rgba(30, 41, 59, 0.8)` (card backgrounds)

### Usage
- Primary cyan for CTAs, links, and accents
- Blue gradients for hero text and highlights
- Dark backgrounds with subtle gradients
- Semi-transparent overlays for depth

## Responsive Design

### Mobile-First Approach
- Touch-optimized targets (min 44x44px)
- Responsive typography with clamp()
- Adaptive layouts (grid → stack on mobile)
- Safe area insets for notched devices

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Accessibility

### Features
- Keyboard navigation support
- Focus management for modals
- ARIA labels and roles
- Reduced motion support
- Semantic HTML structure
- High contrast ratios

## Performance Optimizations

### Code Splitting
```javascript
// Lazy load below-the-fold components
const LazyProducts = lazy(() => import('./components/Products'))
const LazyFeatures = lazy(() => import('./components/Features'))
```

### Image Optimization
- Lazy loading with `loading="lazy"`
- Progressive image loading
- Proper `sizes` attributes for responsive images
- WebP/AVIF support (via Vercel)

### Build Optimizations
- Terser minification
- Console removal in production
- Asset hashing for cache busting
- Manual chunk splitting

## Component Architecture

### Structure
```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
├── data/          # Static data
└── index.css      # Global styles
```

### Key Components
- **ParallaxCard**: 3D parallax effect component
- **TiltCard**: 3D tilt with glare effect
- **RippleButton**: Material Design-inspired button
- **SmoothCursor**: Custom cursor for desktop
- **ProgressiveImage**: Optimized image loading
- **Testimonials**: Customer reviews with lightbox

## Deployment

### Platform
- **Vercel** for hosting
- Automatic deployments from GitHub
- Edge network for global performance
- Analytics and Speed Insights integrated

### Configuration
- Service Worker for PWA capabilities
- Cache headers for optimal performance
- Security headers (X-Frame-Options, CSP, etc.)
- SEO optimization (meta tags, sitemap, robots.txt)

## Key Takeaways for Replication

1. **Use GPU-accelerated properties**: `transform` and `opacity` only
2. **Implement smooth lerp**: For natural, physics-based animations
3. **Respect user preferences**: Always check `prefers-reduced-motion`
4. **Optimize for performance**: Lazy load, code split, optimize images
5. **Create depth**: Use 3D transforms, shadows, and glows
6. **Maintain consistency**: Use design tokens and utility classes
7. **Test on devices**: Ensure smooth 60fps on all devices
8. **Accessibility first**: Keyboard nav, ARIA, semantic HTML

## Modern Web Standards

- ES6+ JavaScript
- CSS Custom Properties (where applicable)
- Modern React patterns (hooks, functional components)
- Progressive Enhancement
- Mobile-First Responsive Design
- Web Performance Best Practices

---

This website represents a modern, premium web experience combining cutting-edge animation techniques with performance optimization and accessibility best practices.

