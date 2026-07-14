import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Utensils } from "lucide-react";
import foodCurryAsset from "@/assets/food-curry-brisket.jpg.asset.json";
import foodBurgerAsset from "@/assets/food-burger-combo.jpg.asset.json";
import foodDessertsAsset from "@/assets/food-desserts.jpg.asset.json";
const foodCurry = foodCurryAsset.url;
const foodBurger = foodBurgerAsset.url;
const foodDesserts = foodDessertsAsset.url;


const banners = [
  {
    id: 1,
    image: foodCurry,
    title: "Curry Beef Brisket Bundle",
    subtitle: "AI-Personalized Recommendation",
    stat: "+32.4%",
    statLabel: "Conversion Rate",
    highlight: "Top Performer Today",
    gradient: "from-primary/90 to-primary/60",
  },
  {
    id: 2,
    image: foodBurger,
    title: "Crispy Chicken Combo Special",
    subtitle: "Second Purchase Campaign",
    stat: "+15%",
    statLabel: "AOV Lift",
    highlight: "T+7 Golden Window",
    gradient: "from-secondary/90 to-secondary/60",
  },
  {
    id: 3,
    image: foodDesserts,
    title: "Sweet Treats Cross-Sell",
    subtitle: "Segment D: Snackers",
    stat: "12.3%",
    statLabel: "Cross-sell Rate",
    highlight: "New Campaign Live",
    gradient: "from-gold/90 to-gold/60",
  },
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const current = banners[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl h-[220px] md:h-[200px] group">
      {/* Background Image */}
      <div className="absolute inset-0 transition-transform duration-700">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${current.gradient}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
              <Sparkles className="w-3 h-3" />
              {current.highlight}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {current.title}
            </h2>
            <p className="text-white/80 text-sm flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              {current.subtitle}
            </p>
          </div>

          {/* Stats Badge */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center min-w-[100px]">
            <div className="flex items-center justify-center gap-1 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="text-2xl font-bold">{current.stat}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{current.statLabel}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={goToPrev}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
