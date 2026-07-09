import { useState } from "react";
import { LiveKPICards } from "./LiveKPICards";
import { SegmentGrid } from "./SegmentGrid";
import { ActivityFeed } from "./ActivityFeed";
import { PromoBanner } from "./PromoBanner";
import { FoodShowcase } from "./FoodShowcase";
import { type Segment } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle } from "lucide-react";

const comparisonData = [
  { metric: "Redemption Rate", without: 8, with: 15.2 },
  { metric: "2nd Order Rate", without: 44, with: 56.6 },
  { metric: "AOV (HKD)", without: 65.2, with: 75.3 },
  { metric: "CLTV Index", without: 100, with: 142 },
];

const todayChanges = [
  { value: "1,247", label: "Curry segment matches" },
  { value: "823", label: "Personalized offers sent" },
  { value: "274", label: "Second orders completed" },
  { value: "HKD 18.4K", label: "Incremental revenue" },
];

export function Dashboard() {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Promo Banner */}
      <PromoBanner />

      <LiveKPICards />

      {/* Today's Impact */}
      <div className="glass-card p-6">
        <h3 className="section-title mb-4">What Changed Today?</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {todayChanges.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SegmentGrid 
          selectedSegment={selectedSegment}
          onSegmentSelect={setSelectedSegment}
        />

        {/* Impact Chart */}
        <div className="glass-card p-6">
          <h3 className="section-title">Impact Comparison</h3>
          <p className="section-subtitle">Without AI vs. With AI</p>
          
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted-foreground/30" />
              <span className="text-sm text-muted-foreground">Without AI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="text-sm text-muted-foreground">With AI</span>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical" barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  dataKey="metric" 
                  type="category" 
                  width={100} 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar 
                  dataKey="without" 
                  fill="hsl(var(--muted-foreground) / 0.3)" 
                  radius={[0, 6, 6, 0]} 
                  name="Without AI"
                  barSize={20}
                />
                <Bar 
                  dataKey="with" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 6, 6, 0]} 
                  name="With AI"
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Food Showcase */}
      <FoodShowcase />

      <ActivityFeed />
    </div>
  );
}