// Fairwood AI Platform — mock master data (demo only)
import porkChopAsset from "@/assets/food-pork-chop-rice.jpg.asset.json";
import curryAsset from "@/assets/food-curry-brisket.jpg.asset.json";
import dessertsAsset from "@/assets/food-desserts.jpg.asset.json";
import breakfastAsset from "@/assets/food-breakfast-set.jpg.asset.json";
import teaComboAsset from "@/assets/food-tea-combo.jpg.asset.json";
import familyAsset from "@/assets/food-family-set.jpg.asset.json";
import signatureAsset from "@/assets/food-signature-rice.jpg.asset.json";
import dinersAsset from "@/assets/fairwood-hk-family.jpg.asset.json";

const porkChop = porkChopAsset.url;
const curry = curryAsset.url;
const desserts = dessertsAsset.url;
const breakfast = breakfastAsset.url;
const teaCombo = teaComboAsset.url;
const family = familyAsset.url;
const signature = signatureAsset.url;
const diners = dinersAsset.url;

export const IMG = { porkChop, curry, desserts, breakfast, teaCombo, family, signature, diners };


export type StoreId =
  | "sha-tin" | "mong-kok" | "causeway-bay" | "tsuen-wan" | "tseung-kwan-o";

export interface Store {
  id: StoreId;
  name: string;
  cluster: "Urban Core" | "Residential" | "Transit Hub";
  district: string;
  weeklyOrders: number;
  aov: number;
  responsiveness: number; // 0-100, higher = better response to promos
  marginProfile: number;  // 0-100
  demandIndex: number;    // 0-100
  bias: { breakfast: number; lunch: number; tea: number; dinner: number }; // 0-100
}

export const stores: Store[] = [
  { id: "sha-tin", name: "Sha Tin", cluster: "Residential", district: "NT East",
    weeklyOrders: 4820, aov: 68.5, responsiveness: 78, marginProfile: 72, demandIndex: 82,
    bias: { breakfast: 62, lunch: 88, tea: 55, dinner: 90 } },
  { id: "mong-kok", name: "Mong Kok", cluster: "Urban Core", district: "Kowloon",
    weeklyOrders: 6120, aov: 62.1, responsiveness: 88, marginProfile: 64, demandIndex: 94,
    bias: { breakfast: 72, lunch: 92, tea: 78, dinner: 74 } },
  { id: "causeway-bay", name: "Causeway Bay", cluster: "Urban Core", district: "HK Island",
    weeklyOrders: 5480, aov: 74.2, responsiveness: 82, marginProfile: 78, demandIndex: 88,
    bias: { breakfast: 55, lunch: 90, tea: 72, dinner: 80 } },
  { id: "tsuen-wan", name: "Tsuen Wan", cluster: "Transit Hub", district: "NT West",
    weeklyOrders: 4210, aov: 61.4, responsiveness: 71, marginProfile: 68, demandIndex: 74,
    bias: { breakfast: 80, lunch: 82, tea: 60, dinner: 70 } },
  { id: "tseung-kwan-o", name: "Tseung Kwan O", cluster: "Residential", district: "Kowloon East",
    weeklyOrders: 3980, aov: 65.9, responsiveness: 74, marginProfile: 74, demandIndex: 76,
    bias: { breakfast: 68, lunch: 78, tea: 58, dinner: 92 } },
];

export type SegmentId =
  | "young-adults" | "office-lunch" | "family-dinner"
  | "breakfast-regulars" | "value-seekers" | "hero-fans";

export interface SegmentDef {
  id: SegmentId;
  name: string;
  size: number; // customers
  aovBias: number; // vs baseline, 100 = same
  discountSensitivity: number; // 0-100, higher = more responsive
  bundleAffinity: number;      // 0-100
  preferredDaypart: "Breakfast" | "Lunch" | "Tea" | "Dinner";
  channels: string[];
  offerStyle: string;
  products: string[];
  image: string;
  accent: string;
}

