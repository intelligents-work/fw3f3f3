import { useState } from "react";
import { usePlatform } from "@/lib/platform/context";
import { rankPromos } from "@/lib/platform/engine";
import { segments } from "@/lib/platform/data";
import { KpiTile, SectionHeader, ConfidenceMeter, RiskBadge, StatusChip, VerdictChip } from "@/components/platform/primitives";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PromotionEngine() {
  const { scenario, setScenario, sim } = usePlatform();
  const ranked = rankPromos(scenario);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = ranked[selectedIdx];
  const seg = segments.find(s => s.id === scenario.segmentId)!;

  const applySelected = () => setScenario({ promoType: selected.promo.id });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Promotion Engine</h1>
          <p className="text-sm text-muted-foreground">Ranked promo options for <span className="font-semibold text-foreground">{seg.name}</span> at {scenario.depth}% depth.</p>
        </div>
        <button onClick={applySelected} className="btn-fairwood text-sm">
          <Check className="w-4 h-4 inline mr-1" /> Apply selected scenario
        </button>
      </div>

      {/* 3 ranked cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {ranked.map((r, i) => {
          const active = i === selectedIdx;
          return (
            <button key={r.promo.id} onClick={() => setSelectedIdx(i)}
              className={cn(
                "text-left rounded-2xl overflow-hidden bg-card border-2 transition-all",
                active ? "border-primary shadow-card-hover ring-4 ring-primary/10" : "border-transparent shadow-card hover:shadow-card-hover"
              )}>
              <div className="relative h-32 overflow-hidden">
                <img src={r.promo.hero} alt={r.promo.name} className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {i === 0 && <StatusChip tone="primary"><Sparkles className="w-3 h-3" />Recommended</StatusChip>}
                  {i === 1 && <StatusChip tone="info">Alt A</StatusChip>}
                  {i === 2 && <StatusChip tone="neutral">Alt B</StatusChip>}
                </div>
                <div className="absolute bottom-2 left-3 text-white">
                  <div className="text-xs opacity-90">#{i + 1}</div>
                  <div className="text-lg font-bold leading-tight">{r.promo.name}</div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-muted-foreground">{r.promo.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <div className="text-muted-foreground">Uplift</div>
                    <div className="text-lg font-bold text-[hsl(145_63%_36%)]">+{r.sim.uplift}%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <div className="text-muted-foreground">Incremental</div>
                    <div className="text-lg font-bold text-primary">HKD {r.sim.incremental}K</div>
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
