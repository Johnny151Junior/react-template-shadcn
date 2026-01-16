import AuthLayout from "@/shared/ui/layout/AuthLayout";
import DashboardLayout from "@/shared/ui/layout/dashboard/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/not-found";
import { createBrowserRouter } from "react-router";
import { authMiddleware } from "./auth-middleware";
import { guestMiddleware } from "./guest-middleware";
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
