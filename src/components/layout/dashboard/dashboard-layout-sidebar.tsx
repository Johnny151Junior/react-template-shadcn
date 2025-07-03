import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { NavGroup } from "@/types/nav-group.type";

export function DashboardLayoutSidebar({
  navGroups,
  ...props
}: React.ComponentProps<typeof Sidebar> & { navGroups: NavGroup[] }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>LOGO</SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navGroups.map((item, index) => (
          <React.Fragment key={`${item.url}-${index}`}>
            {item.items ? (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ) : (
              <SidebarMenuItem key={`${item.url}-${index}`}>
                <SidebarMenuButton asChild isActive={item.isActive} color="red">
                  <a href={item.url}>{item.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </React.Fragment>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
