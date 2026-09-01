export function getToken(): string | null {
  try { return localStorage.getItem('token') }
  catch { return null }
}
export function setToken(token: string) { try { localStorage.setItem('token', token) } catch {} }
export function clearToken() { try { localStorage.removeItem('token') } catch {} }

export function getUserFromToken(): { name?: string; email?: string } | null {
  const t = getToken()
  if (!t) return null
  try {
    const parts = t.split('.')
    if (parts.length < 2) return null
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    return { name: payload.name || payload.username || '', email: payload.email }
  } catch (e) {
    return null
  }
}
