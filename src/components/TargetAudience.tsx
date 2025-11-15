import { Users, GraduationCap, Brain, TrendingUp, Shield } from "lucide-react";
import { Card } from "./ui/card";

export function TargetAudience() {
  const reasons = [
    {
      icon: Users,
      title: "Первые финансовые решения",
      description: "С 12 лет дети впервые сталкиваются с самостоятельными финансовыми решениями: карманные деньги, онлайн-покупки, планирование трат",
      color: "text-blue-400"
    },
    {
      icon: Brain,
      title: "Абстрактное мышление",
      description: "С 12 лет формируется способность к абстрактному мышлению — понимание планирования, рисков, баланса и отсроченной выгоды",
      color: "text-purple-400"
    },
    {
      icon: GraduationCap,
      title: "Школьная программа",
      description: "Финансовая грамотность вводится в школьную программу на уровне lower secondary, что делает эту возрастную группу оптимальной",
      color: "text-green-400"
    },
    {
      icon: TrendingUp,
      title: "Масштабируемость",
      description: "Структура платформы масштабируется по сложности и остаётся полезной для подростков, взрослых и пожилых людей",
      color: "text-orange-400"
    },
    {
      icon: Shield,
      title: "Навык на всю жизнь",
      description: "Более сложные траектории подходят взрослым: пенсионное планирование, долгосрочные риски, цифровая безопасность",
      color: "text-pink-400"
    }
  ];

  return (
    <section className="py-20 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/50 px-5 py-2.5 mb-6 border border-zinc-700">
            <Users className="size-4 text-zinc-400" />
            <span className="text-sm text-zinc-300">Целевая аудитория</span>
          </div>
          <h2 className="text-3xl sm:text-4xl mb-6 text-zinc-100">
            Для кого создана платформа: 12+
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Универсальный и межпоколенческий инструмент, при этом главной аудиторией остаются молодые пользователи
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
                  <div className={`inline-flex p-3.5 rounded-xl bg-zinc-800/50 ${reason.color}`}>
                    <Icon className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg text-zinc-100">{reason.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 p-10 rounded-2xl bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-pink-950/30 border border-zinc-800">
          <p className="text-center text-lg text-zinc-300 leading-relaxed max-w-4xl mx-auto">
            Инструмент становится универсальным и межпоколенческим, обеспечивая равные возможности для развития финансовой грамотности вне зависимости от возраста и социального фона
          </p>
        </div>
      </div>
    </section>
  );
}