import { Percent, RefreshCw, ShoppingBag, DollarSign } from "lucide-react";

const kpiData = [
  {
    id: 1,
    icon: Percent,
    value: "+90%",
    label: "Redemption Rate Lift",
    subtext: "Reactivation campaigns vs. broad-blast",
    variant: "secondary" as const,
  },
  {
    id: 2,
    icon: RefreshCw,
    value: "+12.6%",
    label: "2nd Order Conversion Rate",
    subtext: "First-time to repeat customer funnel",
    variant: "primary" as const,
  },
  {
    id: 3,
    icon: ShoppingBag,
    value: "+15%",
    label: "Average Order Value Lift",
    subtext: "Through smart bundle recommendations",
    variant: "success" as const,
  },
  {
    id: 4,
    icon: DollarSign,
    value: "HKD 2-5M",
    label: "Projected Incremental Sales",
    subtext: "First pilot phase, 4-8 weeks",
    variant: "gold" as const,
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpiData.map((kpi, index) => (
        <div
          key={kpi.id}
          className={`kpi-card kpi-card-${kpi.variant} animate-fade-in stagger-${index + 1}`}
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.variant === 'gold' ? 'bg-foreground/10' : 'bg-white/20'}`}>
              <kpi.icon className={`w-4 h-4 ${kpi.variant === 'gold' ? 'text-foreground' : 'text-white'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-bold leading-none">{kpi.value}</div>
              <div className="text-xs font-medium opacity-90 mt-0.5 truncate">{kpi.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
