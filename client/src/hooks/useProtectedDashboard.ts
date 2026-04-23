import { useState } from "react";
import { getProtectedDashboardRequest } from "../lib/protected-api";

type ProtectedDashboardData = {
  message: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
};

export function useProtectedDashboard() {
  const [dashboardData, setDashboardData] =
    useState<ProtectedDashboardData | null>(null);

  async function loadProtectedDashboard() {
    try {
      const result = await getProtectedDashboardRequest();
      setDashboardData(result);
      return result;
    } catch {
      setDashboardData(null);
      return null;
    }
  }

  return {
    dashboardData,
    loadProtectedDashboard,
  };
}
