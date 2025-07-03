import type { ILoginSchema } from "@/services/auth/auth-schema";
import { LoginForm } from "./components/login-form";
import { Login } from "@/services/auth/auth-service";
import { handleAxiosError } from "@/lib/api/handle-error";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function LoginPage() {
  const naviationTo = useNavigate();
  async function onSubmit(data: ILoginSchema) {
    try {
      await Login(data.username, data.password);
      toast.success("Login successful");
      naviationTo("/dashboard", { replace: true });
    } catch (error) {
      const wrap = handleAxiosError(error);
      toast(wrap.message);
    }
  }
  return <LoginForm submit={onSubmit} />;
}

export default LoginPage;
