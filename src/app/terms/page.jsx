import React from 'react'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          By accessing and using BiblioDrop, you agree to comply with and be bound by the following terms and conditions.
        </p>
        
        <div className="space-y-6">
          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">1. User Account & Security</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Users are responsible for maintaining the confidentiality of their authenticated sessions. Any suspicious activity using your token or role credentials must be reported immediately.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">2. Book Stocking & Fair Usage</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Librarians are required to provide authentic information regarding book data, descriptions, and available quantities. We reserve the right to audit content uploaded to our MongoDB clusters.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsPage