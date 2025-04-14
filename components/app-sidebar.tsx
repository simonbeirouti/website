"use client"

import * as React from "react"

import { NavGroup } from "@/components/nav-group"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { dashboardRoutes } from "@/lib/routes"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavUser />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup groupTitle="Platform" items={dashboardRoutes.navMain} />
        <NavGroup groupTitle="Profile" items={dashboardRoutes.profile} />
        <NavGroup groupTitle="Team" items={dashboardRoutes.team} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={dashboardRoutes.navSecondary} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  )
}
