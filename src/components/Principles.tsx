import { Globe, Equal, Sparkles, BookOpen, Target } from "lucide-react";

export function Principles() {
  const principles = [
    {
      icon: Globe,
      title: "Web accessibility",
      description: "Works on school computers, home laptops, tablets — no installation required",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Equal,
      title: "Equal opportunities",
      description: "Does not require banking data, does not depend on income level, suitable for families with any background",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "AI-powered personalization",
      description: "Adapts the style of hints, complexity, and scenarios to the user’s behavior, confidence, and goals",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BookOpen,
      title: "Scientific foundation",
      description: "Based on research-backed models of financial education and behavioral studies",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      title: "Learning by doing",
      description: "The user experiments, makes mistakes in a safe environment, analyzes them and adjusts their strategy",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-6 text-zinc-100">
            Key principles of the platform
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Making it possible for everyone to get an equal opportunity to receive a personalized and effective experience in learning about finance
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                {/* Gradient border effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${principle.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300`} />
                
                <div className="relative bg-zinc-900 rounded-2xl p-8 border border-zinc-800 h-full">
                  <div className="space-y-5">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${principle.gradient}`}>
                      <Icon className="size-8 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl text-zinc-100">{principle.title}</h3>
                      <p className="text-zinc-400 leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
