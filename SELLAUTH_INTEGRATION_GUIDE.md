# 🚀 Sellauth Payment Integration - Complete Guide

## 📋 Overview

This system allows customers to purchase products directly through Sellauth invoices instead of being redirected to product pages. The flow is:

1. Customer selects product and payment method on your website
2. Customer clicks "Purchase"
3. Backend creates a Sellauth invoice via API
4. Customer is redirected to the Sellauth invoice page
5. After payment, customer is redirected to success page

---

## 🏗️ Architecture

### **Frontend** (React + Vite)
- `PaymentCheckout.jsx` - Payment method selector and email input
- `PaymentSuccess.jsx` - Success page after payment
- `Products.jsx` - Modified to use PaymentCheckout instead of direct links

### **Backend** (Node.js + Express)
- `server/server.js` - Express server with Sellauth API integration
- `/api/create-invoice` - Creates Sellauth invoice
- `/api/webhook` - Receives payment notifications

---

## ⚙️ Setup Instructions

### **Step 1: Install Backend Dependencies**

```bash
cd server
npm install
```

### **Step 2: Configure API Key**

Your Sellauth API key is already configured in `server/server.js`:

```javascript
const SELLAUTH_API_KEY = '874ecbf9-57ea-42b8-a0be-82d43eb48fdd_xtsogp76js5kuu6urf53zueud2mxuix4qomiuq8th3u2qaq52x1ashx785uegleh';
```

### **Step 3: Start the Backend Server**

