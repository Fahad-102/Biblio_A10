import { stripe } from '@/app/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { subscription } from '@/app/lib/action/payment' 

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const status = session.status
  const customerEmail = session.customer_details?.email
  const planName = session.line_items?.data[0]?.description || "Standard Plan"
  const amountTotal = (session.amount_total / 100).toFixed(2)

  if (status === 'open') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-700">Processing your payment...</h2>
        <p className="text-slate-500 mt-1">Please refresh the page or wait a moment.</p>
      </div>
    )
  }

  if (status === 'complete') {
    
    const stripeMetadata = session.metadata || {}
    await subscription({
      ...stripeMetadata,
      sessionid: session_id
    })

    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col justify-center items-center p-6 antialiased">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-100 p-8 text-center border border-slate-100">
          
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6 animate-bounce">
            <svg className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Thank you for your business!
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            We appreciate your order! A confirmation email has been sent to{' '}
            <span className="font-semibold text-purple-800">{customerEmail || 'your email'}</span>.
          </p>

          <div className="bg-slate-50 rounded-xl p-5 text-left mb-8 border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Subscription</span>
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Active</span>
            </div>
            
            <div className="space-y-3 mt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Plan:</span>
                <span className="font-medium text-slate-800">Biblio-A10 ({planName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-bold text-slate-900">${amountTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-medium text-emerald-600">Payment Successful</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto bg-purple-700 hover:bg-purple-900 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-all text-sm text-center"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/" 
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-medium px-6 py-2.5 rounded-xl border border-slate-200 transition-all text-sm text-center"
            >
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-slate-400 mt-8">
            Questions? Email us at{' '}
            <a href="mailto:orders@example.com" className="text-blue-500 hover:underline">
              orders@example.com
            </a>
          </p>

        </div>
      </div>
    )
  }

  return redirect('/')
}