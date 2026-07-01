import { useState } from 'react'
import { IconCard, IconPix } from '../../icons.jsx'
import { savePendingOrder } from '../paymentSession.js'

function StepPayment({ data, onError }) {
  const [loadingMethod, setLoadingMethod] = useState(null)

  const payWithCard = async () => {
    if (!data.photoCompressed) {
      onError('Please go back to step 1 and add a photo before paying.')
      return
    }

    onError(null)
    setLoadingMethod('card')

    try {
      savePendingOrder({
        name: data.name,
        dob: data.dob,
        country: data.club,
        height: data.height,
        weight: data.weight,
        photoCompressed: data.photoCompressed,
      })

      const response = await fetch('/api/create-checkout-session', { method: 'POST' })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(result.error || 'Could not start checkout')
      }

      window.location.href = result.url
    } catch (err) {
      onError(err.message || 'Could not start checkout')
      setLoadingMethod(null)
    }
  }

  const payWithPix = () => {
    onError('Pix payments are coming soon.')
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={payWithCard}
        disabled={loadingMethod !== null}
        className="flex w-full items-center gap-3 rounded-xl border border-neutral-300 px-4 py-4 text-left transition hover:border-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <IconCard />
        </span>
        <span>
          <span className="block font-semibold text-neutral-900">
            {loadingMethod === 'card' ? 'Redirecting to checkout…' : 'Pay with card'}
          </span>
          <span className="block text-sm text-neutral-500">
            International payments via Stripe
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={payWithPix}
        disabled={loadingMethod !== null}
        className="flex w-full items-center gap-3 rounded-xl border border-neutral-300 px-4 py-4 text-left transition hover:border-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <IconPix />
        </span>
        <span>
          <span className="block font-semibold text-neutral-900">Pay with Pix</span>
          <span className="block text-sm text-neutral-500">For payments in Brazil</span>
        </span>
      </button>
    </div>
  )
}

export default StepPayment
