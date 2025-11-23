export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { product_id, customer_email, gateway, return_url, webhook_url, custom_fields } = req.body

    // Validate required fields
    if (!product_id || !customer_email || !gateway) {
      return res.status(400).json({ error: 'Missing required fields: product_id, customer_email, gateway' })
    }

    // Get API key from environment variable
    const apiKey = process.env.VITE_SELLHUB_API_KEY

    if (!apiKey) {
      console.error('Sellhub API key not configured in environment variables')
      return res.status(500).json({ error: 'API key not configured. Please contact support.' })
    }

    console.log('API Key present:', !!apiKey, 'Length:', apiKey?.length)
    console.log('Creating invoice for product:', product_id, 'gateway:', gateway)
    console.log('Customer email:', customer_email)

    // Sellhub uses product-specific checkout URLs, not a general invoice creation endpoint
    // Construct the checkout URL with the product ID and return the prefilled URL
    const checkoutUrl = `https://xenosud.sellhub.cx/product/${product_id}?email=${encodeURIComponent(customer_email)}&gateway=${gateway}`
    
    console.log('Redirecting to checkout URL:', checkoutUrl)
    
    // Return the checkout URL for the frontend to redirect to
    return res.status(200).json({
      success: true,
      invoice_url: checkoutUrl,
      url: checkoutUrl,
      message: 'Redirecting to Sellhub checkout'
    })

  } catch (error) {
    console.error('Error creating invoice:', error)
    return res.status(500).json({ 
      error: 'Failed to create invoice', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
