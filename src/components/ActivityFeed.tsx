import { useState, useEffect } from "react";
import { getActivityFeed, type ActivityEvent } from "@/lib/mockData";
import { 
  CheckCircle, 
  Users, 
  MessageSquare, 
  AlertTriangle,
  ChevronDown
} from "lucide-react";

const typeConfig = {
  conversion: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
    label: "Conversion",
  },
  assignment: {
    icon: Users,
    color: "text-info",
    bg: "bg-info/10",
    label: "Assignment",
  },
  campaign: {
    icon: MessageSquare,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Campaign",
  },
  alert: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    label: "Alert",
  },
};

type FilterType = 'all' | 'conversion' | 'assignment' | 'campaign' | 'alert';

export function ActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    setEvents(getActivityFeed());
    const interval = setInterval(() => setEvents(getActivityFeed()), 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.type === filter);

  const filterButtons: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'conversion', label: 'Conversions' },
    { value: 'campaign', label: 'Campaigns' },
    { value: 'alert', label: 'Alerts' },
  ];

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="section-title">Live Activity</h3>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </div>
          <span className="status-badge status-badge-success text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Auto-refresh
          </span>
        </div>
        
        <div className="flex gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filter === btn.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[350px] overflow-y-auto">
        {filteredEvents.map((event) => {
          const config = typeConfig[event.type];
          const Icon = config.icon;
          const isExpanded = expandedId === event.id;
          
          return (
            <div 
              key={event.id} 
              className="activity-item cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : event.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                  </div>
                  
                  <h4 className="font-medium text-foreground">{event.title}</h4>
                  
                  {isExpanded && (
                    <div className="mt-3 space-y-1.5 animate-fade-in">
                      {event.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground pl-3 border-l-2 border-border">
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {event.result && (
                    <p className={`text-sm font-medium mt-2 ${config.color}`}>→ {event.result}</p>
                  )}
                </div>
                
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-border text-center">
        <button className="text-sm font-medium text-primary hover:underline">Load More Activity</button>
      </div>
    </div>
  );
}