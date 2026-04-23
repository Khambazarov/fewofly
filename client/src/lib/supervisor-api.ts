import { API_BASE_URL } from "./api";

export async function getSupervisorAreaRequest() {
  const response = await fetch(`${API_BASE_URL}/protected/supervisor`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Supervisor area request failed");
  }

  return response.json();
}
