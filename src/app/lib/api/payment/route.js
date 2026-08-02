import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, PRICE_ID } from '@/app/lib/stripe'; 
import { auth } from '@/app/lib/auth';

export async function POST(req) { 
  try {
    const formData = await req.formData();
    const planKey = formData.get("planId") || formData.get("planKey"); 

    if (!planKey) {
      return NextResponse.json(
        { error: "Missing required field: planId" },
        { status: 400 }
      );
    }

    const priceId = PRICE_ID[planKey];

    if (!priceId) {
      return NextResponse.json(
        { error: `Invalid subscription plan selected: ${planKey}` },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get('origin');

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
        { error: "Please log in to your account first to subscribe." },
        { status: 401 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        planKey: planKey,
        priceId: priceId,
        userId: user?.id || "guest",
        userEmail: user?.email || "guest@example.com"
      },
      mode: 'subscription',
      success_url: `${origin}/subscription/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscription?canceled=true`, 
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: err.statusCode || 500 }
    );
  }
}