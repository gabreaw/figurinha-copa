import { useState } from 'react'
import { validateDob, validateEmail } from '../validators.js'

const MONTHS = [
  ['01', 'January'],
  ['02', 'February'],
  ['03', 'March'],
  ['04', 'April'],
  ['05', 'May'],
  ['06', 'June'],
  ['07', 'July'],
  ['08', 'August'],
  ['09', 'September'],
  ['10', 'October'],
  ['11', 'November'],
  ['12', 'December'],
]

function StepBirthEmail({ data, onChange }) {
  const [initialYear, initialMonth, initialDay] = data.dob
    ? data.dob.split('-')
    : ['', '', '']
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [day, setDay] = useState(initialDay)

  const [touched, setTouched] = useState({ dob: false, email: false })
  const hasPartialDate = Boolean(year || month || day)
  const dobError = touched.dob
    ? !data.dob && hasPartialDate
      ? 'Please enter a valid date'
      : validateDob(data.dob)
    : null
  const emailError = touched.email ? validateEmail(data.email) : null

  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }))

  const commit = (y, m, d) => {
    const validYear = /^\d{4}$/.test(y)
    const dayNum = Number(d)
    const validDay = /^\d{1,2}$/.test(d) && dayNum >= 1 && dayNum <= 31
    onChange({ dob: validYear && m && validDay ? `${y}-${m}-${d.padStart(2, '0')}` : '' })
  }

  const handleMonth = (e) => {
    const next = e.target.value
    setMonth(next)
    commit(year, next, day)
  }

  const handleDay = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, 2)
    setDay(next)
    commit(year, month, next)
  }

  const handleYear = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, 4)
    setYear(next)
    commit(next, month, day)
  }

  return (
    <div>
      <div className="mb-4">
        <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Date of birth
        </span>
        <div className="grid grid-cols-[2fr_1fr_1.2fr] gap-2">
          <select
            autoFocus
            value={month}
            onChange={handleMonth}
            onBlur={() => markTouched('dob')}
            aria-label="Month"
            aria-invalid={Boolean(dobError)}
            className={`w-full rounded-xl border bg-white px-3 py-3 text-neutral-900 outline-none focus:border-brand-700 ${
              dobError ? 'border-red-400' : 'border-neutral-300'
            }`}
          >
            <option value="">Month</option>
            {MONTHS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Day"
            value={day}
            onChange={handleDay}
            onBlur={() => markTouched('dob')}
            aria-label="Day"
            aria-invalid={Boolean(dobError)}
            className={`w-full rounded-xl border px-3 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700 ${
              dobError ? 'border-red-400' : 'border-neutral-300'
            }`}
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="Year"
            value={year}
            onChange={handleYear}
            onBlur={() => markTouched('dob')}
            aria-label="Year"
            aria-invalid={Boolean(dobError)}
            className={`w-full rounded-xl border px-3 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700 ${
              dobError ? 'border-red-400' : 'border-neutral-300'
            }`}
          />
        </div>
        {dobError && <p className="mt-1.5 text-xs text-red-600">{dobError}</p>}
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Email
        </span>
        <input
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          onBlur={() => markTouched('email')}
          aria-invalid={Boolean(emailError)}
          className={`w-full rounded-xl border px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700 ${
            emailError ? 'border-red-400' : 'border-neutral-300'
          }`}
        />
        {emailError && <p className="mt-1.5 text-xs text-red-600">{emailError}</p>}
      </label>
    </div>
  )
}

export default StepBirthEmail
