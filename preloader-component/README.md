# xtra Preloader Component

A minimalist, modern preloader animation component built with React, TypeScript, and Framer Motion.

## Features

- ✨ Clean, minimalist design
- 🎯 Smooth animations with Framer Motion
- ⚡ Fast load time (1.5 seconds)
- 🎨 Animated loading dots
- 📱 Responsive and mobile-friendly
- 🌙 Dark theme

## Installation

1. Install dependencies:
```bash
npm install framer-motion
```

2. Copy `Preloader.tsx` to your project's components folder

## Usage

```tsx
import Preloader from './Preloader';

function App() {
  return (
    <>
      <Preloader />
      {/* Your app content */}
    </>
  );
}
```

## Customization

### Change the logo text
Edit line 39:
```tsx
<motion.div>
  your-logo-here
</motion.div>
```

### Adjust loading duration
Edit line 10:
```tsx
setTimeout(() => {
  setIsLoading(false);
}, 1500); // Change this value (in milliseconds)
```

### Change colors
- Background: Edit `className="bg-black"` on line 23
- Gradient: Edit `from-green-400 via-green-500 to-green-600` on line 39
- Dots: Edit `bg-green-500` on line 50

## Dependencies

- React 18+
- Framer Motion 11+
- TypeScript (optional but recommended)

## License

Free to use for any project!