Development mode (auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on: `http://localhost:3001`

### **Step 4: Start the Frontend**

In the main project directory:

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔄 Complete Payment Flow

### **1. Customer Journey**

```
[Product Page] 
    ↓ (Click product)
[Product Modal]
    ↓ (Click "View Details")
[Payment Checkout Modal]
    ↓ (Enter email + select payment method)
[Click "Complete Purchase"]
    ↓ (API call to backend)
[Backend creates invoice]
    ↓ (Returns invoice URL)
[Redirect to Sellauth]
    ↓ (Customer completes payment)
[Redirect to /payment-success]
```

### **2. Technical Flow**

**Frontend → Backend:**
```javascript
POST http://localhost:3001/api/create-invoice
{
  "productId": "1",
  "paymentMethod": "PAYPAL",
  "buyerEmail": "customer@example.com",
  "quantity": 1
}
```

**Backend → Sellauth API:**
```javascript
POST https://dev.sellix.io/v1/payments
Headers: {
  "Authorization": "Bearer YOUR_API_KEY"
}
Body: {
  "title": "Product Purchase - 1",
  "currency": "EUR",
  "email": "customer@example.com",
  "gateway": "PAYPAL",
  "items": [{ "uniqid": "1", "quantity": 1 }],
  "return_url": "http://localhost:5173/payment-success"
}
```

**Backend → Frontend:**
```javascript
{
  "success": true,
  "invoiceUrl": "https://sellauth.com/invoice/abc123",
  "invoiceId": "abc123"
}
```

---

## 💳 Supported Payment Methods

The system supports these payment gateways:

- `PAYPAL` - PayPal
- `STRIPE` - Credit/Debit Cards
- `BITCOIN` - Bitcoin
- `ETHEREUM` - Ethereum
- `LITECOIN` - Litecoin
- `CASHAPP` - Cash App

To add more, update the `paymentMethods` array in `src/components/PaymentCheckout.jsx`.

---

## 🔐 Security Best Practices

### **Current Setup (Development)**
✅ API key is in backend (not exposed to frontend)
✅ Email validation on both frontend and backend
✅ CORS enabled for local development

### **For Production Deployment:**

1. **Use Environment Variables:**
```javascript
// server/server.js
const SELLAUTH_API_KEY = process.env.SELLAUTH_API_KEY
const SELLAUTH_API_BASE = process.env.SELLAUTH_API_BASE || 'https://api.sellix.io/v1'
```

2. **Create `.env` file:**
```env
SELLAUTH_API_KEY=874ecbf9-57ea-42b8-a0be-82d43eb48fdd_xtsogp76js5kuu6urf53zueud2mxuix4qomiuq8th3u2qaq52x1ashx785uegleh
SELLAUTH_API_BASE=https://api.sellix.io/v1
PORT=3001
NODE_ENV=production
```

3. **Configure CORS for production:**
```javascript
app.use(cors({
  origin: 'https://your-domain.com',
  credentials: true
}))
```

4. **Add Rate Limiting:**
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const createInvoiceLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

app.post('/api/create-invoice', createInvoiceLimiter, async (req, res) => {
  // ... existing code
});
```

---

## 📝 Product Configuration

Your products are defined in `src/data/products.js`. Each product needs:

```javascript
{
  "_id": "unique-product-id",
  "name": "Product Name",
  "description": "Product description",
  "price": "€10 - €45",
  "pricingTiers": [
    {"label": "1 Week", "price": "€20", "value": "1week"}
  ],
  // sellauthUrls no longer needed - we create invoices instead!
}
```

---

## 🔔 Webhook Configuration

### **What are Webhooks?**
Sellauth sends notifications to your server when payments are completed, refunded, etc.

### **Setup Webhook URL in Sellauth Dashboard:**
1. Log in to Sellauth dashboard
2. Go to Settings → Webhooks
3. Add webhook URL: `https://your-domain.com/api/webhook`

### **Webhook Handler** (already implemented):
```javascript
app.post('/api/webhook', async (req, res) => {
  // Process payment confirmation
  // Update database
  // Send product keys via email
  // etc.
});
```

---

## 🐛 Troubleshooting

### **Backend not connecting:**
- Check if server is running on port 3001
- Run `cd server && npm start`
- Check console for errors

### **CORS errors:**
- Make sure backend is running
- Check CORS configuration in `server.js`
- Update `fetch()` URL in `PaymentCheckout.jsx` if needed

### **Invoice creation fails:**
- Check Sellauth API key is correct
- Verify product ID exists
- Check backend console for detailed error messages
- Ensure API endpoint is correct (dev vs production)

### **Payment method not working:**
- Verify the gateway is enabled in your Sellauth dashboard
- Check if the payment method ID matches Sellauth's requirements

---

## 📦 Deployment

### **Backend (Recommended: Railway, Render, or Heroku)**

1. **Create `.env` file with production values**
2. **Deploy backend:**
   - Railway: Connect GitHub repo, auto-deploys
   - Render: Create new Web Service
   - Heroku: `git push heroku main`

3. **Update frontend API URL:**
```javascript
// src/components/PaymentCheckout.jsx
const response = await fetch('https://your-backend-url.com/api/create-invoice', {
```

### **Frontend (Vercel - already configured)**

```bash
cd ..  # back to main directory
npm run build
vercel --prod
```

---

## ✅ Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend can connect to backend
- [ ] Product modal opens correctly
- [ ] Payment checkout modal displays all payment methods
- [ ] Email validation works
- [ ] Invoice creation succeeds
- [ ] Redirect to Sellauth invoice works
- [ ] Return to payment-success page works
- [ ] Webhook receives payment notifications

---

## 📚 API Reference

### **POST /api/create-invoice**

**Request:**
```json
{
  "productId": "string (required)",
  "paymentMethod": "string (required)",
  "buyerEmail": "string (required, valid email)",
  "quantity": "number (optional, default: 1)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "invoiceUrl": "https://sellauth.com/invoice/...",
  "invoiceId": "invoice-id"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message",
  "details": {}
}
```

---

## 🎯 Next Steps

1. **Test the full flow locally**
2. **Configure webhook handling for your needs**
3. **Add database integration (optional)**
4. **Set up email notifications (optional)**
5. **Deploy to production**
6. **Configure Sellauth dashboard webhooks**

---

## 🆘 Support

For Sellauth API documentation:
- https://developers.sellix.io/

For issues with this integration:
- Check server console logs
- Check browser console for frontend errors
- Verify all environment variables are set

---

**✨ Your Sellauth invoice system is ready to go!**
