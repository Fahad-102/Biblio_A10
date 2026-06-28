import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/app/lib/stripe'; 
import { auth } from '@/app/lib/auth';

export async function POST(req) { 
  try {
    const formData = await req.formData();
    const price = formData.get("price");
    const title = formData.get("title");
    const bookId = formData.get("bookId");

    if (!price || !title || !bookId) {
      return NextResponse.json(
        { error: "Missing required fields: price, title, or bookId" },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get('origin') || 'http://localhost:3000';

    let user = null;
    try {
      const userSession = await auth.api.getSession({
        headers: headersList
      });
      user = userSession?.user;
    } catch (authError) {
      console.error("Auth session failed:", authError);
    }

    if (!user) {
      return NextResponse.json(
        { error: "Please log in to your account first to make a purchase." },
        { status: 401 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(price) * 100), 
            product_data: {
              name: title,
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: Number(price), 
        userId: user?.id || "guest",
        userEmail: user?.email || "guest@example.com",
        title,
        bookId
      },
      mode: 'payment',
      
      success_url: `${origin}/pricing/payment-success/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/browse-books/${bookId}?canceled=true`, 
    });

    
    return NextResponse.redirect(session.url, { status: 303 });

  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: err.statusCode || 500 }
    );
  }
}