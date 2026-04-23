import { useState } from "react";
import { logoutRequest } from "../lib/auth-api";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function submitLogout() {
    setIsLoggingOut(true);

    try {
      await logoutRequest();
      return true;
    } catch {
      return false;
    } finally {
      setIsLoggingOut(false);
    }
  }

  return {
    isLoggingOut,
    submitLogout,
  };
}
