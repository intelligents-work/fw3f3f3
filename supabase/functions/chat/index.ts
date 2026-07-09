import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are an AI assistant for the Fairwood × AI Transcend partnership demo. You help answer questions about AI-powered marketing proposals for Fairwood, a major Hong Kong restaurant chain with 150 stores and HKD 3.1B annual revenue.

Key information you should know:

**Proposal 1: Personalized Product Recommendations**
- AI-driven bundling to boost curry sales + average order value
- Uses 120+ behavioral signals for personalization
- Results from Yum China: +2% average member spend, +15% items per basket, +USD 20M annual incremental sales
- Example bundle: "Curry Beef Brisket + Garlic Butter Bun + Iced Tea"
- Expected AOV Lift: +HKD 8-12 per order

**Proposal 2: Second Purchase Activation**
- Converts first-time buyers to repeat customers using the "golden window" strategy
- Day 7 (T+7): Triggered personalized campaigns via App Push or SMS
- Day 14 (T+14): Secondary touchpoint if no conversion
- Results: +12.6% first-to-second order conversion, 28→11 days repurchase interval, 90% reactivation rate

**Customer Segments:**
- Group A: Price Sensitive → Remind unused benefits
- Group B: Main Course Lovers → Upsell curry combo
- Group C: Hero Product Fans → Cross-sell category
- Group D: Snackers → Frequency bundle

**ROI Projections (8-Week Pilot):**
- Conservative: HKD 800K - 1.2M incremental revenue
- Moderate: HKD 1.5M - 2.5M incremental revenue
- Aggressive: HKD 3M - 5M incremental revenue
- Platform investment: HKD 500K, Payback period: 2-4 weeks

**Data Requirements:**
- Historical order data (12+ months preferred)
- Member/customer records
- Product master data
- Coupon redemption history
- Daily incremental feeds

**Timeline to Launch:**
- Week 1-2: Data Integration
- Week 2-3: Model Training
- Week 3-4: Go-Live Prep
- Week 4+: Pilot Launch

Be helpful, professional, and focused on demonstrating value. Use specific numbers and examples when possible. Keep responses concise but informative.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
