// Mock data for the interactive dashboard simulation

export interface DashboardMetrics {
  ordersToday: number;
  redemptions: number;
  redemptionRate: number;
  repeatBuyers: number;
  repeatRate: number;
  avgOrderValue: number;
}

export interface Segment {
  id: string;
  name: string;
  count: number;
  metric: string;
  metricValue: string;
  strategy: string;
  color: string;
}

export interface ActivityEvent {
  id: number;
  time: string;
  type: 'conversion' | 'assignment' | 'campaign' | 'alert';
  title: string;
  details: string[];
  result?: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  segment: string;
  firstOrder: {
    item: string;
    price: number;
    time: string;
    device: string;
  };
  signals: {
    curryAffinity: number;
    bundlePropensity: number;
    beverageInterest: number;
    sideInterest: number;
    conversionLikelihood: number;
  };
  recommendation: {
    bundle: string;
    originalPrice: number;
    offerPrice: number;
    discount: number;
    aovLift: number;
    reason: string;
  };
}

// Dashboard data with simulated real-time updates
export const getDashboardMetrics = (): DashboardMetrics => ({
  ordersToday: 2847 + Math.floor(Math.random() * 20 - 10),
  redemptions: 847 + Math.floor(Math.random() * 10 - 5),
  redemptionRate: 29.8,
  repeatBuyers: 156 + Math.floor(Math.random() * 5 - 2),
  repeatRate: 5.5,
  avgOrderValue: 67.50 + (Math.random() * 2 - 1),
});

export const segments: Segment[] = [
  {
    id: "A",
    name: "Price Sensitive",
    count: 347,
    metric: "Redemption",
    metricValue: "34.5%",
    strategy: "Remind unused benefits, limited-time offers",
    color: "bg-chart-1",
  },
  {
    id: "B",
    name: "Main Course Lovers",
    count: 412,
    metric: "2nd Order",
    metricValue: "18.7%",
    strategy: "Upsell curry combos, premium bundles",
    color: "bg-chart-2",
  },
  {
    id: "C",
    name: "Hero Product Fans",
    count: 523,
    metric: "Loyalty",
    metricValue: "67% in 14d",
    strategy: "Category bundles, loyalty rewards",
    color: "bg-chart-3",
  },
  {
    id: "D",
    name: "Snackers",
    count: 289,
    metric: "Cross-sell",
    metricValue: "12.3%",
    strategy: "Sweet+Savory pairing promotions",
    color: "bg-chart-4",
  },
];

export const getActivityFeed = (): ActivityEvent[] => [
  {
    id: 1,
    time: "11:47 PM",
    type: "conversion",
    title: "2nd Order Conversion Success",
    details: [
      "Customer #847291 (Segment C: Hero Product Fan)",
      "Offer: Curry Beef Brisket Bundle + Iced Tea",
      "Price: HKD 55 (19% discount, normally HKD 68)",
      "Result: Order placed",
      "AOV Impact: +HKD 12 vs baseline",
    ],
    result: "Time to conversion: 4.2 hours",
  },
  {
    id: 2,
    time: "11:41 PM",
    type: "assignment",
    title: "Segment Assignment",
    details: [
      "23 new customers assigned to Segment B",
      'First order: "Zinger Burger + Drink, no sides"',
      "Insight: Lacking combo structure",
      "Targeting offer: Zinger + Fries + Drink combo @ HKD 49",
    ],
    result: "Scheduled: T+7 golden window",
  },
  {
    id: 3,
    time: "11:32 PM",
    type: "campaign",
    title: "SMS Campaign Sent",
    details: [
      "156 inactive users reached (T+7 golden window)",
      "Segment mix: A(48) | B(52) | C(41) | D(15)",
      "Open rate (5 min): 34%",
      "Conversion so far: 12.3%",
    ],
    result: "19 conversions, HKD 1,247 revenue",
  },
  {
    id: 4,
    time: "11:15 PM",
    type: "alert",
    title: "Campaign Performance Alert",
    details: [
      "Campaign #FW-CURRY-001 exceeding targets!",
      "Impressions: 847",
      "Click-through: 29.8% (target: 20%)",
      "Orders: 274",
      "Conversion: 32.4% (target: 25%)",
    ],
    result: "Revenue: HKD 18,450 | AOV lift: +15%",
  },
];

