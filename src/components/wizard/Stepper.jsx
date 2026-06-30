import { IconCheck } from '../icons.jsx'

const LABELS = ['Player', 'Birthday', 'Club', 'Review']

function Stepper({ step, total }) {
  return (
    <div className="mb-8 flex items-start">
      {LABELS.slice(0, total).map((label, i) => {
        const n = i + 1
        const isComplete = n < step
        const isActive = n === step

        return (
          <div key={label} className={`flex items-center ${n < total ? 'flex-1' : ''}`}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isComplete
                    ? 'bg-brand-700 text-white'
                    : isActive
                      ? 'bg-brand-700 text-white ring-4 ring-brand-100'
                      : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {isComplete ? <IconCheck /> : n}
              </span>
              <span
                className={`text-[11px] font-semibold tracking-wide uppercase ${
                  isActive || isComplete ? 'text-brand-700' : 'text-neutral-400'
                }`}
              >
                {label}
              </span>
            </div>
            {n < total && (
              <span
                className={`mx-2 h-0.5 flex-1 -translate-y-2.5 transition-colors ${
                  isComplete ? 'bg-brand-700' : 'bg-neutral-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Stepper
