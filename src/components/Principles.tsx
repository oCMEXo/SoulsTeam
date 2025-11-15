import { Globe, Equal, Sparkles, BookOpen, Target } from "lucide-react";

export function Principles() {
  const principles = [
    {
      icon: Globe,
      title: "Веб-доступность",
      description: "Работает на школьных компьютерах, домашних ноутбуках, планшетах — без установки",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Equal,
      title: "Равные возможности",
      description: "Не требует банковских данных, не зависит от уровня дохода, подходит семьям с любым фоном",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Персонализация через ИИ",
      description: "Адаптирует стиль подсказок, сложность и сценарии под поведение, уверенность и цели пользователя",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BookOpen,
      title: "Научная основа",
      description: "Опирается на исследовательские модели финансового обучения и поведенчески исследования",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      title: "Обучение через практику",
      description: "Пользователь экспериментирует, совершает ошибки в безопасной среде, анализирует и корректирует стратегию",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-6 text-zinc-100">
            Ключевые принципы платформы
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Сделать доступной каждому равную возможность получить персонализированный и эффективный опыт обучения финансам
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