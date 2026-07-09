import { usePlatform } from "@/lib/platform/context";
import { stores, segments, promos, presets } from "@/lib/platform/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { StatusChip } from "./primitives";
import { Zap } from "lucide-react";

export function ScenarioBar() {
  const { scenario, setScenario, applyPreset } = usePlatform();

  return (
    <div className="sticky top-14 z-30 border-b border-border/70 bg-[hsl(30_20%_98%)]/95 backdrop-blur">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-6 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground pr-2 border-r border-border">
          <Zap className="w-3.5 h-3.5 text-primary" /> Scenario
        </div>

        <Select value={scenario.storeId} onValueChange={(v: any) => setScenario({ storeId: v })}>
          <SelectTrigger className="h-8 w-[150px] text-xs bg-white"><SelectValue placeholder="Stores" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stores</SelectItem>
            {stores.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={scenario.segmentId} onValueChange={(v: any) => setScenario({ segmentId: v })}>
          <SelectTrigger className="h-8 w-[170px] text-xs bg-white"><SelectValue /></SelectTrigger>
          <SelectContent>{segments.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
        </Select>

        <Select value={scenario.promoType} onValueChange={(v: any) => setScenario({ promoType: v })}>
          <SelectTrigger className="h-8 w-[160px] text-xs bg-white"><SelectValue /></SelectTrigger>
          <SelectContent>{promos.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
        </Select>

        <div className="flex items-center gap-2 min-w-[180px]">
          <span className="text-xs text-muted-foreground">Depth</span>
          <Slider value={[scenario.depth]} onValueChange={([v]) => setScenario({ depth: v })} min={0} max={35} step={1} className="w-24" />
          <span className="text-xs font-semibold tabular-nums w-8">{scenario.depth}%</span>
        </div>

        <Select value={String(scenario.horizon)} onValueChange={(v) => setScenario({ horizon: Number(v) as 7|14|28 })}>
          <SelectTrigger className="h-8 w-[110px] text-xs bg-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="14">14 days</SelectItem>
            <SelectItem value="28">28 days</SelectItem>
          </SelectContent>
        </Select>

        <div className="hidden lg:flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-muted-foreground pr-1">Presets:</span>
          {presets.slice(0, 4).map(p => (
            <button key={p.id}
              onClick={() => applyPreset({ segmentId: p.segment, promoType: p.promo, depth: p.depth, horizon: p.horizon, weather: p.weather, holiday: p.holiday, pressure: p.pressure })}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white text-foreground border border-border hover:border-primary hover:text-primary transition-colors">
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