export const customerProfiles: CustomerProfile[] = [
  {
    id: "david",
    name: "David",
    age: 28,
    location: "Causeway Bay",
    segment: "First-time Curry Buyer",
    firstOrder: {
      item: "Curry Beef Brisket + Rice",
      price: 48,
      time: "12:30 PM (lunch)",
      device: "Mobile app",
    },
    signals: {
      curryAffinity: 94,
      bundlePropensity: 78,
      beverageInterest: 72,
      sideInterest: 76,
      conversionLikelihood: 67,
    },
    recommendation: {
      bundle: "Curry Beef Brisket + Garlic Butter Bun + Iced Tea",
      originalPrice: 68,
      offerPrice: 55,
      discount: 19,
      aovLift: 7,
      reason: "David bought curry, missing sides/drink. Garlic bun pairs perfectly with curry spice. Iced tea complements lunch daypart. 19% discount drives urgency.",
    },
  },
  {
    id: "sarah",
    name: "Sarah",
    age: 32,
    location: "Tsim Sha Tsui",
    segment: "Main Course Lover",
    firstOrder: {
      item: "Zinger Burger + Pepsi",
      price: 52,
      time: "1:15 PM (lunch)",
      device: "Mobile app",
    },
    signals: {
      curryAffinity: 45,
      bundlePropensity: 82,
      beverageInterest: 88,
      sideInterest: 65,
      conversionLikelihood: 71,
    },
    recommendation: {
      bundle: "Zinger Burger + Curry Beef Brisket + Iced Lemon Tea",
      originalPrice: 98,
      offerPrice: 79,
      discount: 19,
      aovLift: 27,
      reason: "Sarah loves burgers. 67% of similar customers who tried curry loved it. Bundle cross-sells curry category. Premium combo drives higher AOV.",
    },
  },
  {
    id: "michael",
    name: "Michael",
    age: 45,
    location: "Central",
    segment: "Price Sensitive",
    firstOrder: {
      item: "Value Meal A",
      price: 38,
      time: "12:00 PM (lunch)",
      device: "In-store",
    },
    signals: {
      curryAffinity: 55,
      bundlePropensity: 42,
      beverageInterest: 60,
      sideInterest: 35,
      conversionLikelihood: 48,
    },
    recommendation: {
      bundle: "Curry Chicken + Rice + Soup (Lunch Special)",
      originalPrice: 52,
      offerPrice: 39,
      discount: 25,
      aovLift: 1,
      reason: "Michael is price-sensitive. High discount needed. Lunch special positioning. Focus on value perception over upsell.",
    },
  },
  {
    id: "lisa",
    name: "Lisa",
    age: 24,
    location: "Mong Kok",
    segment: "Snacker",
    firstOrder: {
      item: "Afternoon Tea Set",
      price: 35,
      time: "3:30 PM (tea time)",
      device: "Mobile app",
    },
    signals: {
      curryAffinity: 30,
      bundlePropensity: 68,
      beverageInterest: 92,
      sideInterest: 85,
      conversionLikelihood: 55,
    },
    recommendation: {
      bundle: "Sweet & Savory Combo: Wings + Egg Tart + Milk Tea",
      originalPrice: 58,
      offerPrice: 45,
      discount: 22,
      aovLift: 10,
      reason: "Lisa is a snacker. Focus on sweet+savory pairing. Tea time daypart optimization. Bundle multiple small items for perceived value.",
    },
  },
];

export const abTestResults = {
  personalized: {
    impressions: 8247,
    clickThrough: 29.8,
    conversions: 274,
    conversionRate: 32.4,
    aov: 75.28,
    revenue: 18450,
    discountCost: 2214,
    netProfit: 6200,
    roi: 342,
  },
  generic: {
    impressions: 8301,
    clickThrough: 11.8,
    conversions: 126,
    conversionRate: 13.2,
    aov: 64.50,
    revenue: 8127,
    discountCost: 1920,
    netProfit: -1713,
    roi: -37,
  },
};

export const funnelData = [
  { step: "First-Time Customers (Eligible)", count: 2847, percentage: 100 },
  { step: "Assigned to Segments", count: 2847, percentage: 100 },
  { step: "Received T+7 Campaign", count: 2847, percentage: 100 },
  { step: "Engaged (Opened/Clicked)", count: 847, percentage: 29.8 },
  { step: "Converted to 2nd Order", count: 274, percentage: 9.6 },
];

export interface JourneyStep {
  day: number;
  title: string;
  description: string;
  details: string[];
  isHighlight?: boolean;
  churnRisk?: number;
  orderValue?: number;
}

export const customerJourney: JourneyStep[] = [
  {
    day: 0,
    title: "First Purchase",
    description: "Customer makes their first order",
    details: [
      "Item: Zinger Burger + Pepsi",
      "Price: HKD 52",
      "Store: Causeway Bay #12",
      "Time: Jan 9, 12:45 PM",
      "AI Analysis: Missing sides, curry cross-sell opportunity",
      "Segment: B (Main Course Lover)",
    ],
    churnRisk: 54,
  },
  {
    day: 7,
    title: "Golden Window (T+7)",
    description: "Critical re-engagement window",
    details: [
      "⚡ AUTO-TRIGGER: Customer hasn't ordered in 7 days",
      "Sending personalized offer via App Push",
      "Offer: Zinger + Curry Beef Brisket Bundle",
      "Price: HKD 79 (normally HKD 98)",
      "Result: Notification opened in 4 minutes",
      "Order placed: HKD 79 (↑52% vs 1st order)",
    ],
    isHighlight: true,
    churnRisk: 12,
    orderValue: 79,
  },
  {
    day: 14,
    title: "Safety Net (T+14)",
    description: "Secondary touchpoint (not needed if converted)",
    details: [
      "If no conversion at T+7, increase discount 5-10%",
      "Switch to different category offer",
      "SMS reminder with short link",
    ],
  },
  {
    day: 21,
    title: "Repeat Frequency Established",
    description: "Customer becomes a regular",
    details: [
      "🎉 Customer is now a REPEAT CUSTOMER",
      "Order History: 4 orders in 28 days",
      "Frequency: Orders every 7-8 days",
      "Baseline LTV: HKD 52",
      "With Proposal 2: HKD 287 (after 4 orders)",
      "CLTV Increase: +450%",
    ],
    churnRisk: 8,
    orderValue: 74,
  },
];