import type { ILoginSchema } from "@/services/auth/auth-schema";
import { LoginForm } from "./components/login-form";
import { Login } from "@/services/auth/auth-service";

function LoginPage() {
  async function onSubmit(data: ILoginSchema) {
    Login(data.email, data.password);
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm submit={onSubmit} />
      </div>
    </div>
  );
}

export default LoginPage;
