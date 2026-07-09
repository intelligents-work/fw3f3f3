import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function KpiTile({
  label, value, delta, sub, tone = "default", icon,
}: {
  label: string; value: string; delta?: number; sub?: string;
  tone?: "default" | "primary" | "success" | "warning" | "info"; icon?: ReactNode;
}) {
  const toneCls = {
    default: "bg-card",
    primary: "bg-gradient-to-br from-primary to-[hsl(8_85%_48%)] text-primary-foreground",
    success: "bg-gradient-to-br from-[hsl(145_63%_42%)] to-[hsl(155_60%_38%)] text-white",
    warning: "bg-gradient-to-br from-[hsl(38_92%_50%)] to-[hsl(30_92%_46%)] text-white",
    info: "bg-gradient-to-br from-[hsl(200_98%_40%)] to-[hsl(210_95%_45%)] text-white",
  }[tone];
  const isColored = tone !== "default";
  return (
    <div className={cn("relative overflow-hidden rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all", toneCls)}>
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-xs font-medium uppercase tracking-wide", isColored ? "opacity-90" : "text-muted-foreground")}>{label}</span>
        {icon && <span className={cn("opacity-80", isColored ? "" : "text-muted-foreground")}>{icon}</span>}
      </div>
      <div className="text-2xl font-bold tabular-nums leading-tight">{value}</div>
      <div className="flex items-center gap-2 mt-1 text-xs">
        {delta !== undefined && (
          <span className={cn("inline-flex items-center gap-0.5 font-medium",
            isColored ? "opacity-95" : delta >= 0 ? "text-[hsl(145_63%_36%)]" : "text-destructive")}>
            {delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
        {sub && <span className={cn(isColored ? "opacity-85" : "text-muted-foreground")}>{sub}</span>}
      </div>
    </div>
  );
}

export function StatusChip({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "primary" | "info" | "warning" | "neutral" }) {
  const cls = {
    success: "bg-[hsl(145_63%_42%/0.12)] text-[hsl(145_63%_30%)] ring-1 ring-[hsl(145_63%_42%/0.25)]",
    primary: "bg-primary/10 text-primary ring-1 ring-primary/20",
    info: "bg-[hsl(200_98%_40%/0.12)] text-[hsl(200_98%_32%)] ring-1 ring-[hsl(200_98%_40%/0.22)]",
    warning: "bg-[hsl(38_92%_50%/0.15)] text-[hsl(30_92%_38%)] ring-1 ring-[hsl(38_92%_50%/0.28)]",
    neutral: "bg-muted text-muted-foreground ring-1 ring-border",
  }[tone];
  return <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", cls)}>{children}</span>;
}

export function RiskBadge({ risk }: { risk: "Low" | "Medium" | "High" }) {
  const map = { Low: "success", Medium: "warning", High: "primary" } as const;
  return <StatusChip tone={risk === "High" ? "primary" : map[risk]}>{risk} risk</StatusChip>;
}

export function ConfidenceMeter({ value, label = "Confidence" }: { value: number; label?: string }) {
  const tone = value >= 78 ? "hsl(145 63% 42%)" : value >= 60 ? "hsl(38 92% 50%)" : "hsl(14 89% 51%)";
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground tabular-nums">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: tone }} />
      </div>
    </div>
  );
}

export function DriverBar({ label, weight }: { label: string; weight: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground tabular-nums">{weight}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-primary/80" style={{ width: `${weight}%` }} />
      </div>
    </div>
  );
}

export function VerdictChip({ verdict }: { verdict: "Launch first" | "Test next" | "Hold" }) {
  const tone = verdict === "Launch first" ? "success" : verdict === "Test next" ? "info" : "neutral";
  return <StatusChip tone={tone}>{verdict}</StatusChip>;
}

export function CardLink({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all">
      {children} <ArrowRight className="w-3.5 h-3.5" />
    </button>
  );
}
