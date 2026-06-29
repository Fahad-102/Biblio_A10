import React from 'react'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Welcome to BiblioDrop. Your privacy is critically important to us. This policy explains how we handle your user data when you use our book-sharing and library management platform.
        </p>
        
        <div className="space-y-6">
          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">1. Information We Collect</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We collect minimal authentication data through your login provider to keep your account secure. For Librarians, we store book descriptions, stock quantities, and details related to transactions.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">2. Stripe & Payments Secure Gateways</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All premium subscription payments and transaction requests are processed securely via Stripe. We do not store credit card or raw financial details on our backend servers.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage