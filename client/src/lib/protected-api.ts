import { API_BASE_URL } from "./api";

export async function getProtectedDashboardRequest() {
  const response = await fetch(`${API_BASE_URL}/protected/dashboard`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Protected dashboard request failed");
  }

  return response.json();
}
