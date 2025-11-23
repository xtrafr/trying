export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Enable CORS
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

  try {
    const { product_id, customer_email, gateway, return_url, webhook_url, custom_fields } = req.body

    // Validate required fields
    if (!product_id || !customer_email || !gateway) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Get API key from environment variable
    const apiKey = process.env.VITE_SELLHUB_API_KEY

    if (!apiKey) {
      console.error('Sellhub API key not configured')
      return res.status(500).json({ error: 'API key not configured' })
    }

    // Make request to Sellhub API
    const response = await fetch('https://dev.sellhub.cx/api/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
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

    const data = await response.json()

    if (!response.ok) {
      console.error('Sellhub API error:', data)
      return res.status(response.status).json(data)
    }

    // Return the invoice data
    return res.status(200).json(data)

  } catch (error) {
    console.error('Error creating invoice:', error)
    return res.status(500).json({ error: 'Failed to create invoice', message: error.message })
  }
}
