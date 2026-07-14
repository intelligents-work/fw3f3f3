import { usePlatform } from "@/lib/platform/context";
import { presets, promos, segments, stores } from "@/lib/platform/data";
import { KpiTile, SectionHeader, ConfidenceMeter, DriverBar, RiskBadge, StatusChip, PageHeader } from "@/components/platform/primitives";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fmtHKD, fmtHKDFromK } from "@/lib/platform/format";

export default function Prediction() {
  const { scenario, setScenario, applyPreset, sim } = usePlatform();
  const seg = segments.find(s => s.id === scenario.segmentId)!;

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        eyebrow="Sales forecasting"
        title="Sales Prediction"
        subtitle="Model expected sales, uplift, and risk under different promotion scenarios."
        takeaway={<>Current scenario projects <b className="text-primary">+{sim.uplift}% uplift</b> and <b className="text-primary">{fmtHKDFromK(sim.incremental)} incremental</b> over {scenario.horizon} days — confidence {sim.confidence}%, {sim.risk.toLowerCase()} risk.</>}
        meta={<><RiskBadge risk={sim.risk} /><StatusChip tone="primary">{seg.name}</StatusChip></>}
        action={
          <div className="hidden md:flex flex-wrap gap-1.5 max-w-md justify-end">
            {presets.slice(0, 4).map(p => (
              <button key={p.id}
                onClick={() => applyPreset({ segmentId: p.segment, promoType: p.promo, depth: p.depth, horizon: p.horizon, weather: p.weather, holiday: p.holiday, pressure: p.pressure })}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white border border-border hover:border-primary hover:text-primary transition-colors">
                {p.name}
              </button>
            ))}
          </div>
        }
      />


      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiTile tone="primary" label="Predicted weekly" value={`HKD ${(sim.predictedWeekly/1000).toFixed(0)}K`} delta={sim.uplift} />
        <KpiTile tone="success" label="Incremental" value={`HKD ${sim.incremental}K`} sub={`${scenario.horizon}-day`} />
        <KpiTile tone="info" label="Confidence" value={`${sim.confidence}%`} />
        <KpiTile tone="warning" label="Margin quality" value={`${sim.margin}`} sub="index / 100" />
      </div>

      <div className="grid lg:grid-cols-[280px_1fr_280px] gap-5">
        {/* Controls */}
        <aside className="glass-card p-4 space-y-4 h-fit sticky top-32">
          <SectionHeader title="Scenario levers" />

          <div>
            <label className="text-xs font-medium text-muted-foreground">Store / cluster</label>
            <Select value={scenario.storeId} onValueChange={(v: any) => setScenario({ storeId: v })}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stores</SelectItem>
                {stores.map(s => <SelectItem key={s.id} value={s.id}>{s.name} — {s.cluster}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Segment</label>
            <Select value={scenario.segmentId} onValueChange={(v: any) => setScenario({ segmentId: v })}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{segments.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Promo type</label>
            <Select value={scenario.promoType} onValueChange={(v: any) => setScenario({ promoType: v })}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{promos.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-muted-foreground">Discount depth</span>
              <span className="font-semibold tabular-nums">{scenario.depth}%</span>
            </div>
            <Slider value={[scenario.depth]} onValueChange={([v]) => setScenario({ depth: v })} min={0} max={35} step={1} />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Forecast horizon</label>
            <Select value={String(scenario.horizon)} onValueChange={(v) => setScenario({ horizon: Number(v) as 7|14|28 })}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="28">28 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Market pressure</label>
            <Select value={scenario.pressure} onValueChange={(v: any) => setScenario({ pressure: v })}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-foreground">Adverse weather</label>
            <Switch checked={scenario.weather} onCheckedChange={v => setScenario({ weather: v })} />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-foreground">Holiday / event</label>
            <Switch checked={scenario.holiday} onCheckedChange={v => setScenario({ holiday: v })} />
          </div>
        </aside>

        {/* Charts */}
        <section className="space-y-5">
          <div className="glass-card p-5">
            <SectionHeader title="Baseline vs predicted sales" subtitle="Daily HKD, thousands" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sim.series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Legend />
                  <Line type="monotone" dataKey="baseline" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} name="Baseline" />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} name="Predicted" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-5">
            <SectionHeader title="Trend by day of week" subtitle="Predicted HKD (thousands)" />
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sim.series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Bar dataKey="predicted" fill="hsl(var(--primary))" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Drivers + explanation */}
        <aside className="space-y-4">
          <div className="glass-card p-4">
            <SectionHeader title="Key drivers" />
            <div className="space-y-3">
              {sim.drivers.map(d => <DriverBar key={d.label} {...d} />)}
            </div>
          </div>
          <div className="glass-card p-4 space-y-3">
            <SectionHeader title="Confidence & risk" />
            <ConfidenceMeter value={sim.confidence} />
            <ConfidenceMeter value={sim.margin} label="Margin quality" />
            <RiskBadge risk={sim.risk} />
          </div>
          <div className="glass-card p-4 bg-gradient-to-br from-primary/5 to-transparent border border-primary/15">
            <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Plain-English summary</div>
            <p className="text-sm text-foreground leading-relaxed">{sim.explanation}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
