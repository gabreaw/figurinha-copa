function StepDots({ step, total }) {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((dot) => (
        <span
          key={dot}
          className={`h-2.5 w-2.5 rounded-full ${
            dot === step ? 'bg-brand-700' : 'bg-neutral-300'
          }`}
        />
      ))}
    </div>
  )
}

export default StepDots
