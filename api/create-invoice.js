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

    console.log('Creating checkout session for product:', product_id, 'gateway:', gateway)
    console.log('Customer email:', customer_email)

    // Create checkout session via Sellhub API
    // Docs: https://docs.sellhub.cx/api/checkout/create-checkout
    const response = await fetch('https://xenosud.sellhub.cx/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: customer_email,
        currency: 'usd',
        returnUrl: return_url || 'https://www.xenos.lol/?payment=success',
        methodName: gateway,
        cartBundles: [],
        bundleIds: [],
        customFieldValues: [],
        cart: {
          items: [
            {
              id: product_id,
              coupon: '',
              name: custom_fields?.product_name || '',
              variant: {
                id: product_id,
                name: custom_fields?.tier || '',
                price: '0.00'
              },
              quantity: 1,
              addons: []
            }
          ],
          bundles: []
        }
      })
    })

    console.log('Sellhub checkout response status:', response.status)

    const data = await response.json()
    console.log('Sellhub checkout response:', JSON.stringify(data, null, 2))

    if (!response.ok || data.status !== 'success') {
      console.error('Sellhub checkout error:', data)
      return res.status(response.status || 500).json({
        error: data.message || 'Failed to create checkout session',
        details: data
      })
    }

    // Return the checkout session - redirect to process checkout
    const checkoutUrl = `https://xenosud.sellhub.cx/checkout/${data.session.id}`
    
    return res.status(200).json({
      success: true,
      invoice_url: checkoutUrl,
      url: checkoutUrl,
      session_id: data.session.id,
      message: 'Checkout session created successfully'
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
