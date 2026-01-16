import api from "@/shared/api";
import { useAuthStore } from "@/features/auth/model/auth.store";
import type { IHttpResponse } from "@/shared/lib/types/http-response.type";
import type { ILoginResponse } from "../model/auth.types";

export const Login = async (username: string, password: string) => {
  const auth = useAuthStore.getState();
  const response = await api.post<IHttpResponse<ILoginResponse>>(
    "/auth/login",
    {
      email: username,
      password,
    }
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
  return response.data.data;
};

export const Logout = () => {
  const { clearAuth } = useAuthStore();
  clearAuth();
};
