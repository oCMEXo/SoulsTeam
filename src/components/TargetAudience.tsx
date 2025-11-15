import { Users, GraduationCap, Brain, TrendingUp, Shield } from "lucide-react";
import { Card } from "./ui/card";

export function TargetAudience() {
  const reasons = [
    {
      icon: Users,
      title: "First financial decisions",
      description:
        "From age 12, children first encounter independent financial decisions: pocket money, online purchases, planning expenses",
      color: "text-blue-400",
    },
    {
      icon: Brain,
      title: "Abstract thinking",
      description:
        "From age 12, the ability for abstract thinking develops – understanding planning, risks, balance, and delayed benefits",
      color: "text-purple-400",
    },
    {
      icon: GraduationCap,
      title: "School curriculum",
      description:
        "Financial literacy is introduced into the school curriculum at the lower secondary level, which makes this age group optimal",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      description:
        "The platform structure scales in complexity and remains useful for teenagers, adults, and older people",
      color: "text-orange-400",
    },
    {
      icon: Shield,
      title: "A lifelong skill",
      description:
        "More complex learning paths are suitable for adults: pension planning, long-term risks, digital security",
      color: "text-pink-400",
    },
  ];

  return (
    <section className="py-20 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/50 px-5 py-2.5 mb-6 border border-zinc-700">
            <Users className="size-4 text-zinc-400" />
            <span className="text-sm text-zinc-300">Target audience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl mb-6 text-zinc-100">
            Who the platform is for: 12+
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            A universal, cross-generational tool, with young users remaining the
            main audience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={index}
                className="bg-zinc-900/50 border-zinc-800 p-7 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all"
              >
                <div className="space-y-5">
                  <div
                    className={`inline-flex p-3.5 rounded-xl bg-zinc-800/50 ${reason.color}`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg text-zinc-100">{reason.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 p-10 rounded-2xl bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-pink-950/30 border border-zinc-800">
          <p className="text-center text-lg text-zinc-300 leading-relaxed max-w-4xl mx-auto">
            The tool becomes universal and cross-generational, providing equal
            opportunities to develop financial literacy regardless of age or
            social background
          </p>
        </div>
      </div>
    </section>
  );
}
