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
  Minus
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

export function Demo({ onBackToHome }: DemoProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [currentStep, setCurrentStep] = useState<"search" | "analyzing" | "results" | "cart" | "checkout">("search");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const categories = [
    { id: "food", emoji: "🍔", label: "Еда" },
    { id: "groceries", emoji: "🛒", label: "Продукты" },
    { id: "clothes", emoji: "👕", label: "Одежда" },
    { id: "coffee", emoji: "☕", label: "Кофе" }
  ];

  const filters: { id: FilterType; emoji: string; label: string; categories: string[] }[] = [
    { id: "healthy", emoji: "🥗", label: "Здоровое питание", categories: ["food", "groceries", "coffee"] },
    { id: "fast", emoji: "⚡", label: "Фастфуд", categories: ["food", "coffee"] },
    { id: "traditional", emoji: "🍲", label: "Традиционное", categories: ["food", "groceries"] },
    { id: "budget", emoji: "💰", label: "Экономия", categories: ["food", "groceries", "clothes", "coffee"] },
    { id: "premium", emoji: "⭐", label: "Премиум", categories: ["food", "clothes", "coffee"] }
  ];

  const getAvailableFilters = () => {
    if (!selectedCategory) return [];
    return filters.filter(f => f.categories.includes(selectedCategory));
  };

  const toggleFilter = (filterId: FilterType) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const demoResults = {
    food: {
      original: {
        name: "McDonald's",
        items: "3 Биг М��ка",
        price: "10.00",
        location: "Kamppi, 2 км",
        deliveryTime: "20-30 мин"
      },
      alternatives: [
        {
          name: "Burger King",
          items: "4 Воппера",
          price: "9.90",
          savings: "0.10",
          savingsPercent: "1%",
          extraBenefit: "+1 бургер бесплатно!",
          location: "Kamppi, 1.8 км",
          deliveryTime: "15-25 мин",
          rating: 4.5,
          isRecommended: true
        },
        {
          name: "Hesburger",
          items: "3 Биг Бургера",
          price: "8.50",
          savings: "1.50",
          savingsPercent: "15%",
          location: "Центр, 2.5 км",
          deliveryTime: "25-35 мин",
          rating: 4.3,
          isRecommended: false
        }
      ]
    },
    coffee: {
      original: {
        name: "Starbucks",
        items: "Латте Grande",
        price: "5.50",
        location: "Kamppi, 1 км",
        deliveryTime: "10-15 мин"
      },
      alternatives: [
        {
          name: "Espresso House",
          items: "Латте Large",
          price: "4.80",
          savings: "0.70",
          savingsPercent: "13%",
          location: "Kamppi, 0.8 км",
          deliveryTime: "10-15 мин",
          rating: 4.6,
          isRecommended: true
        },
        {
          name: "Wayne's Coffee",
          items: "Латте Grande",
          price: "4.50",
          savings: "1.00",
          savingsPercent: "18%",
          location: "Центр, 1.5 км",
          deliveryTime: "15-20 мин",
          rating: 4.4,
          isRecommended: false
        }
      ]
    },
    groceries: {
      original: {
        name: "Prisma",
        items: "Продукты на неделю",
        price: "85.00",
        location: "Kamppi, 3 км",
        deliveryTime: "60-90 мин"
      },
      alternatives: [
        {
          name: "S-Market",
          items: "Те же продукты",
          price: "78.40",
          savings: "6.60",
          savingsPercent: "8%",
          location: "Kamppi, 2 км",
          deliveryTime: "45-60 мин",
          rating: 4.5,
          isRecommended: true
        },
        {
          name: "Alepa",
          items: "Те же продукты",
          price: "82.00",
          savings: "3.00",
          savingsPercent: "4%",
          location: "Kamppi, 1.2 км",
          deliveryTime: "30-45 мин",
          rating: 4.2,
          isRecommended: false
        }
      ]
    },
    clothes: {
      original: {
        name: "H&M",
        items: "Футболка + Джинсы",
        price: "60.00",
        location: "Kamppi, 0.5 км",
        deliveryTime: "Самовывоз"
      },
      alternatives: [
        {
          name: "Reserved",
          items: "Аналогичный комплект",
          price: "48.00",
          savings: "12.00",
          savingsPercent: "20%",
          location: "Forum, 1 км",
          deliveryTime: "Самовывоз",
          rating: 4.4,
          isRecommended: true
        },
        {
          name: "Zara",
          items: "Похожий комплект",
          price: "55.00",
          savings: "5.00",
          savingsPercent: "8%",
          location: "Kamppi, 0.6 км",
          deliveryTime: "Самовывоз",
          rating: 4.6,
          isRecommended: false
        }
      ]
    }
  };

  const handleSearch = () => {
    if (!selectedCategory) return;
    
    setCurrentStep("analyzing");
    
    // Simulate AI analyzing
    setTimeout(() => {
      setCurrentStep("results");
    }, 2000);
  };

  const handleReset = () => {
    setCurrentStep("search");
    setSearchQuery("");
    setBudget("");
    setSelectedCategory(null);
    setSelectedFilters([]);
  };

  const getCurrentResults = () => {
    if (!selectedCategory) return null;
    const baseResults = demoResults[selectedCategory as keyof typeof demoResults];
    const budgetNum = parseFloat(budget);
    
    // Adjust results based on budget and filters
    if (selectedFilters.includes("healthy") && selectedCategory === "food") {
      return {
        original: {
          name: "McDonald's",
          items: "3 Биг Мака",
          price: budget || "10.00",
          location: "Kamppi, 2 км",
          deliveryTime: "20-30 мин"
        },
        alternatives: [
          {
            name: "Hoy Bowl",
            items: "2 Поке Боул с лососем",
            price: (budgetNum * 0.95).toFixed(2),
            savings: (budgetNum * 0.05).toFixed(2),
            savingsPercent: "5%",
            extraBenefit: "Свежие овощи и белок!",
            location: "Kamppi, 1.5 км",
            deliveryTime: "20-30 мин",
            rating: 4.7,
            isRecommended: true,
            filterMatch: "🥗 Здоровое питание"
          },
          {
            name: "Leaf & Grain",
            items: "Салат Цезарь + Смузи",
            price: (budgetNum * 0.90).toFixed(2),
            savings: (budgetNum * 0.10).toFixed(2),
            savingsPercent: "10%",
            location: "Центр, 2 км",
            deliveryTime: "25-35 мин",
            rating: 4.6,
            isRecommended: false,
            filterMatch: "🥗 Здоровое питание"
          }
        ]
      };
    }
    
    if (selectedFilters.includes("fast") && selectedCategory === "food") {
      return {
        original: {
          name: "McDonald's",
          items: "3 Биг Мака",
          price: budget || "10.00",
          location: "Kamppi, 2 км",
          deliveryTime: "20-30 мин"
        },
        alternatives: [
          {
            name: "Burger King",
            items: `${Math.floor(budgetNum / 2.5)} Воппера`,
            price: (budgetNum * 0.98).toFixed(2),
            savings: (budgetNum * 0.02).toFixed(2),
            savingsPercent: "2%",
            extraBenefit: "+1 бургер бесплатно!",
            location: "Kamppi, 1.8 км",
            deliveryTime: "15-20 мин",
            rating: 4.5,
            isRecommended: true,
            filterMatch: "⚡ Фастфуд"
          },
          {
            name: "Hesburger",
            items: `${Math.floor(budgetNum / 2.8)} Биг Бургера`,
            price: (budgetNum * 0.85).toFixed(2),
            savings: (budgetNum * 0.15).toFixed(2),
            savingsPercent: "15%",
            location: "Центр, 2.5 км",
            deliveryTime: "20-30 мин",
            rating: 4.3,
            isRecommended: false,
            filterMatch: "⚡ Фастфуд"
          }
        ]
      };
    }
    
    if (selectedFilters.includes("budget")) {
      return {
        original: baseResults.original,
        alternatives: [
          {
            ...baseResults.alternatives[1],
            isRecommended: true,
            filterMatch: "💰 Экономия"
          },
          {
            ...baseResults.alternatives[0],
            isRecommended: false
          }
        ]
      };
    }
    
    if (selectedFilters.includes("premium") && selectedCategory === "food") {
      return {
        original: {
          name: "McDonald's",
          items: "3 Биг Мака",
          price: budget || "10.00",
          location: "Kamppi, 2 км",
          deliveryTime: "20-30 мин"
        },
        alternatives: [
          {
            name: "Hook",
            items: "Премиум бургер + картофель фри",
            price: budget || "15.00",
            savings: "0.00",
            savingsPercent: "0%",
            extraBenefit: "Органические ингредиенты премиум класса",
            location: "Kamppi, 1 км",
            deliveryTime: "25-35 мин",
            rating: 4.8,
            isRecommended: true,
            filterMatch: "⭐ Премиум"
          },
          {
            name: "Social Burgerjoint",
            items: "Крафтовый бургер",
            price: (budgetNum * 1.2).toFixed(2),
            savings: "0.00",
            savingsPercent: "0%",
            extraBenefit: "Ремесленное качество",
            location: "Центр, 1.5 км",
            deliveryTime: "30-40 мин",
            rating: 4.7,
            isRecommended: false,
            filterMatch: "⭐ Премиум"
          }
        ]
      };
    }

    // Adjust prices based on budget
    if (budget && budgetNum > 0) {
      const adjustedResults = JSON.parse(JSON.stringify(baseResults));
      adjustedResults.original.price = budget;
      
      adjustedResults.alternatives = adjustedResults.alternatives.map((alt: any) => {
        const savingPercent = parseFloat(alt.savingsPercent) / 100;
        const newPrice = budgetNum * (1 - savingPercent);
        const newSavings = budgetNum - newPrice;
        
        return {
          ...alt,
          price: newPrice.toFixed(2),
          savings: newSavings.toFixed(2)
        };
      });
      
      return adjustedResults;
    }
    
    return baseResults;
  };

  const results = getCurrentResults();

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalSavings = cart.reduce((total, item) => total + parseFloat(item.savings) * item.quantity, 0);
  const totalCost = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

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
                  <p className="text-xs text-zinc-500">AI находит выгоду для вас</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Демо режим
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
                <span className="text-sm text-blue-300">Попробуйте AI-советник прямо сейчас</span>
              </div>
              <h2 className="text-3xl sm:text-4xl text-zinc-100">
                Что вы хотите купить?
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Выберите категорию, и AI найдет более выгодные варианты для вас
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
                      <label className="text-sm text-zinc-400 mb-2 block">Сколько хотите потратить?</label>
                      <div className="relative">
                        <Euro className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
                        <input
                          type="number"
                          placeholder="Например: 10"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full h-14 pl-12 pr-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">Что именно ищете?</label>
                      <div className="flex items-center gap-3">
                        <Search className="size-5 text-zinc-500" />
                        <input
                          type="text"
                          placeholder={`Например: ${
                            selectedCategory === "food" ? "Бургеры" :
                            selectedCategory === "coffee" ? "Латте" :
                            selectedCategory === "groceries" ? "Овощи и фрукты" :
                            "Футболка"
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
                    <label className="text-sm text-zinc-400 mb-3 block">Выберите предпочтения</label>
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
                  {budget ? `Найти варианты на ${budget}€` : "Укажите бюджет"}
                </Button>

                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-400 text-center">
                    💡 AI найдет лучшие варианты в вашем бюджете с учетом ваших предпочтений
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
              <h2 className="text-2xl text-zinc-100">AI анализирует цены...</h2>
              <div className="space-y-3 max-w-md mx-auto">
                {[
                  "Сканирование ресторанов поблизости",
                  "Сравнение цен и акций",
                  "Поиск лучших предложений"
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
                <span className="text-sm text-green-400">Нашли более выгодные варианты!</span>
              </div>
            </div>

            {/* Original Choice */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-zinc-800 text-zinc-400 border-0 mb-3">
                    Ваш выбор
                  </Badge>
                  <h3 className="text-xl text-zinc-100 mb-1">{results.original.name}</h3>
                  <p className="text-zinc-400">{results.original.items}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-zinc-100">{results.original.price} €</div>
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
                  <h3 className="text-xl text-zinc-100">AI рекомендует</h3>
                </div>
                {selectedFilters.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-500">Фильтры:</span>
                    {selectedFilters.map(filterId => {
                      const filter = filters.find(f => f.id === filterId);
                      return filter ? (
                        <Badge key={filterId} className="bg-blue-500/10 text-blue-400 border-blue-500/30">
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
                        Лучший вариант
                      </Badge>
                      {(alt as any).filterMatch && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {(alt as any).filterMatch}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl text-zinc-100 mb-1">{alt.name}</h4>
                      <p className="text-zinc-400 mb-2">{alt.items}</p>
                      {alt.extraBenefit && (
                        <p className="text-sm text-green-400">✨ {alt.extraBenefit}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-zinc-100">{alt.price} €</div>
                      <div className="flex items-center gap-2 mt-1">
                        <TrendingDown className="size-4 text-green-400" />
                        <span className="text-green-400">-{alt.savings} €</span>
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
                      onClick={() => addToCart({
                        id: `${alt.name}-${alt.items}`,
                        name: alt.name,
                        items: alt.items,
                        price: alt.price,
                        category: selectedCategory || "",
                        location: alt.location,
                        deliveryTime: alt.deliveryTime,
                        savings: alt.savings,
                        quantity: 1
                      })}
                    >
                      Выбрать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <Card className="bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-400 mb-1">💰 Ваша экономия</p>
                  <p className="text-2xl text-green-300">
                    +{results.alternatives[0].savings} € ({results.alternatives[0].savingsPercent})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400 mb-1">За год вы сэкономите</p>
                  <p className="text-xl text-zinc-200">
                    ~{(parseFloat(results.alternatives[0].savings) * 50).toFixed(0)} €
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
                Попробовать другую категорию
              </Button>
            </div>
          </div>
        )}

        {currentStep === "cart" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                <ShoppingCart className="size-4 text-green-400" />
                <span className="text-sm text-green-400">Ваша корзина</span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map(item => (
                <Card
                  key={item.id}
                  className="p-6 transition-all bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl text-zinc-100 mb-1">{item.name}</h4>
                      <p className="text-zinc-400 mb-2">{item.items}</p>
                      {item.extraBenefit && (
                        <p className="text-sm text-green-400">✨ {item.extraBenefit}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-zinc-100">{item.price} €</div>
                      <div className="flex items-center gap-2 mt-1">
                        <TrendingDown className="size-4 text-green-400" />
                        <span className="text-green-400">-{item.savings} €</span>
                        <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">
                          {item.savingsPercent}
                        </Badge>
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
                        <span className="text-sm text-zinc-400">{item.quantity}</span>
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
                  <p className="text-sm text-green-400 mb-1">💰 Ваша экономия</p>
                  <p className="text-2xl text-green-300">
                    +{totalSavings.toFixed(2)} €
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400 mb-1">Общая стоимость</p>
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
                Очистить корзину
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
              <p className="text-sm text-green-400">Товар добавлен в корзину</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}