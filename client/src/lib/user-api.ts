import { API_BASE_URL } from "./api";

export type AssignableUser = {
  id: string;
  username: string;
  role: string;
};

export async function getUsersRequest(): Promise<AssignableUser[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Users request failed");
  }

  return response.json();
}
