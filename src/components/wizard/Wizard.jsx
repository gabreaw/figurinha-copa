import { useEffect, useState } from 'react'
import Stepper from './Stepper.jsx'
import StepName from './steps/StepName.jsx'
import StepBirthEmail from './steps/StepBirthEmail.jsx'
import StepClubBody from './steps/StepClubBody.jsx'
import StepReview from './steps/StepReview.jsx'
import StepPayment from './steps/StepPayment.jsx'
import {
  IconUser,
  IconCalendar,
  IconShield,
  IconClipboard,
  IconCard,
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
import { loadPendingOrder, clearPendingOrder } from './paymentSession.js'

const TOTAL_STEPS = 5

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
    title: 'REVIEW & CONTINUE',
    subtitle: 'Check everything looks right before you pay',
  },
  {
    icon: IconCard,
    title: 'PAYMENT',
    subtitle: 'Choose how you want to pay to generate your sticker',
  },
]

const INITIAL_DATA = {
  name: '',
  photo: null,
  photoPreview: null,
  photoCompressed: null,
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

function getResumeIntent() {
  if (typeof window === 'undefined') return { mode: 'fresh' }
  const params = new URLSearchParams(window.location.search)
  const payment = params.get('payment')
  if (payment === 'success') return { mode: 'verify', sessionId: params.get('session_id') }
  if (payment === 'cancelled') return { mode: 'cancelled' }
  return { mode: 'fresh' }
}

async function generateFromPendingOrder(pending) {
  const response = await fetch('/api/generate-sticker', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      photo: pending.photoCompressed,
      name: pending.name,
      dob: pending.dob ? formatDateLong(pending.dob) : '',
      country: pending.country,
      height: pending.height,
      weight: pending.weight,
    }),
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(result.error || 'Something went wrong generating the sticker.')
  }
  return result.image
}

function Wizard({ onExit }) {
  const [resumeIntent] = useState(getResumeIntent)

  const [step, setStep] = useState(resumeIntent.mode === 'cancelled' ? TOTAL_STEPS : 1)
  const [data, setData] = useState(() => {
    if (resumeIntent.mode === 'cancelled') {
      const pending = loadPendingOrder()
      if (pending) {
        return {
          ...INITIAL_DATA,
          name: pending.name,
          dob: pending.dob,
          club: pending.country,
          height: pending.height,
          weight: pending.weight,
          photoCompressed: pending.photoCompressed,
        }
      }
    }
    return INITIAL_DATA
  })
  const [completed, setCompleted] = useState(false)
  const [verifyingPayment, setVerifyingPayment] = useState(resumeIntent.mode === 'verify')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [generateError, setGenerateError] = useState(
    resumeIntent.mode === 'cancelled' ? 'Payment was cancelled. You can try again below.' : null,
  )

  useEffect(() => {
    if (resumeIntent.mode !== 'verify') return

    let cancelled = false

    ;(async () => {
      try {
        const verifyRes = await fetch(
          `/api/verify-checkout-session?session_id=${encodeURIComponent(resumeIntent.sessionId ?? '')}`,
        )
        const verifyResult = await verifyRes.json().catch(() => ({}))
        if (!verifyRes.ok || !verifyResult.paid) {
          throw new Error('We could not verify your payment.')
        }

        const pending = loadPendingOrder()
        if (!pending) {
          throw new Error('We could not find your order details. Please start again.')
        }

        const image = await generateFromPendingOrder(pending)
        if (cancelled) return

        setData((prev) => ({
          ...prev,
          name: pending.name,
          dob: pending.dob,
          club: pending.country,
          height: pending.height,
          weight: pending.weight,
        }))
        setGeneratedImage(image)
        setCompleted(true)
        clearPendingOrder()
      } catch (err) {
        if (cancelled) return
        setGenerateError(err.message || 'Something went wrong.')
        setStep(TOTAL_STEPS)
      } finally {
        if (!cancelled) setVerifyingPayment(false)
        window.history.replaceState({}, '', window.location.pathname)
      }
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateData = (patch) => setData((prev) => ({ ...prev, ...patch }))

  const valid = isStepValid(step, data)
  const meta = STEP_META[step - 1]
  const Icon = meta.icon

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!valid || step >= TOTAL_STEPS) return
    setStep((s) => s + 1)
  }

  const handleBack = () => {
    if (step === 1) {
      onExit()
    } else {
      setStep((s) => s - 1)
    }
  }

  if (verifyingPayment) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <span
          className="mx-auto block h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-700"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-neutral-500">
          Confirming your payment and generating your sticker…
        </p>
      </main>
    )
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
              {step === 5 && <StepPayment data={data} onError={setGenerateError} />}

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Back
                </button>
                {step < TOTAL_STEPS && (
                  <button
                    type="submit"
                    disabled={!valid}
                    className="font-display flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 text-base tracking-wide text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                  >
                    NEXT →
                  </button>
                )}
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
            Here's {data.name || 'the player'}'s custom World Cup sticker card.
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
