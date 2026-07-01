import { useState } from 'react'
import Stepper from './Stepper.jsx'
import StepName from './steps/StepName.jsx'
import StepBirthEmail from './steps/StepBirthEmail.jsx'
import StepClubBody from './steps/StepClubBody.jsx'
import StepReview from './steps/StepReview.jsx'
import {
  IconUser,
  IconCalendar,
  IconShield,
  IconClipboard,
  IconSparkle,
  IconTrophy,
} from '../icons.jsx'
import {
  validateName,
  validateDob,
  validateEmail,
  validateClub,
  validateHeight,
  validateWeight,
  formatDateLong,
} from './validators.js'
import { compressImage } from './compressImage.js'

const TOTAL_STEPS = 4

const STEP_META = [
  {
    icon: IconUser,
    title: "WHAT'S THE PLAYER'S NAME?",
    subtitle: 'This is the name that will appear on the sticker',
  },
  {
    icon: IconCalendar,
    title: 'WHEN WERE THEY BORN?',
    subtitle: "We'll use this for the sticker details and to send your card",
  },
  {
    icon: IconShield,
    title: 'COUNTRY & MEASUREMENTS',
    subtitle: "Pick the team they're cheering for at the World Cup",
  },
  {
    icon: IconClipboard,
    title: 'REVIEW & GENERATE',
    subtitle: 'Check everything looks right before we create the sticker',
  },
]

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
  const [generatedImage, setGeneratedImage] = useState(null)
  const [generateError, setGenerateError] = useState(null)

  const updateData = (patch) => setData((prev) => ({ ...prev, ...patch }))

  const valid = isStepValid(step, data)
  const meta = STEP_META[step - 1]
  const Icon = meta.icon

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valid || submitting) return

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
      return
    }

    if (!data.photo) {
      setGenerateError('Please go back to step 1 and add a photo before generating the sticker.')
      return
    }

    setGenerateError(null)
    setSubmitting(true)

    try {
      const photo = await compressImage(data.photo)
      const response = await fetch('/api/generate-sticker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photo,
          name: data.name,
          dob: data.dob ? formatDateLong(data.dob) : '',
          country: data.club,
          height: data.height,
          weight: data.weight,
        }),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong generating the sticker.')
      }

      setGeneratedImage(result.image)
      setCompleted(true)
    } catch (err) {
      setGenerateError(err.message || 'Something went wrong generating the sticker.')
    } finally {
      setSubmitting(false)
    }
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
          <Stepper step={step} total={TOTAL_STEPS} />

          <form
            onSubmit={handleSubmit}
            noValidate
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200"
          >
            <div className="flex items-start gap-3 bg-brand-950 px-6 py-5 sm:px-8">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                <Icon />
              </span>
              <div>
                <p className="text-[11px] font-semibold tracking-widest text-brand-300 uppercase">
                  Step {step} of {TOTAL_STEPS}
                </p>
                <h2 className="font-display text-2xl tracking-wide text-white">
                  {meta.title}
                </h2>
                <p className="mt-0.5 text-sm text-brand-200">{meta.subtitle}</p>
              </div>
            </div>

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
                  {submitting ? (
                    'GENERATING...'
                  ) : step < TOTAL_STEPS ? (
                    'NEXT →'
                  ) : (
                    <>
                      GENERATE STICKER <IconSparkle className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              {generateError && (
                <p className="mt-3 text-center text-sm text-red-600">{generateError}</p>
              )}
            </div>
          </form>
        </>
      ) : (
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-200">
          {generatedImage ? (
            <img
              src={generatedImage}
              alt={`${data.name || 'Player'}'s generated sticker card`}
              className="mx-auto w-56 rounded-2xl shadow-xl ring-1 ring-neutral-200"
            />
          ) : (
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <IconTrophy />
            </span>
          )}
          <h2 className="font-display mt-4 text-3xl tracking-wide text-brand-950">
            STICKER CREATED!
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Here's {data.name || "the player"}'s custom World Cup sticker card.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {generatedImage && (
              <a
                href={generatedImage}
                download={`${(data.name || 'sticker').replace(/\s+/g, '-').toLowerCase()}.png`}
                className="font-display rounded-xl border border-neutral-300 px-6 py-3 text-base tracking-wide text-neutral-700 hover:bg-neutral-50"
              >
                DOWNLOAD
              </a>
            )}
            <button
              type="button"
              onClick={onExit}
              className="font-display rounded-xl bg-brand-700 px-6 py-3 text-base tracking-wide text-white hover:bg-brand-800"
            >
              BACK TO HOME
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Wizard
