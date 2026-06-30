import { IconStar } from './icons.jsx'
import mexicoCard from '../assets/mexico.png'
import uruguaiCard from '../assets/uruguai.png'
import portugalCard from '../assets/portugal.png'

function Hero({ onStart }) {
  return (
    <main className="relative overflow-hidden bg-neutral-50">
      <div className="field-pattern pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:py-32">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-700 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            <IconStar className="h-3.5 w-3.5 text-amber-500" />
            25,000+ stickers created
          </span>

          <h1 className="font-display mt-6 text-5xl leading-[0.95] tracking-wide text-brand-950 sm:text-6xl md:text-7xl">
            TURN YOUR KID INTO A{' '}
            <span className="text-brand-600">CUSTOM</span> WORLD CUP STAR
          </h1>

          <p className="mt-6 text-base text-neutral-600 sm:text-lg">
            Upload a photo, add their details, and we'll turn them into a
            collectible sticker card — just like the pros.
          </p>

          <button
            type="button"
            onClick={onStart}
            className="font-display mt-8 bg-brand-700 px-10 py-4 text-lg tracking-wide text-white transition hover:bg-brand-800"
            style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
          >
            CREATE MY STICKER →
          </button>
        </div>

        <div className="relative flex h-72 items-center justify-center sm:h-96">
          <div className="absolute h-72 w-72 rounded-full bg-brand-100 blur-2xl sm:h-96 sm:w-96" />

          <img
            src={mexicoCard}
            alt="Example sticker card for Mexico"
            className="absolute w-36 -translate-x-20 -rotate-6 rounded-2xl shadow-xl ring-1 ring-black/10 sm:w-48 sm:-translate-x-28"
          />
          <img
            src={portugalCard}
            alt="Example sticker card for Portugal"
            className="absolute w-36 translate-x-20 rotate-6 rounded-2xl shadow-xl ring-1 ring-black/10 sm:w-48 sm:translate-x-28"
          />
          <img
            src={uruguaiCard}
            alt="Example sticker card for Uruguay"
            className="relative w-44 rounded-2xl shadow-2xl ring-1 ring-black/10 sm:w-60"
          />
        </div>
      </div>
    </main>
  )
}

export default Hero
