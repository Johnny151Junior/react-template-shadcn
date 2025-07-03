import AuthLayout from "@/components/layout/auth/auth-layout";
import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";
import LoginPage from "@/pages/auth/login-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import NotFoundPage from "@/pages/not-found";
import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        index: true,
        path: "",
        Component: LoginPage,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        path: "",
        Component: DashboardPage,
      },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
