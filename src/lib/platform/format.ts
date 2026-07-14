// HKD formatting helpers — inputs are in THOUSANDS of HKD (K).
// Renders "HKD 412K" for < 1,000K and "HKD 1.99M" for >= 1,000K.

export function fmtHKDFromK(k: number): string {
  const n = Math.round(k);
  if (Math.abs(n) >= 1000) {
    const m = k / 1000;
    const digits = Math.abs(m) >= 10 ? 1 : 2;
    return `HKD ${m.toFixed(digits)}M`;
  }
  return `HKD ${n.toLocaleString("en-US")}K`;
}

// Input is raw HKD (not thousands). Same output rules.
export function fmtHKD(raw: number): string {
  return fmtHKDFromK(raw / 1000);
}
