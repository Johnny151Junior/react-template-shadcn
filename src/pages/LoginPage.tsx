import type { ILoginSchema } from "@/features/auth/model/auth.types";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Login } from "@/features/auth/api/auth.api";
import { handleAxiosError } from "@/shared/api/handle-error";
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
