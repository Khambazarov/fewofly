import { API_BASE_URL } from "./api";

type LoginRequest = {
  username: string;
  password: string;
};

export async function loginRequest({ username, password }: LoginRequest) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login request failed");
  }

  return response.json();
}
