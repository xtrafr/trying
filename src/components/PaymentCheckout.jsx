import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { CreditCard, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

const PaymentCheckout = ({ product, selectedTier, onClose }) => {
  console.log('PaymentCheckout rendering', { 
    product: product?.name, 
    selectedTier: selectedTier,
    tierValue: selectedTier?.value,
    tierLabel: selectedTier?.label,
    tierVariantId: selectedTier?.variantId
  })
  
  const [email, setEmail] = useState('')
  const [coupon, setCoupon] = useState('')
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

  const handlePurchase = async () => {
    // Validation
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
      // Get the Sellhub product ID from the product
      const productId = product.sellhubProductId
      
      // Use the variantId directly from the selectedTier prop (no need to re-find)
      // selectedTier already contains: { label, price, value, variantId }
      let variantId = selectedTier?.variantId

      console.log('=== CHECKOUT DEBUG ===')
      console.log('Product:', product.name)
      console.log('Product sellhubProductId:', productId)
      console.log('Selected Tier (full object):', JSON.stringify(selectedTier, null, 2))
      console.log('Tier Value:', selectedTier?.value)
      console.log('Tier Label:', selectedTier?.label)
      console.log('Tier Price:', selectedTier?.price)
      console.log('Variant ID (from selectedTier):', variantId)
      console.log('Email:', email)
      
      // Validate all required IDs are present
      if (!productId) {
        console.error('Missing sellhubProductId on product:', product)
        throw new Error('Product ID not found. Please contact support.')
      }
      
      // If variantId is missing, try fallback lookup
      if (!variantId) {
        console.error('Missing variantId on selectedTier:', selectedTier)
        // Fallback: try to find variantId from pricingTiers as last resort
        const fallbackTier = product.pricingTiers?.find(t => t.value === selectedTier?.value)
        if (fallbackTier?.variantId) {
          console.warn('Using fallback variantId from pricingTiers lookup:', fallbackTier.variantId)
          variantId = fallbackTier.variantId  // Actually use the fallback!
        } else {
          throw new Error('Variant ID not found. Please select a duration and try again.')
        }
      }
      
      // Double-check the variantId exists in the product's pricing tiers
      const validTier = product.pricingTiers?.find(t => t.variantId === variantId)
      if (!validTier) {
        console.error('variantId not found in product pricingTiers:', variantId)
        console.error('Available tiers:', product.pricingTiers)
        throw new Error('Invalid variant selected. Please refresh and try again.')
      }
      
      console.log('Validated tier:', validTier.label, '-', validTier.price)

      console.log('Sending to API:', { 
        product_id: productId, 
        variant_id: variantId, 
        customer_email: email,
        coupon: coupon || ''
      })

      // Create checkout session via API
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: productId,
          variant_id: variantId,
          customer_email: email,
          coupon: coupon || '',
          gateway: ''
        })
      })

      const data = await response.json()
      console.log('API Response:', data)
      console.log('Checkout URL:', data.checkoutUrl)
      
      if (!response.ok || !data.success) {
        console.error('API Error:', data)
        throw new Error(data.error || data.message || 'Failed to create checkout session')
      }
      
      setSuccess(true)
      
      // Redirect to Sellhub checkout page
      console.log('Redirecting to:', data.checkoutUrl)
      setTimeout(() => {
        window.location.href = data.checkoutUrl
      }, 1000)
      
    } catch (err) {
      console.error('Payment error:', err)
      setError(err.message || 'Failed to redirect to checkout. Please try again.')
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
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 10000,
          boxShadow: '0 25px 80px rgba(6, 182, 212, 0.25), 0 0 0 1px rgba(6, 182, 212, 0.15)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '28px 36px',
          borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.02) 100%)'
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
                fontSize: '28px', 
                fontWeight: '800', 
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.5px'
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
        <div style={{ padding: '36px' }}>

        {/* Product Info */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.03) 100%)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '28px',
          border: '1px solid rgba(6, 182, 212, 0.25)'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: '#ffffff', 
            marginBottom: '10px',
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

        {/* Coupon Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#e2e8f0', 
            marginBottom: '8px' 
          }}>
            Coupon Code (Optional)
          </label>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            placeholder="ENTER COUPON"
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
              boxSizing: 'border-box',
              textTransform: 'uppercase'
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-5 bg-gradient-to-r from-green-500/15 to-green-600/10 border-2 border-green-500/40 rounded-xl flex items-center gap-4 shadow-lg"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="text-white" size={24} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-400 font-bold text-base mb-1">Checkout Created Successfully!</p>
              <p className="text-green-300/80 text-sm">Redirecting to Sellhub checkout...</p>
            </div>
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
            fontWeight: '700',
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
            boxShadow: loading || success ? 'none' : '0 4px 12px rgba(6, 182, 212, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
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
              <span>Creating Invoice...</span>
            </>
          ) : success ? (
            <>
              <CheckCircle size={20} />
              <span>Redirecting...</span>
            </>
          ) : (
            <>
              <CreditCard size={20} />
              <span>Continue to Checkout</span>
            </>
          )}
        </button>

        {/* Footer Note */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(6, 182, 212, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(6, 182, 212, 0.15)'
        }}>
          <p style={{ 
            fontSize: '13px', 
            color: '#64748b', 
            textAlign: 'center',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <span style={{ fontSize: '16px' }}>🔒</span>
            <span>Secure payment processed by <strong style={{ color: '#06b6d4' }}>Sellhub</strong></span>
          </p>
        </div>
        </div>
      </div>
    </div>
  )
  
  return createPortal(modalContent, document.body)
}

export default PaymentCheckout