export const segments: SegmentDef[] = [
  { id: "young-adults", name: "Students", size: 18420, aovBias: 92,
    discountSensitivity: 82, bundleAffinity: 88, preferredDaypart: "Tea",
    channels: ["App push", "Social"], offerStyle: "Bundle + trendy hero item",
    products: ["Baked Pork Chop", "Iced Lemon Tea", "Fries"], image: porkChop, accent: "hsl(14 89% 51%)" },
  { id: "office-lunch", name: "Office Lunch", size: 26310, aovBias: 105,
    discountSensitivity: 48, bundleAffinity: 72, preferredDaypart: "Lunch",
    channels: ["App push", "SMS"], offerStyle: "Fast lunch combo, time-window",
    products: ["Curry Beef Brisket", "Char Siu Rice", "Soup"], image: curry, accent: "hsl(28 100% 54%)" },
  { id: "family-dinner", name: "Family Dinner", size: 14980, aovBias: 128,
    discountSensitivity: 58, bundleAffinity: 92, preferredDaypart: "Dinner",
    channels: ["App push", "In-store"], offerStyle: "Sharing set, weekend focus",
    products: ["Family Set", "Baked Pork Chop Rice", "Drinks"], image: family, accent: "hsl(0 72% 45%)" },
  { id: "breakfast-regulars", name: "Breakfast Regulars", size: 9840, aovBias: 78,
    discountSensitivity: 42, bundleAffinity: 60, preferredDaypart: "Breakfast",
    channels: ["In-store", "SMS"], offerStyle: "Value set, loyalty stamps",
    products: ["Breakfast Set", "Milk Tea", "Egg & Toast"], image: breakfast, accent: "hsl(38 92% 50%)" },
  { id: "value-seekers", name: "Value Seekers", size: 21750, aovBias: 82,
    discountSensitivity: 92, bundleAffinity: 66, preferredDaypart: "Lunch",
    channels: ["SMS", "In-store"], offerStyle: "Deep discount, limited-time",
    products: ["Value Meal A", "Rice Combo", "Soft Drink"], image: signature, accent: "hsl(200 98% 40%)" },
  { id: "hero-fans", name: "Hero Product Fans", size: 12640, aovBias: 118,
    discountSensitivity: 38, bundleAffinity: 84, preferredDaypart: "Dinner",
    channels: ["App push"], offerStyle: "Category bundle, loyalty rewards",
    products: ["Signature Rice", "Curry Combo", "Egg Tart"], image: signature, accent: "hsl(145 63% 42%)" },
];

export type PromoType = "bundle" | "percent-off" | "bogo" | "combo-upsell" | "time-window" | "loyalty";

export interface PromoDef {
  id: PromoType;
  name: string;
  description: string;
  baseUplift: number; // 0-100 index
  marginImpact: number; // -20 to +5 (percentage points hit vs baseline)
  hero: string;
}

export const promos: PromoDef[] = [
  { id: "bundle", name: "Bundle Combo", description: "Hero item + side + drink", baseUplift: 72, marginImpact: -6, hero: teaCombo },
  { id: "percent-off", name: "% Off Hero", description: "Direct discount on signature", baseUplift: 62, marginImpact: -10, hero: signature },
  { id: "bogo", name: "Buy One Get One", description: "BOGO on selected items", baseUplift: 84, marginImpact: -14, hero: porkChop },
  { id: "combo-upsell", name: "Combo Upsell", description: "+HKD add-on to enter combo", baseUplift: 58, marginImpact: -3, hero: curry },
  { id: "time-window", name: "Time-Window Deal", description: "Discount within daypart", baseUplift: 66, marginImpact: -7, hero: breakfast },
  { id: "loyalty", name: "Loyalty Boost", description: "2× stamps for members", baseUplift: 54, marginImpact: -4, hero: family },
];

export interface PresetDef {
  id: string;
  name: string;
  description: string;
  segment: SegmentId;
  promo: PromoType;
  depth: number; // 0-40
  horizon: 7 | 14 | 28;
  weather: boolean;
  holiday: boolean;
  pressure: "low" | "medium" | "high";
  hero: string;
  daypart: string;
}

export const presets: PresetDef[] = [
  { id: "breakfast-value", name: "Breakfast Value Push", description: "Traffic booster before 10am", segment: "breakfast-regulars", promo: "time-window", depth: 15, horizon: 14, weather: false, holiday: false, pressure: "medium", hero: breakfast, daypart: "Breakfast" },
  { id: "tea-combo", name: "Tea Combo Upsell", description: "Student-driven afternoon uplift", segment: "young-adults", promo: "combo-upsell", depth: 12, horizon: 14, weather: false, holiday: false, pressure: "medium", hero: teaCombo, daypart: "Tea" },
  { id: "youth-bundle", name: "Student Bundle Campaign", description: "Bundle-first weekend push", segment: "young-adults", promo: "bundle", depth: 18, horizon: 28, weather: false, holiday: true, pressure: "high", hero: porkChop, daypart: "Tea" },
  { id: "weekend-family", name: "Weekend Family Set", description: "Sharing sets for dinner traffic", segment: "family-dinner", promo: "bundle", depth: 14, horizon: 14, weather: true, holiday: true, pressure: "medium", hero: family, daypart: "Dinner" },
  { id: "hero-recovery", name: "Hero Product Recovery", description: "Re-engage lapsed hero fans", segment: "hero-fans", promo: "loyalty", depth: 10, horizon: 28, weather: false, holiday: false, pressure: "low", hero: signature, daypart: "Dinner" },
  { id: "lunch-booster", name: "Lunch Traffic Booster", description: "Office lunch daypart optimizer", segment: "office-lunch", promo: "time-window", depth: 12, horizon: 7, weather: false, holiday: false, pressure: "medium", hero: curry, daypart: "Lunch" },
];

export interface ProductDef {
  id: string;
  name: string;
  image: string;
  category: string;
  weeklyUnits: number;
  trend: number; // % vs last week
}

