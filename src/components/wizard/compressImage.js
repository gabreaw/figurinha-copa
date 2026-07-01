export function compressImage(file, { maxDimension = 1024, quality = 0.85 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }

      img.onerror = () => reject(new Error('Could not read the selected image'))
      img.src = reader.result
    }

    reader.onerror = () => reject(new Error('Could not read the selected image'))
    reader.readAsDataURL(file)
  })
}
