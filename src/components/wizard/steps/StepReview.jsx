import StickerCard from '../../StickerCard.jsx'
import { formatDateLong, formatDateShort } from '../validators.js'

function StepReview({ data }) {
  const rows = [
    ['Name', data.name || '—'],
    ['Date of birth', data.dob ? formatDateLong(data.dob) : '—'],
    ['Email', data.email || '—'],
    ['Country', data.club || '—'],
    ['Height', data.height ? `${data.height} m` : '—'],
    ['Weight', data.weight ? `${data.weight} kg` : '—'],
  ]

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <StickerCard
          className="w-40"
          name={data.name || 'Player name'}
          dob={data.dob ? formatDateShort(data.dob) : 'DOB'}
          club={data.club || 'Country'}
          photo={data.photoPreview}
          featured
        />
      </div>

      <dl className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between px-4 py-3 text-sm">
            <dt className="text-neutral-500">{label}</dt>
            <dd className="font-medium text-neutral-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default StepReview
