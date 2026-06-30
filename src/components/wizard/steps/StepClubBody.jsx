import { useState } from 'react'
import { validateClub, validateHeight, validateWeight } from '../validators.js'

function StepClubBody({ data, onChange }) {
  const [touched, setTouched] = useState({ club: false, height: false, weight: false })
  const clubError = touched.club ? validateClub(data.club) : null
  const heightError = touched.height ? validateHeight(data.height) : null
  const weightError = touched.weight ? validateWeight(data.weight) : null

  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }))

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="text-3xl" aria-hidden="true">
          ⚽
        </span>
        <h2 className="font-display mt-2 text-3xl tracking-wide text-brand-950">
          CLUB & MEASUREMENTS
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Just like the real player cards
        </p>
      </div>

      <label className="mb-4 block">
        <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Club name
        </span>
        <input
          type="text"
          autoFocus
          placeholder="e.g. Riverside FC"
          value={data.club}
          onChange={(e) => onChange({ club: e.target.value })}
          onBlur={() => markTouched('club')}
          aria-invalid={Boolean(clubError)}
          className={`w-full rounded-xl border px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700 ${
            clubError ? 'border-red-400' : 'border-neutral-300'
          }`}
        />
        {clubError && <p className="mt-1.5 text-xs text-red-600">{clubError}</p>}
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
            Height (m)
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="1.22"
            value={data.height}
            onChange={(e) => onChange({ height: e.target.value })}
            onBlur={() => markTouched('height')}
            aria-invalid={Boolean(heightError)}
            className={`w-full rounded-xl border px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700 ${
              heightError ? 'border-red-400' : 'border-neutral-300'
            }`}
          />
          {heightError && <p className="mt-1.5 text-xs text-red-600">{heightError}</p>}
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
            Weight (kg)
          </span>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="24"
            value={data.weight}
            onChange={(e) => onChange({ weight: e.target.value })}
            onBlur={() => markTouched('weight')}
            aria-invalid={Boolean(weightError)}
            className={`w-full rounded-xl border px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700 ${
              weightError ? 'border-red-400' : 'border-neutral-300'
            }`}
          />
          {weightError && <p className="mt-1.5 text-xs text-red-600">{weightError}</p>}
        </label>
      </div>
    </div>
  )
}

export default StepClubBody
