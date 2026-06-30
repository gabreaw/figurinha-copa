function StickerCard({ name, dob, club, photo, featured = false, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-neutral-200 shadow-lg ring-1 ring-neutral-300 ${
        featured ? 'shadow-2xl ring-neutral-400' : ''
      } ${className}`}
    >
      <div className="relative flex aspect-3/4 flex-col justify-end overflow-hidden bg-neutral-300">
        <span className="font-display pointer-events-none absolute top-2 left-2 text-6xl text-neutral-400/60 sm:text-7xl">
          23
        </span>

        {photo ? (
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <svg
            className="absolute inset-0 m-auto h-16 w-16 text-neutral-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z" />
          </svg>
        )}

        <div className="relative bg-neutral-900/85 px-3 py-2 text-left text-white">
          <p className="truncate text-xs font-semibold sm:text-sm">{name}</p>
          <p className="truncate text-[10px] text-neutral-300 sm:text-xs">
            {dob} · {club}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StickerCard
