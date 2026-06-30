function StepBirthEmail({ data, onChange }) {
  return (
    <div>
      <div className="mb-6 text-center">
        <span className="text-3xl" aria-hidden="true">
          🎂
        </span>
        <h2 className="font-display mt-2 text-3xl tracking-wide text-brand-950">
          WHEN WERE THEY BORN?
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          We'll use this for the sticker details and to send your card
        </p>
      </div>

      <label className="mb-4 block">
        <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Date of birth
        </span>
        <input
          type="date"
          value={data.dob}
          onChange={(e) => onChange({ dob: e.target.value })}
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 outline-none focus:border-brand-700"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Email
        </span>
        <input
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700"
        />
      </label>
    </div>
  )
}

export default StepBirthEmail
