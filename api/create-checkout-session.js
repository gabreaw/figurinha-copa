import Stripe from 'stripe'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

const STICKER_PRICE_USD_CENTS = 499

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ error: 'Server is missing STRIPE_SECRET_KEY' })
    return
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const origin = req.headers.origin || `https://${req.headers.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: STICKER_PRICE_USD_CENTS,
            product_data: {
              name: 'Custom World Cup Sticker Card',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancelled`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('create-checkout-session error:', err)
    res.status(500).json({ error: 'Failed to start checkout' })
  }
}
