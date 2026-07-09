import { useState } from "react";
import { segments, type Segment } from "@/lib/mockData";
import { Target, ChevronRight } from "lucide-react";

interface SegmentGridProps {
  onSegmentSelect?: (segment: Segment | null) => void;
  selectedSegment?: Segment | null;
}

const segmentColors: Record<string, string> = {
  A: "bg-primary",
  B: "bg-accent", 
  C: "bg-success",
  D: "bg-info",
};

export function SegmentGrid({ onSegmentSelect, selectedSegment }: SegmentGridProps) {
  const handleClick = (segment: Segment) => {
    if (selectedSegment?.id === segment.id) {
      onSegmentSelect?.(null);
    } else {
      onSegmentSelect?.(segment);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Customer Segments</h3>
          <p className="text-sm text-muted-foreground">Click to filter dashboard</p>
        </div>
        {selectedSegment && (
          <button
            onClick={() => onSegmentSelect?.(null)}
            className="text-sm text-primary hover:underline font-medium"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {segments.map((segment) => (
          <div
            key={segment.id}
            onClick={() => handleClick(segment)}
            className={`segment-card ${selectedSegment?.id === segment.id ? 'active' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${segmentColors[segment.id]}`} />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Segment {segment.id}
                </span>
              </div>
              <span className="text-2xl font-bold text-foreground">{segment.count}</span>
            </div>
            
            <h4 className="font-semibold text-foreground mb-2">{segment.name}</h4>
            
            <div className="flex items-center gap-1 text-sm mb-3">
              <span className="text-muted-foreground">{segment.metric}:</span>
              <span className="font-bold text-success">{segment.metricValue}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {segment.strategy}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">customers today</span>
              <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}