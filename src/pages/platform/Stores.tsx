import { stores } from "@/lib/platform/data";
import { usePlatform } from "@/lib/platform/context";
import { SectionHeader, StatusChip, VerdictChip, PageHeader, DemoTag } from "@/components/platform/primitives";
import { cn } from "@/lib/utils";

const metrics: { key: keyof typeof stores[0]; label: string; format?: (n: number) => string }[] = [
  { key: "demandIndex", label: "Demand" },
  { key: "responsiveness", label: "Promo response" },
  { key: "marginProfile", label: "Margin" },
  { key: "aov", label: "AOV", format: (n) => `HKD ${n.toFixed(1)}` },
  { key: "weeklyOrders", label: "Weekly orders", format: (n) => (n / 1000).toFixed(1) + "K" },
];

function heatCell(value: number) {
  const pct = Math.min(100, Math.max(0, value));
  // Widened alpha range for stronger contrast between low, mid, and high cells.
  // Low ≈ 0.04, mid ≈ 0.45, high ≈ 0.95 (was 0.1 → 0.85).
  const alpha = Math.pow(pct / 100, 1.15) * 0.91 + 0.04;
  return `hsl(14 89% 51% / ${alpha.toFixed(3)})`;
}

export default function Stores() {
  const { sim } = usePlatform();

  const rows = stores.map(s => {
    const suit = sim.storeSuitability.find(x => x.storeId === s.id)!;
    return { ...s, score: suit.score, verdict: suit.verdict };
  }).sort((a, b) => b.score - a.score);

  const launchFirst = rows.filter(r => r.verdict === "Launch first").map(r => r.name).join(", ") || rows[0].name;

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        eyebrow="Rollout prioritization"
        title="Store & Cluster Rollout"
        subtitle="Where to launch first, test next, or hold as we scale the current recommendation. Demo simulation."
        takeaway={<><b className="text-primary">Launch first in {launchFirst}</b> — highest fit for the current scenario. Monitor 5 days, then scale to test-next clusters.</>}
        meta={<><StatusChip tone="success">{rows.filter(r => r.verdict === "Launch first").length} launch</StatusChip><StatusChip tone="info">{rows.filter(r => r.verdict === "Test next").length} test</StatusChip></>}
      />


      {/* Leaderboard */}
      <div className="flex items-center justify-between">
        <SectionHeader title="Cluster leaderboard" subtitle="Fit score for the current scenario" />
        <DemoTag />
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
        {rows.map((r, i) => (
          <div key={r.id} className={cn("glass-card p-4 relative overflow-hidden",
            i === 0 && "ring-2 ring-primary")}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">#{i + 1}</div>
              <VerdictChip verdict={r.verdict} />
            </div>
            <div className="text-sm font-bold">{r.name}</div>
            <div className="text-[11px] text-muted-foreground">{r.cluster} · {r.district}</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary tabular-nums">{r.score}</span>
              <span className="text-[11px] text-muted-foreground">fit score</span>
              <DemoTag className="ml-auto" />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">AOV HKD {r.aov.toFixed(1)} · {(r.weeklyOrders / 1000).toFixed(1)}K/wk</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass-card p-5">
        <SectionHeader
          title="Comparative KPIs"
          subtitle="Deeper red = higher relative index"
          action={<DemoTag />}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
                <th className="py-2 pr-3">Store</th>
                {metrics.map(m => <th key={m.key as string} className="py-2 px-2">{m.label}</th>)}
                <th className="py-2 px-2">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-b border-border/60 hover:bg-muted/30">
                  <td className="py-2 pr-3 font-semibold">{r.name}</td>
                  {metrics.map(m => {
                    const raw = Number(r[m.key] ?? 0);
                    const norm = m.key === "aov" ? (raw / 80) * 100 : m.key === "weeklyOrders" ? (raw / 6500) * 100 : raw;
                    const display = m.format ? m.format(raw) : String(raw);
                    return (
                      <td key={m.key as string} className="py-2 px-2">
                        <span className="rounded-md px-2 py-1 inline-block font-semibold tabular-nums text-xs min-w-[48px] text-center"
                          style={{ background: heatCell(norm), color: norm > 55 ? "white" : "hsl(0 0% 15%)" }}>
                          {display}
                        </span>
                      </td>
                    );
                  })}
                  <td className="py-2 px-2"><VerdictChip verdict={r.verdict} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Management summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-4 border-l-4 border-[hsl(145_63%_42%)]">
          <StatusChip tone="success">Launch first</StatusChip>
          <div className="text-sm font-semibold mt-2">{rows.filter(r => r.verdict === "Launch first").map(r => r.name).join(", ")}</div>
          <p className="text-xs text-muted-foreground mt-1">Highest fit for the current scenario. Start here, monitor 5 days, scale from what works.</p>
        </div>
        <div className="glass-card p-4 border-l-4 border-[hsl(200_98%_40%)]">
          <StatusChip tone="info">Test next</StatusChip>
          <div className="text-sm font-semibold mt-2">{rows.filter(r => r.verdict === "Test next").map(r => r.name).join(", ")}</div>
          <p className="text-xs text-muted-foreground mt-1">Solid candidates for the second wave once launch cohort confirms uplift.</p>
        </div>
        <div className="glass-card p-4 border-l-4 border-muted-foreground">
          <StatusChip tone="neutral">Hold</StatusChip>
          <div className="text-sm font-semibold mt-2">{rows.filter(r => r.verdict === "Hold").map(r => r.name).join(", ") || "—"}</div>
          <p className="text-xs text-muted-foreground mt-1">Skip in this wave; try a different segment or promo mechanic for this cluster.</p>
        </div>
      </div>
    </div>
  );
}
