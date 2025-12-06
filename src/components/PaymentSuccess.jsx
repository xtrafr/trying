import { motion } from 'framer-motion'
import { CheckCircle, Download, Mail, Home } from 'lucide-react'
import { useEffect, useState } from 'react'

const PaymentSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    // Get order details from URL params if available
    const params = new URLSearchParams(window.location.search)
    const orderId = params.get('order_id')
    const email = params.get('email')
    
    if (orderId || email) {
      setOrderDetails({ orderId, email })
    }
  }, [])

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light opacity-20 blur-xl"
            />
            <CheckCircle className="text-primary relative z-10" size={80} />
          </div>
        </motion.div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Thank you for your purchase!
          </p>
          <p className="text-gray-400">
            Your order has been confirmed and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-800 border border-primary/20 rounded-2xl p-6 sm:p-8 mb-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Mail className="text-primary" size={24} />
            What's Next?
          </h2>
          
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-white">Check Your Email</p>
                <p className="text-sm text-gray-400">
                  We've sent your product key and download instructions to your email address.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-white">Access Your Product</p>
                <p className="text-sm text-gray-400">
                  Follow the instructions in the email to download and activate your product.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-white">Need Help?</p>
                <p className="text-sm text-gray-400">
                  Contact our 24/7 support team if you have any questions.
                </p>
              </div>
            </div>
          </div>

          {orderDetails && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                {orderDetails.orderId && (
                  <span className="block mb-2">
                    Order ID: <span className="text-primary font-mono">{orderDetails.orderId}</span>
                  </span>
                )}
                {orderDetails.email && (
                  <span className="block">
                    Email: <span className="text-white">{orderDetails.email}</span>
                  </span>
                )}
              </p>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/"
            className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Return to Homepage
          </a>
          
          <a
            href="#contact"
            className="flex-1 py-4 bg-dark-700 hover:bg-dark-600 border border-gray-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            Contact Support
          </a>
        </motion.div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          If you don't receive an email within 5 minutes, please check your spam folder
          or contact our support team.
        </p>
      </motion.div>
    </div>
  )
}

export default PaymentSuccess
