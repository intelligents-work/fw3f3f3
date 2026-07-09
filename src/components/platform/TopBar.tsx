import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User, MessageCircle } from "lucide-react";
import { usePlatform } from "@/lib/platform/context";
import { StatusChip } from "./primitives";

export function TopBar() {
  const { chatOpen, setChatOpen } = usePlatform();
  return (
    <header className="sticky top-0 z-40 h-14 bg-white border-b border-border flex items-center px-3 lg:px-6 gap-3">
      <SidebarTrigger />
      <div className="hidden md:flex items-center gap-2">
        <StatusChip tone="success">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(145_63%_42%)] animate-pulse" />
          Live · Management View
        </StatusChip>
        <StatusChip tone="neutral">HK · Week 42</StatusChip>
      </div>

      <div className="hidden lg:flex items-center gap-2 ml-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search stores, campaigns, segments…"
            className="w-full h-9 pl-9 pr-3 rounded-full bg-muted/60 text-sm border border-transparent focus:outline-none focus:border-primary/40 focus:bg-white" />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
            ${chatOpen ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
        <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
          <Bell className="w-4 h-4" />
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border">
          <div className="text-right leading-tight">
            <div className="text-xs font-semibold text-foreground">Commercial Team</div>
            <div className="text-[10px] text-muted-foreground">Fairwood HK</div>
          </div>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
