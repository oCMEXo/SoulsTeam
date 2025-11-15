import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Search,
  Sparkles,
  TrendingDown,
  MapPin,
  Clock,
  Check,
  ArrowLeft,
  Euro,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

interface DemoProps {
  onBackToHome: () => void;
}

type FilterType = "healthy" | "fast" | "traditional" | "budget" | "premium";

interface CartItem {
  id: string;
  name: string;
  items: string;
  price: string;
  category: string;
  location: string;
  deliveryTime: string;
  savings: string;
  quantity: number;
  extraBenefit?: string;
  rating?: number;
  savingsPercent?: string;
}

interface ResultOriginal {
  name: string;
  items: string;
  price: string;
  location: string;
  deliveryTime: string;
}

interface ResultAlternative {
  name: string;
  items: string;
  price: string;
  location: string;
  deliveryTime: string;
  savings: string;
  savingsPercent: string;
  extraBenefit?: string;
  rating?: number;
  isRecommended?: boolean;
  filterMatch?: string;
}

interface AiOriginalObject {
  name?: string;
  items?: string;
  price?: string | number;
  location?: string;
  deliveryTime?: string;
}

interface AiAlternativeObject {
  name?: string;
  items?: string;
  price?: string | number;
  location?: string;
  deliveryTime?: string;
  savings?: string | number;
  savingsPercent?: string | number;
  extraBenefit?: string;
  rating?: number;
  isRecommended?: boolean;
  filterMatch?: string;
}

interface AiResponse {
  summary?: string;
  original?: string | AiOriginalObject;
  alternatives?: AiAlternativeObject[];
}

