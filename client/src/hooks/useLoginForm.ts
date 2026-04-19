import { useState } from "react";

export function useLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return {
    username,
    password,
    setUsername,
    setPassword,
  };
}
