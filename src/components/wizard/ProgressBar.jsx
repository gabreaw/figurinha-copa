function ProgressBar({ step, total }) {
  const percent = Math.round((step / total) * 100)

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-sm font-medium text-neutral-600">
        <span>
          Step {step} of {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
