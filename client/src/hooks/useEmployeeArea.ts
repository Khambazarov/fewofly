import { useState } from "react";
import { getEmployeeAreaRequest } from "../lib/employee-api";

type EmployeeAreaData = {
  message: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
};

export function useEmployeeArea() {
  const [employeeAreaData, setEmployeeAreaData] =
    useState<EmployeeAreaData | null>(null);

  async function loadEmployeeArea() {
    try {
      const result = await getEmployeeAreaRequest();
      setEmployeeAreaData(result);
      return result;
    } catch {
      setEmployeeAreaData(null);
      return null;
    }
  }

  return {
    employeeAreaData,
    loadEmployeeArea,
  };
}
