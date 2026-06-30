import { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import StepDots from './StepDots.jsx'
import StepName from './steps/StepName.jsx'
import StepBirthEmail from './steps/StepBirthEmail.jsx'
import StepClubBody from './steps/StepClubBody.jsx'
import StepReview from './steps/StepReview.jsx'

const TOTAL_STEPS = 4

const INITIAL_DATA = {
  name: '',
  photo: null,
  photoPreview: null,
  dob: '',
  email: '',
  club: '',
  height: '',
  weight: '',
}

function isStepValid(step, data) {
  if (step === 1) return data.name.trim().length > 0
  if (step === 2) return data.dob.trim().length > 0 && data.email.trim().length > 0
  if (step === 3) return data.club.trim().length > 0
  return true
}

function Wizard({ onExit }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_DATA)
  const [completed, setCompleted] = useState(false)

  const updateData = (patch) => setData((prev) => ({ ...prev, ...patch }))

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
    } else {
      setCompleted(true)
    }
  }

  const handleBack = () => {
    if (step === 1) {
      onExit()
    } else {
      setStep((s) => s - 1)
    }
  }

  const valid = isStepValid(step, data)

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      {!completed ? (
        <>
          <ProgressBar step={step} total={TOTAL_STEPS} />

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
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
                  type="button"
                  onClick={handleNext}
                  disabled={!valid}
                  className="font-display flex-1 rounded-xl bg-brand-700 py-3 text-base tracking-wide text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  {step < TOTAL_STEPS ? 'NEXT →' : 'GENERATE STICKER ✨'}
                </button>
              </div>
            </div>
          </div>

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
