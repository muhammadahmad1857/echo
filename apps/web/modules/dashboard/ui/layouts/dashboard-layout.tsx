import React from "react";
import { AuthGaurd } from "@/modules/auth/ui/components/auth-gaurd";
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
export const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";
  return (
    <AuthGaurd>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardSidebar />
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarProvider>
    </AuthGaurd>
  );
};
