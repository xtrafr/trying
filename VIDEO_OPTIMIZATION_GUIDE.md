# Video Optimization Guide

## Current Issues
Your Vercel usage is high due to large video files:
- `unlock.mp4`: 43.08 MB
- `new.mp4`: 55.04 MB  
- `trigger (1).mov`: 1.27 MB
- `trigger (2).mov`: 0.18 MB
- `trigger (3).mov`: 0.42 MB

**Total: ~100MB of video content**

## Optimization Steps

### 1. Run Video Compression Script
```bash
npm run optimize-videos
```

This script will:
- Compress MP4 files using H.264 with optimal settings
- Create WebM versions for modern browsers
- Reduce file sizes by 70-80%

### 2. Update Product Data
After optimization, update `src/data/products.js` to use compressed versions:

```javascript
// Before:
"url": "/assets/unlock.mp4"

// After:
"url": "/assets/unlock-compressed.mp4"
```

### 3. External Hosting (Recommended)

For best results, host videos externally:

#### Free Options:
- **YouTube**: Upload as unlisted videos and embed
- **Vimeo**: Free tier with 500MB weekly upload
- **Cloudinary**: Free tier with 25GB storage
- **Imgur**: Supports video up to 1 minute

#### Paid Options:
- **AWS S3 + CloudFront**: ~$0.01/GB storage + CDN
- **Cloudflare Stream**: $5/month for 100GB streaming
- **Mux**: Professional video hosting

### 4. Update Vercel Headers
Add video caching to `vercel.json` (already implemented):

```json
{
  "source": "/(.*\\.mp4)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```

## Expected Results

After optimization:
- **unlock.mp4**: 43MB → ~10MB (77% reduction)
- **new.mp4**: 55MB → ~12MB (78% reduction)
- **trigger videos**: 2MB → ~1MB (50% reduction)

**Total reduction: ~98MB → ~23MB (76% savings)**

## Lazy Loading Implementation

Videos now use intersection observer to only load when visible:
- 200px viewport margin before loading
- Thumbnail placeholders until scrolled into view
- `preload="none"` to prevent automatic downloads

## WebM Support

Modern browsers get WebM versions which are:
- 20-30% smaller than MP4
- Better compression efficiency
- Supported by Chrome, Firefox, Edge

## Monitoring

After deployment, monitor Vercel analytics:
1. Go to Vercel dashboard
2. Check "Bandwidth" usage
3. Compare month-over-month
4. Should see 70%+ reduction

## Emergency Fix (Quick Solution)

If you need immediate reduction, replace video URLs with YouTube embeds:

```javascript
videos: [
  {
    title: "Product Showcase",
    url: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    thumbnail: "/assets/unlock.png",
    description: "Watch in action",
    type: "youtube"
  }
]
```

This eliminates 100MB from your Vercel bandwidth instantly.
