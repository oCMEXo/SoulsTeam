import { Brain, Gamepad2, Shield, BarChart3, Users, Lightbulb } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "ИИ-персонализация",
      description: "Адаптивный искусственный интеллект анализирует ваше поведение и подбирает оптимальные сценарии обучения"
    },
    {
      icon: Gamepad2,
      title: "Интерактивные симуляции",
      description: "Реалистичные жизненные сценарии, где можно экспериментировать без финансовых рисков"
    },
    {
      icon: Shield,
      title: "Безопасная среда",
      description: "Учитесь на ошибках в контролируемом пространстве без реальных последствий"
    },
    {
      icon: BarChart3,
      title: "Отслеживание прогресса",
      description: "Визуализация развития навыков и достижений на пути к финансовой грамотности"
    },
    {
      icon: Users,
      title: "Для всех возрастов",
      description: "От подростков до взрослых — каждый найдёт подходящий уровень сложности"
    },
    {
      icon: Lightbulb,
      title: "Научный подход",
      description: "Методология основана на исследованиях в области образования и поведенческой экономики"
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
                Возможности платформы
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Комплексный подход к развитию финансовых навыков через современные технологии и научные методики
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