import {
  LOCALSTORE_ACCESS_TOKEN_KEY,
  LOCALSTORE_REFRESH_TOKEN_KEY,
} from "@/shared/constants/auth-local-storage";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  reAndSetFromLocal: () => {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken });
    localStorage.setItem(LOCALSTORE_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(LOCALSTORE_REFRESH_TOKEN_KEY, refreshToken);
  },
  clearAuth: () => {
    set({ accessToken: null, refreshToken: null });
    localStorage.removeItem(LOCALSTORE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORE_REFRESH_TOKEN_KEY);
  },
  reAndSetFromLocal: () => {
    const accessToken =
      localStorage.getItem(LOCALSTORE_ACCESS_TOKEN_KEY) || null;
    const refreshToken =
      localStorage.getItem(LOCALSTORE_REFRESH_TOKEN_KEY) || null;
    set({ accessToken, refreshToken });
    if (!accessToken || !refreshToken) {
      get().clearAuth();
    }
    return { accessToken, refreshToken };
  },
}));
