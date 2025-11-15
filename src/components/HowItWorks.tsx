import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingCart, Search, Lightbulb, Check, ArrowRight, TrendingDown } from "lucide-react";

export function HowItWorks() {
  const examples = [
    {
      category: "Food",
      before: {
        title: "McDonald's",
        items: "3 burgers",
        price: "10 €",
        provider: "Wolt"
      },
      after: {
        title: "Burger King",
        items: "4 burgers",
        price: "10 €",
        provider: "Bolt Food",
        savings: "25% more food"
      },
      color: "orange"
    },
    {
      category: "Clothing",
      before: {
        title: "Store A",
        items: "T-shirt",
        price: "25 €"
      },
      after: {
        title: "Store B",
        items: "T-shirt + socks",
        price: "25 €",
        savings: "Saving 5 €"
      },
      color: "blue"
    },
    {
      category: "Groceries",
      before: {
        title: "Supermarket 1",
        items: "Shopping basket",
        price: "50 €"
      },
      after: {
        title: "Supermarket 2",
        items: "Same basket",
        price: "43 €",
        savings: "Saving 7 €"
      },
      color: "green"
    }
  ];

  const steps = [
    {
      icon: ShoppingCart,
      title: "You are about to buy something",
      description: "You order food via Wolt/Bolt, choose clothes online or buy groceries",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "AI analyzes in real time",
      description: "The system scans prices in other places and stores for similar products",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "You get smart recommendations",
      description: "AI shows better alternatives: where you can buy more or cheaper",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Check,
      title: "You make the decision",
      description: "You choose: buy as planned or use the better offer",
      color: "from-orange-500 to-red-500"
    }
  ];

  const colorClasses = {
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", badge: "bg-orange-500/20", iconBg: "bg-orange-500/20", iconText: "text-orange-400" },
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/20", iconBg: "bg-blue-500/20", iconText: "text-blue-400" },
    green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", badge: "bg-green-500/20", iconBg: "bg-green-500/20", iconText: "text-green-400" }
  };

  return (
    <section className="py-20 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-5 py-2.5 mb-6 border border-green-500/20">
            <Lightbulb className="size-4 text-green-400" />
            <span className="text-sm text-green-300">How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl mb-6 text-zinc-100">
            AI finds better options in real time
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            The system analyzes prices in different places and stores to help you spend money smarter
          </p>
        </div>

        {/* Examples */}
        <div className="mb-24">
          <h3 className="text-2xl text-zinc-100 mb-12 text-center">Examples of savings</h3>
          <div className="grid gap-8 lg:grid-cols-3">
            {examples.map((example, index) => {
              const colors = colorClasses[example.color as keyof typeof colorClasses];
              return (
                <div key={index} className="relative group">
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${colors.border.replace('border-', 'from-').replace('/30', '')}/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
                  
                  <Card className="relative bg-zinc-900/80 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all">
                    <div className="p-8 space-y-6">
                      {/* Category badge */}
                      <div className="flex items-center justify-between">
                        <Badge className={`${colors.badge} ${colors.text} border-0 px-4 py-1.5 text-sm`}>
                          {example.category}
                        </Badge>
                        <div className={`text-xs uppercase tracking-wider ${colors.text} opacity-60`}>
                          Comparison
                        </div>
                      </div>

                      {/* Before - Your choice */}
                      <div className={`relative p-6 rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}>
                        <div className="absolute top-2 right-2 text-xs text-zinc-500 uppercase tracking-wider">
                          Usually
                        </div>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <p className="text-lg text-zinc-100">{example.before.title}</p>
                            <p className="text-sm text-zinc-400">{example.before.items}</p>
                            {example.before.provider && (
                              <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                                <span>via</span>
                                <span className="text-zinc-400">{example.before.provider}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl text-zinc-100">{example.before.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* VS divider */}
                      <div className="flex items-center justify-center relative">
                        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                        <div className={`relative px-4 py-1.5 rounded-full bg-zinc-900 border ${colors.border} ${colors.text} text-xs uppercase tracking-wider`}>
                          vs
                        </div>
                      </div>

                      {/* After - AI recommendation */}
                      <div className={`relative p-6 rounded-xl border-2 ${colors.border} bg-gradient-to-br from-zinc-900 to-zinc-900/50 overflow-hidden shadow-lg`}>
                        <div className="absolute top-2 right-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <div className={`size-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} animate-pulse`} />
                          <span className={colors.text}>AI recommends</span>
                        </div>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <p className="text-lg text-zinc-100">{example.after.title}</p>
                            <p className="text-sm text-zinc-400">{example.after.items}</p>
                            {example.after.provider && (
                              <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                                <span>via</span>
                                <span className="text-zinc-400">{example.after.provider}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl text-zinc-100">{example.after.price}</span>
                          </div>
                        </div>
                        
                        {/* Savings highlight */}
                        <div className={`mt-5 pt-4 border-t ${colors.border} flex items-center justify-between`}>
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${colors.iconBg}`}>
                              <TrendingDown className={`size-4 ${colors.iconText}`} />
                            </div>
                            <span className={`${colors.text}`}>{example.after.savings}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full ${colors.badge} ${colors.text} text-xs uppercase tracking-wider`}>
                            Savings
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <h3 className="text-2xl text-zinc-100 mb-10 text-center">Process</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-zinc-700 to-transparent z-0" />
                  )}
                  <Card className="relative bg-zinc-900/50 border-zinc-800 p-7 h-full hover:bg-zinc-900/80 hover:border-zinc-700 transition-all z-10">
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-xl bg-gradient-to-r ${step.color}`}>
                          <Icon className="size-6 text-white" />
                        </div>
                        <div className={`size-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shrink-0`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-lg text-zinc-100 leading-snug">{step.title}</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration highlight */}
        <div className="p-10 rounded-2xl bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-pink-950/30 border border-zinc-800">
          <div className="text-center space-y-6">
            <h3 className="text-2xl text-zinc-100">Integration with popular services</h3>
            <p className="text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Works with Wolt, Bolt Food and other delivery services. Analyzes prices in clothing stores, 
              supermarkets and any other points of sale. AI finds the best deals in real time while you are placing an order.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="outline" className="px-5 py-2.5 bg-zinc-800/50 border-zinc-700 text-zinc-300">
                Wolt
              </Badge>
              <Badge variant="outline" className="px-5 py-2.5 bg-zinc-800/50 border-zinc-700 text-zinc-300">
                Bolt Food
              </Badge>
              <Badge variant="outline" className="px-5 py-2.5 bg-zinc-800/50 border-zinc-700 text-zinc-300">
                Clothing stores
              </Badge>
              <Badge variant="outline" className="px-5 py-2.5 bg-zinc-800/50 border-zinc-700 text-zinc-300">
                Supermarkets
              </Badge>
              <Badge variant="outline" className="px-5 py-2.5 bg-zinc-800/50 border-zinc-700 text-zinc-300">
                And much more
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
