import { Sparkles, MapPin, Heart, Users, School } from "lucide-react";
import { Badge } from "./ui/badge";

export function UniqueValue() {
  const values = [
    {
      icon: Sparkles,
      title: "Comprehensive learning personalization",
      description: "The platform adapts to the user, not the other way around",
      badge: "AI adaptation",
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Scenarios based on life transitions",
      description: "From the first purchase to future planning, learning is grounded in real-life situations",
      badge: "Realism",
      color: "purple"
    },
    {
      icon: Heart,
      title: "Inclusivity and accessibility",
      description: "Suitable for those who lack family support or experience in financial matters",
      badge: "For everyone",
      color: "pink"
    },
    {
      icon: Users,
      title: "For young people and adults",
      description: "The system of skills and scenarios scales and remains relevant for all ages",
      badge: "Universal",
      color: "green"
    },
    {
      icon: School,
      title: "Different learning contexts",
      description: "Suitable for schools, home use, educational programs, and tutors",
      badge: "Flexibility",
      color: "orange"
    }
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-300", iconBg: "bg-blue-500/20", iconText: "text-blue-400" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-300", iconBg: "bg-purple-500/20", iconText: "text-purple-400" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-300", iconBg: "bg-pink-500/20", iconText: "text-pink-400" },
    green: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-300", iconBg: "bg-green-500/20", iconText: "text-green-400" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-300", iconBg: "bg-orange-500/20", iconText: "text-orange-400" }
  };

  return (
    <section className="py-20 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/50 px-5 py-2.5 mb-6 border border-zinc-700">
            <Sparkles className="size-4 text-zinc-400" />
            <span className="text-sm text-zinc-300">Uniqueness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl mb-6 text-zinc-100">
            What makes the platform unique
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            An innovative approach to financial education with a focus on personalization and hands-on experience
          </p>
        </div>

        <div className="space-y-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            const colors = colorClasses[value.color as keyof typeof colorClasses];
            
            return (
              <div 
                key={index}
                className={`p-8 rounded-2xl border ${colors.border} ${colors.bg} hover:bg-opacity-80 transition-all group`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className={`flex-shrink-0 p-4 rounded-xl ${colors.iconBg}`}>
                    <Icon className={`size-8 ${colors.iconText}`} />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className={`text-xl ${colors.text}`}>{value.title}</h3>
                      <Badge variant="outline" className={`${colors.border} ${colors.text} px-3 py-1`}>
                        {value.badge}
                      </Badge>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">{value.description}</p>
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
