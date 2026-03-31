export const dynamic = "force-dynamic"
import { AppSidebar } from "@/components/app-sidebar";
import LogoutButton from "@/components/modules/shared/LogoutButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { Children } from "react";

export default async function DashboardLayout({
    student,
  admin,
  tutor,
}: {
  student: React.ReactNode;
  admin: React.ReactNode;
  tutor: React.ReactNode;
}) {
    const { data } = await userService.getSession();
  const userInfo = {
    role: data?.user.role,
  };
  


  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{userInfo.role}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="w-full flex justify-end">
            <LogoutButton></LogoutButton>
          </div>
          
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === "admin" ? admin : userInfo.role === "tutor" ? tutor : student}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}