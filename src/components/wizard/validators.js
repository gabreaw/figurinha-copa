const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function validateName(name) {
  if (!name.trim()) return "Please enter the player's name"
  return null
}

export function validateDob(dob) {
  if (!dob) return 'Please select a date of birth'
  if (dob > todayISO()) return "Date of birth can't be in the future"
  return null
}

export function validateEmail(email) {
  if (!email.trim()) return 'Please enter an email address'
  if (!EMAIL_RE.test(email.trim())) return 'Enter a valid email address'
  return null
}

export function validateClub(club) {
  if (!club.trim()) return 'Please enter a club name'
  return null
}

export function validateHeight(height) {
  if (!height) return null
  if (Number(height) <= 0) return 'Height must be greater than 0'
  return null
}

export function validateWeight(weight) {
  if (!weight) return null
  if (Number(weight) <= 0) return 'Weight must be greater than 0'
  return null
}

export function formatDateLong(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateShort(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
