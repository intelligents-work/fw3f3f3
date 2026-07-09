import { usePlatform } from "@/lib/platform/context";
import { stores, segments, promos, presets } from "@/lib/platform/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Zap } from "lucide-react";

export function ScenarioBar() {
  const { scenario, setScenario, applyPreset, sim } = usePlatform();

  return (
    <div className="sticky top-14 z-30 border-b border-border bg-white/95 backdrop-blur shadow-[0_2px_8px_-4px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-6 py-2 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 pr-3 mr-1 border-r border-border">
          <div className="w-6 h-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="leading-tight">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Scenario</div>
            <div className="text-[11px] font-semibold text-foreground -mt-0.5">Live levers</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50 border border-border/60">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Store</span>
          <Select value={scenario.storeId} onValueChange={(v: any) => setScenario({ storeId: v })}>
            <SelectTrigger className="h-7 w-[140px] text-xs bg-white border-border/60"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stores</SelectItem>
              {stores.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50 border border-border/60">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Segment</span>
          <Select value={scenario.segmentId} onValueChange={(v: any) => setScenario({ segmentId: v })}>
            <SelectTrigger className="h-7 w-[160px] text-xs bg-white border-border/60"><SelectValue /></SelectTrigger>
            <SelectContent>{segments.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50 border border-border/60">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Promo</span>
          <Select value={scenario.promoType} onValueChange={(v: any) => setScenario({ promoType: v })}>
            <SelectTrigger className="h-7 w-[150px] text-xs bg-white border-border/60"><SelectValue /></SelectTrigger>
            <SelectContent>{promos.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/20 min-w-[180px]">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Depth</span>
          <Slider value={[scenario.depth]} onValueChange={([v]) => setScenario({ depth: v })} min={0} max={35} step={1} className="w-20" />
          <span className="text-xs font-bold text-primary tabular-nums w-8">{scenario.depth}%</span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50 border border-border/60">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Horizon</span>
          <Select value={String(scenario.horizon)} onValueChange={(v) => setScenario({ horizon: Number(v) as 7|14|28 })}>
            <SelectTrigger className="h-7 w-[86px] text-xs bg-white border-border/60"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="28">28 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 ml-auto pl-3 border-l border-border">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pr-1">Presets</span>
          {presets.slice(0, 4).map(p => (
            <button key={p.id}
              onClick={() => applyPreset({ segmentId: p.segment, promoType: p.promo, depth: p.depth, horizon: p.horizon, weather: p.weather, holiday: p.holiday, pressure: p.pressure })}
              className="px-2.5 h-7 rounded-full text-[11px] font-semibold bg-white text-foreground border border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
              {p.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 ml-auto xl:ml-2 pl-3 border-l border-border">
          <div className="text-right leading-tight">
            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Live projection</div>
            <div className="text-xs font-bold text-primary tabular-nums">+{sim.uplift}% · HKD {sim.incremental}K</div>
          </div>
        </div>
      </div>
    </div>
  );
}
