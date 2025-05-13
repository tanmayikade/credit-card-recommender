import Cookies from "js-cookie"

// Get cookie by name
export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

// Set cookie
export function setCookie(name: string, value: string, days: number): void {
  Cookies.set(name, value, {
    expires: days,
    secure: true,
    sameSite: "strict",
  })
}

// Remove cookie
export function removeCookie(name: string): void {
  Cookies.remove(name)
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getCookie("auth_token")
}