export function getRoleLabel(role: string) {
  if (role === "supervisor") {
    return "Supervisor";
  }

  if (role === "admin") {
    return "Admin";
  }

  return "Employee";
}
