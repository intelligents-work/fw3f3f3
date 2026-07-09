import { useState } from "react";
import { customerJourney, funnelData, segments } from "@/lib/mockData";
import { Calendar, Bell, MessageSquare, Target, CheckCircle, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const icons = { Calendar, Bell, MessageSquare, Target };

export function Proposal2() {
  const [currentDay, setCurrentDay] = useState([7]);
  const activeStep = customerJourney.find(s => s.day <= currentDay[0]) || customerJourney[0];
  const activeIndex = customerJourney.findIndex(s => s.day === activeStep.day);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Proposal 2: Second Purchase Activation</h1>
        <p className="text-muted-foreground">Watch a customer journey from first order → repeat purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Timeline */}
        <div className="space-y-4">
          {/* Timeline Slider */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Customer Journey Timeline</h3>
            <p className="text-xs text-muted-foreground mb-4">Drag to see journey unfold</p>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Day 0</span>
                <span>Day 7</span>
                <span>Day 14</span>
                <span>Day 21+</span>
              </div>
              <Slider
                value={currentDay}
                onValueChange={setCurrentDay}
                min={0}
                max={21}
                step={1}
              />
              <p className="text-center text-sm font-medium text-primary mt-2">Currently viewing: Day {currentDay[0]}</p>
            </div>

            {/* Journey Steps */}
            <div className="space-y-3">
              {customerJourney.map((step, index) => {
                const isActive = step.day <= currentDay[0];
                const isCurrent = index === activeIndex;
                
                return (
                  <div 
                    key={step.day}
                    className={`p-4 rounded-lg border transition-all ${
                      isCurrent 
                        ? 'bg-primary/10 border-primary' 
                        : isActive 
                          ? 'bg-muted/50 border-border' 
                          : 'bg-muted/20 border-border/50 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                        Day {step.day}
                      </span>
                      {step.isHighlight && <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded">CRITICAL</span>}
                    </div>
                    <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                    
                    {isCurrent && (
                      <div className="mt-3 pt-3 border-t border-border space-y-1">
                        {step.details.slice(0, 4).map((detail, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">{detail}</p>
                        ))}
                        {step.churnRisk !== undefined && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Churn Risk:</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${step.churnRisk > 30 ? 'bg-destructive' : 'bg-success'}`}
                                style={{ width: `${step.churnRisk}%` }}
                              />
                            </div>
                            <span className={`text-xs font-medium ${step.churnRisk > 30 ? 'text-destructive' : 'text-success'}`}>
                              {step.churnRisk}%
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Funnel & Results */}
        <div className="space-y-4">
          {/* Conversion Funnel */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Second Order Conversion Funnel</h3>
            <p className="text-xs text-muted-foreground mb-4">Live - Last 7 Days</p>
            
            <div className="space-y-2">
              {funnelData.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{step.step}</span>
                    <span className="text-xs font-medium">{step.count.toLocaleString()}</span>
                  </div>
                  <div className="h-6 bg-muted rounded overflow-hidden">
                    <div 
                      className="h-full bg-secondary/80 rounded flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${step.percentage}%` }}
                    >
                      <span className="text-[10px] font-medium text-secondary-foreground">{step.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Final Results</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">32.4%</p>
                <p className="text-xs text-muted-foreground">2nd Order Conversion</p>
                <p className="text-[10px] text-success">vs 13.2% baseline (+145%)</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">HKD 75.28</p>
                <p className="text-xs text-muted-foreground">Average Order Value</p>
                <p className="text-[10px] text-success">vs HKD 65.20 (+15%)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">HKD 128.6K</p>
                <p className="text-xs text-muted-foreground">7-Day Revenue</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">274</p>
                <p className="text-xs text-muted-foreground">Customers Saved</p>
              </div>
            </div>
          </div>

          {/* Segment Offers */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-3">Segment-Specific Offers at T+7</h3>
            <div className="grid grid-cols-2 gap-2">
              {segments.map((seg) => (
                <div key={seg.id} className="p-2 border border-border rounded-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-2 h-2 rounded-full ${seg.color}`} />
                    <span className="text-xs font-medium">{seg.name}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{seg.strategy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}