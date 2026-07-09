import { useState, useEffect, useCallback } from "react";
import { getDashboardMetrics, type DashboardMetrics } from "@/lib/mockData";

export function useLiveMetrics(refreshInterval = 5000) {
  const [metrics, setMetrics] = useState<DashboardMetrics>(getDashboardMetrics());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate a brief loading state
    setTimeout(() => {
      setMetrics(getDashboardMetrics());
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 300);
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, refreshInterval);
    return () => clearInterval(interval);
  }, [refresh, refreshInterval]);

  return {
    metrics,
    lastUpdate,
    isRefreshing,
    refresh,
  };
}