import { useState } from "react";
import { segments, type SegmentDef } from "@/lib/platform/data";
import { usePlatform } from "@/lib/platform/context";
import { SectionHeader, StatusChip, ConfidenceMeter, PageHeader, DemoTag } from "@/components/platform/primitives";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { cn } from "@/lib/utils";

export default function Segments() {
  const { scenario, setScenario } = usePlatform();
  const [pickId, setPickId] = useState<string>(scenario.segmentId);
  const pick = segments.find(s => s.id === pickId) as SegmentDef;

  const compareData = segments.map(s => ({
    name: s.name.split(" ")[0],
    response: Math.round((s.discountSensitivity + s.bundleAffinity) / 2),
    aov: s.aovBias,
  }));

  const topSeg = [...segments].sort((a,b) => (b.discountSensitivity + b.bundleAffinity) - (a.discountSensitivity + a.bundleAffinity))[0];

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        eyebrow="Segment opportunity"
        title="Segment Insights"
        subtitle="Which customer segments and dayparts respond best to which promotions. Demo simulation."
        takeaway={<><b className="text-primary">{topSeg.name}</b> — top responder at {topSeg.preferredDaypart.toLowerCase()}.</>}
        meta={<StatusChip tone="primary">{segments.length} segments tracked</StatusChip>}
      />


      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        {segments.map(s => (
          <button key={s.id}
            onClick={() => { setPickId(s.id); setScenario({ segmentId: s.id }); }}
            className={cn("text-left rounded-xl overflow-hidden bg-card border-2 transition-all",
              pickId === s.id ? "border-primary shadow-card-hover" : "border-transparent shadow-card hover:shadow-card-hover")}>
            <div className="h-24 overflow-hidden relative">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-1.5 left-2 text-white text-xs font-bold">{s.name}</div>
            </div>
            <div className="p-2.5">
              <div className="text-[11px] text-muted-foreground">{(s.size / 1000).toFixed(1)}K customers</div>
              <div className="text-[11px] mt-0.5"><span className="font-semibold text-primary">{s.preferredDaypart}</span> · AOV {s.aovBias}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-start gap-4">
            <img src={pick.image} alt={pick.name} className="w-24 h-24 rounded-xl object-cover" loading="lazy" width={1024} height={1024} />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold">{pick.name}</h2>
                <StatusChip tone="primary">{pick.preferredDaypart}</StatusChip>
                <StatusChip tone="neutral">{(pick.size / 1000).toFixed(1)}K customers</StatusChip>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Recommended offer: <span className="text-foreground font-medium">{pick.offerStyle}</span></p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {pick.channels.map(c => <StatusChip key={c} tone="info">{c}</StatusChip>)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Response signals</span>
              </div>
              <ConfidenceMeter value={pick.discountSensitivity} label="Discount sensitivity" />
              <ConfidenceMeter value={pick.bundleAffinity} label="Bundle affinity" />
              <ConfidenceMeter value={pick.aovBias > 100 ? Math.min(100, pick.aovBias) : pick.aovBias} label="AOV bias index" />
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Preferred products</div>
              <div className="space-y-1.5">
                {pick.products.map(p => (
                  <div key={p} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <SectionHeader title="Response comparison" subtitle="Response index by segment"  />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData} layout="vertical" margin={{ right: 48, left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={70} stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Bar dataKey="response" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} barSize={16}>
                  <LabelList dataKey="response" position="right" fill="hsl(var(--foreground))" fontSize={11} fontWeight={600} formatter={(v: number) => `${v}`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
