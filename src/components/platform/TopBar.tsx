import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User, MessageCircle } from "lucide-react";
import { usePlatform } from "@/lib/platform/context";
import { StatusChip } from "./primitives";

export function TopBar() {
  const { chatOpen, setChatOpen } = usePlatform();
  return (
    <header className="sticky top-0 z-40 h-14 bg-gradient-to-r from-[hsl(0_0%_15%)] via-[hsl(0_0%_18%)] to-[hsl(0_0%_15%)] border-b border-[hsl(0_0%_10%)] flex items-center px-3 lg:px-5 gap-3 shadow-md">
      <div className="text-white/90"><SidebarTrigger /></div>

      <div className="hidden md:flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[hsl(145_63%_42%/0.18)] text-[hsl(145_70%_65%)] ring-1 ring-[hsl(145_63%_42%/0.35)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(145_63%_55%)] animate-pulse" />
          Live · Management View
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.08] text-white/70 ring-1 ring-white/10">
          HK · Week 42
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary/20 text-[hsl(14_100%_75%)] ring-1 ring-primary/40">
          大快活 · Fairwood AI
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-2 ml-3 flex-1 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <input placeholder="Search stores, campaigns, segments…"
            className="w-full h-8 pl-8 pr-3 rounded-full bg-white/[0.08] text-xs text-white placeholder:text-white/40 border border-white/10 focus:outline-none focus:border-primary/60 focus:bg-white/[0.12]" />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-semibold transition-all
            ${chatOpen ? 'bg-primary text-primary-foreground shadow-[0_2px_10px_hsl(14_89%_51%/0.5)]' : 'bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/10'}`}>
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
        <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70">
          <Bell className="w-4 h-4" />
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-2.5 ml-1 border-l border-white/10">
          <div className="text-right leading-tight">
            <div className="text-[11px] font-semibold text-white">Commercial Team</div>
            <div className="text-[10px] text-white/50">Fairwood HK</div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(8_85%_44%)] flex items-center justify-center shadow-md">
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
