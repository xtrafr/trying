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
    console.log('Request body:', JSON.stringify({ product_id, customer_email, gateway, return_url, webhook_url, custom_fields }, null, 2))

    // Make request to Sellhub API
    // Based on Sellhub API docs: https://docs.sellhub.cx/api
    const possibleEndpoints = [
      'https://dash.sellhub.cx/api/sellhub/invoices',
      'https://dash.sellhub.cx/api/v1/invoices',
      'https://api.sellhub.cx/invoices',
      'https://dev.sellhub.cx/api/v1/invoices'
    ]

    let response
    let lastError
    
    for (const endpoint of possibleEndpoints) {
      console.log('Trying endpoint:', endpoint)
      
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            product_id,
            customer_email,
            gateway,
            return_url,
            webhook_url,
            custom_fields
          })
        })

        console.log('Endpoint', endpoint, 'returned status:', response.status)
        
        // If not 404, we found the right endpoint
        if (response.status !== 404) {
          console.log('Using endpoint:', endpoint)
          break
        }
      } catch (err) {
        console.log('Error with endpoint', endpoint, ':', err.message)
        lastError = err
        continue
      }
    }

    if (!response || response.status === 404) {
      return res.status(500).json({
        error: 'Could not find valid Sellhub API endpoint',
        message: 'Please verify the correct API endpoint URL in Sellhub documentation'
      })
    }

    // Log response details
    console.log('Sellhub response status:', response.status)
    console.log('Sellhub response headers:', Object.fromEntries(response.headers.entries()))

    // Get response text first to handle both JSON and HTML responses
    const responseText = await response.text()
    console.log('Sellhub response body:', responseText.substring(0, 500))

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError.message)
      console.error('Response was:', responseText.substring(0, 200))
      return res.status(500).json({
        error: 'Invalid response from payment provider',
        message: 'The payment provider returned an invalid response. Please check your API key and product ID.',
        details: responseText.substring(0, 200)
      })
    }

    if (!response.ok) {
      console.error('Sellhub API error:', response.status, data)
      return res.status(response.status).json({
        error: data.message || data.error || 'Failed to create invoice',
        details: data
      })
    }

    console.log('Invoice created successfully:', data)

    // Return the invoice data
    return res.status(200).json(data)

  } catch (error) {
    console.error('Error creating invoice:', error)
    return res.status(500).json({ 
      error: 'Failed to create invoice', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
