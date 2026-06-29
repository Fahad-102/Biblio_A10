import { stripe } from '@/app/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const params = await searchParams
  const session_id = params?.session_id

  if (!session_id) {
    return redirect('/browse-books')
  }

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    })
  } catch (error) {
    console.error("Stripe session retrieval failed:", error)
    return redirect('/')
  }

  const status = session?.status
  const customerEmail = session?.customer_details?.email
  
  const bookTitle = session?.metadata?.title || session?.line_items?.data[0]?.description || "Book"
  const amountTotal = (session?.amount_total / 100).toFixed(2)

  if (status === 'open') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-700">Processing your payment...</h2>
        <p className="text-slate-500 mt-1">Please refresh the page or wait a moment.</p>
      </div>
    )
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-50 to-white flex flex-col justify-center items-center p-6 antialiased">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-100 p-8 text-center border border-slate-100">
          
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
            <svg className="h-10 w-10 text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Thank you for your purchase! A confirmation email has been sent to{' '}
            <span className="font-semibold text-purple-700">{customerEmail || 'your email'}</span>.
          </p>

          {/* ইনভয়েস/অর্ডার সামারি কার্ড */}
          <div className="bg-slate-50 rounded-xl p-5 text-left mb-8 border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Summary</span>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Paid</span>
            </div>
            
            <div className="space-y-3 mt-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500 shrink-0">Item:</span>
                <span className="font-medium text-slate-800 text-right line-clamp-1">{bookTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Charged:</span>
                <span className="font-bold text-slate-900">${amountTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Status:</span>
                <span className="font-medium text-purple-600">Instant Access / Shipped</span>
              </div>
            </div>
          </div>

          {/* নেভিগেশন বাটন */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/browse-books" 
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-purple-100 transition-all text-sm text-center cursor-pointer"
            >
              Browse More Books
            </Link>
            <Link 
              href="/" 
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-medium px-6 py-2.5 rounded-xl border border-slate-200 transition-all text-sm text-center cursor-pointer"
            >
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-slate-400 mt-8">
            Questions or issues? Email us at{' '}
            <a href="mailto:support@biblio.com" className="text-purple-600 hover:underline">
              support@biblio.com
            </a>
          </p>

        </div>
      </div>
    )
  }

  return redirect('/')
}