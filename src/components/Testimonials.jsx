import { useRef } from 'react'
import { IconArrowLeft, IconArrowRight } from './icons.jsx'
import feedback1 from '../assets/a2.png'
import feedback2 from '../assets/a4.png'
import feedback3 from '../assets/a5.png'
import feedback4 from '../assets/a6.png'
import feedback5 from '../assets/a7.png'

const FEEDBACKS = [feedback1, feedback2, feedback3, feedback4, feedback5]

function Testimonials() {
  const scrollerRef = useRef(null)

  const scroll = (direction) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-700 uppercase">
              Testimonials
            </p>
            <h2 className="font-display mt-1 text-3xl tracking-wide text-brand-950 sm:text-4xl">
              WHAT PARENTS ARE SAYING
            </h2>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:border-brand-700 hover:text-brand-700"
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:border-brand-700 hover:text-brand-700"
            >
              <IconArrowRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {FEEDBACKS.map((src, i) => (
            <div
              key={i}
              className="flex w-72 shrink-0 snap-center items-center justify-center rounded-2xl bg-neutral-50 p-4 shadow-sm ring-1 ring-neutral-200"
            >
              <img
                src={src}
                alt={`Parent feedback screenshot ${i + 1}`}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
