import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 h-14 bg-card border-b border-border flex items-center px-3 lg:px-5 gap-3 shadow-sm">
      <div className="text-foreground"><SidebarTrigger /></div>

      <div className="ml-auto flex items-center gap-2">
        <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
          <Bell className="w-4 h-4" />
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-2.5 ml-1 border-l border-border">
          <div className="text-right leading-tight">
            <div className="text-[11px] font-semibold text-foreground">Commercial Team</div>
            <div className="text-[10px] text-muted-foreground">Fairwood HK</div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(8_85%_44%)] flex items-center justify-center shadow-md">
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
