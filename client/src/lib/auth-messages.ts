export function getLoginButtonLabel(role: "employee" | "admin") {
  return role === "admin" ? "Login as Admin" : "Login as Employee";
}
