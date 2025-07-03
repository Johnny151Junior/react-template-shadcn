import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <>
      top
      <Outlet />
      bottom
    </>
  );
}

export default DashboardLayout;
