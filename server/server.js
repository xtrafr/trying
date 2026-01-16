const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sellauth API Configuration  
const SELLAUTH_FULL_KEY = '874ecbf9-57ea-42b8-a0be-82d43eb48fdd_zgzltqiscph4ux3jlibvmlpmrqzhhqr1z5s5tzyd3qeiedvgv900tm4n3b2y2npm'; // Full API key
const SELLAUTH_API_BASE = 'https://api.sellauth.com/v1'; // SellAuth API endpoint
const SELLAUTH_SHOP_ID = '874ecbf9-57ea-42b8-a0be-82d43eb48fdd'; // Your SellAuth Shop ID

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Create Sellauth Invoice
app.post('/api/create-invoice', async (req, res) => {
  try {
    // Check if shop ID is configured
    if (SELLAUTH_SHOP_ID === 'YOUR_SHOP_ID') {
      console.error('⚠️  SELLAUTH_SHOP_ID not configured!');
      return res.status(500).json({
        success: false,
        error: 'SellAuth Shop ID not configured. Please add your Shop ID from your SellAuth dashboard.'
      });
    }

    const { productId, paymentMethod, buyerEmail, quantity = 1 } = req.body;

    // Validate required fields
    if (!productId || !paymentMethod || !buyerEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: productId, paymentMethod, buyerEmail'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(buyerEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Prepare SellAuth checkout session payload
    const checkoutData = {
      cart: [
        {
          productId: productId,
          quantity: quantity
        }
      ],
      email: buyerEmail,
      gateway: paymentMethod,
      ip: req.ip || '127.0.0.1',
      country_code: 'US',
      user_agent: req.headers['user-agent'] || 'Mozilla/5.0'
    };

    console.log('Creating SellAuth checkout session with data:', {
      ...checkoutData,
      email: buyerEmail.replace(/(.{2}).*(@.*)/, '$1***$2')
    });

    // Make request to SellAuth API
    const response = await axios.post(
      `${SELLAUTH_API_BASE}/shops/${SELLAUTH_SHOP_ID}/checkout`,
      checkoutData,
      {
        headers: {
          'Authorization': `Bearer ${SELLAUTH_FULL_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('SellAuth response:', response.data);

    // Check if checkout session was created successfully
    if (response.data && response.data.url) {
      console.log('✅ Checkout session created successfully:', response.data.id);
      
      return res.json({
        success: true,
        invoiceUrl: response.data.url,
        invoiceId: response.data.id
      });
    } else {
      console.error('Unexpected SellAuth response:', response.data);
      
      return res.status(500).json({
        success: false,
        error: 'Failed to create checkout session - unexpected response format'
      });
    }

  } catch (error) {
    console.error('❌ Error creating SellAuth invoice:', error.response?.data || error.message);
    
    // Handle specific Sellauth API errors
    if (error.response?.data) {
      return res.status(error.response.status || 500).json({
        success: false,
        error: error.response.data.message || error.response.data.error || 'Sellauth API error',
        details: error.response.data
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error while creating invoice'
    });
  }
});

// Webhook endpoint to receive payment notifications from Sellauth
app.post('/api/webhook', async (req, res) => {
  try {
    console.log('Received Sellauth webhook:', req.body);
    
    // Process webhook data
    // Verify webhook signature if needed
    // Update database, send confirmation emails, etc.
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sellauth Backend Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Invoice endpoint: http://localhost:${PORT}/api/create-invoice`);
});

module.exports = app;
