import { useState } from "react";
import { getCurrentUserRequest } from "../lib/auth-api";

type CurrentUser = {
  id: string;
  username: string;
  role: string;
};

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  async function loadCurrentUser() {
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
    loadCurrentUser,
  };
}
