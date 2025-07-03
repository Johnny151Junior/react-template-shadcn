import { useAuthStore } from "@/store/auth-store";
import { redirect } from "react-router";

// This is our "middleware" loader.
export const authMiddleware = (options: {
  directTo?: string;
  roles?: string[];
  permissions?: string[];
}) => {
  const authState = useAuthStore.getState();
  const { accessToken } = authState.accessToken
    ? { accessToken: authState.accessToken }
    : authState.reAndSetFromLocal();
  if (!accessToken) {
    // If the user is not authenticated, redirect them to the /login page.
    return redirect(options.directTo || "/");
  }
  // if have roles and permissions continue down bellow
  // If they are authenticated, we can return null or any data they need.
  return null;
};
