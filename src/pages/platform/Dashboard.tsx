import { Link } from "react-router-dom";
import { usePlatform } from "@/lib/platform/context";
import { KpiTile, SectionHeader, StatusChip, RiskBadge, ConfidenceMeter, CardLink, VerdictChip, PriorityCard } from "@/components/platform/primitives";
import { presets, products, campaigns, stores, IMG } from "@/lib/platform/data";
import { DollarSign, TrendingUp, Target, Percent, Shield, Zap, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  const { sim, scenario, applyPreset } = usePlatform();
  const topOps = presets.slice(0, 3);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero commercial banner */}
      <section className="relative overflow-hidden rounded-2xl shadow-card">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-0">
          <div className="p-6 lg:p-8 bg-gradient-to-br from-primary via-primary to-[hsl(8_85%_44%)] text-primary-foreground relative">
            <StatusChip tone="warning">Active recommendation</StatusChip>
            <h1 className="text-2xl lg:text-3xl font-bold mt-3 leading-tight">
              Weekend Family Set is your biggest revenue opportunity this week
            </h1>
            <p className="mt-2 text-sm opacity-95 max-w-xl">
              Family Dinner segment × Bundle at 14% depth projects +HKD 412K incremental across 4 clusters with high margin quality.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => applyPreset({ segmentId: "family-dinner", promoType: "bundle", depth: 14, horizon: 14, holiday: true, weather: false, pressure: "medium" })}
                className="px-4 py-2 rounded-full bg-white text-primary text-sm font-semibold hover:bg-white/90 shadow-md">
                Load scenario
              </button>
              <Link to="/promotions" className="px-4 py-2 rounded-full bg-white/15 backdrop-blur border border-white/30 text-sm font-medium hover:bg-white/25">
                Review promotion options →
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img src={IMG.family} alt="Weekend family set" className="absolute inset-0 w-full h-full object-cover" loading="eager" width={1024} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </div>
      </section>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <KpiTile tone="primary" label="Predicted sales" value={`HKD ${(sim.predictedWeekly / 1000).toFixed(0)}K`} delta={sim.uplift} sub="7-day window" icon={<DollarSign className="w-4 h-4" />} />
        <KpiTile tone="success" label="Uplift" value={`+${sim.uplift}%`} sub="vs baseline" icon={<TrendingUp className="w-4 h-4" />} />
        <KpiTile tone="warning" label="Incremental" value={`HKD ${sim.incremental}K`} sub={`${scenario.horizon}-day horizon`} icon={<ArrowUpRight className="w-4 h-4" />} />
        <KpiTile label="Redemption" value={`${(15 + sim.uplift / 3).toFixed(1)}%`} delta={4.2} sub="rolling 7d" icon={<Percent className="w-4 h-4 text-primary" />} />
        <KpiTile label="Confidence" value={`${sim.confidence}%`} sub="high" icon={<Target className="w-4 h-4 text-primary" />} />
        <KpiTile label="Risk" value={sim.risk} sub={`Margin ${sim.margin}`} icon={<Shield className="w-4 h-4 text-primary" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Top Opportunities */}
        <section className="lg:col-span-2 glass-card p-5">
          <SectionHeader title="Top revenue opportunities" subtitle="Ranked by projected incremental this week" action={<Link to="/promotions"><CardLink>Open Promotion Engine</CardLink></Link>} />
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
                  <div className="text-xs text-muted-foreground mt-0.5">{p.description}</div>
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
          <SectionHeader title="Active recommendation" />
          <div className="space-y-3 flex-1">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/25 shadow-sm">
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider">Recommended action</div>
              <p className="text-sm font-medium text-foreground mt-1 leading-snug">{sim.recommendation}</p>
            </div>
            <ConfidenceMeter value={sim.confidence} />
            <ConfidenceMeter value={sim.margin} label="Margin quality" />
            <div className="flex items-center gap-2 flex-wrap">
              <RiskBadge risk={sim.risk} />
              <StatusChip tone="primary">{scenario.segmentId.replace("-", " ")}</StatusChip>
              <StatusChip tone="info">{scenario.depth}% depth</StatusChip>
            </div>
          </div>
          <Link to="/decisions" className="mt-3"><CardLink>See rationale</CardLink></Link>
        </PriorityCard>
      </div>


      {/* Top products + Store snapshot */}
      <div className="grid lg:grid-cols-3 gap-5">
        <section className="glass-card p-5 lg:col-span-2">
          <SectionHeader title="Top performing products" subtitle="Weekly units × trend" />
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
          <SectionHeader title="Store clusters" subtitle="Ranked by suitability" action={<Link to="/stores"><CardLink>Compare</CardLink></Link>} />
          <div className="space-y-2">
            {sim.storeSuitability.slice(0, 5).map((s, i) => (
              <div key={s.storeId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground">Fit score {s.score}</div>
                </div>
                <VerdictChip verdict={s.verdict} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Activity feeds */}
      <div className="grid lg:grid-cols-2 gap-5">
        <section className="glass-card p-5">
          <SectionHeader title="Campaign activity" action={<Link to="/campaigns"><CardLink>All campaigns</CardLink></Link>} />
          <div className="space-y-3">
            {campaigns.slice(0, 3).map(c => (
              <div key={c.id} className="flex gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                <img src={c.image} alt={c.name} className="w-14 h-14 rounded-lg object-cover" loading="lazy" width={1024} height={1024} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate">{c.name}</span>
                    <StatusChip tone={c.status === "live" ? "success" : "neutral"}>{c.status}</StatusChip>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{c.summary}</div>
                  <div className="flex gap-3 mt-1 text-[11px]">
                    <span className="font-semibold text-[hsl(145_63%_36%)]">+{c.uplift}% uplift</span>
                    <span className="text-muted-foreground">HKD {c.incremental}K incremental</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-5">
          <SectionHeader title="Recommendation feed" />
          <div className="space-y-2">
            {[
              { chip: "primary", text: "Increase Weekend Family Set coverage from 60% → 80% of stores", icon: <Zap className="w-3.5 h-3.5" /> },
              { chip: "info", text: "Tea Combo Upsell showing +18% uplift in Mong Kok — expand to Causeway Bay" },
              { chip: "warning", text: "Hold Breakfast Value Push discount at 15% — margin quality declining above 18%" },
              { chip: "success", text: "Hero Product Recovery ready for re-launch, 82% confidence" },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                <StatusChip tone={r.chip as any}>{r.chip === "primary" ? "Act now" : r.chip === "warning" ? "Monitor" : r.chip === "success" ? "Ready" : "Insight"}</StatusChip>
                <span className="text-sm text-foreground flex-1">{r.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
