import { useState } from "react";
import { loginRequest } from "../lib/auth-api";

export function useLoginRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function submitLogin(username: string, password: string) {
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
