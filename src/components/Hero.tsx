import { Button } from "./ui/button";
import { Sparkles, ShoppingBag, TrendingDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onTryDemo: () => void;
}

export function Hero({ onTryDemo }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-zinc-950 to-purple-950/20" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left content */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-5 py-2.5 border border-blue-500/20">
              <Sparkles className="size-4 text-blue-400" />
              <span className="text-sm text-blue-300">AI assistant for smarter shopping</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent leading-tight">
                Spend your money smarter with MoneyCoach
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
                AI analyzes prices in real time and finds better alternatives for your purchases. 
                In restaurants, clothing stores, supermarkets — everywhere you spend money.
              </p>
            </div>

            {/* Example highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-950/40 to-emerald-950/40 border border-green-800/40 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-green-500/20">
                  <Sparkles className="size-4 text-green-400" />
                </div>
                <span className="text-sm text-green-400">Example of savings</span>
              </div>
              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 size-2 rounded-full bg-zinc-600" />
                  <p className="text-zinc-300 flex-1">
                    <span className="text-zinc-500">You:</span> 3 burgers at McDonald's for <span className="text-zinc-100">10€</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 size-2 rounded-full bg-green-500" />
                  <p className="text-green-300 flex-1">
                    <span className="text-green-400">AI:</span> 4 burgers at Burger King for <span className="text-green-200">10€</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8"
                onClick={onTryDemo}
              >
                Try demo
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-100 h-12 px-8">
                How it works
              </Button>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-8 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <ShoppingBag className="size-5 text-blue-400" />
                  </div>
                  <span className="text-3xl text-zinc-100">16+</span>
                </div>

                <p className="text-sm text-zinc-500">Age</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <TrendingDown className="size-5 text-green-400" />
                  </div>
                  <span className="text-3xl text-zinc-100">24/7</span>
                </div>
                <p className="text-sm text-zinc-500">Price analysis</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Sparkles className="size-5 text-purple-400" />
                  </div>
                  <span className="text-3xl text-zinc-100">AI</span>
                </div>
                <p className="text-sm text-zinc-500">Smart tips</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative lg:h-[600px] h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl" />
            <div className="relative h-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1678082309527-7c47ac57d738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzE1NjU3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Financial education platform"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
