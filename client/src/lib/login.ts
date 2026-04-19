export function getLoginDescription(role: "employee" | "admin") {
  if (role === "admin") {
    return "Sign in with your admin account to manage internal operations and access extended controls.";
  }

  return "Sign in with your employee account to access internal inquiry and operations workflows.";
}
