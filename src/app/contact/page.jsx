import React from 'react'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 sm:p-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Get in Touch
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
            Have questions about borrowing books, premium plans, or need assistance? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left Column: Contact Information */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="text-lg font-bold text-purple-900 mb-2">📍 Our Library</h3>
              <p className="text-sm text-purple-700 leading-relaxed">
                BiblioDrop Headquarters<br />
                Chittagong, Bangladesh.
              </p>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-2">📧 Email Support</h3>
              <p className="text-sm text-emerald-700">
                support@bibliodrop.com<br />
                response within 24 hours.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="text-lg font-bold text-amber-900 mb-2">⚡ Support Hours</h3>
              <p className="text-sm text-amber-700">
                Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                Friday & Saturday: Closed
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Send a Message</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Your Message</label>
                <textarea 
                  rows="4" 
                  placeholder="How can we help you today?" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm text-gray-800 resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all active:scale-[0.99] text-sm"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ContactPage