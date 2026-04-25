import { API_BASE_URL } from "./api";

export async function getEmployeeAreaRequest() {
  const response = await fetch(`${API_BASE_URL}/protected/employee`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Employee area request failed");
  }

  return response.json();
}
