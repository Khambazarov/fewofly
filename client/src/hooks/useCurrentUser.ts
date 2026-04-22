import { useState } from "react";
import { getCurrentUserRequest } from "../lib/auth-api";
import type { CurrentUser } from "../lib/auth-types";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  async function loadCurrentUser(): Promise<CurrentUser | null> {
    try {
      const user = await getCurrentUserRequest();
      setCurrentUser(user);
      return user;
    } catch {
      setCurrentUser(null);
      return null;
    }
  }

  return {
    currentUser,
    setCurrentUser,
    loadCurrentUser,
  };
}
