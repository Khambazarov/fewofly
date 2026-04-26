import { useState } from "react";
import { getUsersRequest, type AssignableUser } from "../lib/user-api";

export function useAssignableUsers() {
  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([]);

  async function loadAssignableUsers() {
    try {
      const result = await getUsersRequest();
      setAssignableUsers(result);
      return result;
    } catch {
      setAssignableUsers([]);
      return [];
    }
  }

  return {
    assignableUsers,
    loadAssignableUsers,
  };
}
