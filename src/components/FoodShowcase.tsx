import { TrendingUp, Users, Target } from "lucide-react";
import foodCurryAsset from "@/assets/food-curry-brisket.jpg.asset.json";
import foodBurgerAsset from "@/assets/food-burger-combo.jpg.asset.json";
import foodDessertsAsset from "@/assets/food-desserts.jpg.asset.json";
const foodCurry = foodCurryAsset.url;
const foodBurger = foodBurgerAsset.url;
const foodDesserts = foodDessertsAsset.url;


const products = [
  {
    id: 1,
    image: foodCurry,
    name: "Curry Beef Brisket",
    segment: "Segment C",
    stats: { orders: 523, conversion: "18.7%" },
    trend: "+12%",
  },
  {
    id: 2,
    image: foodBurger,
    name: "Crispy Chicken Combo",
    segment: "Segment B",
    stats: { orders: 412, conversion: "14.5%" },
    trend: "+8%",
  },
  {
    id: 3,
    image: foodDesserts,
    name: "Sweet Treats",
    segment: "Segment D",
    stats: { orders: 289, conversion: "12.3%" },
    trend: "+15%",
  },
];

export function FoodShowcase() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Top Performing Products</h3>
          <p className="section-subtitle">AI-optimized bundle recommendations</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live tracking
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Trend Badge */}
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-success/90 text-white text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                {product.trend}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-1">{product.name}</h4>
              <div className="flex items-center gap-1 text-xs text-primary mb-3">
                <Target className="w-3 h-3" />
                {product.segment}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{product.stats.orders} orders</span>
                </div>
                <div className="font-semibold text-foreground">
                  {product.stats.conversion}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
