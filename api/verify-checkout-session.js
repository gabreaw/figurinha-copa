import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ error: 'Server is missing STRIPE_SECRET_KEY' })
    return
  }

  const sessionId = req.query.session_id
  if (!sessionId) {
    res.status(400).json({ error: 'Missing session_id' })
    return
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    res.status(200).json({ paid: session.payment_status === 'paid' })
  } catch (err) {
    console.error('verify-checkout-session error:', err)
    res.status(500).json({ error: 'Failed to verify payment' })
  }
}
