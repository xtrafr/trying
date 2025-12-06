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
    const { product_id, variant_id, customer_email, gateway, coupon } = req.body

    console.log('Creating Sellhub checkout session...')
    console.log('Product ID:', product_id)
    console.log('Variant ID:', variant_id)
    console.log('Customer email:', customer_email)
    console.log('Gateway:', gateway)
    console.log('Coupon:', coupon)

    // Validate required fields
    if (!product_id || !variant_id || !customer_email) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['product_id', 'variant_id', 'customer_email']
      })
    }

    // Create checkout session via Sellhub API
    const origin = req.headers.origin || req.headers.referer?.split('/').slice(0, 3).join('/') || 'https://www.xenos.lol'
    
    const checkoutPayload = {
      email: customer_email,
      currency: 'usd',
      returnUrl: `${origin}/?payment=success`,
      methodName: gateway || '',
      cartBundles: [],
      bundleIds: [],
      customFieldValues: [],
      cart: {
        items: [
          {
            id: product_id,
            coupon: coupon || '',
            name: '',
            variant: {
              id: variant_id,
              name: '',
              price: '0.00'
            },
            quantity: 1,
            addons: []
          }
        ],
        bundles: []
      }
    }

    console.log('Checkout payload:', JSON.stringify(checkoutPayload, null, 2))

    const response = await fetch('https://xenosud.sellhub.cx/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(checkoutPayload)
    })

    console.log('Sellhub response status:', response.status)

    const data = await response.json()
    console.log('Sellhub response:', JSON.stringify(data, null, 2))

    if (!response.ok || data.status !== 'success') {
      console.error('Sellhub checkout error:', data)
      return res.status(response.status || 500).json({
        error: data.message || data.error || 'Failed to create checkout session',
        details: data
      })
    }

    // Return the checkout URL
    const checkoutUrl = `https://xenosud.sellhub.cx/checkout/${data.session.id}`
    
    console.log('Checkout URL:', checkoutUrl)
    
    return res.status(200).json({
      success: true,
      checkoutUrl: checkoutUrl,
      sessionId: data.session.id
    })

  } catch (error) {
    console.error('Error creating checkout:', error)
    return res.status(500).json({ 
      error: 'Failed to create checkout session', 
      message: error.message
    })
  }
}
