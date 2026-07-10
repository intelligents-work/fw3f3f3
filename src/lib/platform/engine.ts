// Deterministic scenario engine — pure function, no randomness at render time
import { stores, segments, promos, type StoreId, type SegmentId, type PromoType } from "./data";

export interface Scenario {
  storeId: StoreId | "all";
  segmentId: SegmentId;
  promoType: PromoType;
  depth: number;      // % 0-40
  horizon: 7 | 14 | 28;
  weather: boolean;
  holiday: boolean;
  pressure: "low" | "medium" | "high";
}

export const defaultScenario: Scenario = {
  storeId: "all",
  segmentId: "young-adults",
  promoType: "bundle",
  depth: 15,
  horizon: 14,
  weather: false,
  holiday: false,
  pressure: "medium",
};

// Simple deterministic hash for stable but scenario-dependent variation
function h(s: string): number {
  let x = 0;
  for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) >>> 0;
  return (x % 1000) / 1000;
}

export interface Simulation {
  baselineWeekly: number;   // HKD
  predictedWeekly: number;  // HKD
  uplift: number;           // %
  incremental: number;      // HKD (thousands, for display)
  confidence: number;       // 0-100
  risk: "Low" | "Medium" | "High";
  margin: number;           // 0-100 quality index
  drivers: { label: string; weight: number }[];
  series: { day: string; baseline: number; predicted: number }[];
  storeSuitability: { storeId: StoreId; name: string; score: number; verdict: "Launch first" | "Test next" | "Hold" }[];
  segmentResponse: { id: SegmentId; name: string; score: number }[];
  explanation: string;
  recommendation: string;
}

