import { useState } from "react";
import { campaigns, type CampaignDef } from "@/lib/platform/data";
import { SectionHeader, StatusChip, ConfidenceMeter, KpiTile, PageHeader } from "@/components/platform/primitives";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { fmtHKDFromK } from "@/lib/platform/format";

const filters = ["All", "Live", "Recent", "Past"] as const;

export default function Campaigns() {
  const [filter, setFilter] = useState<typeof filters[number]>("All");
  const [selectedId, setSelectedId] = useState(campaigns[0].id);
  const list = campaigns.filter(c => filter === "All" ? true : c.status === filter.toLowerCase());
  const selected = campaigns.find(c => c.id === selectedId) as CampaignDef;
  const bestLive = campaigns.filter(c => c.status === "live").sort((a,b) => b.incremental - a.incremental)[0] ?? campaigns[0];

  const series = Array.from({ length: 14 }, (_, i) => {
    const day = i + 1;
    const base = 60 + Math.sin(i * 0.7) * 8;
    const after = i >= 7 ? base * (1 + selected.uplift / 100) : base;
    return { day: `D${day}`, baseline: Math.round(base), actual: Math.round(after) };
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        eyebrow="Campaign Performance · Review"
        title="Campaign Performance"
        subtitle="Live and recent campaigns with uplift, incremental revenue, and management summary."
        takeaway={<><b className="text-primary">{bestLive.name}</b> is the top live performer at <b className="text-primary">+{bestLive.uplift}%</b> uplift and {fmtHKDFromK(bestLive.incremental)} incremental across {bestLive.storeCoverage}% of stores.</>}
        meta={<><StatusChip tone="success">{campaigns.filter(c => c.status === "live").length} live</StatusChip><StatusChip tone="neutral">{campaigns.length} total</StatusChip></>}
        action={
          <div className="flex gap-1 bg-muted/60 p-1 rounded-full">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn("px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  filter === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{f}</button>
            ))}
          </div>
        }
      />


      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-5">
        {/* Cards list */}
        <div className="space-y-3">
          {list.map(c => (
            <button key={c.id} onClick={() => setSelectedId(c.id)}
              className={cn("w-full text-left rounded-xl overflow-hidden bg-card border-2 transition-all flex",
                selectedId === c.id ? "border-primary shadow-card-hover" : "border-transparent shadow-card hover:shadow-card-hover")}>
              <img src={c.image} alt={c.name} className="w-28 h-28 object-cover shrink-0" loading="lazy" width={1024} height={1024} />
              <div className="p-3 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <StatusChip tone={c.status === "live" ? "success" : c.status === "recent" ? "info" : "neutral"}>{c.status}</StatusChip>
                  <span className="text-[11px] text-muted-foreground truncate">{c.window}</span>
                </div>
                <div className="text-sm font-semibold truncate">{c.name}</div>
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="font-bold text-[hsl(145_63%_36%)]">+{c.uplift}%</span>
                  <span className="text-primary font-semibold">{fmtHKDFromK(c.incremental)}</span>
                  <span className="text-muted-foreground">{c.confidence}% conf</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{c.summary}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="space-y-4">
          <div className="glass-card overflow-hidden">
            <div className="relative h-40">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <StatusChip tone={selected.status === "live" ? "success" : "neutral"}>{selected.status}</StatusChip>
                  <span className="text-xs opacity-90">{selected.window}</span>
                </div>
                <h2 className="text-xl font-bold">{selected.name}</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                <KpiTile label="Uplift" value={`+${selected.uplift}%`} tone="success" />
                <KpiTile label="Incremental" value={fmtHKDFromK(selected.incremental)} tone="primary" />
                <KpiTile label="Reach" value={`${(selected.reach/1000).toFixed(1)}K`} />
                <KpiTile label="Coverage" value={`${selected.storeCoverage}%`} />
              </div>
              <ConfidenceMeter value={selected.confidence} />
            </div>
          </div>

          <div className="glass-card p-5">
            <SectionHeader title="Before vs after" subtitle="Daily HKD (thousands) — campaign started D8" />
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="baseline" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-4 border-l-4 border-[hsl(145_63%_42%)]">
              <div className="text-xs font-semibold text-[hsl(145_63%_36%)] uppercase mb-1">What worked</div>
              <p className="text-sm text-foreground">{selected.worked}</p>
            </div>
            <div className="glass-card p-4 border-l-4 border-primary">
              <div className="text-xs font-semibold text-primary uppercase mb-1">Watch outs</div>
              <p className="text-sm text-foreground">{selected.watch}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
