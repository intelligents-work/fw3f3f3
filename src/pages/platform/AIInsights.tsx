import { ChatAssistant } from "@/components/ChatAssistant";
import { SectionHeader, StatusChip, PageHeader } from "@/components/platform/primitives";
import { Sparkles } from "lucide-react";
import { usePlatform } from "@/lib/platform/context";

const prompts = [
  "Why is this campaign recommended?",
  "Which stores should receive this promotion first?",
  "What is driving the forecast drop on Friday?",
  "Which segment has the highest expected response?",
  "What is the revenue upside vs current promo?",
  "What is the risk of raising discount to 20%?",
  "Summarize this recommendation for management.",
];

const savedInsights = [
  { title: "Weekend Family Set — why it wins", meta: "Yesterday" },
  { title: "Depth sensitivity for Tea Combo Upsell", meta: "2 days ago" },
  { title: "Mong Kok vs Causeway Bay lunch response", meta: "1 week ago" },
];

export default function AIInsights() {
  const { sim, scenario } = usePlatform();
  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        eyebrow="AI Assistant · Management Insights"
        title="AI Insights"
        subtitle="Ask the assistant to explain recommendations, compare options, and summarize for management."
        takeaway={<>Assistant is scoped to your current scenario — <b className="text-primary">{scenario.segmentId.replace("-", " ")}</b>, {scenario.promoType} at {scenario.depth}% depth, projecting <b className="text-primary">+{sim.uplift}% uplift</b>.</>}
        meta={<StatusChip tone="primary"><Sparkles className="w-3 h-3" />Live context</StatusChip>}
      />


      <div className="grid lg:grid-cols-[280px_1fr] gap-5">
        <aside className="space-y-4">
          <div className="glass-card p-4">
            <SectionHeader title="Prompt chips" />
            <div className="flex flex-col gap-1.5">
              {prompts.map(p => (
                <div key={p} className="text-xs px-3 py-2 rounded-lg bg-muted/50 text-foreground border border-transparent hover:border-primary/30 transition-colors cursor-default">
                  {p}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">Copy any prompt into the chat on the right or the global Ask AI drawer.</p>
          </div>

          <div className="glass-card p-4">
            <SectionHeader title="Saved insights" />
            <div className="space-y-2">
              {savedInsights.map(s => (
                <div key={s.title} className="p-2.5 rounded-lg hover:bg-muted/50 cursor-default border border-transparent hover:border-border">
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{s.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4 bg-gradient-to-br from-primary/8 to-transparent">
            <StatusChip tone="primary">Tip</StatusChip>
            <p className="text-xs text-foreground mt-2 leading-relaxed">
              The assistant sees your current scenario. Change a lever in the scenario bar to shift context, then ask again.
            </p>
          </div>
        </aside>

        <div className="glass-card overflow-hidden" style={{ height: "70vh" }}>
          <ChatAssistant compact />
        </div>
      </div>
    </div>
  );
}
