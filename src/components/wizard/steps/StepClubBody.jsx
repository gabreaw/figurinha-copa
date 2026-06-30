function StepClubBody({ data, onChange }) {
  return (
    <div>
      <div className="mb-6 text-center">
        <span className="text-3xl" aria-hidden="true">
          ⚽
        </span>
        <h2 className="font-display mt-2 text-2xl text-neutral-900">
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
          placeholder="e.g. Riverside FC"
          value={data.club}
          onChange={(e) => onChange({ club: e.target.value })}
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
            Height (m)
          </span>
          <input
            type="number"
            step="0.01"
            placeholder="1.22"
            value={data.height}
            onChange={(e) => onChange({ height: e.target.value })}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
            Weight (kg)
          </span>
          <input
            type="number"
            step="0.1"
            placeholder="24"
            value={data.weight}
            onChange={(e) => onChange({ weight: e.target.value })}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900"
          />
        </label>
      </div>
    </div>
  )
}

export default StepClubBody
