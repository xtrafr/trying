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
    const { product_id, customer_email, gateway, return_url } = req.body

    // Validate required fields
    if (!product_id || !customer_email) {
      return res.status(400).json({ error: 'Missing required fields: product_id, customer_email' })
    }

    console.log('Redirecting to product:', product_id)
    console.log('Customer email:', customer_email)
    console.log('Payment gateway:', gateway)

    // Sellhub product page with prefilled email and gateway
    // The product page will handle the checkout properly
    const params = new URLSearchParams()
    params.append('email', customer_email)
    if (gateway) {
      params.append('gateway', gateway.toLowerCase())
    }
    
    const checkoutUrl = `https://xenosud.sellhub.cx/product/${product_id}?${params.toString()}`
    
    console.log('Checkout URL:', checkoutUrl)
    
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
