# 🚀 Quick Start Guide

## First Time Setup

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Start Backend Server
```bash
npm start
```
✅ Backend will run on: http://localhost:3001

### 3. Start Frontend (in a new terminal)
```bash
cd ..
npm run dev
```
✅ Frontend will run on: http://localhost:5173

---

## Testing the Payment Flow

1. **Open** http://localhost:5173
2. **Click** on any product
3. **Click** "View Details" button
4. **Click** "Purchase" in the product modal
5. **Enter** your email
6. **Select** a payment method (e.g., PayPal)
7. **Click** "Complete Purchase"
8. You'll be redirected to Sellauth invoice page

---

## ✅ Checklist

- [ ] Backend running on port 3001
- [ ] Frontend running on port 5173
- [ ] Both servers showing no errors
- [ ] Can open product modal
- [ ] Can open payment checkout
- [ ] Can create invoice (check backend console for logs)

---

## 🔧 Configuration

Your Sellauth API key is already configured in:
`server/server.js` line 13

For production deployment, see: `SELLAUTH_INTEGRATION_GUIDE.md`

---

## 🐛 Having Issues?

**Backend won't start:**
- Make sure you're in the `server` folder
- Run `npm install` first
- Check if port 3001 is available

**Frontend errors:**
- Make sure backend is running first
- Check browser console for errors
- Ensure you're on http://localhost:5173

**CORS errors:**
- Backend must be running before frontend
- Check that backend shows no errors in console

---

## 📚 Next Steps

1. Read `SELLAUTH_INTEGRATION_GUIDE.md` for complete documentation
2. Test the payment flow end-to-end
3. Configure webhooks in Sellauth dashboard
4. Deploy to production when ready

---

**Need help?** Check the full guide in `SELLAUTH_INTEGRATION_GUIDE.md`
