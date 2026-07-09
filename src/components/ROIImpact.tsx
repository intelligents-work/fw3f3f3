import { useState } from "react";
import { TrendingUp, AlertTriangle, Zap, DollarSign, Target, Users, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const painPoints = [
  { issue: "Increasing AOV", solution: "Addressed by Proposal 1 & 2" },
  { issue: "Optimizing Impressions", solution: "AI-driven targeting" },
  { issue: "Improving Retention", solution: "Addressed by Proposal 2" },
];

const scenarios = [
  { type: "Conservative", revenue: "HKD 800K - 1.2M", color: "text-muted-foreground" },
  { type: "Moderate", revenue: "HKD 1.5M - 2.5M", color: "text-secondary" },
  { type: "Aggressive", revenue: "HKD 3M - 5M", color: "text-success" },
];

export function ROIImpact() {
  const [pilotStores, setPilotStores] = useState([20]);
  const [participationRate, setParticipationRate] = useState([30]);
  const [aovIncrease, setAovIncrease] = useState([15]);
  const [conversionLift, setConversionLift] = useState([12]);

  // Simple ROI calculation
  const baseRevenuePerStore = 20666666; // HKD 3.1B / 150 stores
  const appUsersPercentage = participationRate[0] / 100;
  const aovLift = aovIncrease[0] / 100;
  const convLift = conversionLift[0] / 100;
  
  const incrementalRevenue = Math.round(
    pilotStores[0] * baseRevenuePerStore * appUsersPercentage * (aovLift + convLift) * 0.1
  );
  
  const formattedRevenue = (incrementalRevenue / 1000000).toFixed(1);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">Financial Impact: How AI Drives Growth for Fairwood</h1>
        <p className="text-muted-foreground text-lg">Conservative projection: HKD 1.5M-2.5M incremental revenue in 8-week pilot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Challenge */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">The Fairwood Challenge</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              {painPoints.map((point, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium text-foreground">{point.issue}</p>
                  <p className="text-xs text-success mt-1">→ {point.solution}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">Current Situation:</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Broad-blast coupons waste 40% of budget</li>
                <li>• No scientific retention tracking</li>
                <li>• Curry category underperforms potential</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-semibold text-foreground">The AI Solution</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Proposal 1: Personalization</span>
              </div>
              <p className="text-xs text-muted-foreground">Increases revenue per visit (AOV)</p>
              <p className="text-lg font-bold text-primary mt-2">+HKD 8-12 per order</p>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
            </div>

            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">Proposal 2: Retention</span>
              </div>
              <p className="text-xs text-muted-foreground">Increases visit frequency (repeat rate)</p>
              <p className="text-lg font-bold text-secondary mt-2">+12.6% conversion</p>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-foreground">Combined Effect</span>
              </div>
              <p className="text-xs text-muted-foreground">Maximizes Customer Lifetime Value</p>
              <p className="text-lg font-bold text-success mt-2">+18% CLTV</p>
            </div>
          </div>
        </div>

        {/* Financial Impact */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-gold" />
            <h2 className="text-lg font-semibold text-foreground">Financial Impact</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">8-Week Pilot Projection:</p>
              {scenarios.map((scenario, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">{scenario.type}</span>
                  <span className={`font-bold ${scenario.color}`}>{scenario.revenue}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Year 1 (50 stores)</span>
                <span className="font-bold text-foreground">HKD 10-20M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Year 2+ (full chain)</span>
                <span className="font-bold text-foreground">HKD 50-100M</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                <p className="text-xs text-gold-foreground font-medium">ROI Calculation</p>
                <p className="text-xs text-muted-foreground mt-1">Investment: HKD 500K (AI + CDP)</p>
                <p className="text-xs text-muted-foreground">Payback: 2-4 weeks (pilot)</p>
                <p className="text-sm font-bold text-success mt-2">Year 1 ROI: 1500-3000%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Slider Section */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Interactive ROI Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Pilot Stores: <span className="text-primary">{pilotStores[0]}</span>
            </label>
            <Slider
              value={pilotStores}
              onValueChange={setPilotStores}
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              App User Participation: <span className="text-primary">{participationRate[0]}%</span>
            </label>
            <Slider
              value={participationRate}
              onValueChange={setParticipationRate}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              AOV Increase: <span className="text-primary">{aovIncrease[0]}%</span>
            </label>
            <Slider
              value={aovIncrease}
              onValueChange={setAovIncrease}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              2nd Order Conversion Lift: <span className="text-primary">{conversionLift[0]}%</span>
            </label>
            <Slider
              value={conversionLift}
              onValueChange={setConversionLift}
              min={5}
              max={25}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5%</span>
              <span>25%</span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-success/10 border border-primary/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Projected Incremental Revenue (8-week pilot)</p>
            <p className="text-4xl font-bold text-foreground">
              HKD {formattedRevenue}M
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Based on {pilotStores[0]} stores, {participationRate[0]}% participation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
