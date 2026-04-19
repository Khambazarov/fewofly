export function isLoginFormValid(username: string, password: string) {
  return username.trim().length >= 3 && password.trim().length >= 8;
}
