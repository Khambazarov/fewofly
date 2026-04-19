export function getUsernamePlaceholder(role: "employee" | "admin") {
  return role === "admin"
    ? "Enter your admin username"
    : "Enter your employee username";
}

export function getPasswordPlaceholder(role: "employee" | "admin") {
  return role === "admin"
    ? "Enter your admin password"
    : "Enter your employee password";
}
