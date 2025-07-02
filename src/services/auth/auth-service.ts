import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export const Login = async (username: string, password: string) => {
  const { setTokens } = useAuthStore();
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  setTokens(response.data.accessToken, response.data.refreshToken);
  return response;
};
export const Logout = () => {
  const { clearAuth } = useAuthStore();
  clearAuth();
};
