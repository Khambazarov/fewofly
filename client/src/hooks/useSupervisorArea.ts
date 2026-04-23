import { useState } from "react";
import { getSupervisorAreaRequest } from "../lib/supervisor-api";

type SupervisorAreaData = {
  message: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
};

export function useSupervisorArea() {
  const [supervisorAreaData, setSupervisorAreaData] =
    useState<SupervisorAreaData | null>(null);

  async function loadSupervisorArea() {
    try {
      const result = await getSupervisorAreaRequest();
      setSupervisorAreaData(result);
      return result;
    } catch {
      setSupervisorAreaData(null);
      return null;
    }
  }

  return {
    supervisorAreaData,
    loadSupervisorArea,
  };
}
