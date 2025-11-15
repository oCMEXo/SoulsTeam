import { Smartphone, Home, Plus, BarChart3, MessageSquare, Wallet, User, TrendingDown, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function MoneyMoneyApp() {
  const screens = [
    {
      id: "main",
      title: "Главный экран",
      icon: Home,
      description: "Трекинг реальной экономии в реальном времени",
      features: ["Показывает сколько € сэкономлено", "AI находит выгоду автоматически", "История замен по категориям"]
    },
    {
      id: "add",
      title: "Добавление покупки",
      icon: Plus,
      description: "AI моментально ищет альтернативы",
      features: ["Сканирование цен в реальном времени", "Сравнение с аналогами", "Мгновенные рекомендации"]
    },
    {
      id: "analysis",
      title: "Анализ покупок",
      icon: BarChart3,
      description: "Где и сколько вы сэкономили",
      features: ["Статистика экономии по дням", "Топ выгодных решений", "Сравнение альтернатив"]
    },
    {
      id: "ai",
      title: "AI-советник",
      icon: MessageSquare,
      description: "Умный помощник для выгодных покупок",
      features: ["Советы в реальном времени", "Поиск акций и скидок", "Альтернативные магазины"]
    },
    {
      id: "budget",
      title: "Бюджет",
      icon: Wallet,
      description: "Планирование с учетом экономии",
      features: ["Прогноз экономии", "Цели по категориям", "Достижение финансовых целей"]
    },
    {
      id: "profile",
      title: "Профиль",
      icon: User,
      description: "Персонализация и достижения",
      features: ["История экономии", "Уровень финансовой грамотности", "Настройки уведомлений"]
    }
  ];

  const appFeatures = [
    {
      icon: Sparkles,
      title: "Анализ цен в реальном времени",
      description: "AI мгновенно сканирует цены в разных ресторанах, магазинах и сервисах доставки",
      color: "blue"
    },
    {
      icon: TrendingDown,
      title: "Интеграция с Wolt и Bolt Food",
      description: "Работает прямо во время заказа - AI подсказывает более выгодные варианты",
      color: "purple"
    },
    {
      icon: TrendingUp,
      title: "Для всех категорий покупок",
      description: "Еда, одежда, продукты, электроника - экономьте на любых покупках",
      color: "green"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 to-zinc-900 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-5 py-2.5 mb-6 border border-blue-500/20">
            <Smartphone className="size-4 text-blue-400" />
            <span className="text-sm text-blue-300">Приложение MoneyMoney</span>
          </div>
          <h2 className="text-3xl sm:text-4xl mb-6 text-zinc-100">
            AI находит более выгодные варианты покупок
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Приложение интегрируется с Wolt, Bolt Food и анализирует цены в магазинах. 
            Получайте умные рекомендации прямо в момент покупки - где купить дешевле или больше за те же деньги.
          </p>
        </div>

        {/* App Features */}
        <div className="grid gap-6 md:grid-cols-3 mb-20">
          {appFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              blue: "from-blue-500 to-cyan-500",
              purple: "from-purple-500 to-pink-500",
              green: "from-green-500 to-emerald-500"
            };
            
            return (
              <Card 
                key={index}
                className="bg-zinc-900/50 border-zinc-800 p-7 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all"
              >
                <div className="space-y-5">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                    <Icon className="size-6 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg text-zinc-100">{feature.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Screens Showcase */}
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 md:p-10">
          <div className="text-center mb-10">
            <h3 className="text-2xl text-zinc-100 mb-3">Основные экраны (MVP)</h3>
            <p className="text-zinc-400">Нажмите на карточку, чтобы узнать подробнее</p>
          </div>
          
          <Tabs defaultValue="main" className="w-full">
            {/* Screen selector cards */}
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 h-auto bg-transparent p-0">
              {screens.map((screen) => {
                const Icon = screen.icon;
                return (
                  <TabsTrigger 
                    key={screen.id} 
                    value={screen.id}
                    className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/30 bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 rounded-xl p-5 flex flex-col items-center gap-3 transition-all h-auto cursor-pointer group"
                  >
                    <div className="p-3 rounded-xl bg-zinc-700/50 group-data-[state=active]:bg-white/20 transition-colors">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-xs text-center leading-tight">{screen.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {screens.map((screen) => {
              const Icon = screen.icon;
              return (
                <TabsContent key={screen.id} value={screen.id} className="mt-0">
                  <div className="grid gap-12 lg:gap-16 md:grid-cols-[1fr_auto] items-center">
                    {/* Screen Info */}
                    <div className="space-y-8 order-2 md:order-1">
                      <div className="space-y-5">
                        <div className="flex items-center gap-4">
                          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Icon className="size-7 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-2xl text-zinc-100">{screen.title}</h4>
                            <p className="text-sm text-zinc-500 mt-1">Экран приложения</p>
                          </div>
                        </div>
                        <p className="text-lg text-zinc-400 leading-relaxed">{screen.description}</p>
                      </div>

                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-blue-500" />
                          <p className="text-sm text-zinc-400 uppercase tracking-wider">Ключевые возможности</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-1">
                          {screen.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                              <div className="mt-1 size-2 rounded-full bg-blue-500 shrink-0" />
                              <span className="text-zinc-300 flex-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Screen Mockup */}
                    <div className="relative order-1 md:order-2">
                      <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-2xl rounded-full" />
                      <div className="relative mx-auto w-[280px] sm:w-[320px]">
                        {/* Phone frame */}
                        <div className="bg-zinc-800 rounded-[3rem] p-3 border-4 border-zinc-700 shadow-2xl">
                          <div className="bg-zinc-950 rounded-[2.5rem] overflow-hidden">
                            {/* Status bar */}
                            <div className="h-12 bg-zinc-900 flex items-center justify-between px-6 pt-2">
                              <span className="text-xs text-zinc-400">9:41</span>
                              <div className="w-28 h-6 bg-zinc-800 rounded-full" />
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-3 bg-zinc-700 rounded-sm" />
                                <div className="w-4 h-3 bg-zinc-700 rounded-sm" />
                                <div className="w-6 h-3 bg-zinc-700 rounded-sm" />
                              </div>
                            </div>
                            
                            {/* Screen content */}
                            <div className="aspect-[9/19] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-900 p-6 space-y-4">
                              {/* Dynamic content based on screen */}
                              {screen.id === "main" && (
                                <div className="space-y-4 animate-in fade-in duration-500">
                                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                                    <div>
                                      <p className="text-xs text-zinc-500">Экономия за месяц</p>
                                      <p className="text-2xl text-green-400 mt-1">+127.50 €</p>
                                    </div>
                                    <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                                      <p className="text-xs text-green-400">↑ 23%</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs text-zinc-500 uppercase tracking-wider">AI нашел выгоду</p>
                                      <div className="flex items-center gap-1">
                                        <div className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs text-green-400">Сейчас</span>
                                      </div>
                                    </div>
                                    {[
                                      { 
                                        icon: "🍔", 
                                        from: "McDonald's", 
                                        to: "Burger King",
                                        saved: "+2.50 €",
                                        time: "5 мин назад"
                                      },
                                      { 
                                        icon: "☕", 
                                        from: "Starbucks", 
                                        to: "Espresso House",
                                        saved: "+1.80 €",
                                        time: "2 часа назад"
                                      },
                                      { 
                                        icon: "🛒", 
                                        from: "Prisma", 
                                        to: "S-Market",
                                        saved: "+8.40 €",
                                        time: "Вчера"
                                      }
                                    ].map((item, i) => (
                                      <div key={i} className="bg-zinc-800/80 rounded-xl border border-zinc-700 p-3 space-y-2 hover:border-green-500/30 transition-colors">
                                        <div className="flex items-center gap-2">
                                          <span className="text-lg">{item.icon}</span>
                                          <div className="flex-1 flex items-center gap-1.5 text-xs">
                                            <span className="text-zinc-500">{item.from}</span>
                                            <span className="text-zinc-600">→</span>
                                            <span className="text-zinc-300">{item.to}</span>
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between pl-7">
                                          <span className="text-xs text-zinc-600">{item.time}</span>
                                          <span className="text-sm text-green-400">{item.saved}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {screen.id === "add" && (
                                <div className="space-y-3 animate-in fade-in duration-500">
                                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                                    <p className="text-xs text-blue-400 mb-1">Вы собираетесь купить:</p>
                                    <p className="text-zinc-300">3 бургера в McDonald's</p>
                                    <p className="text-xl text-white mt-2">10.00 €</p>
                                  </div>
                                  
                                  <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                                    </div>
                                    <div className="relative flex justify-center">
                                      <span className="bg-zinc-900 px-3 py-1 text-xs text-zinc-500 rounded-full border border-zinc-700">AI нашел выгоду</span>
                                    </div>
                                  </div>

                                  <div className="p-4 bg-green-500/10 border-2 border-green-500/50 rounded-xl space-y-3 shadow-lg shadow-green-500/20">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-lg">🍔</span>
                                          <p className="text-xs text-green-400 uppercase tracking-wider">Лучше</p>
                                        </div>
                                        <p className="text-zinc-300">4 бургера в Burger King</p>
                                        <p className="text-xl text-white mt-1">9.90 €</p>
                                      </div>
                                      <div className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-400">
                                        -0.10 €
                                      </div>
                                    </div>
                                    <div className="pt-3 border-t border-green-500/20">
                                      <p className="text-xs text-green-300">+ Вы получите на 1 бургер больше!</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <button className="h-12 bg-zinc-800/80 border border-zinc-700 rounded-xl text-sm text-zinc-400 hover:border-zinc-600 transition-colors">
                                      Оставить как есть
                                    </button>
                                    <button className="h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-sm text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all">
                                      Заказать выгоднее
                                    </button>
                                  </div>
                                </div>
                              )}
                              
                              {screen.id === "analysis" && (
                                <div className="space-y-3 animate-in fade-in duration-500">
                                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-between">
                                    <div>
                                      <p className="text-xs text-zinc-500">Всего сэкономлено</p>
                                      <p className="text-xl text-green-400 mt-1">+127.50 €</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs text-zinc-500">За 30 дней</p>
                                      <p className="text-sm text-green-400 mt-1">15 замен</p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Топ выгодных решений</p>
                                    {[
                                      { 
                                        emoji: "🛒", 
                                        from: "Prisma",
                                        to: "S-Market", 
                                        saved: "8.40 €",
                                        percent: "12%"
                                      },
                                      { 
                                        emoji: "👕", 
                                        from: "H&M",
                                        to: "Reserved", 
                                        saved: "15.00 €",
                                        percent: "25%"
                                      },
                                      { 
                                        emoji: "🍔", 
                                        from: "Hesburger",
                                        to: "Burger King", 
                                        saved: "3.20 €",
                                        percent: "8%"
                                      }
                                    ].map((item, i) => (
                                      <div key={i} className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 space-y-2">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <span className="text-lg">{item.emoji}</span>
                                            <div className="text-xs">
                                              <span className="text-zinc-500">{item.from}</span>
                                              <span className="text-zinc-600"> → </span>
                                              <span className="text-zinc-300">{item.to}</span>
                                            </div>
                                          </div>
                                          <div className="px-2 py-1 bg-green-500/10 rounded text-xs text-green-400">
                                            -{item.percent}%
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between pl-7">
                                          <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-3">
                                            <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{width: `${parseInt(item.percent)}%`}} />
                                          </div>
                                          <span className="text-sm text-green-400">+{item.saved}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                                    <p className="text-xs text-blue-400">💡 С AI экономите в среднем 4.25€ на каждой замене</p>
                                  </div>
                                </div>
                              )}
                              
                              {screen.id === "ai" && (
                                <div className="space-y-3 animate-in fade-in duration-500 relative h-full flex flex-col">
                                  <p className="text-xs text-zinc-500 uppercase tracking-wider text-center">AI Советник</p>
                                  <div className="flex-1 space-y-3 overflow-hidden">
                                    <div className="ml-auto max-w-[75%] p-3 bg-blue-600 rounded-2xl rounded-tr-md">
                                      <p className="text-xs text-white">Хочу купить бургеры в McDonald's за 10€</p>
                                    </div>
                                    <div className="mr-auto max-w-[85%] p-3 bg-zinc-800 rounded-2xl rounded-tl-md border border-zinc-700 space-y-2">
                                      <p className="text-xs text-zinc-300">В Burger King сейчас акция - 4 бургера за 9.90€ вместо 3 за 10€</p>
                                      <div className="flex items-center gap-2 text-[10px] text-green-400 bg-green-500/10 px-2 py-1 rounded">
                                        <span>💰</span>
                                        <span>Экономия: 0.10€ + больше еды</span>
                                      </div>
                                    </div>
                                    <div className="ml-auto max-w-[60%] p-3 bg-blue-600 rounded-2xl rounded-tr-md">
                                      <p className="text-xs text-white">Покажи все опции</p>
                                    </div>
                                    <div className="mr-auto max-w-[85%] p-3 bg-zinc-800 rounded-2xl rounded-tl-md border border-zinc-700">
                                      <p className="text-xs text-zinc-300 mb-2">Вот 3 лучших варианта:</p>
                                      <div className="space-y-1 text-[10px]">
                                        <div className="text-blue-400">🍔 Burger King - 9.90€</div>
                                        <div className="text-zinc-500">🍔 Hesburger - 11.50€</div>
                                        <div className="text-zinc-500">🍔 McDonald's - 10.00€</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="h-12 bg-zinc-800 rounded-full border border-zinc-700 flex items-center px-4 gap-2">
                                    <p className="text-xs text-zinc-600 flex-1">Спросите что-нибудь...</p>
                                    <div className="size-7 rounded-full bg-blue-600 flex items-center justify-center">
                                      <div className="size-3 border-2 border-white border-b-0 border-l-0 rotate-45" />
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {screen.id === "budget" && (
                                <div className="space-y-3 animate-in fade-in duration-500">
                                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between">
                                    <div>
                                      <p className="text-xs text-zinc-500">Бюджет на месяц</p>
                                      <p className="text-xl text-white mt-1">1,500 €</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs text-zinc-500">Экономия</p>
                                      <p className="text-xl text-green-400 mt-1">+127 €</p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Категории</p>
                                      <p className="text-xs text-green-400">С AI дешевле</p>
                                    </div>
                                    {[
                                      { 
                                        emoji: "🍔", 
                                        name: "Еда", 
                                        planned: "600 €",
                                        withAI: "520 €",
                                        savings: "80 €"
                                      },
                                      { 
                                        emoji: "🛒", 
                                        name: "Продукты", 
                                        planned: "500 €",
                                        withAI: "460 €",
                                        savings: "40 €"
                                      },
                                      { 
                                        emoji: "🎮", 
                                        name: "Развлечения", 
                                        planned: "300 €",
                                        withAI: "293 €",
                                        savings: "7 €"
                                      }
                                    ].map((item, i) => (
                                      <div key={i} className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 space-y-2">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <span className="text-lg">{item.emoji}</span>
                                            <span className="text-sm text-zinc-300">{item.name}</span>
                                          </div>
                                          <div className="px-2 py-1 bg-green-500/10 rounded text-xs text-green-400">
                                            -{item.savings}
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs pl-7">
                                          <span className="text-zinc-500">Планировали: {item.planned}</span>
                                          <span className="text-green-400">С AI: {item.withAI}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                                    <p className="text-xs text-green-400 mb-1">🎯 Достижение цели</p>
                                    <p className="text-xs text-zinc-400">Благодаря AI вы экономите 127€/мес и достигнете цели "iPhone 15" на 2 месяца раньше</p>
                                  </div>
                                </div>
                              )}
                              
                              {screen.id === "profile" && (
                                <div className="space-y-4 animate-in fade-in duration-500">
                                  <div className="flex flex-col items-center space-y-3 pt-4 pb-6 border-b border-zinc-800">
                                    <div className="size-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl text-white shadow-lg shadow-blue-500/30">
                                      А
                                    </div>
                                    <div className="text-center space-y-1">
                                      <p className="text-zinc-100">Алексей</p>
                                      <p className="text-xs text-zinc-500">alex@email.com</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
                                      <div className="size-1.5 rounded-full bg-blue-400" />
                                      <span className="text-xs text-blue-300">Premium</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2 mt-6">
                                    {[
                                      { icon: "👤", label: "Личные данные", hasNotification: false },
                                      { icon: "🔔", label: "Уведомления", hasNotification: true },
                                      { icon: "🎯", label: "Мои цели", hasNotification: false },
                                      { icon: "💳", label: "Подписка", hasNotification: false },
                                      { icon: "🔒", label: "Безопасность", hasNotification: false },
                                      { icon: "ℹ️", label: "О приложении", hasNotification: false }
                                    ].map((item, i) => (
                                      <div key={i} className="h-14 bg-zinc-800/80 rounded-xl border border-zinc-700 px-4 flex items-center gap-3 hover:bg-zinc-800 transition-colors relative">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-sm text-zinc-300 flex-1">{item.label}</span>
                                        {item.hasNotification && (
                                          <div className="size-2 rounded-full bg-red-500 absolute right-10" />
                                        )}
                                        <div className="size-4 border-2 border-r-0 border-t-0 border-zinc-600 rotate-[-45deg]" />
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* Logout button */}
                                  <div className="pt-4 border-t border-zinc-800 mt-4">
                                    <button className="w-full h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/20 transition-colors">
                                      <span className="text-sm">Выйти</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Bottom bar */}
                            <div className="h-16 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around px-4">
                              {[Home, BarChart3, Plus, Wallet, User].map((Icon, i) => (
                                <div 
                                  key={i} 
                                  className={`p-2 rounded-lg ${i === 0 ? 'bg-blue-500/20' : ''}`}
                                >
                                  <Icon className={`size-5 ${i === 0 ? 'text-blue-400' : 'text-zinc-600'}`} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        {/* Style Description */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border-blue-800/30 p-8">
            <h4 className="text-xl text-blue-200 mb-3">Совреенный минимализм</h4>
            <p className="text-sm text-blue-300/70 leading-relaxed">Чистый дизайн без лишних элементов, фокус на важном</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border-purple-800/30 p-8">
            <h4 className="text-xl text-purple-200 mb-3">Мягкие цвета</h4>
            <p className="text-sm text-purple-300/70 leading-relaxed">Приятная цветовая палитра, не утомляющая глаза</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-950/30 to-green-900/20 border-green-800/30 p-8">
            <h4 className="text-xl text-green-200 mb-3">Акцент на данных</h4>
            <p className="text-sm text-green-300/70 leading-relaxed">Понятная визуализация и структурированная информация</p>
          </Card>
        </div>
      </div>
    </section>
  );
}