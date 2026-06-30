import { IconBall } from './icons.jsx'

function StickerCard({ name, dob, club, photo, featured = false, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-linear-to-br from-brand-700 via-brand-800 to-brand-950 shadow-xl ring-1 ring-brand-900/40 ${
        featured ? 'shadow-2xl' : ''
      } ${className}`}
    >
      <div className="relative flex aspect-3/4 flex-col justify-end overflow-hidden">
        <span className="font-display pointer-events-none absolute top-1 left-2 text-7xl text-white/10 sm:text-8xl">
          23
        </span>

        <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/80 ring-1 ring-white/30">
          <IconBall className="h-4 w-4" />
        </span>

        {photo ? (
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <svg
            className="absolute inset-0 m-auto h-16 w-16 text-white/30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z" />
          </svg>
        )}

        <div className="relative border-t border-amber-400/70 bg-brand-950/85 px-3 py-2 text-left text-white">
          <p className="truncate text-xs font-semibold sm:text-sm">{name}</p>
          <p className="truncate text-[10px] text-brand-100 sm:text-xs">
            {dob} · {club}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StickerCard
