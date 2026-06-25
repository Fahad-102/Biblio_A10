import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PRICE_ID = {
    'user_pro':'price_1TlrEMHTwjH1FqBj7h9Pirbu',
    'user_elite':'price_1TlrevHTwjH1FqBj499Pvcxw',
    'librarian_basic':'price_1TlrfTHTwjH1FqBjIinhDBED',
    'librarian_premium':'price_1TlrftHTwjH1FqBjdva9rYcV',
    'librarian_enterprise':'price_1TlrgOHTwjH1FqBj5JNeTNO1',
}