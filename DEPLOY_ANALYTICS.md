# Analytics Dashboard Deployment Guide

## Setup Instructions

### 1. Deploy Analytics Dashboard to Vercel

1. **Deploy the analytics dashboard first:**
   ```bash
   cd analytics-dashboard
   npm install
   ```

2. **Deploy to Vercel:**
   - Push the `analytics-dashboard` folder to a separate GitHub repository
   - Connect it to Vercel
   - Note the deployment URL (e.g., `https://your-analytics-dashboard.vercel.app`)

### 2. Update Environment Variables

#### For Analytics Dashboard:
1. Go to Vercel dashboard → Your Analytics Dashboard project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-analytics-dashboard.vercel.app/api
   ```
   (This should match your analytics dashboard's own URL)

#### For Main Website:
1. Go to Vercel dashboard → Your Main Website project → Settings → Environment Variables
2. Add:
   ```
   VITE_ANALYTICS_API_URL=https://your-analytics-dashboard.vercel.app/api
   ```
   (Replace with your actual analytics dashboard URL)

### 3. Deploy Main Website

1. **Update environment variables:**
   - Make sure `VITE_ANALYTICS_API_URL` points to your analytics dashboard URL

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

## How It Works

1. **Main Website** tracks visitor connections, page views, and bandwidth usage
2. Data is sent to **Analytics Dashboard API** (`/api/analytics`)
3. **Analytics Dashboard** fetches real-time data from the API every 5 seconds
4. Dashboard displays:
   - Connected IPs with location
   - Country-based analytics
   - Real-time activity feed
   - Uptime monitoring
   - Statistics (total IPs, connections, countries, etc.)

## API Endpoints

### POST `/api/analytics`
Send analytics events from main website:
```json
{
  "type": "connection" | "pageview" | "bandwidth",
  "data": {
    "ip": "192.168.1.1",
    "country": "United States",
    "city": "New York",
    "countryCode": "US",
    "userAgent": "...",
    "referer": "...",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### GET `/api/analytics`
Fetch all analytics data (used by dashboard):
```json
{
  "connections": [...],
  "stats": {
    "totalIPs": 100,
    "activeConnections": 50,
    "countries": 30,
    "requests": 1000,
    "bandwidth": 5000
  }
}
```

## Important Notes

- The analytics API currently uses in-memory storage (data resets on server restart)
- For production, consider using Vercel KV, MongoDB, or another database
- Both sites must be deployed to Vercel for CORS to work properly
- Update CORS settings if deploying to different domains