interface Results {
  original: ResultOriginal;
  alternatives: ResultAlternative[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin;

export function Demo({ onBackToHome }: DemoProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [currentStep, setCurrentStep] = useState<
      "search" | "analyzing" | "results" | "cart"
  >("search");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const [results, setResults] = useState<Results | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<AiResponse | null>(null);

  const categories = [
    { id: "food", emoji: "🍔", label: "Food" },
    { id: "groceries", emoji: "🛒", label: "Groceries" },
    { id: "clothes", emoji: "👕", label: "Clothes" },
    { id: "coffee", emoji: "☕", label: "Coffee" },
  ];

  const filters: {
    id: FilterType;
    emoji: string;
    label: string;
    categories: string[];
  }[] = [
    {
      id: "healthy",
      emoji: "🥗",
      label: "Healthy",
      categories: ["food", "groceries", "coffee"],
    },
    {
      id: "fast",
      emoji: "⚡",
      label: "Fast Food",
      categories: ["food", "coffee"],
    },
    {
      id: "traditional",
      emoji: "🍲",
      label: "Traditional",
      categories: ["food", "groceries"],
    },
    {
      id: "budget",
      emoji: "💰",
      label: "Budget",
      categories: ["food", "groceries", "clothes", "coffee"],
    },
    {
      id: "premium",
      emoji: "⭐",
      label: "Premium",
      categories: ["food", "clothes", "coffee"],
    },
  ];

  const getAvailableFilters = () => {
    if (!selectedCategory) return [];
    return filters.filter((f) => f.categories.includes(selectedCategory));
  };

  const toggleFilter = (filterId: FilterType) => {
    setSelectedFilters((prev) =>
        prev.includes(filterId)
            ? prev.filter((f) => f !== filterId)
            : [...prev, filterId]
    );
  };

  // ---------- AI REQUEST ----------

  const handleSearch = async () => {
    if (!selectedCategory) return;

    setCurrentStep("analyzing");
    setAiError(null);
    setResults(null);
    setAiSummary(null);
    setRawResponse(null);

    try {
      const filtersText =
          selectedFilters.length > 0
              ? selectedFilters.join(", ")
              : "no additional filters";

      const prompt = `
Category: ${selectedCategory}
Budget: ${budget || "-"} €
User wants: ${searchQuery || "-"}
Filters: ${filtersText}
`.trim();

      console.log("Sending prompt:", prompt);

const res = await fetch(
  `${API_BASE}/ai/ask?prompt=${encodeURIComponent(prompt)}`
);

// временный лог
const rawText = await res.text();
console.log("RAW RESPONSE TEXT:", rawText);

// если статус не ок – покажем это и выйдем
if (!res.ok) {
  setAiError(`Server error: ${res.status} – ${rawText}`);
  setCurrentStep("results");
  return;
}

// если всё ок – ещё раз распарсим как JSON
const data: AiResponse = JSON.parse(rawText);
console.log("AI parsed response:", data);

      if (!data || data.original === undefined) {
        console.error("Missing 'original' in response:", data);
        setAiError("AI did not return original item information");
        setCurrentStep("results");
        return;
      }

      // --- Summary text ---
      if (typeof data.original === "string") {
        setAiSummary(data.original);
      } else {
        setAiSummary(data.summary || null);
      }

      // --- User choice card ---
      let original: ResultOriginal;

      if (typeof data.original === "string") {
        const nameFromCategory =
            selectedCategory === "food"
                ? "You want to eat"
                : selectedCategory === "coffee"
                    ? "You want coffee"
                    : selectedCategory === "groceries"
                        ? "You want groceries"
                        : "Your choice";

        original = {
          name: searchQuery.trim() || nameFromCategory,
          items:
              `Budget: ${budget || "-"} ` +
              (selectedFilters.length ? `• Filters: ${filtersText}` : ""),
          price: budget || "0",
          location: "—",
          deliveryTime: "—",
        };
      } else {
        original = {
          name: data.original.name || "Your choice",
          items: data.original.items || "",
          price: String(data.original.price ?? "0"),
          location: data.original.location || "—",
          deliveryTime: data.original.deliveryTime || "—",
        };
      }

      const originalPriceNum = parseFloat(
          original.price.toString().replace(",", ".")
      );

      // --- Alternatives ---
      let alternatives: ResultAlternative[] = [];

      if (Array.isArray(data.alternatives) && data.alternatives.length > 0) {
        alternatives = data.alternatives
            .filter((a) => a && typeof a === "object")
            .map((a, i) => {
              const priceStr = String(a.price ?? "0");
              const priceNum = parseFloat(priceStr.replace(",", "."));

              let savingsNum = 0;
              let savingsPercentStr = "0%";

              if (a.savings !== undefined && a.savingsPercent !== undefined) {
                savingsNum = parseFloat(String(a.savings).replace(",", "."));
                savingsPercentStr = String(a.savingsPercent);
              } else if (
                  isFinite(originalPriceNum) &&
                  isFinite(priceNum) &&
                  originalPriceNum > 0 &&
                  priceNum < originalPriceNum
              ) {
                savingsNum = originalPriceNum - priceNum;
                const percent = (savingsNum / originalPriceNum) * 100;
                savingsPercentStr = `${Math.round(percent)}%`;
              }

              return {
                name: a.name || `Option ${i + 1}`,
                items: a.items || "",
                price: priceStr,
                location: a.location || "—",
                deliveryTime: a.deliveryTime || "—",
                extraBenefit: a.extraBenefit,
                rating: typeof a.rating === "number" ? a.rating : undefined,
                savings: (
                    a.savings !== undefined
                        ? parseFloat(String(a.savings).replace(",", "."))
                        : savingsNum
                ).toFixed(2),
                savingsPercent: savingsPercentStr,
                isRecommended: a.isRecommended || false,
                filterMatch: a.filterMatch,
              };
            });

        if (alternatives.length > 0 && !alternatives.some((a) => a.isRecommended)) {
          const bestIndex = alternatives.reduce((bestIdx, alt, idx) => {
            const price = parseFloat(alt.price.replace(",", "."));
            const bestPrice = parseFloat(
                alternatives[bestIdx].price.replace(",", ".")
            );
            return price < bestPrice ? idx : bestIdx;
          }, 0);

          alternatives = alternatives.map((a, i) => ({
            ...a,
            isRecommended: i === bestIndex,
          }));
        }
      }

      setResults({ original, alternatives });
      setCurrentStep("results");
    } catch (e) {
      console.error("Fetch/parse error:", e);
      setAiError(
          `Failed to process AI response: ${
              e instanceof Error ? e.message : "unknown error"
          }`
      );
      setCurrentStep("results");
    }
  };

  const handleReset = () => {
    setCurrentStep("search");
    setSearchQuery("");
    setBudget("");
    setSelectedCategory(null);
    setSelectedFilters([]);
    setResults(null);
    setAiError(null);
    setAiSummary(null);
    setRawResponse(null);
  };

  // ---------- Cart ----------

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
          cart.map((cartItem) =>
              cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
          )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalSavings = cart.reduce(
      (total, item) => total + parseFloat(item.savings || "0") * item.quantity,
      0
  );
  const totalCost = cart.reduce(
      (total, item) => total + parseFloat(item.price || "0") * item.quantity,
      0
  );

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(
        cart
            .map((item) =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
            .filter((item) => item.quantity > 0)
    );
  };

  // ---------- JSX ----------

  return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                    onClick={onBackToHome}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <ArrowLeft className="size-5 text-zinc-400" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="size-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl">MoneyMoney Demo</h1>
                    <p className="text-xs text-zinc-500">
                      AI finds savings for you
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  Demo Mode
                </Badge>
                {cart.length > 0 && (
                    <button
                        onClick={() => setCurrentStep("cart")}
                        className="relative p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <ShoppingCart className="size-6 text-zinc-100" />
                      <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center bg-green-500 text-white border-0 p-0">
                        {cart.length}
                      </Badge>
                    </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          {/* Step: Search */}
          {currentStep === "search" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Sparkles className="size-4 text-blue-400" />
                    <span className="text-sm text-blue-300">
                  Try AI assistant now
                </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl text-zinc-100">
                    What do you want to buy?
                  </h2>
                  <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Choose a category and AI will find the best options for you
                  </p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {categories.map((cat) => (
                      <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-6 rounded-xl border-2 transition-all ${
                              selectedCategory === cat.id
                                  ? "bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20"
                                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                          }`}
                      >
                        <div className="text-4xl mb-2">{cat.emoji}</div>
                        <div className="text-sm text-zinc-300">{cat.label}</div>
                      </button>
                  ))}
                </div>

                {selectedCategory && (
                    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
                      {/* Budget & Query */}
                      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-zinc-400 mb-2 block">
                              Your budget
                            </label>
                            <div className="relative">
                              <Euro className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
                              <input
                                  type="number"
                                  placeholder="Example: 10"
                                  value={budget}
                                  onChange={(e) => setBudget(e.target.value)}
                                  className="w-full h-14 pl-12 pr-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-blue-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-zinc-400 mb-2 block">
                              What exactly are you looking for?
                            </label>
                            <div className="flex items-center gap-3">
                              <Search className="size-5 text-zinc-500" />
                              <input
                                  type="text"
                                  placeholder={`Example: ${
                                      selectedCategory === "food"
                                          ? "Burgers"
                                          : selectedCategory === "coffee"
                                              ? "Latte"
                                              : selectedCategory === "groceries"
                                                  ? "Vegetables"
                                                  : "T-shirt"
                                  }`}
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="flex-1 h-14 px-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-blue-500 transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Filters */}
                      {getAvailableFilters().length > 0 && (
                          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                            <label className="text-sm text-zinc-400 mb-3 block">
                              Preferences
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {getAvailableFilters().map((filter) => (
                                  <button
                                      key={filter.id}
                                      onClick={() => toggleFilter(filter.id)}
                                      className={`px-4 py-2.5 rounded-xl border-2 transition-all flex items-center gap-2 ${
                                          selectedFilters.includes(filter.id)
                                              ? "bg-blue-500/20 border-blue-500 text-blue-300"
                                              : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                                      }`}
                                  >
                                    <span className="text-lg">{filter.emoji}</span>
                                    <span className="text-sm">{filter.label}</span>
                                  </button>
                              ))}
                            </div>
                          </Card>
                      )}

                      {/* Search button */}
                      <Button
                          onClick={handleSearch}
                          disabled={!budget}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white h-14 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="size-5 mr-2" />
                        {budget ? `Find options for ${budget}€` : "Enter budget"}
                      </Button>

                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="text-sm text-blue-400 text-center">
                          💡 AI will search for the best deals based on your budget
                          and preferences
                        </p>
                      </div>
                    </div>
                )}
              </div>
          )}

          {/* ANALYZING */}
          {currentStep === "analyzing" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center size-20 rounded-full bg-blue-500/10 border-2 border-blue-500/30 animate-pulse">
                    <Sparkles className="size-10 text-blue-400" />
                  </div>
                  <h2 className="text-2xl text-zinc-100">
                    AI is analyzing prices...
                  </h2>
                  <div className="space-y-3 max-w-md mx-auto">
                    {[
                      "Scanning nearby restaurants",
                      "Comparing prices and discounts",
                      "Searching for best deals",
                    ].map((text, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
                            style={{ animationDelay: `${i * 200}ms` }}
                        >
                          <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-sm text-zinc-400">{text}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}

          {/* RESULTS */}
          {currentStep === "results" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                    <Check className="size-4 text-green-400" />
                    <span className="text-sm text-green-400">
                  Analysis results
                </span>
                  </div>
                </div>

                {aiError && (
                    <Card className="bg-red-500/10 border border-red-500/40 p-4">
                      <p className="text-sm text-red-300 text-center">{aiError}</p>
                    </Card>
                )}

                {results && (
                    <>
                      {/* USER CHOICE */}
                      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Badge className="bg-zinc-800 text-zinc-400 border-0 mb-3">
                              Your Choice
                            </Badge>
                            <h3 className="text-xl text-zinc-100 mb-1">
                              {results.original.name}
                            </h3>
                            <p className="text-zinc-400">
                              {results.original.items}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl text-zinc-100">
                              {results.original.price}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-zinc-500 pt-4 border-t border-zinc-800">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="size-4" />
                            <span>{results.original.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-4" />
                            <span>{results.original.deliveryTime}</span>
                          </div>
                        </div>
                      </Card>

                      {/* AI RECOMMENDATIONS */}
                      {results.alternatives.length > 0 ? (
                          <>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="size-5 text-blue-400" />
                                  <h3 className="text-xl text-zinc-100">
                                    AI Recommends
                                  </h3>
                                </div>
                                {selectedFilters.length > 0 && (
                                    <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-500">
                              Filters:
                            </span>
                                      {selectedFilters.map((filterId) => {
                                        const filter = filters.find(
                                            (f) => f.id === filterId
                                        );
                                        return filter ? (
                                            <Badge
                                                key={filterId}
                                                className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                                            >
                                              {filter.emoji} {filter.label}
                                            </Badge>
                                        ) : null;
                                      })}
                                    </div>
                                )}
                              </div>

                              {results.alternatives.map((alt, index) => (
                                  <Card
                                      key={index}
                                      className={`p-6 transition-all ${
                                          alt.isRecommended
                                              ? "bg-green-500/10 border-2 border-green-500/50 shadow-lg shadow-green-500/20"
                                              : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                                      }`}
                                  >
                                    {alt.isRecommended && (
                                        <div className="flex items-center gap-2 mb-4">
                                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                            <Sparkles className="size-3 mr-1" />
                                            Best Option
                                          </Badge>
                                          {alt.filterMatch && (
                                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                {alt.filterMatch}
                                              </Badge>
                                          )}
                                        </div>
                                    )}

                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex-1">
                                        <h4 className="text-xl text-zinc-100 mb-1">
                                          {alt.name}
                                        </h4>
                                        <p className="text-zinc-400 mb-2">{alt.items}</p>
                                        {alt.extraBenefit && (
                                            <p className="text-sm text-green-400">
                                              ✨ {alt.extraBenefit}
                                            </p>
                                        )}
                                      </div>
                                      <div className="text-right">
                                        <div className="text-2xl text-zinc-100">
                                          {alt.price}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                          <TrendingDown className="size-4 text-green-400" />
                                          <span className="text-green-400">
                                  -{alt.savings} €
                                </span>
                                          <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">
                                            {alt.savingsPercent}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                                        <div className="flex items-center gap-1.5">
                                          <MapPin className="size-4" />
                                          <span>{alt.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <Clock className="size-4" />
                                          <span>{alt.deliveryTime}</span>
                                        </div>
                                        {alt.rating && (
                                            <div className="flex items-center gap-1.5">
                                              <span>⭐</span>
                                              <span>{alt.rating}</span>
                                            </div>
                                        )}
                                      </div>
                                      <Button
                                          className={`${
                                              alt.isRecommended
                                                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                                  : "bg-blue-600 hover:bg-blue-700"
                                          } text-white`}
                                          onClick={() =>
                                              addToCart({
                                                id: `${alt.name}-${alt.items}`,
                                                name: alt.name,
                                                items: alt.items,
                                                price: alt.price,
                                                category: selectedCategory || "",
                                                location: alt.location,
                                                deliveryTime: alt.deliveryTime,
                                                savings: alt.savings,
                                                quantity: 1,
                                                extraBenefit: alt.extraBenefit,
                                                rating: alt.rating,
                                                savingsPercent: alt.savingsPercent,
                                              })
                                          }
                                      >
                                        Choose
                                      </Button>
                                    </div>
                                  </Card>
                              ))}
                            </div>

                            {/* Savings Summary */}
                            <Card className="bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/40 p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-green-400 mb-1">
                                    💰 Your savings
                                  </p>
                                  <p className="text-2xl text-green-300">
                                    +{results.alternatives[0].savings} € (
                                    {results.alternatives[0].savingsPercent})
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-zinc-400 mb-1">
                                    Estimated yearly savings
                                  </p>
                                  <p className="text-xl text-zinc-200">
                                    ~
                                    {(
                                        parseFloat(
                                            results.alternatives[0].savings || "0"
                                        ) * 50
                                    ).toFixed(0)}{" "}
                                    €
                                  </p>
                                </div>
                              </div>
                            </Card>
                          </>
                      ) : (
                          <Card className="bg-zinc-900/70 border-zinc-700 p-6">
                            <p className="text-sm text-zinc-300 text-center">
                              AI couldn’t find better alternatives, but you can modify
                              your budget or category and try again.
                            </p>
                          </Card>
                      )}

                      <div className="flex justify-center pt-4">
                        <Button
                            onClick={handleReset}
                            variant="outline"
                            className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-100"
                        >
                          Try another category
                        </Button>
                      </div>
                    </>
                )}
              </div>
          )}

          {/* CART */}
          {currentStep === "cart" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                    <ShoppingCart className="size-4 text-green-400" />
                    <span className="text-sm text-green-400">Your Cart</span>
                  </div>
                </div>

                {cart.length === 0 ? (
                    <Card className="bg-zinc-900/50 border-zinc-800 p-12 text-center">
                      <ShoppingCart className="size-12 text-zinc-600 mx-auto mb-4" />
                      <p className="text-zinc-400 mb-4">Your cart is empty</p>
                      <Button
                          onClick={() => setCurrentStep("search")}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Start Searching
                      </Button>
                    </Card>
                ) : (
                    <>
                      {/* CART ITEMS */}
                      <div className="space-y-4">
                        {cart.map((item) => (
                            <Card
                                key={item.id}
                                className="p-6 transition-all bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h4 className="text-xl text-zinc-100 mb-1">
                                    {item.name}
                                  </h4>
                                  <p className="text-zinc-400 mb-2">{item.items}</p>
                                  {item.extraBenefit && (
                                      <p className="text-sm text-green-400">
                                        ✨ {item.extraBenefit}
                                      </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl text-zinc-100">
                                    {item.price}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <TrendingDown className="size-4 text-green-400" />
                                    <span className="text-green-400">
                              -{item.savings}€
                            </span>
                                    {item.savingsPercent && (
                                        <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">
                                          {item.savingsPercent}
                                        </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-4 text-sm text-zinc-500">
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="size-4" />
                                    <span>{item.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="size-4" />
                                    <span>{item.deliveryTime}</span>
                                  </div>
                                  {item.rating && (
                                      <div className="flex items-center gap-1.5">
                                        <span>⭐</span>
                                        <span>{item.rating}</span>
                                      </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                      className="bg-red-500 hover:bg-red-600 text-white"
                                      onClick={() => removeFromCart(item.id)}
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                  <div className="flex items-center gap-2 bg-zinc-800 rounded-lg">
                                    <Button
                                        className="bg-transparent hover:bg-zinc-700 text-zinc-100 h-9 w-9 p-0"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        disabled={item.quantity <= 1}
                                    >
                                      <Minus className="size-4" />
                                    </Button>
                                    <span className="text-sm text-zinc-400 px-3">
                              {item.quantity}
                            </span>
                                    <Button
                                        className="bg-transparent hover:bg-zinc-700 text-zinc-100 h-9 w-9 p-0"
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Plus className="size-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                        ))}
                      </div>

                      {/* SUMMARY */}
                      <Card className="bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/40 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-400 mb-1">
                              💰 Your total savings
                            </p>
                            <p className="text-2xl text-green-300">
                              +{totalSavings.toFixed(2)} €
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-zinc-400 mb-1">Total cost</p>
                            <p className="text-xl text-zinc-200">
                              {totalCost.toFixed(2)} €
                            </p>
                          </div>
                        </div>
                      </Card>

                      <div className="flex justify-center gap-4 pt-4">
                        <Button
                            onClick={() => setCurrentStep("search")}
                            variant="outline"
                            className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-100"
                        >
                          Continue Shopping
                        </Button>
                        <Button
                            onClick={clearCart}
                            variant="outline"
                            className="border-red-700 bg-red-900/20 hover:bg-red-900/30 text-red-400"
                        >
                          Clear Cart
                        </Button>
                      </div>
                    </>
                )}
              </div>
          )}
        </div>

        {/* Cart Notification */}
        {showCartNotification && (
            <div className="fixed bottom-4 right-4 z-50">
              <Card className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl shadow-lg shadow-green-500/20">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="size-5 text-green-400" />
                  <p className="text-sm text-green-400">
                    Item added to cart
                  </p>
                </div>
              </Card>
            </div>
        )}
      </div>
  );
}
