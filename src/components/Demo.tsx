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
  X,
  Home,
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
}

// backend address
const API_BASE = "http://localhost:5032";

export function Demo({ onBackToHome }: DemoProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [currentStep, setCurrentStep] = useState<
    "search" | "analyzing" | "results" | "cart" | "checkout"
  >("search");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const [aiReply, setAiReply] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

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
      label: "Healthy food",
      categories: ["food", "groceries", "coffee"],
    },
    {
      id: "fast",
      emoji: "⚡",
      label: "Fast food",
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

  const demoResults = {
    food: {
      original: {
        name: "McDonald's",
        items: "3 Big Macs",
        price: "10.00",
        location: "Kamppi, 2 km",
        deliveryTime: "20–30 min",
      },
      alternatives: [
        {
          name: "Burger King",
          items: "4 Whoppers",
          price: "9.90",
          savings: "0.10",
          savingsPercent: "1%",
          extraBenefit: "+1 burger for free!",
          location: "Kamppi, 1.8 km",
          deliveryTime: "15–25 min",
          rating: 4.5,
          isRecommended: true,
        },
        {
          name: "Hesburger",
          items: "3 Big Burgers",
          price: "8.50",
          savings: "1.50",
          savingsPercent: "15%",
          location: "City center, 2.5 km",
          deliveryTime: "25–35 min",
          rating: 4.3,
          isRecommended: false,
        },
      ],
    },
    coffee: {
      original: {
        name: "Starbucks",
        items: "Latte Grande",
        price: "5.50",
        location: "Kamppi, 1 km",
        deliveryTime: "10–15 min",
      },
      alternatives: [
        {
          name: "Espresso House",
          items: "Latte Large",
          price: "4.80",
          savings: "0.70",
          savingsPercent: "13%",
          location: "Kamppi, 0.8 km",
          deliveryTime: "10–15 min",
          rating: 4.6,
          isRecommended: true,
        },
        {
          name: "Wayne's Coffee",
          items: "Latte Grande",
          price: "4.50",
          savings: "1.00",
          savingsPercent: "18%",
          location: "City center, 1.5 km",
          deliveryTime: "15–20 min",
          rating: 4.4,
          isRecommended: false,
        },
      ],
    },
    groceries: {
      original: {
        name: "Prisma",
        items: "Groceries for a week",
        price: "85.00",
        location: "Kamppi, 3 km",
        deliveryTime: "60–90 min",
      },
      alternatives: [
        {
          name: "S-Market",
          items: "The same groceries",
          price: "78.40",
          savings: "6.60",
          savingsPercent: "8%",
          location: "Kamppi, 2 km",
          deliveryTime: "45–60 min",
          rating: 4.5,
          isRecommended: true,
        },
        {
          name: "Alepa",
          items: "The same groceries",
          price: "82.00",
          savings: "3.00",
          savingsPercent: "4%",
          location: "Kamppi, 1.2 km",
          deliveryTime: "30–45 min",
          rating: 4.2,
          isRecommended: false,
        },
      ],
    },
    clothes: {
      original: {
        name: "H&M",
        items: "T-shirt + Jeans",
        price: "60.00",
        location: "Kamppi, 0.5 km",
        deliveryTime: "Pickup",
      },
      alternatives: [
        {
          name: "Reserved",
          items: "Similar outfit",
          price: "48.00",
          savings: "12.00",
          savingsPercent: "20%",
          location: "Forum, 1 km",
          deliveryTime: "Pickup",
          rating: 4.4,
          isRecommended: true,
        },
        {
          name: "Zara",
          items: "Comparable outfit",
          price: "55.00",
          savings: "5.00",
          savingsPercent: "8%",
          location: "Kamppi, 0.6 km",
          deliveryTime: "Pickup",
          rating: 4.6,
          isRecommended: false,
        },
      ],
    },
  };

  const handleSearch = async () => {
    if (!selectedCategory) return;

    setCurrentStep("analyzing");
    setAiReply(null);
    setAiError(null);

    try {
      const filtersText =
        selectedFilters.length > 0
          ? selectedFilters.join(", ")
          : "no additional filters";

      const prompt = `
Category: ${selectedCategory}
Budget: ${budget || "-"} €
What the user is looking for: ${searchQuery || "-"}
Filters: ${filtersText}
      `.trim();

      const res = await fetch(
        `${API_BASE}/ai/ask?prompt=${encodeURIComponent(prompt)}`
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", res.status, text);
        setAiError(`Server error: ${res.status}`);
      } else {
        // assuming backend returns plain text
        const text = await res.text();
        setAiReply(text || "AI did not return a response");
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setAiError("Failed to reach the AI server");
    } finally {
      setTimeout(() => {
        setCurrentStep("results");
      }, 800);
    }
  };

  const handleReset = () => {
    setCurrentStep("search");
    setSearchQuery("");
    setBudget("");
    setSelectedCategory(null);
    setSelectedFilters([]);
    setAiReply(null);
    setAiError(null);
  };

  const getCurrentResults = () => {
    if (!selectedCategory) return null;
    const baseResults =
      demoResults[selectedCategory as keyof typeof demoResults];
    const budgetNum = parseFloat(budget);

    if (selectedFilters.includes("healthy") && selectedCategory === "food") {
      return {
        original: {
          name: "McDonald's",
          items: "3 Big Macs",
          price: budget || "10.00",
          location: "Kamppi, 2 km",
          deliveryTime: "20–30 min",
        },
        alternatives: [
          {
            name: "Hoy Bowl",
            items: "2 Salmon poke bowls",
            price: (budgetNum * 0.95).toFixed(2),
            savings: (budgetNum * 0.05).toFixed(2),
            savingsPercent: "5%",
            extraBenefit: "Fresh vegetables and protein!",
            location: "Kamppi, 1.5 km",
            deliveryTime: "20–30 min",
            rating: 4.7,
            isRecommended: true,
            filterMatch: "🥗 Healthy food",
          },
          {
            name: "Leaf & Grain",
            items: "Caesar salad + Smoothie",
            price: (budgetNum * 0.9).toFixed(2),
            savings: (budgetNum * 0.1).toFixed(2),
            savingsPercent: "10%",
            location: "City center, 2 km",
            deliveryTime: "25–35 min",
            rating: 4.6,
            isRecommended: false,
            filterMatch: "🥗 Healthy food",
          },
        ],
      };
    }

    if (selectedFilters.includes("fast") && selectedCategory === "food") {
      return {
        original: {
          name: "McDonald's",
          items: "3 Big Macs",
          price: budget || "10.00",
          location: "Kamppi, 2 km",
          deliveryTime: "20–30 min",
        },
        alternatives: [
          {
            name: "Burger King",
            items: `${Math.floor(budgetNum / 2.5)} Whoppers`,
            price: (budgetNum * 0.98).toFixed(2),
            savings: (budgetNum * 0.02).toFixed(2),
            savingsPercent: "2%",
            extraBenefit: "+1 burger for free!",
            location: "Kamppi, 1.8 km",
            deliveryTime: "15–20 min",
            rating: 4.5,
            isRecommended: true,
            filterMatch: "⚡ Fast food",
          },
          {
            name: "Hesburger",
            items: `${Math.floor(budgetNum / 2.8)} Big Burgers`,
            price: (budgetNum * 0.85).toFixed(2),
            savings: (budgetNum * 0.15).toFixed(2),
            savingsPercent: "15%",
            location: "City center, 2.5 km",
            deliveryTime: "20–30 min",
            rating: 4.3,
            isRecommended: false,
            filterMatch: "⚡ Fast food",
          },
        ],
      };
    }

    if (selectedFilters.includes("budget")) {
      return {
        original: baseResults.original,
        alternatives: [
          {
            ...baseResults.alternatives[1],
            isRecommended: true,
            filterMatch: "💰 Budget",
          },
          {
            ...baseResults.alternatives[0],
            isRecommended: false,
          },
        ],
      };
    }

    if (selectedFilters.includes("premium") && selectedCategory === "food") {
      return {
        original: {
          name: "McDonald's",
          items: "3 Big Macs",
          price: budget || "10.00",
          location: "Kamppi, 2 km",
          deliveryTime: "20–30 min",
        },
        alternatives: [
          {
            name: "Hook",
            items: "Premium burger + fries",
            price: budget || "15.00",
            savings: "0.00",
            savingsPercent: "0%",
            extraBenefit: "Premium organic ingredients",
            location: "Kamppi, 1 km",
            deliveryTime: "25–35 min",
            rating: 4.8,
            isRecommended: true,
            filterMatch: "⭐ Premium",
          },
          {
            name: "Social Burgerjoint",
            items: "Craft burger",
            price: (budgetNum * 1.2).toFixed(2),
            savings: "0.00",
            savingsPercent: "0%",
            extraBenefit: "Artisanal quality",
            location: "City center, 1.5 km",
            deliveryTime: "30–40 min",
            rating: 4.7,
            isRecommended: false,
            filterMatch: "⭐ Premium",
          },
        ],
      };
    }

    if (budget && budgetNum > 0) {
      const adjustedResults = JSON.parse(JSON.stringify(baseResults));
      adjustedResults.original.price = budget;

      adjustedResults.alternatives = adjustedResults.alternatives.map(
        (alt: any) => {
          const savingPercent = parseFloat(alt.savingsPercent) / 100;
          const newPrice = budgetNum * (1 - savingPercent);
          const newSavings = budgetNum - newPrice;

          return {
            ...alt,
            price: newPrice.toFixed(2),
            savings: newSavings.toFixed(2),
          };
        }
      );

      return adjustedResults;
    }

    return baseResults;
  };

  const results = getCurrentResults();

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
    (total, item) => total + parseFloat(item.savings) * item.quantity,
    0
  );
  const totalCost = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

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
                    AI finds the best deals for you
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Demo mode
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
        {currentStep === "search" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Sparkles className="size-4 text-blue-400" />
                <span className="text-sm text-blue-300">
                  Try the AI assistant right now
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl text-zinc-100">
                What do you want to buy?
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Choose a category and AI will find better deals for you
              </p>
            </div>

            {/* Category Selection */}
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
                {/* Budget Input */}
                <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">
                        How much do you want to spend?
                      </label>
                      <div className="relative">
                        <Euro className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
                        <input
                          type="number"
                          placeholder="For example: 10"
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
                          placeholder={`For example: ${
                            selectedCategory === "food"
                              ? "Burgers"
                              : selectedCategory === "coffee"
                              ? "Latte"
                              : selectedCategory === "groceries"
                              ? "Vegetables and fruit"
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
                      Choose your preferences
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

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  disabled={!budget}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white h-14 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="size-5 mr-2" />
                  {budget
                    ? `Find options for ${budget}€`
                    : "Enter your budget"}
                </Button>

                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-400 text-center">
                    💡 AI will find the best options in your budget based on your
                    preferences
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

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
                  "Scanning restaurants nearby",
                  "Comparing prices and deals",
                  "Finding the best offers",
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

        {currentStep === "results" && results && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                <Check className="size-4 text-green-400" />
                <span className="text-sm text-green-400">
                  We found better options!
                </span>
              </div>
            </div>

            {(aiReply || aiError) && (
              <Card className="bg-zinc-900/70 border-zinc-700 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="size-5 text-blue-400 mt-1" />
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">
                      AI assistant&apos;s comment
                    </p>
                    {aiReply && (
                      <p className="text-sm text-zinc-100 whitespace-pre-wrap">
                        {aiReply}
                      </p>
                    )}
                    {aiError && (
                      <p className="text-sm text-red-400 whitespace-pre-wrap">
                        {aiError}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Original Choice */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-zinc-800 text-zinc-400 border-0 mb-3">
                    Your choice
                  </Badge>
                  <h3 className="text-xl text-zinc-100 mb-1">
                    {results.original.name}
                  </h3>
                  <p className="text-zinc-400">{results.original.items}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-zinc-100">
                    {results.original.price} €
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

            {/* AI Alternatives */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-blue-400" />
                  <h3 className="text-xl text-zinc-100">AI recommends</h3>
                </div>
                {selectedFilters.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-500">Filters:</span>
                    {selectedFilters.map((filterId) => {
                      const filter = filters.find((f) => f.id === filterId);
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

              {results.alternatives.map((alt: any, index: number) => (
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
                        Best option
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
                        {alt.price} €
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
                      <div className="flex items-center gap-1.5">
                        <span>⭐</span>
                        <span>{alt.rating}</span>
                      </div>
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
                        })
                      }
                    >
                      Choose
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <Card className="bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-400 mb-1">💰 Your savings</p>
                  <p className="text-2xl text-green-300">
                    +{results.alternatives[0].savings} € (
                    {results.alternatives[0].savingsPercent})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400 mb-1">
                    Per year you could save
                  </p>
                  <p className="text-xl text-zinc-200">
                    ~
                    {(
                      parseFloat(results.alternatives[0].savings) * 50
                    ).toFixed(0)}{" "}
                    €
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-100"
              >
                Try another category
              </Button>
            </div>
          </div>
        )}

        {currentStep === "cart" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                <ShoppingCart className="size-4 text-green-400" />
                <span className="text-sm text-green-400">Your cart</span>
              </div>
            </div>

            {/* Cart Items */}
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
                        {item.price} €
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <TrendingDown className="size-4 text-green-400" />
                        <span className="text-green-400">
                          -{item.savings} €
                        </span>
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
                      <div className="flex items-center gap-1.5">
                        <span>⭐</span>
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="size-4" />
                        </Button>
                        <span className="text-sm text-zinc-400">
                          {item.quantity}
                        </span>
                        <Button
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                          onClick={() => removeFromCart(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <Card className="bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-400 mb-1">💰 Your savings</p>
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

            <div className="flex justify-center pt-4">
              <Button
                onClick={clearCart}
                variant="outline"
                className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-100"
              >
                Clear cart
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl shadow-lg shadow-green-500/20">
            <div className="flex items-center gap-3">
              <ShoppingCart className="size-5 text-green-400" />
              <p className="text-sm text-green-400">Item added to cart</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