export const products: ProductDef[] = [
  { id: "curry-brisket", name: "Curry Beef Brisket", image: curry, category: "Signature", weeklyUnits: 12480, trend: 8.2 },
  { id: "signature-rice", name: "Signature Char Siu Rice", image: signature, category: "Signature", weeklyUnits: 10240, trend: 4.1 },
  { id: "zinger-combo", name: "Baked Pork Chop Combo", image: porkChop, category: "Bundle", weeklyUnits: 8940, trend: 12.6 },
  { id: "tea-combo", name: "Tea-Time Combo", image: teaCombo, category: "Combo", weeklyUnits: 7620, trend: 6.8 },
  { id: "breakfast-set", name: "HK Breakfast Set", image: breakfast, category: "Daypart", weeklyUnits: 6810, trend: -2.4 },
  { id: "family-set", name: "Family Sharing Set", image: family, category: "Bundle", weeklyUnits: 4290, trend: 15.4 },
  { id: "egg-tart", name: "Egg Tart", image: desserts, category: "Side", weeklyUnits: 9860, trend: 3.7 },
];

export interface CampaignDef {
  id: string;
  name: string;
  status: "live" | "recent" | "past";
  image: string;
  segment: SegmentId;
  promo: PromoType;
  uplift: number;      // %
  incremental: number; // HKD (thousands)
  confidence: number;  // 0-100
  reach: number;       // customers reached
  storeCoverage: number; // %
  window: string;
  summary: string;
  worked: string;
  watch: string;
}

export const campaigns: CampaignDef[] = [
  { id: "c-tea-01", name: "Tea Combo Upsell — Wk 42", status: "live", image: teaCombo,
    segment: "young-adults", promo: "combo-upsell", uplift: 18.4, incremental: 284, confidence: 84,
    reach: 22400, storeCoverage: 62, window: "Live · 6 days remaining",
    summary: "Combo upsell converting well among students in urban stores.",
    worked: "App-push CTR 3.1× baseline; combo attach rate +22%.",
    watch: "Redemption dips in Sha Tin — cluster is less price-sensitive." },
  { id: "c-fam-02", name: "Weekend Family Set", status: "live", image: family,
    segment: "family-dinner", promo: "bundle", uplift: 22.1, incremental: 412, confidence: 78,
    reach: 14800, storeCoverage: 80, window: "Live · Weekend only",
    summary: "Weekend dinner bundle showing strong incremental revenue.",
    worked: "AOV +18%, family segment reactivation +14%.",
    watch: "Margin pressure at 14% depth — hold discount." },
  { id: "c-lunch-03", name: "Lunch Traffic Booster", status: "recent", image: curry,
    segment: "office-lunch", promo: "time-window", uplift: 11.2, incremental: 168, confidence: 72,
    reach: 26100, storeCoverage: 100, window: "Ended · 3 days ago",
    summary: "Time-window discount lifted office lunch, mild AOV drop.",
    worked: "Traffic +14% during 12:00–13:30 slot.",
    watch: "Net margin near flat — pair with combo next iteration." },
  { id: "c-bk-04", name: "Breakfast Value Push", status: "recent", image: breakfast,
    segment: "breakfast-regulars", promo: "time-window", uplift: 8.6, incremental: 92, confidence: 68,
    reach: 9600, storeCoverage: 100, window: "Ended · 10 days ago",
    summary: "Modest breakfast lift; strongest in Tsuen Wan and TKO.",
    worked: "Loyalty stamps drove repeat next-day visits.",
    watch: "Urban Core clusters under-indexed — retire in those stores." },
  { id: "c-hero-05", name: "Hero Product Recovery", status: "past", image: signature,
    segment: "hero-fans", promo: "loyalty", uplift: 14.8, incremental: 246, confidence: 80,
    reach: 12200, storeCoverage: 100, window: "Ended · 4 weeks ago",
    summary: "Re-engaged lapsed hero fans with 2× stamps + category bundle.",
    worked: "Reactivation 21% among 60-day inactive members.",
    watch: "Effect decays after week 2 — pair with a fresh combo." },
  { id: "c-youth-06", name: "Student Bundle Weekend", status: "past", image: porkChop,
    segment: "young-adults", promo: "bundle", uplift: 19.6, incremental: 318, confidence: 76,
    reach: 18800, storeCoverage: 100, window: "Ended · 6 weeks ago",
    summary: "Bundle for students strong at MK & CWB, weaker in TKO.",
    worked: "Bundle attach 41%; social share drove new user acquisition.",
    watch: "TKO under-performed — de-prioritize in cluster next round." },
];

export const clusters = [
  { id: "urban-core", name: "Urban Core", stores: ["mong-kok", "causeway-bay"], color: "hsl(14 89% 51%)" },
  { id: "residential", name: "Residential", stores: ["sha-tin", "tseung-kwan-o"], color: "hsl(28 100% 54%)" },
  { id: "transit-hub", name: "Transit Hub", stores: ["tsuen-wan"], color: "hsl(200 98% 40%)" },
];
