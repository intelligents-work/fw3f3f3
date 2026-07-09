import { useState, useEffect } from "react";
import { 
  RotateCw, 
  ArrowUpRight,
  Gift,
  Users,
  ShoppingCart,
  TrendingUp
} from "lucide-react";
import { useLiveMetrics } from "@/hooks/useLiveMetrics";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const kpiConfig = [
  {
    id: "redemption",
    label: "Redemption Rate",
    getValue: () => "+90%",
    getSubValue: (m: any) => `${m.redemptions} redeemed today`,
    baseline: "vs 8% baseline",
    cardClass: "kpi-card-primary",
    icon: Gift,
  },
  {
    id: "conversion",
    label: "2nd Order Rate",
    getValue: () => "+12.6%",
    getSubValue: (m: any) => `${m.repeatBuyers} customers`,
    baseline: "vs 44% baseline",
    cardClass: "kpi-card-secondary",
    icon: Users,
  },
  {
    id: "aov",
    label: "AOV Lift",
    getValue: () => "+15%",
    getSubValue: (m: any) => `HKD ${m.avgOrderValue.toFixed(0)} average`,
    baseline: "vs HKD 65 baseline",
    cardClass: "kpi-card-success",
    icon: ShoppingCart,
  },
  {
    id: "revenue",
    label: "Revenue Impact",
    getValue: () => "HKD 1.8M",
    getSubValue: (m: any) => `${m.ordersToday.toLocaleString()} orders`,
    baseline: "Monthly projection",
    cardClass: "kpi-card-info",
    icon: TrendingUp,
  },
];

export function LiveKPICards() {
  const { metrics, lastUpdate, isRefreshing, refresh } = useLiveMetrics(5000);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground">Today's Performance</h2>
          <span className="status-badge status-badge-success">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            LIVE
          </span>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          disabled={isRefreshing}
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{lastUpdate.toLocaleTimeString()}</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiConfig.map((kpi, index) => (
          <Tooltip key={kpi.id}>
            <TooltipTrigger asChild>
              <div 
                className={`kpi-card ${kpi.cardClass} animate-fade-in`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <kpi.icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 opacity-60" />
                </div>
                
                <p className="text-4xl font-bold mb-1">{kpi.getValue()}</p>
                <p className="text-sm font-medium opacity-90">{kpi.label}</p>
                <p className="text-xs opacity-70 mt-1">{kpi.getSubValue(metrics)}</p>
                
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-xs opacity-60">{kpi.baseline}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p className="text-sm">AI-powered optimization driving {kpi.label.toLowerCase()} improvements</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="status-badge status-badge-success">
          <span className="w-2 h-2 rounded-full bg-success" />
          AI Recommendations Active
        </span>
        <span className="status-badge status-badge-primary">
          <span className="w-2 h-2 rounded-full bg-primary" />
          847 Users in Campaign
        </span>
        <span className="status-badge status-badge-info">
          <span className="w-2 h-2 rounded-full bg-info" />
          47 Stores Connected
        </span>
      </div>
    </div>
  );
}