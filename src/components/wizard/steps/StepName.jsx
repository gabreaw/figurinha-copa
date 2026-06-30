function StepName({ data, onChange }) {
  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChange({ photo: file, photoPreview: URL.createObjectURL(file) })
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="text-3xl" aria-hidden="true">
          ✍️
        </span>
        <h2 className="font-display mt-2 text-2xl text-neutral-900">
          WHAT'S THE PLAYER'S NAME?
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          This is the name that will appear on the sticker
        </p>
      </div>

      <label className="mb-6 block">
        <span className="sr-only">Full name</span>
        <input
          type="text"
          placeholder="First and last name"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900"
        />
      </label>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-wide text-neutral-700 uppercase">
          Player's photo
        </p>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 px-3 py-6 text-center text-sm text-neutral-600 hover:border-neutral-900">
            {data.photoPreview ? (
              <img
                src={data.photoPreview}
                alt="Selected preview"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl" aria-hidden="true">
                🖼️
              </span>
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

          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 px-3 py-6 text-center text-sm text-neutral-600 hover:border-neutral-900">
            <span className="text-2xl" aria-hidden="true">
              📸
            </span>
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
      </div>
    </div>
  )
}

export default StepName
