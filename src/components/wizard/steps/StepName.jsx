import { useState } from 'react'
import { validateName } from '../validators.js'
import { IconPhoto, IconCamera } from '../../icons.jsx'

const MAX_PHOTO_BYTES = 8 * 1024 * 1024

function StepName({ data, onChange }) {
  const [touched, setTouched] = useState(false)
  const nameError = touched ? validateName(data.name) : null

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      onChange({ photoError: 'Please select an image file' })
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      onChange({ photoError: 'Image must be smaller than 8MB' })
      return
    }

    if (data.photoPreview) URL.revokeObjectURL(data.photoPreview)
    onChange({ photo: file, photoPreview: URL.createObjectURL(file), photoError: null })
  }

  const removePhoto = () => {
    if (data.photoPreview) URL.revokeObjectURL(data.photoPreview)
    onChange({ photo: null, photoPreview: null, photoError: null })
  }

  return (
    <div>
      <label className="mb-6 block">
        <span className="sr-only">Full name</span>
        <input
          type="text"
          autoFocus
          placeholder="First and last name"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          onBlur={() => setTouched(true)}
          aria-invalid={Boolean(nameError)}
          className={`w-full rounded-xl border px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-brand-700 ${
            nameError ? 'border-red-400' : 'border-neutral-300'
          }`}
        />
        {nameError && <p className="mt-1.5 text-xs text-red-600">{nameError}</p>}
      </label>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Player's photo
        </p>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 px-3 py-6 text-center text-sm text-neutral-600 hover:border-brand-700">
            {data.photoPreview ? (
              <img
                src={data.photoPreview}
                alt="Selected preview"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <IconPhoto className="h-6 w-6 text-neutral-400" />
            )}
            <span>
              Upload a photo
              <br />
              of the face, not the body
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
            />
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 px-3 py-6 text-center text-sm text-neutral-600 hover:border-brand-700">
            <IconCamera className="h-6 w-6 text-neutral-400" />
            <span>Camera</span>
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handlePhoto}
              className="hidden"
            />
          </label>
        </div>

        {data.photoError && (
          <p className="mt-1.5 text-xs text-red-600">{data.photoError}</p>
        )}

        {data.photoPreview && (
          <button
            type="button"
            onClick={removePhoto}
            className="mt-2 text-xs font-semibold text-neutral-500 hover:text-red-600"
          >
            Remove photo
          </button>
        )}
      </div>
    </div>
  )
}

export default StepName
