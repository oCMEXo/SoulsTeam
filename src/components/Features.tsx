import { Brain, Gamepad2, Shield, BarChart3, Users, Lightbulb } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI personalization",
      description: "An adaptive AI analyzes your behavior and selects optimal learning scenarios"
    },
    {
      icon: Gamepad2,
      title: "Interactive simulations",
      description: "Real-life scenarios where you can experiment without financial risks"
    },
    {
      icon: Shield,
      title: "Safe environment",
      description: "Learn from mistakes in a controlled space without real-world consequences"
    },
    {
      icon: BarChart3,
      title: "Progress tracking",
      description: "Visualizes your skill development and achievements on the path to financial literacy"
    },
    {
      icon: Users,
      title: "For all ages",
      description: "From teenagers to adults — everyone can find the right level of difficulty"
    },
    {
      icon: Lightbulb,
      title: "Evidence-based approach",
      description: "The methodology is based on research in education and behavioral economics"
    }
  ];

  return (
    <section className="py-20 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762994577543-1aa11f21310c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnRzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzMTU2NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right - Features */}
          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl text-zinc-100">
                Platform capabilities
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                A comprehensive approach to developing financial skills through modern technology and evidence-based methods
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="space-y-4">
                    <div className="inline-flex p-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700">
                      <Icon className="size-6 text-blue-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg text-zinc-100">{feature.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
