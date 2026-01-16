export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const apiKey = process.env.VITE_SELLHUB_API_KEY
    const { productId } = req.query
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' })
    }

    console.log('Fetching variants from Sellhub for product:', productId)

    // Build query params
    const params = new URLSearchParams()
    if (productId) {
      params.append('productId', productId)
    }

    const url = `https://dash.sellhub.cx/api/sellhub/products/variants?${params.toString()}`
    console.log('Fetching from:', url)

    // Fetch variants from Sellhub
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    })

    console.log('Sellhub response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Sellhub error:', errorText)
      return res.status(response.status).json({ 
        error: 'Failed to fetch variants from Sellhub',
        details: errorText 
      })
    }

    const data = await response.json()
    console.log('Variants fetched:', JSON.stringify(data, null, 2))

    return res.status(200).json({
      success: true,
      variants: data
    })

  } catch (error) {
    console.error('Error fetching variants:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch variants', 
      message: error.message 
    })
  }
}
