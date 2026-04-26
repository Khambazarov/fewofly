import { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import LoggedInCard from "./components/LoggedInCard";
import LoginCard from "./components/LoginCard";
import NewRequestCard from "./components/NewRequestCard";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useAdminArea } from "./hooks/useAdminArea";
import { useAssignableUsers } from "./hooks/useAssignableUsers";
import { useCreateRequest } from "./hooks/useCreateRequest";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useEmployeeArea } from "./hooks/useEmployeeArea";
import { useLoginForm } from "./hooks/useLoginForm";
import { useLoginRequest } from "./hooks/useLoginRequest";
import { useLogout } from "./hooks/useLogout";
import { useProtectedDashboard } from "./hooks/useProtectedDashboard";
import { useRequests } from "./hooks/useRequests";
import { useSupervisorArea } from "./hooks/useSupervisorArea";
import { useTheme } from "./hooks/useTheme";
import {
  PASSWORD_VALIDATION_MESSAGE,
  USERNAME_VALIDATION_MESSAGE,
} from "./lib/messages";
import { isLoginButtonDisabled } from "./lib/login-button";
import { isLoginFormValid } from "./lib/validation";
import type { CreateRequestInput } from "./lib/request-api";
import type { RequestItem } from "./lib/request-api";
import { mapRequestToEditFormState } from "./lib/request-edit-mapper";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null);

  const {
    username,
    password,
    usernameTouched,
    passwordTouched,
    setUsername,
    setPassword,
    setUsernameTouched,
    setPasswordTouched,
  } = useLoginForm();

  const { isLoading, errorMessage, submitLogin } = useLoginRequest();
  const { isLoggingOut, submitLogout } = useLogout();
  const { currentUser, setCurrentUser, loadCurrentUser } = useCurrentUser();
  const { dashboardData, loadProtectedDashboard } = useProtectedDashboard();
  const { requests, loadRequests } = useRequests();
  const { employeeAreaData, loadEmployeeArea } = useEmployeeArea();
  const { adminAreaData, loadAdminArea } = useAdminArea();
  const { supervisorAreaData, loadSupervisorArea } = useSupervisorArea();
  const { assignableUsers, loadAssignableUsers } = useAssignableUsers();
  const { isCreating, createErrorMessage, submitCreateRequest } =
    useCreateRequest();

  useEffect(() => {
    async function initializeUserSession() {
      const user = await loadCurrentUser();

      if (user) {
        await loadProtectedDashboard();
        await loadRequests();
        await loadEmployeeArea();
        await loadAssignableUsers();

        if (user.role === "admin" || user.role === "supervisor") {
          await loadAdminArea();
        }

        if (user.role === "supervisor") {
          await loadSupervisorArea();
        }
      }
    }

    void initializeUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  async function handleSubmit(
    event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0],
  ) {
    event.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);

    if (!isLoginFormValid(username, password)) {
      return;
    }

    const user = await submitLogin(username, password);

    if (user) {
      await loadCurrentUser();
      await loadProtectedDashboard();
      await loadRequests();
      await loadEmployeeArea();
      await loadAssignableUsers();

      if (user.role === "admin" || user.role === "supervisor") {
        await loadAdminArea();
      }

      if (user.role === "supervisor") {
        await loadSupervisorArea();
      }
    }
  }

  async function handleCreateRequest(
    input: CreateRequestInput,
  ): Promise<boolean> {
    const result = await submitCreateRequest(input);

    if (result) {
      await loadRequests();
      await loadProtectedDashboard();
      await loadEmployeeArea();
      await loadAssignableUsers();

      if (currentUser?.role === "admin" || currentUser?.role === "supervisor") {
        await loadAdminArea();
      }

      if (currentUser?.role === "supervisor") {
        await loadSupervisorArea();
      }

      setIsCreateRequestOpen(false);
    }

    return Boolean(result);
  }

  async function handleLogout() {
    const success = await submitLogout();

    if (success) {
      setCurrentUser(null);
      window.location.reload();
    }
  }

  function handleEditRequest(request: RequestItem) {
    const mappedRequest = mapRequestToEditFormState(request);
    console.log("Edit request prepared:", mappedRequest);
    setEditingRequestId(request.id);
  }

  const usernameValidationMessage =
    usernameTouched && username.trim().length < 3
      ? USERNAME_VALIDATION_MESSAGE
      : undefined;

  const passwordValidationMessage =
    passwordTouched && password.trim().length < 8
      ? PASSWORD_VALIDATION_MESSAGE
      : undefined;

  return (
    <AppShell theme={theme}>
      <header className="mb-12 flex flex-col gap-4 sm:relative sm:block">
        <div className="flex justify-end sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
          <ThemeToggleButton theme={theme} onToggle={handleToggleTheme} />
        </div>

        <h1 className="text-center text-3xl font-bold">
          FewoFly Internal Tool
        </h1>
      </header>

      {currentUser ? (
        <div className="space-y-6">
          {isCreateRequestOpen ? (
            <NewRequestCard
              theme={theme}
              currentUserId={currentUser.id}
              assignableUsers={assignableUsers}
              onCreateRequest={handleCreateRequest}
              onCancel={() => setIsCreateRequestOpen(false)}
              isCreating={isCreating}
              createErrorMessage={createErrorMessage}
            />
          ) : null}

          <LoggedInCard
            theme={theme}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
            onEditRequest={handleEditRequest}
            isLoggingOut={isLoggingOut}
            protectedMessage={dashboardData?.message}
            employeeMessage={employeeAreaData?.message}
            adminMessage={adminAreaData?.message}
            supervisorMessage={supervisorAreaData?.message}
            requests={requests}
          />
        </div>
      ) : (
        <LoginCard
          theme={theme}
          description="Sign in to access your internal workspace."
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onUsernameBlur={() => setUsernameTouched(true)}
          onPasswordBlur={() => setPasswordTouched(true)}
          usernameValidationMessage={usernameValidationMessage}
          passwordValidationMessage={passwordValidationMessage}
          requestErrorMessage={errorMessage}
          onSubmit={handleSubmit}
          buttonLabel="Login"
          usernamePlaceholder="Enter your username"
          passwordPlaceholder="Enter your password"
          isButtonDisabled={isLoginButtonDisabled(username, password)}
          isLoading={isLoading}
        />
      )}
    </AppShell>
  );
}
