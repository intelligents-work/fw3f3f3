import { usePlatform } from "@/lib/platform/context";
import { simulate } from "@/lib/platform/engine";
import { segments, stores } from "@/lib/platform/data";
import { SectionHeader, DriverBar, ConfidenceMeter, RiskBadge, StatusChip, KpiTile, PageHeader, PriorityCard } from "@/components/platform/primitives";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, LabelList } from "recharts";

export default function DecisionAnalysis() {
  const { scenario, sim } = usePlatform();
  const [altDepth, setAltDepth] = useState(scenario.depth + 5);
  const alt = simulate({ ...scenario, depth: altDepth });

  const seg = segments.find(s => s.id === scenario.segmentId)!;

  const sensitivity = [5, 10, 15, 20, 25, 30].map(d => {
    const r = simulate({ ...scenario, depth: d });
    return { depth: d, uplift: r.uplift, incremental: r.incremental, confidence: r.confidence, margin: r.margin };
  });

  const impactRisk = stores.map(s => {
    const r = simulate({ ...scenario, storeId: s.id });
    return { name: s.name, impact: r.incremental, risk: 100 - r.confidence, z: r.uplift };
  });

  const deltaIncremental = alt.incremental - sim.incremental;
  const deltaMargin = alt.margin - sim.margin;

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        eyebrow="Decision Support · Why This Recommendation"
        title="Decision Analysis"
        subtitle="Rationale, tradeoffs, and what changes if we adjust the scenario. Demo simulation."
        takeaway={<><b className="text-primary">Recommendation:</b> {sim.recommendation}</>}
        meta={<><RiskBadge risk={sim.risk} /><StatusChip tone="primary">{sim.confidence}% confidence</StatusChip></>}
      />

      {/* Recommendation rationale — PRIORITY */}
      <PriorityCard className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap relative">
          <div className="flex-1 min-w-[280px]">
            <StatusChip tone="primary">Management summary</StatusChip>
            <h2 className="text-xl font-bold mt-2 leading-snug text-foreground">{sim.recommendation}</h2>
            <p className="text-sm text-foreground/85 mt-2 leading-relaxed">{sim.explanation}</p>
          </div>
          <div className="w-full lg:w-64 space-y-2.5">
            <ConfidenceMeter value={sim.confidence} />
            <ConfidenceMeter value={sim.margin} label="Margin quality" />
            <div className="flex gap-2"><RiskBadge risk={sim.risk} /><StatusChip tone="neutral">{seg.name}</StatusChip></div>
          </div>
        </div>
      </PriorityCard>


      <div className="grid lg:grid-cols-3 gap-5">
        {/* Drivers */}
        <div className="glass-card p-5">
          <SectionHeader title="Driver ranking" subtitle="Why the model chose this option" />
          <div className="space-y-3">
            {sim.drivers.map(d => <DriverBar key={d.label} {...d} />)}
          </div>
        </div>

        {/* Impact vs Risk */}
        <div className="glass-card p-5 lg:col-span-2">
          <SectionHeader title="Impact vs risk" subtitle="Bubble = uplift %. Aim upper-left." />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" dataKey="risk" name="Risk" domain={[0, 60]} stroke="hsl(var(--muted-foreground))" fontSize={11} label={{ value: "Risk (lower is better)", position: "insideBottom", offset: -2, fontSize: 11 }} />
                <YAxis type="number" dataKey="impact" name="Incremental" stroke="hsl(var(--muted-foreground))" fontSize={11} label={{ value: "Incremental HKD (K)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                <ZAxis type="number" dataKey="z" range={[80, 400]} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Scatter data={impactRisk} fill="hsl(var(--primary))">
                  <LabelList dataKey="name" position="top" fontSize={10} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sensitivity */}
      <div className="glass-card p-5">
        <SectionHeader title="What changes if we adjust discount depth?" subtitle="Compare current scenario to a hypothetical depth" />
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
              <span>Hypothetical depth</span>
              <span className="font-semibold tabular-nums">{altDepth}%</span>
            </div>
            <Slider value={[altDepth]} onValueChange={([v]) => setAltDepth(v)} min={0} max={35} step={1} />
            <div className="grid grid-cols-2 gap-2 mt-4">
              <KpiTile label="Uplift Δ" value={`${(alt.uplift - sim.uplift >= 0 ? "+" : "")}${(alt.uplift - sim.uplift).toFixed(1)}%`} tone={alt.uplift >= sim.uplift ? "success" : "default"} />
              <KpiTile label="Incremental Δ" value={`${deltaIncremental >= 0 ? "+" : ""}HKD ${deltaIncremental}K`} tone={deltaIncremental >= 0 ? "primary" : "default"} />
              <KpiTile label="Confidence Δ" value={`${(alt.confidence - sim.confidence >= 0 ? "+" : "")}${alt.confidence - sim.confidence}pp`} />
              <KpiTile label="Margin Δ" value={`${(deltaMargin >= 0 ? "+" : "")}${deltaMargin}pp`} tone={deltaMargin < -8 ? "warning" : "default"} />
            </div>
            <div className="mt-3 p-3 rounded-lg bg-muted/50 text-sm">
              <span className="font-semibold">Verdict:</span>{" "}
              {altDepth > scenario.depth + 3 && deltaMargin < -6
                ? "Deeper discount adds reach but erodes margin quality — keep current depth."
                : altDepth > scenario.depth && deltaIncremental > 40
                  ? "Deeper discount unlocks meaningful incremental — consider testing in launch-first cluster."
                  : "Change is neutral to slightly positive — no strong reason to move."}
            </div>
          </div>

          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground uppercase border-b border-border">
                  <th className="text-left py-2">Depth</th>
                  <th className="text-right py-2 px-2">Uplift</th>
                  <th className="text-right py-2 px-2">Incremental (HKD K)</th>
                  <th className="text-right py-2 px-2">Confidence</th>
                  <th className="text-right py-2 px-2">Margin</th>
                </tr>
              </thead>
              <tbody>
                {sensitivity.map(r => (
                  <tr key={r.depth} className={`border-b border-border/60 ${r.depth === scenario.depth ? "bg-primary/5 font-semibold" : ""}`}>
                    <td className="py-2">{r.depth}%{r.depth === scenario.depth && <span className="ml-2 text-[10px] text-primary">CURRENT</span>}</td>
                    <td className="py-2 px-2 text-right tabular-nums">+{r.uplift}%</td>
                    <td className="py-2 px-2 text-right tabular-nums">{r.incremental}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{r.confidence}%</td>
                    <td className="py-2 px-2 text-right tabular-nums">{r.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recommended Next Action */}
      <div className="glass-card p-5 border-l-4 border-primary">
        <SectionHeader title="Recommended next action" />
        <p className="text-base font-medium text-foreground">{sim.recommendation}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {sim.storeSuitability.slice(0, 3).map(s => <StatusChip key={s.storeId} tone="primary">{s.name}</StatusChip>)}
        </div>
      </div>
    </div>
  );
}
