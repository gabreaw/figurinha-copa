import { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import StepDots from './StepDots.jsx'
import StepName from './steps/StepName.jsx'
import StepBirthEmail from './steps/StepBirthEmail.jsx'
import StepClubBody from './steps/StepClubBody.jsx'
import StepReview from './steps/StepReview.jsx'
import {
  validateName,
  validateDob,
  validateEmail,
  validateClub,
  validateHeight,
  validateWeight,
} from './validators.js'

const TOTAL_STEPS = 4

const INITIAL_DATA = {
  name: '',
  photo: null,
  photoPreview: null,
  photoError: null,
  dob: '',
  email: '',
  club: '',
  height: '',
  weight: '',
}

function isStepValid(step, data) {
  if (step === 1) return !validateName(data.name)
  if (step === 2) return !validateDob(data.dob) && !validateEmail(data.email)
  if (step === 3) {
    return (
      !validateClub(data.club) &&
      !validateHeight(data.height) &&
      !validateWeight(data.weight)
    )
  }
  return true
}

function Wizard({ onExit }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_DATA)
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateData = (patch) => setData((prev) => ({ ...prev, ...patch }))

  const valid = isStepValid(step, data)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!valid || submitting) return

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setCompleted(true)
    }, 900)
  }

  const handleBack = () => {
    if (step === 1) {
      onExit()
    } else {
      setStep((s) => s - 1)
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      {!completed ? (
        <>
          <ProgressBar step={step} total={TOTAL_STEPS} />

          <form
            onSubmit={handleSubmit}
            noValidate
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200"
          >
            <div className="h-1.5 bg-linear-to-r from-brand-600 to-brand-900" />
            <div className="p-6 sm:p-8">
              {step === 1 && <StepName data={data} onChange={updateData} />}
              {step === 2 && <StepBirthEmail data={data} onChange={updateData} />}
              {step === 3 && <StepClubBody data={data} onChange={updateData} />}
              {step === 4 && <StepReview data={data} />}

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!valid || submitting}
                  className="font-display flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 text-base tracking-wide text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  {submitting && (
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                  )}
                  {submitting
                    ? 'GENERATING...'
                    : step < TOTAL_STEPS
                      ? 'NEXT →'
                      : 'GENERATE STICKER ✨'}
                </button>
              </div>
            </div>
          </form>

          <StepDots step={step} total={TOTAL_STEPS} />
        </>
      ) : (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-200">
          <span className="text-4xl" aria-hidden="true">
            🎉
          </span>
          <h2 className="font-display mt-3 text-3xl tracking-wide text-brand-950">
            STICKER CREATED!
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            We've sent {data.name || 'the player'}'s sticker card to{' '}
            {data.email || 'your email'}.
          </p>
          <button
            type="button"
            onClick={onExit}
            className="font-display mt-6 rounded-xl bg-brand-700 px-6 py-3 text-base tracking-wide text-white hover:bg-brand-800"
          >
            BACK TO HOME
          </button>
        </div>
      )}
    </main>
  )
}

export default Wizard
