import * as React from "react"


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
} from "@/components/ui/sidebar"

import { adminRoutes } from "@/routes/adminRoutes"
import { Route } from "@/types/routes.type"
import { memberRoutes } from "@/routes/memberRoutes";

// This is sample data.


export function AppSidebar({ user,...props }: {user: { role: string } & React.ComponentProps<typeof Sidebar> } ) {

  let routes: Route[] = [];
  console.log("user data side",user.role);
  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "MEMBER":
      routes = memberRoutes;
      break;
    default:
      routes = [];
      break;
  }
  
  return (
    <Sidebar {...props}>
     
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
    
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
