import StickerCard from './StickerCard.jsx'
import { IconStar } from './icons.jsx'

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

        <div className="relative flex justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-brand-100 blur-2xl sm:h-96 sm:w-96" />
          <StickerCard
            className="relative w-56 sm:w-72"
            name="Miguel Souza"
            dob="15-03-2018"
            club="Estrelinha FC"
            featured
          />
        </div>
      </div>
    </main>
  )
}

export default Hero
