import { Button } from "./ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1762330917056-e69b34329ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbGVhcm5pbmclMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NjMxMTM0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Digital learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/90" />
          </div>

          {/* Content */}
          <div className="relative px-8 py-20 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-3xl text-center space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-zinc-100 via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                  Start your journey to financial confidence
                </h2>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  Join the new generation of financially literate people. 
                  A safe space for learning and practice is available right now.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group h-12 px-8">
                  Start for free
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-zinc-600 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100 h-12 px-8"
                >
                  <Mail className="mr-2 size-4" />
                  Contact us
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="pt-10 border-t border-zinc-800">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl text-zinc-100">Free</div>
                    <p className="text-sm text-zinc-500">Unlimited access</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl text-zinc-100">No installation</div>
                    <p className="text-sm text-zinc-500">Works in your browser</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl text-zinc-100">Secure</div>
                    <p className="text-sm text-zinc-500">No banking details required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-center text-sm text-zinc-500">
            © 2025 Financial literacy platform. Created to bring equal opportunities in education.
          </p>
        </footer>
      </div>
    </section>
  );
}
