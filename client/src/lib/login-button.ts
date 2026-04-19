import { isLoginFormValid } from "./validation";

export function isLoginButtonDisabled(username: string, password: string) {
  return !isLoginFormValid(username, password);
}
