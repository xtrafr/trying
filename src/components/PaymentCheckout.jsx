import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { CreditCard, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

const PaymentCheckout = ({ product, selectedTier, onClose }) => {
  console.log('PaymentCheckout rendering', { product, selectedTier })
  
  const [selectedPayment, setSelectedPayment] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const paymentMethods = [
    { id: 'PAYPAL', name: 'PayPal', icon: '💳' },
    { id: 'STRIPE', name: 'Credit Card', icon: '💳' },
    { id: 'BITCOIN', name: 'Bitcoin', icon: '₿' },
    { id: 'ETHEREUM', name: 'Ethereum', icon: 'Ξ' },
    { id: 'LITECOIN', name: 'Litecoin', icon: 'Ł' },
    { id: 'CASHAPP', name: 'Cash App', icon: '$' }
  ]

  const handlePurchase = async () => {
    // Validation
    if (!selectedPayment) {
      setError('Please select a payment method')
      return
    }

    if (!email) {
      setError('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Get the Sellauth product ID from the URL
      const sellauthUrl = product.sellauthUrls?.[selectedTier.value]
      if (!sellauthUrl) {
        throw new Error('Product URL not available')
      }

      // Extract product ID from URL
      const productId = sellauthUrl.split('/').pop()
      
      // API Key from environment variable
      const apiKey = import.meta.env.VITE_SELLAUTH_API_KEY
      
      if (!apiKey || apiKey === 'your_sellauth_api_key_here') {
        // Fallback: redirect to product page if no API key configured
        console.warn('Sellauth API key not configured, redirecting to product page')
        window.location.href = sellauthUrl
        return
      }

      // Create invoice via Sellauth API
      const response = await fetch('https://dev.sellauth.com/api/invoices', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: productId,
          customer_email: email,
          gateway: selectedPayment,
          return_url: `${window.location.origin}/?payment=success`,
          webhook_url: `${window.location.origin}/api/webhook`,
          custom_fields: {
            product_name: product.name,
            tier: selectedTier.label
          }
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to create invoice')
      }
      
      setSuccess(true)
      
      // Redirect to invoice URL
      setTimeout(() => {
        if (data.invoice_url || data.url) {
          window.location.href = data.invoice_url || data.url
        } else {
          // Fallback to product page
          window.location.href = sellauthUrl
        }
      }, 1000)
      
    } catch (err) {
      console.error('Payment error:', err)
      setError(err.message || 'Failed to create invoice. Please try again.')
      setLoading(false)
    }
  }

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0f1419',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: '24px',
          padding: '0',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 10000,
          boxShadow: '0 20px 60px rgba(6, 182, 212, 0.2), 0 0 0 1px rgba(6, 182, 212, 0.1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, transparent 100%)'
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CreditCard size={20} style={{ color: 'white' }} />
              </div>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#ffffff',
                margin: 0
              }}>Checkout</h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(148, 163, 184, 0.1)'
                e.target.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#94a3b8'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '32px' }}>

        {/* Product Info */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.02) 100%)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#ffffff', 
            marginBottom: '8px',
            marginTop: 0
          }}>{product.name}</h3>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '14px', 
            marginBottom: '16px',
            marginTop: 0,
            lineHeight: '1.5'
          }}>{product.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>Price:</span>
            <span style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {selectedTier ? selectedTier.price : product.price}
            </span>
          </div>
          {selectedTier && (
            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(71, 85, 105, 0.3)'
            }}>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Duration: </span>
              <span style={{ fontSize: '14px', color: '#06b6d4', fontWeight: '500' }}>{selectedTier.label}</span>
            </div>
          )}
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#e2e8f0', 
            marginBottom: '8px' 
          }}>
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '14px 16px',
              backgroundColor: '#1a1d24',
              border: '1px solid #334155',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#06b6d4'
              e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#334155'
              e.target.style.boxShadow = 'none'
            }}
            disabled={loading || success}
          />
        </div>

        {/* Payment Method Selection */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#e2e8f0', 
            marginBottom: '12px' 
          }}>
            Select Payment Method *
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                disabled={loading || success}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: selectedPayment === method.id ? '2px solid #06b6d4' : '1px solid #334155',
                  background: selectedPayment === method.id 
                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)' 
                    : '#1a1d24',
                  cursor: loading || success ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: loading || success ? 0.5 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!loading && !success && selectedPayment !== method.id) {
                    e.currentTarget.style.borderColor = '#475569'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPayment !== method.id) {
                    e.currentTarget.style.borderColor = '#334155'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                <div style={{ fontSize: '28px' }}>{method.icon}</div>
                <div style={{ 
                  fontSize: '13px', 
                  fontWeight: '500',
                  color: selectedPayment === method.id ? '#06b6d4' : '#94a3b8'
                }}>{method.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
          >
            <CheckCircle className="text-green-500" size={20} />
            <p className="text-green-400 text-sm">Redirecting to payment page...</p>
          </motion.div>
        )}

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={loading || success}
          style={{
            width: '100%',
            padding: '16px',
            background: loading || success 
              ? '#334155' 
              : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px',
            borderRadius: '12px',
            border: 'none',
            cursor: loading || success ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: loading || success ? 0.6 : 1,
            boxShadow: loading || success ? 'none' : '0 4px 12px rgba(6, 182, 212, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!loading && !success) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)'
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)'
          }}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Creating Invoice...
            </>
          ) : success ? (
            <>
              <CheckCircle size={20} />
              Redirecting...
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Complete Purchase
            </>
          )}
        </button>

        {/* Footer Note */}
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b', 
          textAlign: 'center', 
          marginTop: '20px',
          marginBottom: 0
        }}>
          🔒 You will be redirected to a secure Sellauth payment page
        </p>
        </div>
      </div>
    </div>
  )
  
  return createPortal(modalContent, document.body)
}

export default PaymentCheckout
