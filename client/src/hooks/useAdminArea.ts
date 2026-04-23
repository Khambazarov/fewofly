import { useState } from "react";
import { getAdminAreaRequest } from "../lib/admin-api";

type AdminAreaData = {
  message: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
};

export function useAdminArea() {
  const [adminAreaData, setAdminAreaData] = 
    useState<AdminAreaData | null>(null);

  async function loadAdminArea() {
    try {
      const result = await getAdminAreaRequest();
      setAdminAreaData(result);
      return result;
    } catch {
      setAdminAreaData(null);
      return null;
    }
  }

  return {
    adminAreaData,
    loadAdminArea,
  };
}
