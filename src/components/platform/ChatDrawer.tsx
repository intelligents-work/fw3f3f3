import { usePlatform } from "@/lib/platform/context";
import { ChatAssistant } from "@/components/ChatAssistant";
import { X, Sparkles } from "lucide-react";

export function ChatDrawer() {
  const { chatOpen, setChatOpen, scenario, sim } = usePlatform();
  if (!chatOpen) return null;
  return (
    <aside className="fixed top-14 right-0 bottom-0 w-[380px] bg-white border-l border-border shadow-2xl z-40 animate-slide-in-right flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">AI Assistant</div>
            <div className="text-[10px] text-muted-foreground">
              Context: {scenario.segmentId} · {scenario.promoType} · {scenario.depth}% · uplift {sim.uplift}%
            </div>
          </div>
        </div>
        <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-muted rounded-full">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 min-h-0">
        <ChatAssistant compact />
      </div>
    </aside>
  );
}
