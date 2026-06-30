import StickerCard from './StickerCard.jsx'

function Hero({ onStart }) {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-16 pb-24 text-center sm:pt-24">
      <h1 className="font-display text-4xl leading-[1.15] text-neutral-900 sm:text-5xl md:text-6xl">
        TURN YOUR KID INTO A{' '}
        <span className="text-neutral-500">CUSTOM</span> WORLD CUP STICKER
        CARD
      </h1>

      <div className="mt-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white">
          <span aria-hidden="true">★</span>
          25,000+ stickers created
        </span>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-10 rounded-xl bg-neutral-900 px-8 py-4 font-display text-sm tracking-wide text-white transition hover:bg-neutral-700"
      >
        CREATE MY STICKER →
      </button>

      <div className="relative mt-16 flex h-72 items-center justify-center sm:h-96">
        <StickerCard
          className="absolute w-40 -translate-x-24 -rotate-6 sm:w-52"
          name="Helena"
          dob="22-08-2019"
          club="Golden FC"
        />
        <StickerCard
          className="absolute w-40 translate-x-24 rotate-6 sm:w-52"
          name="Theo"
          dob="07-11-2018"
          club="Riverside FC"
        />
        <StickerCard
          className="relative w-48 sm:w-64"
          name="Miguel"
          dob="15-03-2018"
          club="Estrelinha FC"
          featured
        />
      </div>
    </main>
  )
}

export default Hero