export function simulate(s: Scenario): Simulation {
  const seg = segments.find(x => x.id === s.segmentId)!;
  const promo = promos.find(x => x.id === s.promoType)!;
  const storeList = s.storeId === "all" ? stores : stores.filter(x => x.id === s.storeId);

  const seedKey = `${s.storeId}|${s.segmentId}|${s.promoType}|${s.depth}|${s.horizon}|${s.weather}|${s.holiday}|${s.pressure}`;
  const jitter = h(seedKey); // 0..1

  // Baseline weekly (HKD)
  const baseline = storeList.reduce((sum, st) => sum + st.weeklyOrders * st.aov, 0);

  // Uplift model: promo base + segment sensitivity * depth curve - saturation
  const depthNorm = Math.min(s.depth, 40) / 40; // 0..1
  const depthCurve = 1 - Math.pow(1 - depthNorm, 1.6); // diminishing returns
  const sensitivity = (seg.discountSensitivity + seg.bundleAffinity) / 200; // 0..1
  const storeResp = storeList.reduce((a, b) => a + b.responsiveness, 0) / storeList.length / 100;

  let upliftPct =
    promo.baseUplift * 0.10 + // ~5-9pp base
    depthCurve * 22 * sensitivity +
    storeResp * 6 +
    (s.weather ? -1.4 : 0) +
    (s.holiday ? 2.2 : 0) +
    (s.pressure === "high" ? -1.8 : s.pressure === "low" ? 1.2 : 0) +
    (jitter - 0.5) * 1.6;
  upliftPct = Math.max(2, Math.min(28, upliftPct));

  // Margin quality: hurt more by aggressive depth
  const marginRaw = 82 + promo.marginImpact - depthNorm * 34 + storeResp * 8;
  const margin = Math.max(20, Math.min(96, marginRaw));

  // Confidence: hurt by aggressive depth, high pressure, weather
  let confidence = 88 - depthNorm * 24 - (s.pressure === "high" ? 8 : 0) - (s.weather ? 4 : 0) + storeResp * 6;
  confidence = Math.max(38, Math.min(94, confidence));

  const risk: Simulation["risk"] =
    depthNorm > 0.55 || margin < 50 ? "High" :
    depthNorm > 0.35 || margin < 65 ? "Medium" : "Low";

  const predicted = baseline * (1 + upliftPct / 100);
  const incremental = (predicted - baseline) * (s.horizon / 7) / 1000; // in K HKD

  // Day-of-week series (7 days regardless of horizon; simple pattern)
  const dowFactor = [0.92, 0.95, 0.97, 1.0, 1.08, 1.18, 1.14]; // Mon..Sun
  const series = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => {
    const base = (baseline / 7) * dowFactor[i];
    const pred = (predicted / 7) * dowFactor[i] * (1 + (jitter - 0.5) * 0.03);
    return { day: d, baseline: Math.round(base / 1000), predicted: Math.round(pred / 1000) };
  });

  const drivers = [
    { label: "Segment fit", weight: Math.round(sensitivity * 100) },
    { label: "Promo mechanic", weight: Math.round(promo.baseUplift * 0.9) },
    { label: "Discount depth", weight: Math.round(depthCurve * 100) },
    { label: "Store responsiveness", weight: Math.round(storeResp * 100) },
    { label: "Seasonality", weight: Math.round(50 + (s.holiday ? 22 : 0) + (s.weather ? -12 : 4)) },
  ].sort((a, b) => b.weight - a.weight);

  // Store suitability (all stores, ranked)
  const storeSuitability = stores.map(st => {
    const affinity = st.responsiveness / 100;
    const daypartBias = st.bias[seg.preferredDaypart.toLowerCase() as keyof typeof st.bias] / 100;
    const score = Math.round((affinity * 0.55 + daypartBias * 0.35 + st.demandIndex / 100 * 0.10) * 100);
    return { storeId: st.id, name: st.name, score };
  }).sort((a, b) => b.score - a.score)
    .map((r, i, arr) => {
      const verdict: Simulation["storeSuitability"][number]["verdict"] =
        i < 2 ? "Launch first" : i < arr.length - 1 ? "Test next" : "Hold";
      return { ...r, verdict };
    });

  // Segment response ranking (all segments vs this promo)
  const segmentResponse = segments.map(sg => {
    const localSens = (sg.discountSensitivity + sg.bundleAffinity) / 200;
    const promoFit = promo.baseUplift / 100;
    const score = Math.round((localSens * 0.6 + promoFit * 0.4) * 100 + (sg.id === s.segmentId ? 6 : 0));
    return { id: sg.id, name: sg.name, score: Math.min(100, score) };
  }).sort((a, b) => b.score - a.score);

  const bestStore = storeSuitability[0].name;
  const secondStore = storeSuitability[1].name;
  const caveat =
    risk === "High"
      ? `the ${s.depth}% depth is squeezing margin quality, so cap depth or anchor on a hero bundle`
      : risk === "Medium"
        ? `margin is thinner than ideal at ${s.depth}%, so keep the pilot tight before scaling`
        : `risk is contained at ${s.depth}% depth, giving a clean read on true uplift`;
  const explanation =
    `${promo.name} targeted at ${seg.name} is expected to lift sales ~${upliftPct.toFixed(1)}% over ${s.horizon} days at ${Math.round(confidence)}% confidence, led by the ${bestStore} cluster. Caveat: ${caveat}.`;
  const recommendation =
    `Launch in ${bestStore} and ${secondStore} first for a 5-day read, then extend to the test-next cluster if uplift holds above ${Math.max(2, Math.round(upliftPct * 0.6))}%.`;

  return {
    baselineWeekly: Math.round(baseline),
    predictedWeekly: Math.round(predicted),
    uplift: Number(upliftPct.toFixed(1)),
    incremental: Math.round(incremental),
    confidence: Math.round(confidence),
    risk,
    margin: Math.round(margin),
    drivers,
    series,
    storeSuitability,
    segmentResponse,
    explanation,
    recommendation,
  };
}

// Rank 3 promo options for the Promotion Engine
export function rankPromos(base: Scenario) {
  const options = promos.map(p => {
    const sim = simulate({ ...base, promoType: p.id });
    const score = sim.uplift * 0.4 + sim.confidence * 0.3 + sim.margin * 0.3 - (sim.risk === "High" ? 12 : sim.risk === "Medium" ? 4 : 0);
    return { promo: p, sim, score };
  }).sort((a, b) => b.score - a.score);
  return options.slice(0, 3);
}
