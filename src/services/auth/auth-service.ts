import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import type { IHttpResponse } from "@/types/http-response.type";
import type { ILoginResponse } from "./auth.type";

export const Login = async (username: string, password: string) => {
  const auth = useAuthStore.getState();
  const response = await api.post<IHttpResponse<ILoginResponse>>(
    "/auth/login",
    {
      email: username,
      password,
    }
  );
  console.log(
    response.data.data?.access_token,
    response.data.data?.refresh_token
  );
  if (response.data.data) {
    auth.setTokens(
      response.data.data.access_token,
      response.data.data.refresh_token
    );
  }
  return response.data.data;
};
export const getMe = async () => {
  const response = await api.get<IHttpResponse<ILoginResponse>>("auth/profile");
  if (response.data.data) {
    console.log("HI", response);
  }
  return response.data.data;
};

export const Logout = () => {
  const { clearAuth } = useAuthStore();
  clearAuth();
};
