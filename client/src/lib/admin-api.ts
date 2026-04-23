import { API_BASE_URL } from "./api";

export async function getAdminAreaRequest() {
  const response = await fetch(`${API_BASE_URL}/protected/admin`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Admin area request failed");
  }

  return response.json();
}
