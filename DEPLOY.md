# Deployment Guide

## 🚀 Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to production
npm run deploy

# Or use vercel directly
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Vite
5. Click "Deploy"

### Build Settings (Auto-detected)

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## ✅ Pre-Deployment Checklist

- [x] All dependencies installed
- [x] Build command works (`npm run build`)
- [x] No console errors
- [x] All animations working
- [x] Modal scrolling working
- [x] Smooth scroll working
- [x] Mobile responsive
- [x] vercel.json configured

## 🔧 Environment Variables

No environment variables needed for this project.

## 📝 Post-Deployment

After deployment:
1. Test all navigation links
2. Test product modals
3. Test smooth scrolling
4. Test on mobile devices
5. Check page load speed

## 🌐 Custom Domain

To add a custom domain:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Update DNS records as instructed

---

Your site will be live at: `https://your-project.vercel.app`
