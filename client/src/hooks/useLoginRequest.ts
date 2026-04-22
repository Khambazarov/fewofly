import { useState } from "react";
import { loginRequest } from "../lib/auth-api";
import type { CurrentUser } from "../lib/auth-types";

export function useLoginRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function submitLogin(
    username: string,
    password: string,
  ): Promise<CurrentUser | null> {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await loginRequest({ username, password });
      return result;
    } catch {
      setErrorMessage("Login failed. Please check your credentials.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    errorMessage,
    submitLogin,
  };
}
