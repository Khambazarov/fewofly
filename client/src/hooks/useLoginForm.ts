import { useState } from "react";

export function useLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  return {
    username,
    password,
    usernameTouched,
    passwordTouched,
    setUsername,
    setPassword,
    setUsernameTouched,
    setPasswordTouched,
  };
}
