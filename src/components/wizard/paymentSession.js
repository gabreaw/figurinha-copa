const STORAGE_KEY = 'sticker-pending-order'

export function savePendingOrder(order) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order))
}

export function loadPendingOrder() {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearPendingOrder() {
  sessionStorage.removeItem(STORAGE_KEY)
}
