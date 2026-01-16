import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter a username or email.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}
export interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}
