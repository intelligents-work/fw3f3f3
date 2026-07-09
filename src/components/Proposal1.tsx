import { useState } from "react";
import { customerProfiles, abTestResults, type CustomerProfile } from "@/lib/mockData";
import { Smartphone, Brain, Sparkles, ShoppingCart, CheckCircle, Send, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function Proposal1() {
  const [selectedProfile, setSelectedProfile] = useState<CustomerProfile>(customerProfiles[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Proposal 1: Personalized Curry Bundling Engine</h1>
        <p className="text-muted-foreground">Watch AI recommend products to each customer in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Recommendation Demo */}
        <div className="space-y-4">
          {/* Customer Selector */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-3">Select a Customer Profile to Simulate</h3>
            <Select value={selectedProfile.id} onValueChange={(v) => setSelectedProfile(customerProfiles.find(p => p.id === v)!)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {customerProfiles.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} ({p.segment})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Customer Profile */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl">🧑</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{selectedProfile.name}, {selectedProfile.age}</h3>
                <p className="text-sm text-muted-foreground">{selectedProfile.location} • {selectedProfile.segment}</p>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">First Order Details</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Item:</span> <span className="font-medium">{selectedProfile.firstOrder.item}</span></div>
                <div><span className="text-muted-foreground">Price:</span> <span className="font-medium">HKD {selectedProfile.firstOrder.price}</span></div>
                <div><span className="text-muted-foreground">Time:</span> <span className="font-medium">{selectedProfile.firstOrder.time}</span></div>
                <div><span className="text-muted-foreground">Device:</span> <span className="font-medium">{selectedProfile.firstOrder.device}</span></div>
              </div>
            </div>

            {/* ML Scoring */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">ML Scoring (Real-Time)</p>
              {Object.entries(selectedProfile.signals).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-32 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${value}%` }} />
                  </div>
                  <span className="text-xs font-medium w-8">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="glass-card p-5 bg-secondary/5 border-secondary/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-foreground">AI Recommendation for {selectedProfile.name}</h3>
            </div>
            
            <div className="p-4 bg-card rounded-lg border border-border mb-4">
              <p className="font-medium text-foreground mb-2">📦 {selectedProfile.recommendation.bundle}</p>
              <div className="flex items-center gap-4 text-sm mb-3">
                <span className="text-muted-foreground line-through">HKD {selectedProfile.recommendation.originalPrice}</span>
                <span className="text-lg font-bold text-success">HKD {selectedProfile.recommendation.offerPrice}</span>
                <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded">{selectedProfile.recommendation.discount}% OFF</span>
              </div>
              <p className="text-xs text-muted-foreground">{selectedProfile.recommendation.reason}</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 gap-1"><Send className="w-3 h-3" /> Send via App Push</Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1"><MessageSquare className="w-3 h-3" /> Send via SMS</Button>
            </div>
          </div>
        </div>

        {/* Right: A/B Test Results */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Live A/B Test Results</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* AI Powered */}
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">AI-Powered ✓</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Impressions</span><span className="font-medium">{abTestResults.personalized.impressions.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Click-through</span><span className="font-medium">{abTestResults.personalized.clickThrough}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Conversions</span><span className="font-medium">{abTestResults.personalized.conversions}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Conv. Rate</span><span className="font-bold text-success">{abTestResults.personalized.conversionRate}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">AOV</span><span className="font-medium">HKD {abTestResults.personalized.aov}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="font-medium">HKD {abTestResults.personalized.revenue.toLocaleString()}</span></div>
                  <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="text-muted-foreground">Net Profit</span><span className="font-bold text-success">HKD {abTestResults.personalized.netProfit.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ROI</span><span className="font-bold text-success">{abTestResults.personalized.roi}%</span></div>
                </div>
              </div>

              {/* Generic */}
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-destructive">Generic Broadcast ⚠️</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Impressions</span><span className="font-medium">{abTestResults.generic.impressions.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Click-through</span><span className="font-medium">{abTestResults.generic.clickThrough}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Conversions</span><span className="font-medium">{abTestResults.generic.conversions}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Conv. Rate</span><span className="font-medium">{abTestResults.generic.conversionRate}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">AOV</span><span className="font-medium">HKD {abTestResults.generic.aov}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="font-medium">HKD {abTestResults.generic.revenue.toLocaleString()}</span></div>
                  <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="text-muted-foreground">Net Profit</span><span className="font-bold text-destructive">HKD {abTestResults.generic.netProfit.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ROI</span><span className="font-bold text-destructive">{abTestResults.generic.roi}%</span></div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20 text-center">
              <p className="text-sm font-medium text-success">🏆 WINNER: AI-Powered Recommendations</p>
              <p className="text-xs text-muted-foreground mt-1">+147% more profit | +145% conversion rate</p>
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-3">Proven Results (Yum China)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-success">+2%</p>
                <p className="text-xs text-muted-foreground">Member Spend</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-success">+$20M</p>
                <p className="text-xs text-muted-foreground">Annual Sales</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-foreground">120+</p>
                <p className="text-xs text-muted-foreground">Data Signals</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-foreground">2 weeks</p>
                <p className="text-xs text-muted-foreground">Go-Live Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}