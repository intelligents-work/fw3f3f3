import { Link } from "react-router-dom";
import { usePlatform } from "@/lib/platform/context";
import { KpiTile, SectionHeader, StatusChip, RiskBadge, ConfidenceMeter, CardLink, VerdictChip, PriorityCard, DemoTag } from "@/components/platform/primitives";
import { presets, products, IMG } from "@/lib/platform/data";
import { DollarSign, TrendingUp, Target, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const { sim, scenario, applyPreset } = usePlatform();
  const topOps = presets.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Executive summary hero — biggest opportunity + recommended action */}
      <section className="relative overflow-hidden rounded-2xl shadow-card">
        <div className="grid md:grid-cols-[1.55fr_1fr] gap-0">
          <div className="p-6 lg:p-8 bg-gradient-to-br from-primary via-primary to-[hsl(8_85%_44%)] text-primary-foreground relative">
            <div className="flex items-center gap-2">
              <StatusChip tone="warning">This week's priority</StatusChip>
              <DemoTag className="bg-white/20 text-white ring-white/30" />
            </div>
            <h1 className="text-[26px] lg:text-4xl font-bold mt-3 leading-[1.15]">
              Weekend Family Set is Fairwood's biggest revenue opportunity this week
            </h1>
            <p className="mt-3 text-[15px] opacity-95 max-w-xl leading-relaxed">
              Bundle promotion at 14% depth to the Family Dinner segment projects <b>+HKD 412K incremental</b> across 4 launch-first clusters with high margin quality.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <button
                onClick={() => applyPreset({ segmentId: "family-dinner", promoType: "bundle", depth: 14, horizon: 14, holiday: true, weather: false, pressure: "medium" })}
                className="px-4 py-2 rounded-full bg-white text-primary text-sm font-semibold hover:bg-white/90 shadow-md">
                Load this scenario
              </button>
              <Link to="/promotions" className="px-4 py-2 rounded-full bg-white/15 backdrop-blur border border-white/30 text-sm font-medium hover:bg-white/25">
                Review promotion options →
              </Link>
              <Link to="/decisions" className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20">
                Why this recommendation
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img src={IMG.diners} alt="Fairwood diners in Hong Kong" className="absolute inset-0 w-full h-full object-cover" loading="eager" width={1024} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/50" />
          </div>
        </div>
      </section>

      {/* Big KPI moments — the four numbers management cares about */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiTile tone="primary" label={`Predicted sales · ${scenario.horizon} days`} value={`HKD ${(sim.predictedWeekly / 1000).toFixed(0)}K`} delta={sim.uplift} sub="vs baseline" icon={<DollarSign className="w-4 h-4" />} />
        <KpiTile tone="success" label="Expected uplift" value={`+${sim.uplift}%`} sub={`${sim.risk.toLowerCase()} risk`} icon={<TrendingUp className="w-4 h-4" />} />
        <KpiTile tone="warning" label="Incremental revenue" value={`HKD ${sim.incremental}K`} sub={`${scenario.horizon}-day horizon`} icon={<ArrowUpRight className="w-4 h-4" />} />
        <KpiTile tone="info" label="Forecast confidence" value={`${sim.confidence}%`} sub={`Margin quality ${Math.round(sim.margin)}/100`} icon={<Target className="w-4 h-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Top Opportunities */}
        <section className="lg:col-span-2 glass-card p-5">
          <SectionHeader
            title="Top revenue opportunities"
            subtitle="Ranked by projected incremental this week"
            action={<Link to="/promotions"><CardLink>Compare all options</CardLink></Link>}
          />
          <div className="grid md:grid-cols-3 gap-3">
            {topOps.map((p, i) => (
              <button key={p.id}
                onClick={() => applyPreset({ segmentId: p.segment, promoType: p.promo, depth: p.depth, horizon: p.horizon, weather: p.weather, holiday: p.holiday, pressure: p.pressure })}
                className="text-left rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-card-hover transition-all group">
                <div className="relative h-24 overflow-hidden">
                  <img src={p.hero} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" width={1024} height={1024} />
                  <div className="absolute top-2 left-2"><StatusChip tone={i === 0 ? "primary" : "neutral"}>#{i + 1}</StatusChip></div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{p.description}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="font-bold text-primary">+HKD {(180 + i * 60)}K</span>
                    <span className="text-muted-foreground">· {p.daypart}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Active Recommendation — PRIORITY */}
        <PriorityCard className="p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <h2 className="text-base font-bold text-foreground">Recommended action</h2>
          </div>
          <div className="space-y-3 flex-1">
            <p className="text-[15px] font-medium text-foreground leading-snug">{sim.recommendation}</p>
            <ConfidenceMeter value={sim.confidence} label="Forecast confidence" />
            <ConfidenceMeter value={sim.margin} label="Margin quality" />
            <div className="flex items-center gap-2 flex-wrap">
              <RiskBadge risk={sim.risk} />
              <StatusChip tone="primary">{scenario.segmentId.replace("-", " ")}</StatusChip>
              <StatusChip tone="info">{scenario.depth}% depth</StatusChip>
            </div>
          </div>
          <Link to="/decisions" className="mt-3"><CardLink>See full rationale</CardLink></Link>
        </PriorityCard>
      </div>

      {/* Top products + Store snapshot */}
      <div className="grid lg:grid-cols-3 gap-5">
        <section className="glass-card p-5 lg:col-span-2">
          <SectionHeader title="Top performing products" subtitle="Weekly units and trend" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.slice(0, 4).map(p => (
              <div key={p.id} className="rounded-xl overflow-hidden bg-card border border-border hover:shadow-card-hover transition-all">
                <div className="h-20 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
                </div>
                <div className="p-2.5">
                  <div className="text-xs font-semibold text-foreground truncate">{p.name}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground">{(p.weeklyUnits / 1000).toFixed(1)}K/wk</span>
                    <span className={`text-[10px] font-semibold ${p.trend >= 0 ? "text-[hsl(145_63%_36%)]" : "text-destructive"}`}>
                      {p.trend >= 0 ? "+" : ""}{p.trend}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-5">
          <SectionHeader title="Rollout priority" subtitle="Where to launch first" action={<Link to="/stores"><CardLink>Full view</CardLink></Link>} />
          <div className="space-y-2">
            {sim.storeSuitability.slice(0, 5).map((s, i) => (
              <div key={s.storeId} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-7 h-7 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground leading-tight break-words">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Fit score {s.score}</div>
                </div>
                <VerdictChip verdict={s.verdict} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Management actions this week */}
      <section className="glass-card p-5">
        <SectionHeader title="Management actions this week" subtitle="Prioritized by revenue impact" />
        <div className="grid md:grid-cols-2 gap-2">
          {[
            { chip: "primary", text: "Increase Weekend Family Set coverage from 60% → 80% of stores" },
            { chip: "info", text: "Tea Combo Upsell showing +18% uplift in Mong Kok — expand to Causeway Bay" },
            { chip: "warning", text: "Hold Breakfast Value Push at 15% depth — margin softens above 18%" },
            { chip: "success", text: "Hero Product Recovery ready to re-launch — 82% confidence" },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
              <StatusChip tone={r.chip as any}>{r.chip === "primary" ? "Act now" : r.chip === "warning" ? "Monitor" : r.chip === "success" ? "Ready" : "Insight"}</StatusChip>
              <span className="text-sm text-foreground flex-1">{r.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
