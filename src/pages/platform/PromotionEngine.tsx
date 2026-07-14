import { useState } from "react";
import { usePlatform } from "@/lib/platform/context";
import { rankPromos } from "@/lib/platform/engine";
import { segments } from "@/lib/platform/data";
import { KpiTile, SectionHeader, ConfidenceMeter, RiskBadge, StatusChip, VerdictChip, PageHeader, PriorityCard } from "@/components/platform/primitives";
import { Sparkles, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { fmtHKDFromK } from "@/lib/platform/format";

export default function PromotionEngine() {
  const { scenario, setScenario, sim } = usePlatform();
  const ranked = rankPromos(scenario);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = ranked[selectedIdx];
  const seg = segments.find(s => s.id === scenario.segmentId)!;
  const top = ranked[0];
  const launchFirst = top.sim.storeSuitability.filter(s => s.verdict === "Launch first").map(s => s.name).slice(0, 3).join(", ") || top.sim.storeSuitability.slice(0, 2).map(s => s.name).join(", ");

  const applySelected = () => setScenario({ promoType: selected.promo.id });

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        eyebrow="Promotion planning"
        title="Promo Recommendation"
        subtitle={`Three ranked options for ${seg.name} at ${scenario.depth}% depth, with the top pick highlighted.`}
        takeaway={<><b className="text-primary">{top.promo.name}</b> ranks #1 with <b className="text-primary">+{top.sim.uplift}% uplift</b> and {fmtHKDFromK(top.sim.incremental)} incremental. Launch first in {launchFirst}.</>}
        meta={<><RiskBadge risk={top.sim.risk} /><StatusChip tone="primary">Recommended</StatusChip></>}
        action={
          <button onClick={applySelected} className="btn-fairwood text-sm">
            <Check className="w-4 h-4 inline mr-1" /> Apply selected
          </button>
        }
      />


      <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary/5 border border-primary/15 text-xs text-foreground">
        <Info className="w-3.5 h-3.5 text-primary shrink-0" />
        <span><b className="text-primary">Phase 1 POC</b> — validate on launch-first stores before wider rollout.</span>
      </div>

      {/* Ranked cards — #1 is visually dominant */}
      <div className="grid md:grid-cols-5 gap-4">
        {ranked.map((r, i) => {
          const active = i === selectedIdx;
          const isTop = i === 0;
          const Wrap: any = isTop ? PriorityCard : "div";
          return (
            <button key={r.promo.id} onClick={() => setSelectedIdx(i)}
              className={cn(
                "text-left transition-all",
                isTop ? "md:col-span-3" : "md:col-span-1",
              )}>
              <Wrap className={cn(
                "rounded-2xl overflow-hidden bg-card border-2 h-full",
                isTop
                  ? active
                    ? "border-primary shadow-[0_16px_44px_-12px_hsl(14_89%_51%/0.4)] ring-4 ring-primary/15"
                    : "border-primary/60 shadow-[0_12px_36px_-12px_hsl(14_89%_51%/0.32)]"
                  : active
                    ? "border-primary shadow-card-hover ring-2 ring-primary/10"
                    : "border-transparent shadow-card hover:shadow-card-hover",
              )}>
                <div className={cn("relative overflow-hidden", isTop ? "h-48" : "h-28")}>
                  <img src={r.promo.hero} alt={r.promo.name} className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    {i === 0 && <StatusChip tone="primary"><Sparkles className="w-3 h-3" />Recommended</StatusChip>}
                    {i === 1 && <StatusChip tone="info">Alt A</StatusChip>}
                    {i === 2 && <StatusChip tone="neutral">Alt B</StatusChip>}
                  </div>
                  <div className="absolute bottom-2 left-3 text-white">
                    <div className="text-xs opacity-90">#{i + 1}</div>
                    <div className={cn("font-bold leading-tight", isTop ? "text-2xl" : "text-base")}>{r.promo.name}</div>
                  </div>
                </div>
                <div className={cn("space-y-3", isTop ? "p-5" : "p-3")}>
                  <p className={cn("text-muted-foreground", isTop ? "text-sm" : "text-[11px] line-clamp-2")}>{r.promo.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={cn("relative rounded-lg min-w-0", isTop ? "p-3 bg-primary/5 ring-1 ring-primary/15" : "p-2 bg-muted/50")}>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground leading-none mb-1">Uplift</div>
                      <div className={cn("font-bold text-[hsl(145_63%_36%)] tabular-nums leading-tight", isTop ? "text-2xl" : "text-base")}>+{r.sim.uplift}%</div>
                    </div>
                    <div className={cn("relative rounded-lg min-w-0", isTop ? "p-3 bg-primary/5 ring-1 ring-primary/15" : "p-2 bg-muted/50")}>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground leading-none mb-1">Incremental</div>
                      <div className={cn("font-bold text-primary tabular-nums leading-tight", isTop ? "text-2xl" : "text-base")}>{fmtHKDFromK(r.sim.incremental)}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <ConfidenceMeter value={r.sim.confidence} />
                    <ConfidenceMeter value={r.sim.margin} label="Margin" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <RiskBadge risk={r.sim.risk} />
                    <StatusChip tone="neutral">Target: {seg.name}</StatusChip>
                  </div>
                </div>
              </Wrap>
            </button>
          );
        })}
      </div>

      {/* Detail panel for selected */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-card p-5">
          <SectionHeader title={`Why "${selected.promo.name}" for ${seg.name}?`} subtitle="Plain-English rationale" />
          <p className="text-sm text-foreground leading-relaxed">{selected.sim.explanation}</p>
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/15">
            <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Recommended action</div>
            <p className="text-sm text-foreground">{selected.sim.recommendation}</p>
          </div>

          <div className="mt-5">
            <SectionHeader title="Where to launch first" subtitle="Ranked by store fit" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {selected.sim.storeSuitability.map(s => (
                <div key={s.storeId} className="p-3 rounded-lg bg-muted/40 border border-border">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">Fit {s.score}</div>
                  <VerdictChip verdict={s.verdict} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <SectionHeader title="Segment fit ranking" />
          <div className="space-y-2">
            {selected.sim.segmentResponse.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</div>
                <div className="flex-1">
                  <div className="text-xs font-medium">{s.name}</div>
                  <div className="h-1.5 rounded-full bg-muted mt-1 overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold tabular-nums w-8 text-right">{s.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
