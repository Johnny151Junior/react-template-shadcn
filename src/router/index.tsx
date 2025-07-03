import AuthLayout from "@/components/layout/auth/auth-layout";
import DashboardLayout from "@/components/layout/dashboard/dashboard-layout";
import LoginPage from "@/pages/auth/login-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import NotFoundPage from "@/pages/not-found";
import { createBrowserRouter } from "react-router";
import { authMiddleware } from "./loader/auth-middleware";
import { guestMiddleware } from "./loader/guest-middleware";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    loader: guestMiddleware,
    children: [
      {
        index: true,
        path: "",
        Component: LoginPage,
      },
    ],
  },
  {
    path: "",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        handle: {
          breadcrumb: () => "Dashboard",
        },
        path: "/dashboard",
        loader: authMiddleware,
        Component: DashboardPage,
      },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
