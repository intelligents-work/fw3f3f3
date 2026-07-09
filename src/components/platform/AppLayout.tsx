import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { ScenarioBar } from "./ScenarioBar";
import { PlatformProvider } from "@/lib/platform/context";

function Main() {
  const { pathname } = useLocation();
  const showScenario = pathname !== "/";
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[hsl(30_20%_98%)] via-[hsl(30_25%_97%)] to-[hsl(14_30%_96%)]">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        {showScenario && <ScenarioBar />}
        <main className="flex-1">
          <div className="max-w-[1500px] mx-auto px-4 lg:px-6 py-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <PlatformProvider>
      <SidebarProvider defaultOpen>
        <Main />
      </SidebarProvider>
    </PlatformProvider>
  );
}
