# xtra-bio

Modern bio/link-in-bio page built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✨ Click-to-enter animated landing screen
- 🎨 Particle background with connected dots animation
- 🎵 Spotify "Now Playing" widget (ready for API integration)
- 📊 Stats cards with gradient text
- 🔗 Animated social links
- 🎵 Audio visualizer decoration
- 📱 Fully responsive design
- 🌟 Glass morphism effects
- ⚡ Smooth Framer Motion animations

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Links

Edit the `links` array in `app/page.tsx`:

```typescript
const links = [
  { icon: 'fa-solid fa-globe', label: 'Portfolio', href: 'https://xtra.wtf' },
  { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/yourusername' },
  // ... add more links
];
```

### Update Stats

Edit the `stats` array in `app/page.tsx`:

```typescript
const stats = [
  { number: '50K+', label: 'Followers' },
  { number: '120+', label: 'Projects' },
  { number: '∞', label: 'Vibes' },
];
```

### Spotify Integration

To connect Spotify:

1. Create a Spotify API app at [developer.spotify.com](https://developer.spotify.com)
2. Create an API route at `app/api/spotify/now-playing/route.ts`
3. Update the fetch call in `app/components/SpotifyWidget.tsx`

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Font Awesome
- **Font:** Outfit (Google Fonts)

## Color Palette

- Background: `#000000`
- Primary Accent: `#0db76b`
- Accent Light: `#06d77b`
- Text: `#f5f5f7`
- Muted Text: `#86868b`

## Deploy

Deploy on Vercel:

```bash
npm run build
```

Or use the [Vercel Platform](https://vercel.com/new).

## License

MIT
