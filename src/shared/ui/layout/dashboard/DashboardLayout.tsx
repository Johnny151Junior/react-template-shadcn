import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { DashboardLayoutSidebar } from "./DashboardLayoutSidebar";
import { DashboardLayoutBreadcrumb } from "./DashboardLayoutBreadcrumb";
import { useLocation, Outlet } from "react-router";
import type { NavGroup } from "@/shared/lib/types/nav-group.type";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const location = useLocation();
  const [navGroups, setNavGroups] = useState<NavGroup[]>([
    {
      title: "",
      url: "",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          isActive: false,
        },
      ],
    },
    {
      title: "Main Functions",
      url: "#",
      items: [
        {
          title: "KPV Point",
          url: "/kpv-point/list",
          isActive: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    setNavGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        items: group.items.map((item) => {
          const pathPart = location.pathname.split("/")[1];
          const itemPart = item.url.split("/")[1];
          return {
            ...item,
            isActive: pathPart === itemPart,
          };
        }),
      }))
    );
  }, [location.pathname]);
  return (
    <SidebarProvider>
      {/* SIDEBAER */}

      <DashboardLayoutSidebar navGroups={navGroups} />
      {/* Header TOP +  MAIN CONTENT */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {/* CRUMB */}
          <DashboardLayoutBreadcrumb />
        </header>
        {/* MAIN CONTENT */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] px-8 py-10  flex-1 rounded-md md:min-h-min">
            <Outlet></Outlet>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
