# Sellauth Backend Server

## Installation

```bash
cd server
npm install
```

## Configuration

Your API key is already configured in `server.js`:
```javascript
const SELLAUTH_API_KEY = '874ecbf9-57ea-42b8-a0be-82d43eb48fdd_xtsogp76js5kuu6urf53zueud2mxuix4qomiuq8th3u2qaq52x1ashx785uegleh';
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/create-invoice
Creates a Sellauth invoice and returns the payment URL.

**Request Body:**
```json
{
  "productId": "your-product-id",
  "paymentMethod": "PAYPAL",
  "buyerEmail": "customer@example.com",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "invoiceUrl": "https://sellauth.com/invoice/...",
  "invoiceId": "invoice-unique-id"
}
```

## Deployment

For production deployment, make sure to:
1. Set environment variables instead of hardcoded API key
2. Change `SELLAUTH_API_BASE` to `https://api.sellix.io/v1`
3. Configure proper CORS settings
4. Add rate limiting
5. Set up proper logging
