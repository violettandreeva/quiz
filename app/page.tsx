"use client"

import { useState } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Leaf, Users, Clock, Shield, ArrowRight, Info, Timer, Gift, CheckCircle2, Lock, ShieldCheck, Check, HeartPulse, TrendingUp, Wallet, ThumbsUp, BookOpen, CalendarCheck, Lightbulb, Target, Sparkles, Mail, MessageSquare } from "lucide-react"
import Image from "next/image"

// Превью 14-дневного плана с замком
function PlanPreviewLocked() {
  return (
    <div className="relative mx-auto mb-10 w-full max-w-[560px]">
      {/* имитация стопки карточек */}
      <div className="absolute inset-0 -z-10 translate-y-4 rounded-2xl bg-white/70 shadow-lg" />
      <div className="absolute inset-0 -z-10 translate-y-2 rounded-2xl bg-white/80 shadow-md" />

      {/* основной экран плана */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">
        {/* бейдж-замок поверх */}
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-gray-800/85 px-2.5 py-1 text-[11px] font-medium text-white">
          <Lock className="h-3.5 w-3.5" />
          <span>Разблокируется после ответов</span>
        </div>

        {/* содержимое «экрана» (будет размыто) */}
        <div className="relative p-4 sm:p-5 blur-[1.6px] select-none pointer-events-none">
          {/* мини-меню */}
          <div className="mb-4 flex gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Питание
            </span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              Движение
            </span>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              Сон
            </span>
          </div>

          {/* чек-лист */}
          <div className="mb-3 text-[13px] font-semibold text-gray-800">Чек-лист</div>
          <div className="space-y-2">
            {[
              "Завтрак: 20–30 г белка (омлет/греческий йогурт)",
              "10–15 минут прогулки после обеда",
              "Сон: цель 7–8 часов, без гаджетов за 60 мин",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                <CheckCircle2 className="h-4 w-4 text-gray-400" />
                <span className="text-[13px] text-gray-700">{t}</span>
              </div>
            ))}
          </div>

          {/* блок «Сегодня: 3 шага» */}
          <div className="mt-4 rounded-xl border border-gray-100 bg-white p-3">
            <div className="mb-2 text-[13px] font-semibold text-gray-800">Сегодня: 3 шага</div>
            <ul className="space-y-2 text-[13px] text-gray-700">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-100" />
                Выпейте 500 мл воды после пробуждения
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-amber-100" />
                15 минут быстрой ходьбы
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-sky-100" />
                План на ужин: белок + овощи, без сладкого
              </li>
            </ul>
          </div>
        </div>

        {/* лёгкая «вуаль» для усиления эффекта замка */}
        <div className="pointer-events-none absolute inset-0 bg-white/20" />
      </div>
    </div>
  )
}

// Небольшая подсказка по наведению
function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex items-center group align-middle">
      <Info
        aria-label="Why we ask"
        className="w-3.5 h-3.5 ml-1.5 text-gray-400 hover:text-gray-600 cursor-help"
      />
      <span
        role="tooltip"
        className="pointer-events-none invisible opacity-0 group-hover:visible group-hover:opacity-100 transition
                   absolute z-20 left-1/2 -translate-x-1/2 top-5
                   whitespace-nowrap px-2 py-1 rounded-md text-[11px] leading-none
                   bg-gray-900 text-white shadow-md"
      >
        {text}
      </span>
    </span>
  )
}

/* ----------  LoadingPage.tsx (local component) ---------- */
interface LoadingPageProps {
  onComplete: () => void
}

// --- НАЧАЛО: НОВЫЙ КОМПОНЕНТ ДЛЯ ПОЛЕЙ С КНОПКАМИ +/- ---
// Определяем типы пропсов: unit и tooltipText УДАЛЕНЫ
interface NumericInputWithControlsProps {
  label: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  onBlur: () => void;
  min: number;
  max: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  onEnterPress?: () => void;
}

function NumericInputWithControls({
  label,
  value,
  onChange,
  onBlur,
  min,
  max,
  inputRef,
  onEnterPress,
}: NumericInputWithControlsProps) {

  const onlyDigits = (s: string) => s.replace(/\D/g, "");

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    onChange(digits ? parseInt(digits, 10) : undefined);
  };

  const stepValue = (step: number) => {
    const currentValue = value ?? (step > 0 ? min - 1 : max + 1);
    let newValue = currentValue + step;
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    onChange(newValue);
  };

  const isValid = typeof value === 'number' && value >= min && value <= max;
  // Проверяем, было ли поле "тронуто", чтобы не показывать ошибку сразу
  const wasTouched = onBlur && (value !== undefined);

  return (
    <div>
      {/* ИЗМЕНЕНИЕ: Label теперь простой, без иконки */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className={`
        flex items-center w-full 
        border rounded-md shadow-sm transition-all
        ${!isValid && wasTouched
          ? "border-red-500 ring-1 ring-red-500"
          : "border-gray-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
        }
      `}>
        <button
          type="button"
          onClick={() => stepValue(-1)}
          className="px-3 text-gray-500 hover:text-green-600 focus:outline-none"
          aria-label="Уменьшить"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
        </button>

        {/* ИЗМЕНЕНИЕ: Input теперь занимает всю ширину, без лишних отступов для юнитов */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value ?? ""}
          onChange={handleManualChange}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", ".", " "].includes(e.key)) e.preventDefault();
            if (e.key === 'Enter' && onEnterPress) {
              e.preventDefault();
              onEnterPress();
            }
          }}
          aria-invalid={!isValid}
          className="w-full text-center bg-transparent border-none focus:ring-0 focus:outline-none py-2"
        />

        <button
          type="button"
          onClick={() => stepValue(1)}
          className="px-3 text-gray-500 hover:text-green-600 focus:outline-none"
          aria-label="Увеличить"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
      {!isValid && wasTouched && (
        <p className="mt-1 text-xs text-red-600">Введите значение от {min} до {max}.</p>
      )}
    </div>
  );
}

// --- КОНЕЦ: НОВЫЙ КОМПОНЕНТ ---

const StickyCta = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 animate-slide-up">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="text-sm">
          <p className="font-semibold text-gray-800">Ваш полный пакет:</p>
          <p className="text-xs text-gray-600">Курс капсул + План питания + Памятка</p>
        </div>
        <a href="#order-form" className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 text-base font-semibold shadow-lg">
          Оформить за 99 PEN
        </a>
      </div>
    </div>
  );
};

function LoadingPage({ onComplete }: LoadingPageProps) {
  const steps = [
    "Изучаем сайты (1/53)",
    "Смотрим отзывы",
    "Ищем натуральные компоненты",
    "Ищем лучшую цену",
    "Сравниваем с конкурентами",
  ]
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState<boolean[]>(Array(steps.length).fill(false))
  const allComplete = completed.every(Boolean)

  const [siteCount, setSiteCount] = React.useState(1);

  React.useEffect(() => {
    let counterInterval: NodeJS.Timeout;

    if (activeStep === 0 && !completed[0]) {
      counterInterval = setInterval(() => {
        setSiteCount(prevCount => {
          if (prevCount >= 53) {
            clearInterval(counterInterval);
            return 53;
          }
          return prevCount + 1;
        });
      }, 40);
    }

    return () => clearInterval(counterInterval);
  }, [activeStep, completed]);


  React.useEffect(() => {
    if (allComplete) {
      const timeout = setTimeout(onComplete, 1500)
      return () => clearTimeout(timeout)
    }

    const id = setTimeout(() => {
      setCompleted((prev) => {
        const next = [...prev]
        next[activeStep] = true
        return next
      })
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
    }, 1200)

    return () => clearTimeout(id)
  }, [activeStep, allComplete, onComplete, steps.length])

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #f7fdf9, #fffdf5)" }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: "20s",
            }}
          />
        ))}
      </div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Heart className="w-8 h-8 text-green-600" />
        <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5 justify-center">
            <div
              className="w-8 h-8 border-[3px] border-green-600 border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: "1.2s" }}
            />
            <h3 className="text-lg font-semibold text-gray-800">Анализируем ваши ответы...</h3>
          </div>
          <div className="space-y-3 mb-6">
            {steps.map((text, idx) => {
              let displayText = text;
              if (idx === 0) {
                displayText = `Изучаем сайты (${siteCount}/53)`;
              }

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-all duration-500 ${idx <= activeStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {completed[idx] ? (
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${idx === activeStep ? "border-green-600" : "border-gray-300"
                        }`}
                    />
                  )}
                  <span
                    className={`text-sm font-medium transition-colors duration-1000 ${idx === activeStep && !completed[idx]
                      ? "text-green-600 animate-pulse"
                      : completed[idx]
                        ? "text-gray-700"
                        : "text-gray-500"
                      }`}
                  >
                    {displayText}
                  </span>
                </div>
              )
            })}
          </div>

          {/* ИЗМЕНЕНИЕ: Добавили тизер результата */}
          <div className="mt-6 text-center text-sm text-gray-600 bg-green-50/70 p-3 rounded-lg border border-green-100">
            <p className="font-semibold text-gray-800">На выходе получите:</p>
            <p className="text-xs mt-1">Капсулы с натуральными ингредиентами, пример дня, чек‑лист на 14 дней, 3 шага на старт</p>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">Это займёт меньше минуты…</p>
        </div>
      </div>
    </div>
  )
}

interface QuizAnswer {
  questionId: string
  answer: string
  category: "eating" | "lifestyle" | "attempts" | "goal"
}

interface Question {
  id: string
  category: "eating" | "lifestyle" | "attempts" | "goal"
  question: string
  options: { text: string; emoji: string }[]
}

const quizQuestions: Question[] = [
  // Eating Section (3 questions)
  {
    id: "eating-1",
    category: "eating",
    question: "Вы проснулись в 9:00 в выходной. Что обычно едите на завтрак?",
    options: [
      { text: "Яйца с жареными колбасками, тамале или пара булочек с кофе с сахаром", emoji: "🍳" },
      { text: "Тортильи или лепешки с начинкой: сладкой кукурузой, сыром и авокадо", emoji: "🌯" },
      { text: "Каша с фруктами и различными добавками", emoji: "🥣" },
      { text: "Ничего – с утра не хочется есть", emoji: "😴" },
    ],
  },
  {
    id: "eating-2",
    category: "eating",
    question: "У вас обед на работе, какую еду вы взяли из дома или купили?",
    options: [
      { text: "Жареный рис овощами, картошкой и мясом", emoji: "🍛" },
      { text: "Сендвич с колбасками или свининой, пару эмпанад и газировка", emoji: "🥪" },
      { text: "Небольшой перекус, крекеры, снеки", emoji: "🍪" },
      { text: "Салат с курицей гриль, киноа и заправленный оливковым маслом", emoji: "🥗" },
    ],
  },
  {
    id: "eating-3",
    category: "eating",
    question: "Подружка позвала вас на кофе после работы, что закажете?",
    options: [
      { text: "Большой капучино с сиропом, тортик или пирожное", emoji: "☕" },
      { text: "Кола или чича и пару печенек", emoji: "🥤" },
      { text: "Чай или черный кофе без сахара", emoji: "🍵" },
      { text: "Ничего, не хочу опять срываться, но потом съем что-то дома", emoji: "🚫" },
    ],
  },
  // Lifestyle Section (4 questions)
  {
    id: "lifestyle-1",
    category: "lifestyle",
    question:
      "Вы уже скорее всего столкнулись с неприятными последствиями избыточного веса. Много ли у вас перечисленных проблем? (повышенный холестерин, диабет и тд)",
    options: [
      {
        text: "Да, у меня уже есть повышенный холестерин, начальные признаки диабета (или преддиабет), высокое давление и боли в суставах",
        emoji: "🚨",
      },
      {
        text: "У меня часто болит спина и колени, бывают отеки, и я чувствую, что сердце стало пошаливать",
        emoji: "😰",
      },
      {
        text: "Пока ничего серьезного, но я чувствую постоянную усталость, одышку при нагрузках и быстро потею",
        emoji: "😮‍💨",
      },
      { text: "Ничего из перечисленного нет", emoji: "✅" },
    ],
  },
  {
    id: "lifestyle-2",
    category: "lifestyle",
    question:
      "Муж чем-то недоволен, а дети снова носятся по дому, вам сложно уследить за всем, как будете справляться со стрессом?",
    options: [
      {
        text: "Закажу что-то вкусненькое на ужин, например, жареную курицу, и конечно что-то сладкое к чаю",
        emoji: "🍗",
      },
      {
        text: "Улягусь перед телевизором с пачкой печенья, или выпью сладкий напиток и постараюсь отвлечься",
        emoji: "📺",
      },
      {
        text: "Попробую заняться делами, но в итоге буду раздражаться на всех, а вечером, скорее всего, съем лишнего из холодильника или выпью бокал пива/вина",
        emoji: "😤",
      },
      { text: "Мне такая проблема не знакома", emoji: "🤷‍♀️" },
    ],
  },
  {
    id: "lifestyle-3",
    category: "lifestyle",
    question:
      "Сегодня у вас много дел по дому, вы сильно устаете и объективно недосыпаете. Во сколько вы сегодня ляжете и проснетесь завтра?",
    options: [
      {
        text: "Лягу около полуночи или даже позже, потому что нужно доделать всё по дому/позаботиться о детях/муже, а проснусь, как обычно, в 6-7 утра или даже раньше, чтобы приготовить завтрак",
        emoji: "🌙",
      },
      {
        text: "Лягу поздно, а проснусь несколько раз за ночь от шума или тревожных мыслей, и буду весь день чувствовать себя разбитой и усталой",
        emoji: "😴",
      },
      {
        text: "Лягу поздно, просплю до обеда и буду впопыхах пытаться успеть выполнить все дела, весь день буду в напряжении и не смогу нормально расслабиться",
        emoji: "😰",
      },
      {
        text: "Лягу рано, проснусь рано, потому что надо все успеть, так еще и на работу побежать, сильно устану буду переживать потому что из-за такого графика времени на себя не хватает",
        emoji: "⏰",
      },
    ],
  },
  {
    id: "lifestyle-4",
    category: "lifestyle",
    question:
      "Вы бы хотели вести более активный образ жизни. Подруга зовет вас на прогулку. Из-за каких причин вы откажетесь?",
    options: [
      {
        text: "У меня ноги как будто налиты свинцом (тяжесть и отеки), поясница ноет, и я начинаю задыхаться уже через пару кварталов",
        emoji: "🦵",
      },
      {
        text: "Я очень устала после работы и домашних хлопот, нет сил ни на что, хочется просто полежать, а не гулять",
        emoji: "😴",
      },
      {
        text: "Мне неловко показываться в спортивной одежде, чувствую себя неуклюжей, да и просто нет настроения выходить из дома в таком виде",
        emoji: "😔",
      },
      { text: "Я пойду с ней в любом случае, несмотря на то как потом буду себя чувствовать", emoji: "💪" },
    ],
  },
  // Previous Attempts Section (3 questions)
  {
    id: "attempts-1",
    category: "attempts",
    question:
      "Вам встретилось видео где рассказывается эффективная и несложная тренировка для похудения, как долго на самом деле вы будете ей заниматься?",
    options: [
      {
        text: "Посмотрю, вдохновлюсь, сделаю пару попыток и отложу — усталость, время и отсутствие быстрого результата собьют темп.",
        emoji: "😔",
      },
      {
        text: "Начну, но боль в коленях/спине или одышка быстро остановят — значит сейчас нагрузка выше моих возможностей.",
        emoji: "😰",
      },
      {
        text: "Сохраню 'на потом': буду говорить себе 'с понедельника', но так и не запущу.",
        emoji: "📱",
      },
      { text: "Смогу заниматься стабильно, пока не увижу первые результаты.", emoji: "💪" },
    ],
  },
  {
    id: "attempts-2",
    category: "attempts",
    question:
      "Вы сели на диету, нашли в интернете или возможно даже заплатили за консультацию, как часто у вас происходят срывы?",
    options: [
      {
        text: "Очень часто: после нервного или утомительного дня тянет на 'запрещённое', а потом появляются чувство вины и тяжесть.",
        emoji: "😔",
      },
      {
        text: "Держусь несколько дней или неделю, а затем на выходных ухожу в любимые блюда (севиче, ломо сальтадо, сладости) и сбрасываю настрой.",
        emoji: "🍽️",
      },
      {
        text: "Сначала стараюсь, но если результат не быстрый или однообразие надоело — просто прекращаю.",
        emoji: "🤷‍♀️",
      },
      { text: "Удерживаюсь без срывов.", emoji: "💪" },
    ],
  },
  {
    id: "attempts-3",
    category: "attempts",
    question:
      "У вас нет возможности ходить в спортзал и вы пробуете альтернативные методы, что по вашему мнению по-настоящему помогло бы вам похудеть?",
    options: [
      {
        text: "Что-то, что помогло бы без больших усилий — возможно, специальные капсулы, которые ускоряют метаболизм, или легкий напиток, который сжигает жир",
        emoji: "💊",
      },
      {
        text: "Профессиональная помощь, но не в спортзале, а, возможно, специальный план питания, адаптированный к моей жизни, или что-то, что даст энергию для активности",
        emoji: "📋",
      },
      {
        text: "Я понимаю, что нужно меньше есть, больше двигаться и лучше спать, но не знаю, с чего начать и как всё это совместить с моей жизнью",
        emoji: "🤔",
      },
      {
        text: "На самом деле у меня все достаточно хорошо, я просто хочу услышать рекомендации к моему образу жизни",
        emoji: "✨",
      },
    ],
  },
]

const reassuranceMessages: Record<string, Record<string, string>> = {
  "attempts-1": {
    "Посмотрю, вдохновлюсь, сделаю пару попыток и отложу — усталость, время и отсутствие быстрого результата собьют темп.":
      "Это абсолютно нормально! Большинство женщин сталкиваются с теми же трудностями. Главное — найти подход, который подойдет именно вам.",
    "Начну, но боль в коленях/спине или одышка быстро остановят — значит сейчас нагрузка выше моих возможностей.":
      "Ваше тело подает важные сигналы. Есть множество щадящих способов начать движение без боли и дискомфорта.",
    "Сохраню 'на потом': буду говорить себе 'с понедельника', но так и не запущу.":
      "Откладывание — это защитная реакция психики. Мы поможем найти способ начать без стресса и самокритики.",
  },
  "attempts-2": {
    "Очень часто: после нервного или утомительного дня тянет на 'запрещённое', а потом появляются чувство вины и тяжесть.":
      "Эмоциональное переедание — это не недостаток силы воли, а естественная реакция на стресс. Это можно изменить с правильным подходом.",
    "Держусь несколько дней или неделю, а затем на выходных ухожу в любимые блюда (севиче, ломо сальтадо, сладости) и сбрасываю настрой.":
      "Цикл ограничений и срывов знаком многим. Секрет в том, чтобы найти баланс, при котором любимые блюда не станут запретными.",
    "Сначала стараюсь, но если результат не быстрый или однообразие надоело — просто прекращаю.":
      "Мотивация угасает, когда подход не подходит лично вам. Важно найти систему, которая будет работать долгосрочно.",
  },
}

const motivationContent: Record<string, { title: string; button: string }> = {
  "Надела бы любимое платье, в которое уже не влезаю": {
    title: "Вот как снова надеть любимое платье, не истязая себя диетами",
    button: "Да, я хочу снова надеть это платье!",
  },
  "Сходила бы в бассейн или поехала на пляж, чтобы поплавать в бикини": {
    title: "Вот как почувствовать себя уверенно на пляже этим летом",
    button: "Да, я хочу уверенно чувствовать себя в бикини!",
  },
  "Поиграла бы с детьми в догонялки": {
    title: "Вот как снова начать играть с детьми, не думая об одышке",
    button: "Да, я хочу снова играть с детьми!",
  },
  "Выделила бы время досугу и обошла любимые улицы города пешком": {
    title: "Вот как вернуть энергию для долгих прогулок и активного отдыха",
    button: "Да, я хочу вернуть энергию для прогулок!",
  },
  "Начала бы жить более активной жизнью": {
    title: "Вот как сделать активность радостью, а не наказанием",
    button: "Да, я хочу жить активной жизнью!",
  },
  "Начала бы жить": {
    title: "Вот как начать жить полной жизнью, не откладывая мечты на потом",
    button: "Да, я хочу начать жить полной жизнью!",
  },
};

const attemptInsights: Record<string, Record<string, { title: string; solution: string }>> = {
  "attempts-1": {
    "Посмотрю, вдохновлюсь, сделаю пару попыток и отложу — усталость, время и отсутствие быстрого результата собьют темп.": {
      title: "Усталость — главный враг мотивации.",
      solution: "Наш план начнется с восстановления энергии через питание, а не с изнурительных тренировок. Это даст силы для стабильного движения вперед.",
    },
    "Начну, но боль в коленях/спине или одышка быстро остановят — значит сейчас нагрузка выше моих возможностей.": {
      title: "Боль — это сигнал 'стоп'. Начинать нужно не с тренировок.",
      solution: "Сначала мы сфокусируемся на питании, чтобы снять лишнюю нагрузку с суставов. Это самый безопасный и эффективный путь.",
    },
    "Сохраню 'на потом': буду говорить себе 'с понедельника', но так и не запущу.": {
      title: "Откладывание — это защитная реакция на стресс.",
      solution: "Мы предложим микро-шаги, которые занимают 2-3 минуты в день. Это уберет страх перед 'большой задачей' и поможет начать.",
    },
  },
  "attempts-2": {
    "Очень часто: после нервного или утомительного дня тянет на 'запрещённое', а потом появляются чувство вины и тяжесть.": {
      title: "'Заедание' стресса — это не отсутствие воли, а биохимия.",
      solution: "План поможет стабилизировать сахар в крови. Когда нет резких скачков голода, противостоять эмоциональному перееданию гораздо проще.",
    },
    "Держусь несколько дней или неделю, а затем на выходных ухожу в любимые блюда (севиче, ломо сальтадо, сладости) и сбрасываю настрой.": {
      title: "Цикл 'ограничение-срыв' — самая частая проблема.",
      solution: "Мы не будем запрещать любимые блюда. План научит, как вписывать их в рацион без вреда для результата и чувства вины.",
    },
    "Сначала стараюсь, но если результат не быстрый или однообразие надоело — просто прекращаю.": {
      title: "Мотивация пропадает, когда диета становится скучной.",
      solution: "Наш план включает разнообразные, но простые рецепты из привычных продуктов. Вам не придется есть только куриную грудку и брокколи.",
    },
  },
};

const miniQuestions = [
  {
    id: "pregnancy",
    type: "radio",
    title: "Are you pregnant or breastfeeding?",
    options: [
      "No / not planning in the next 6 months",
      "Pregnancy — 1st trimester",
      "Pregnancy — 2nd–3rd trimester",
      "Breastfeeding < 6 months",
      "Breastfeeding > 6 months",
    ],
  },
  {
    id: "diet",
    type: "checkbox",
    title: "Which of these describes your diet?",
    options: ["I am vegetarian", "I avoid lactose", "I avoid gluten", "None of the above"],
  },
  {
    id: "meds",
    type: "radio",
    title: "Do you take any regular medication?",
    options: [
      "None",
      "Hormonal contraceptives",
      "Thyroid medication",
      "Antidepressants / anxiolytics",
      "Corticosteroids",
      "Other — I'll specify later",
    ],
  },
  {
    id: "menopause",
    type: "radio",
    title: "Are you in menopause?",
    options: ["No", "Perimenopause (symptoms already present)", "Postmenopause (no periods for > 12 months)"],
  },
  {
    id: "conditions",
    type: "checkbox",
    title: "Do you have any medical conditions that can affect weight?",
    options: ["Hypothyroidism", "PCOS", "Prediabetes / type 2 diabetes", "High blood pressure", "None of the above"],
  },
]

interface AnswerStats {
  all: string[]
  counts: Record<"a" | "b" | "c" | "d", number>
  pct: Record<"a" | "b" | "c" | "d", number>
  block1: string[]
  block2: string[]
  block3: string[]
}

const eatingHabitActions = {
  a: {
    title: "Ваш фокус — на качестве, а не на количестве",
    imageSrc: "/summary/eating-a.jpg",
    habit: "Вы часто выбираете сытные блюда → сместим фокус на белок и овощи.",
    goal: "+1 большой овощ к обеду и ужину.",
    rationale: "Это даст ту же сытость при меньшем количестве калорий.",
    promise: "В итоговом плане дадим 3 простых рецепта с высоким содержанием белка и клетчатки.",
  },
  b: {
    title: "Ваш фокус — на борьбе с сахаром",
    imageSrc: "/summary/eating-b.jpg",
    habit: "Если завтраки сладкие → мы перенесем сладкое на перекус после обеда.",
    goal: "1 полезный перекус (фрукт/орехи/йогурт) ежедневно.",
    rationale: "Это поможет избежать резкого скачка сахара и вечернего голода.",
    promise: "Через 3 дня оценим, как изменилась ваша энергия.",
  },
  c: {
    title: "Ваш фокус — на оттачивании здоровых привычек",
    imageSrc: "/summary/eating-c.jpg",
    habit: "Вы уже питаетесь правильно → добавим контроль 'скрытых' калорий.",
    goal: "Начать измерять соусы/масло ложкой.",
    rationale: "Мелкие правки дают видимую разницу без жёстких ограничений.",
    promise: "В плане покажем, как 1 ст. л. соуса меняет калорийность блюда.",
  },
  mixed: {
    title: "Ваш фокус — на создании стабильной основы",
    imageSrc: "/summary/eating-mixed.jpg",
    habit: "Ваш рацион нерегулярен → ставим крепкую базу — утренний приём пищи.",
    goal: "Обязательный завтрак в течение 60 минут после пробуждения: белок + клетчатка.",
    rationale: "Это поможет создать метаболическую 'опору' для всего дня.",
    promise: "В плане дадим 14 простых комбинаций завтрака “5 минут — и готово”.",
  },
};

// Новая база данных для страницы "ОБРАЗ ЖИЗНИ"
const lifestyleHabitActions = {
  a: {
    title: "Ваш фокус — на здоровом питании и восстановлении от стресса",
    imageSrc: "/summary/lifestyle-a.jpg",
    habit: "Правильное питание, не всегда пресное и невкусное → добавим разнообразные блюда чтобы вы не срывались, а от стресса посоветуем хорошие практики.",
    goal: "Квадратное дыхание 5 минут в день и 1 новый рецепт на 15 минут.",
    rationale: "Снижаем уровень кортизола, который провоцирует отеки, усталый вид и накопление жира.",
    promise: "Оценим ваше состояние через 3 дня — заметите разницу.",
  },
  b: {
    title: "Ваш фокус — на лёгкости и движении без боли",
    imageSrc: "/summary/lifestyle-b.jpg",
    habit: "Тело устало и перегружено → начнём с легкой зарядки дающей энергию на весь день.",
    goal: "Утренняя зарядка 5-10 минут и прогулка на свежем воздухе (5/7 дней).",
    rationale: "Поможем пищеварению и мягко разгоним метаболизм без нагрузки.",
    promise: "Покажем 3 варианта зарядки без прыжков и нагрузок на колени.",
  },
  c: {
    title: "Ваш фокус — на управлении эмоциями и контроле голода",
    imageSrc: "/summary/lifestyle-c.jpg",
    habit: "Эмоции провоцируют срывы → заменим 'заедание' на 'замещение'.",
    goal: "Перед тем, как съесть что-то вредное - выпить стакан воды, если все равно тянет на сладкое - фрукт/орехи.",
    rationale: "Пауза помогает отличить реальный голод от импульса.",
    promise: "В плане дадим список “замен на сладкое”.",
  },
  mixed: {
    title: "Ваш фокус — на мелочах и системности",
    imageSrc: "/summary/lifestyle-mixed.jpg",
    habit: "Вы ищете систему → начнем с ОДНОГО простого действия.",
    goal: "Фиксированное окно сна: укладываться и вставать в одно и то же время ±30 минут (5/7 дней)",
    rationale: "Качественный сон — самый недооцененный фактор похудения.",
    promise: "Проверим, как это повлияло на утренний аппетит чрез 5/7 дней.",
  },
};

// Новая база данных для страницы "МЕТОДЫ ПОХУДЕНИЯ"
const attemptsHabitActions = {
  a: {
    title: "Ваш подход — в восстановлении мотивации и мягком старте",
    imageSrc: "/summary/attempts-a.jpg",
    habit: "Вы ищете простое решение → мы добавим то, от чего вы быстро увидите первый результат.",
    goal: "Цель: сбросить первые пару килограм без спорта и диет.",
    rationale: "Ничего не дает такую дисциплину как долгожданное изменение, которое не возвращается на следующий день.",
    promise: "Мы поможем вам добиться результата без сложных схем.",
  },
  b: {
    title: "Ваш подход — маленькие шаги для большого результата",
    imageSrc: "/summary/attempts-b.jpg",
    habit: "Вы цените системный подход → сфокусируемся на постоянстве.",
    goal: "Цель: выбрать 1 привычку из итогового плана и следовать ей 7 дней.",
    rationale: "Одна маленькая, но стабильная привычка важнее 10 хаотичных.",
    promise: "Это создаст 'эффект домино' для других позитивных изменений.",
  },
  c: {
    title: "Ваш подход — от знаний к конкретному первому шагу",
    imageSrc: "/summary/attempts-c.jpg",
    habit: "Вы знаете теорию, но нужна практика → нужен чёткий первый шаг.",
    goal: "Цель: после получения плана, начать выполнять его в тот же день не откладывая.",
    rationale: "Действие, совершённое в первые 24 часа, закрепляется в 2 раза лучше.",
    promise: "Мы специально сделали первый шаг очень простым!",
  },
  mixed: {
    title: "Ваш подход — фокус на одном методе",
    imageSrc: "/summary/attempts-mixed.jpg",
    habit: "Вы открыты новому → объединим системность и поддержку организма.",
    goal: "Цель: открыть для себя новые знания о питании и не отклоняться от плана 7 дней.",
    rationale: "Тело привыкает к старым привычкам, а новые методы быстро дают результат.",
    promise: "Наш план подойдет даже для поддержания.",
  },
};

const whyItSuitsYouMapping = {
  eating: {
    a: { problem: "Склонность к большим порциям", solution: "Африканское манго помогает контролировать аппетит" },
    b: { problem: "Тяга к сладкому", solution: "Яблочный уксус поддерживает стабильность сахара" },
    c: { problem: "Скрытые калории", solution: "Зеленый чай ускоряет метаболизм жиров" },
    mixed: { problem: "Нерегулярное питание", solution: "Гуарана дает энергию и снижает потребность в перекусах" },
  },
  lifestyle: {
    a: { problem: "Высокий уровень стресса", solution: "Антиоксиданты зеленого чая борются с последствиями кортизола" },
    b: { problem: "Физическая усталость", solution: "Гуарана служит натуральным источником бодрости" },
    c: { problem: "Эмоциональный голод", solution: "Стабилизация сахара снижает импульсивную тягу к еде" },
    mixed: { problem: "Нестабильный сон", solution: "Снижение стресса улучшает качество отдыха" },
  },
  attempts: {
    a: { problem: "Поиск быстрого решения", solution: "Комплекс дает заметный эффект без жёстких диет" },
    b: { problem: "Важность системы", solution: "Всего 2 капсулы в день легко встроить в любой график" },
    c: { problem: "Сложность первого шага", solution: "Мягкий старт без побочных эффектов и стимуляторов высокой дозы" },
    mixed: { problem: "Открытость новому", solution: "Проверенная формула, которая дополняет любой здоровый план" },
  },
};

const subtitleKeywords = {
  eating: {
    a: "контроль порций",
    b: "тягу к сладкому",
    c: "скрытые калории",
    mixed: "режим питания",
  },
  lifestyle: {
    a: "уровень стресса",
    b: "усталость",
    c: "эмоциональный голод",
    mixed: "качество сна",
  },
  attempts: {
    a: "мягкий старт",
    b: "системный подход",
    c: "лёгкое начало",
    mixed: "проверенный метод",
  },
};

const comprehensiveEffectContent = {
  all_a: "Ваша главная задача — мягко перезапустить метаболизм. Комплекс поможет контролировать аппетит и даст энергию для легкого старта без стресса.",
  all_b: "Вам не хватает энергии для стабильного результата. Комплекс даст необходимый тонус, улучшит сон и снизит тягу к быстрым углеводам, которые забирают силы.",
  all_c: "Вы знаете, что делать, но мешают срывы. Комплекс поможет стабилизировать сахар в крови, чтобы снизить импульсивную тягу к еде в моменты стресса.",
  mixed: "Ваша ситуация требует комплексного подхода. Наш пакет поможет наладить режим, снизить влияние стресса и контролировать аппетит.",
};

const safetyContent = {
  default: "Состав не содержит агрессивных стимуляторов. При сомнениях вы всегда можете показать его вашему лечащему врачу.",
  high_pressure: "Состав совместим с большинством препаратов от гипертонии, но мы настоятельно рекомендуем проконсультироваться с вашим врачом.",
  diabetes: "Компоненты помогают стабилизировать уровень сахара. Продукт безопасен при диабете 2 типа, но консультация с эндокринологом обязательна.",
  contraceptives: "Растительные компоненты не влияют на эффективность гормональных контрацептивов. Можно принимать их вместе без опасений.",
  pcos: "При СПКЯ особенно важен контроль сахара и веса. Наш комплекс разработан с учетом этих потребностей и станет хорошим дополнением к лечению.",
};

const planContentDatabase = {
  eating: {
    a: "Рецепты с фокусом на качестве и сытости, а не на количестве калорий.",
    b: "Стратегии борьбы с тягой к сладкому через сбалансированные перекусы.",
    c: "Методы контроля 'скрытых' калорий в соусах и маслах без отказа от вкуса.",
    mixed: "Структурированное меню на день для создания стабильной основы питания.",
  },
  lifestyle: {
    a: "Интеграция практик для восстановления от стресса в ваш обычный день.",
    b: "Рекомендации по легкому движению, которое дает энергию, а не забирает ее.",
    c: "Техники управления эмоциональным голодом, чтобы отличать его от физического.",
    mixed: "Советы по налаживанию режима сна для регуляции гормонов аппетита.",
  },
  attempts: {
    a: "Фокус на быстрых первых результатах для поддержания высокой мотивации.",
    b: "Системный подход с одной ключевой привычкой в неделю для стабильного прогресса.",
    c: "Четкий и простой первый шаг, который можно сделать сразу после получения плана.",
    mixed: "Объединение системности с поддержкой организма для предотвращения срывов.",
  }
};

const handbookContentDatabase = {
  eating: {
    a: "Чек-лист по добавлению овощей в каждый прием пищи для большей сытости.",
    b: "Список из 5 полезных перекусов, которые всегда должны быть под рукой.",
    c: "Простая инфографика о калорийности популярных соусов.",
    mixed: "Формула идеального завтрака, который запускает метаболизм.",
  },
  lifestyle: {
    a: "5-минутная техника дыхания для моментального снижения уровня стресса.",
    b: "Комплекс из 3 упражнений для утренней зарядки без нагрузки на суставы.",
    c: "Техника 'паузы': что делать в момент, когда хочется 'заесть' эмоции.",
    mixed: "Гайд по 'гигиене сна': как подготовиться к качественному отдыху.",
  },
  attempts: {
    a: "Метод 'недельного замера', чтобы видеть результат не только на весах.",
    b: "Трекер для отслеживания одной ключевой привычки, чтобы видеть свой прогресс.",
    c: "Правило 'первых 24 часов' для максимально эффективного старта.",
    mixed: "Советы, как не сбиться с курса и что делать, если произошел срыв.",
  }
};

const shapeMapping: Record<string, string> = {
    Slim: "Стройную",
    Toned: "Подтянутую",
    Curvy: "С изгибами",
    Athletic: "Спортивную",
};

const confirmationMessages = ["Учтём!", "Понятно!", "Принято!", "Хорошо!", "Записали!"];

function buildStats(codeArray: string[]): AnswerStats {
  const counts = { a: 0, b: 0, c: 0, d: 0 }
  codeArray.forEach((l) => {
    if (counts[l as "a" | "b" | "c" | "d"] !== undefined) counts[l as "a" | "b" | "c" | "d"]++
  })
  const total = codeArray.length || 1
  const pct = { a: counts.a / total, b: counts.b / total, c: counts.c / total, d: counts.d / total }
  return {
    all: codeArray,
    counts,
    pct,
    block1: codeArray.slice(0, 3),
    block2: codeArray.slice(3, 7),
    block3: codeArray.slice(7, 10),
  }
}

export default function WeightLossQuizApp() {

  const [sendSampleNow, setSendSampleNow] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  // НОВЫЙ КОД
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [userProfile, setUserProfile] = useState<string>("")

  const [selectedGender, setSelectedGender] = useState<string>("")
  // --- ИЗМЕНЕНИЕ 1: `age` теперь строка для хранения диапазона ---
  const [age, setAge] = useState<string | undefined>(undefined)
  const [height, setHeight] = useState<number | undefined>(165) // Зададим среднее значение
  const [weight, setWeight] = useState<number | undefined>(70)  // Зададим среднее значение

  // показывать ошибки после первого взаимодействия
  const [touched, setTouched] = useState({ height: false, weight: false })

  // --- ИЗМЕНЕНИЕ 2: Добавляем "ссылки" (refs) на элементы для авто-фокуса ---
  const ageRef = React.useRef<HTMLDivElement>(null);
  const heightRef = React.useRef<HTMLInputElement>(null);
  const weightRef = React.useRef<HTMLInputElement>(null);
  // 10. Логика для плавающего CTA
  const orderFormRef = React.useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [orderDetails, setOrderDetails] = useState<{ name: string, phone: string, email?: string, orderId: string } | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (orderFormRef.current) {
        const formTop = orderFormRef.current.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        // Показываем, когда пользователь прокрутил до формы, но еще не до конца страницы
        setIsCtaVisible(scrollPosition > formTop + 200 && scrollPosition < document.body.scrollHeight - 300);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // оставить в инпуте только цифры (вырезаем всё лишнее)
  const onlyDigits = (s: string) => s.replace(/\D/g, "")

  // --- Validation ranges for BMI step ---
  const AGE_MIN = 18, AGE_MAX = 75
  const HEIGHT_MIN = 140, HEIGHT_MAX = 220
  const WEIGHT_MIN = 40, WEIGHT_MAX = 200

  const isValidAge = (v?: number) =>
    typeof v === "number" && v >= AGE_MIN && v <= AGE_MAX
  const isValidHeight = (v?: number) =>
    typeof v === "number" && v >= HEIGHT_MIN && v <= HEIGHT_MAX
  const isValidWeight = (v?: number) =>
    typeof v === "number" && v >= WEIGHT_MIN && v <= WEIGHT_MAX

  const [showBMIPage, setShowBMIPage] = useState(false)
  const [currentQuizStep, setCurrentQuizStep] = useState(0)

  const [miniQuizStep, setMiniQuizStep] = useState(0)
  const [miniQuizAnswers, setMiniQuizAnswers] = useState<Record<string, string | string[]>>({})
  const [miniQuizCompleted, setMiniQuizCompleted] = useState(false)

  const [showFact, setShowFact] = useState(false)
  const [showTestimonial1, setShowTestimonial1] = useState(false)

  // Для новой механики раскрывающихся инсайтов
  const [expandedInsight, setExpandedInsight] = useState<{ questionId: string; answer: string } | null>(null);
  const [isInsightAdded, setIsInsightAdded] = useState(false);

  // Ключ для персонализированного саммари по питанию
  const [eatingProfileSummaryKey, setEatingProfileSummaryKey] = useState<"a" | "b" | "c" | "mixed" | null>(null);
  // Состояние для анимации кнопки "Применить к моему плану"
  const [isPlanApplied, setIsPlanApplied] = useState(false)

  // Для второго персонализированного саммари (про образ жизни)
  const [showLifestyleSummary, setShowLifestyleSummary] = useState(false);
  const [lifestyleProfileSummaryKey, setLifestyleProfileSummaryKey] = useState<"a" | "b" | "c" | "mixed" | null>(null);

  // Для третьего персонализированного саммари (про методы похудения)
  const [showAttemptsSummary, setShowAttemptsSummary] = useState(false);
  const [attemptsProfileSummaryKey, setAttemptsProfileSummaryKey] = useState<"a" | "b" | "c" | "mixed" | null>(null);

  // Для хранения нескольких ответов на последнем вопросе
  const [finalGoals, setFinalGoals] = useState<string[]>([])

  const [letterAnswers, setLetterAnswers] = useState<string[]>([])
  const [desiredShape, setDesiredShape] = useState<string | null>(null)

  const BODY_SHAPE_STEP = 6

  const totalSteps = 25 // Landing + basics + BMI + 10 quiz questions + explanation + result + loading + offer + thank you
  const progress = (currentStep / totalSteps) * 100

  const getQuizProgress = () => {
    if (currentQuizStep < 3) {
      // Eating section (questions 0-2): 0% to 30%
      return ((currentQuizStep + 1) / 3) * 30
    } else if (currentQuizStep < 7) {
      // Lifestyle section (questions 3-6): 30% to 70%
      return 30 + ((currentQuizStep - 2) / 4) * 40
    } else {
      // Attempts section (questions 7-9): 70% to 100%
      return 70 + ((currentQuizStep - 6) / 3) * 30
    }
  }

  const getSectionTitle = () => {
    if (currentQuizStep < 3) return "Ваше питание"
    if (currentQuizStep < 7) return "Ваш образ жизни"
    return "Ваши методы похудения" // Changed from "Ваши попытки"
  }

  // Новая функция №1: Только записывает ответ
  const recordAnswer = (questionId: string, answer: string, category: "eating" | "lifestyle" | "attempts" | "goal", letterOverride?: string) => {
    const newAnswers = [...answers.filter((a) => a.questionId !== questionId), { questionId, answer, category }];
    setAnswers(newAnswers);

    const question = quizQuestions.find(q => q.id === questionId);
    if (!question) return;

    const questionIndexInQuiz = quizQuestions.findIndex(q => q.id === questionId);

    const optionIndex = question.options.findIndex((opt) => opt.text === answer);
    const letter = letterOverride || ["a", "b", "c", "d"][optionIndex] || "a";

    const newLetterAnswers = [...letterAnswers];
    newLetterAnswers[questionIndexInQuiz] = letter;
    setLetterAnswers(newLetterAnswers);
  };

  // Новая функция №2: Только переключает на следующий шаг
  const advanceToNextStep = () => {
    setExpandedInsight(null);
    setIsInsightAdded(false);
    // setSelectedAnswer(null); // <- ЭТА СТРОКА БЫЛА УДАЛЕНА

    if (currentQuizStep === 2) {
      // Логика профилирования после блока "Питание"
      const eatingAnswers = letterAnswers.slice(0, 3);
      const counts = { a: 0, b: 0, c: 0, d: 0 };
      eatingAnswers.forEach(letter => {
        if (counts[letter as keyof typeof counts] !== undefined) counts[letter as keyof typeof counts]++;
      });
      let maxCount = 0;
      let dominantLetter: "a" | "b" | "c" | "d" | "mixed" = "mixed";
      let isTie = false;
      for (const letter in counts) {
        const key = letter as keyof typeof counts;
        if (counts[key] > maxCount) {
          maxCount = counts[key];
          dominantLetter = key;
          isTie = false;
        } else if (counts[key] === maxCount && maxCount > 0) {
          isTie = true;
        }
      }
      const finalKey = isTie || dominantLetter === 'd' ? 'mixed' : dominantLetter;
      setEatingProfileSummaryKey(finalKey);
      setShowFact(true);
      return;
    }
    else if (currentQuizStep === 6) {
      // Логика профилирования после блока "Образ жизни"
      const lifestyleAnswers = letterAnswers.slice(3, 7);
      const counts = { a: 0, b: 0, c: 0, d: 0 };
      lifestyleAnswers.forEach(letter => {
        if (counts[letter as keyof typeof counts] !== undefined) counts[letter as keyof typeof counts]++;
      });
      let maxCount = 0;
      let dominantLetter: "a" | "b" | "c" | "d" | "mixed" = "mixed";
      let isTie = false;
      for (const letter in counts) {
        const key = letter as keyof typeof counts;
        if (counts[key] > maxCount) {
          maxCount = counts[key];
          dominantLetter = key;
          isTie = false;
        } else if (counts[key] === maxCount && maxCount > 0) {
          isTie = true;
        }
      }
      const finalKey = isTie || dominantLetter === 'd' ? 'mixed' : dominantLetter;
      setLifestyleProfileSummaryKey(finalKey);
      setShowLifestyleSummary(true);
      return;
    } else if (currentQuizStep === 9) {
      // Логика профилирования после блока "Методы"
      const attemptsAnswers = letterAnswers.slice(7, 10);
      const counts = { a: 0, b: 0, c: 0, d: 0 };
      attemptsAnswers.forEach(letter => {
        if (counts[letter as keyof typeof counts] !== undefined) counts[letter as keyof typeof counts]++;
      });
      let maxCount = 0;
      let dominantLetter: "a" | "b" | "c" | "d" | "mixed" = "mixed";
      let isTie = false;
      for (const letter in counts) {
        const key = letter as keyof typeof counts;
        if (counts[key] > maxCount) {
          maxCount = counts[key];
          dominantLetter = key;
          isTie = false;
        } else if (counts[key] === maxCount && maxCount > 0) {
          isTie = true;
        }
      }
      const finalKey = isTie || dominantLetter === 'd' ? 'mixed' : dominantLetter;
      setAttemptsProfileSummaryKey(finalKey);
      setShowAttemptsSummary(true);
      return;
    } else {
      // Просто переход к следующему вопросу
      setCurrentQuizStep(currentQuizStep + 1);
    }
  };


  const analyzeAnswers = (allAnswers: QuizAnswer[]) => {
    const eatingAnswers = allAnswers.filter((a) => a.category === "eating")
    const lifestyleAnswers = allAnswers.filter((a) => a.category === "lifestyle")
    const attemptsAnswers = allAnswers.filter((a) => a.category === "attempts")

    // Simple logic to determine profile
    const stressEating = eatingAnswers.some((a) => a.answer.includes("вину") || a.answer.includes("тяжесть"))
    const highStress = lifestyleAnswers.some((a) => a.answer.includes("Высокий") || a.answer.includes("Очень высокий"))
    const multipleAttempts = attemptsAnswers.some((a) => a.answer.includes("Много раз") || a.answer.includes("3-5"))

    if (stressEating && highStress) {
      setUserProfile("stress-eater")
    } else if (multipleAttempts) {
      setUserProfile("serial-dieter")
    } else {
      setUserProfile("beginner")
    }
  }

  const onSelectAnswer = (q: Question, optionText: string) => {
    const insight = attemptInsights[q.id]?.[optionText];

    // Если для этого ответа есть инсайт, показываем его
    if (insight) {
      setExpandedInsight({ questionId: q.id, answer: optionText });
      setIsInsightAdded(false); // Сбрасываем кнопку "Добавить в план"
    } else {
      // Если инсайта нет (например, для 4-го варианта ответа), работаем по старой схеме
      handleAnswer(q.id, optionText, q.category);
    }
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* ИЗМЕНЕНИЕ: Уменьшили отступ с py-8 до py-4 */}
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-6 sm:p-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight mb-4">
              Узнайте свой путь к фигуре мечты за 10 вопросов
            </h1>
            <p className="text-base sm:text-lg text-green-700 font-semibold mb-6">
              Мини-меню + привычки под ваш режим. Отправим сразу в WhatsApp — бесплатно.
            </p>
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Получите персонализированный план без строгих диет, включающий рекомендации по питанию и натуральные добавки для достижения вашей цели.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <span className="text-gray-700 text-sm sm:text-base">Менее 5 минут</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <span className="text-gray-700 text-sm sm:text-base">100% Анонимно</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <span className="text-gray-700 text-sm sm:text-base">Готовый план на 14 дней</span>
              </div>
            </div>
            <Button
              onClick={() => setCurrentStep(1)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transform hover:scale-105 transition-all my-4 px-8 py-3 text-base sm:py-4 sm:text-lg"
            >
              Начать тест и получить план
            </Button>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 flex-shrink-0 mr-1" />
                <span className="text-left">Более 1,340+ женщин в Перу уже получили персональные рекомендации бесплатно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <Image
                    src="/avatars/1-ar.jpg"
                    alt="Woman avatar 1"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                  <Image
                    src="/avatars/2-ar.jpg"
                    alt="Woman avatar 2"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                  <Image
                    src="/avatars/3-ar.jpg"
                    alt="Woman avatar 3"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                </div>
                <span className="font-semibold text-green-700">«Проверено»</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        {/* ИЗМЕНЕНИЕ: Вся сетка и карточки были изменены для мобильной адаптации */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border-0 shadow-md">
            {/* Отступ p-4 для мобильных, p-6 для больших экранов */}
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                {/* Иконка и круг вокруг нее меньше на мобильных */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-base">Индивидуальный подход</h3>
              </div>
              {/* Текст параграфа меньше на мобильных */}
              <p className="text-gray-600 text-sm sm:text-base">
                Каждая женщина уникальна. Наш анализ учитывает ваш образ жизни, стресс и прошлый опыт, чтобы предоставить
                вам конкретные рекомендации, с которыми вы сможете достичь наилучший результат в кратчайшие сроки.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-peach-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-peach-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-base">100% Одобрено нутрициологами</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Наши рекомендации предоставляют самые безопасные и натуральные методы, которые были созданы при участии
                ведущих нутрициологов страны для гарантированного результата без вреда для здоровья.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )


  const renderBasicsPage = () => {

    const nextButtonRef = React.useRef<HTMLButtonElement>(null);

    const isFormValid = !!selectedGender && !!age && isValidHeight(height) && isValidWeight(weight);

    // --- ФУНКЦИИ-ПОМОЩНИКИ С setTimeout ДЛЯ ГАРАНТИРОВАННОГО ФОКУСА ---
    const handleGenderSelect = (gender: string) => {
      setSelectedGender(gender);
      setTimeout(() => ageRef.current?.focus(), 0);
    };

    const handleAgeSelect = (range: string) => {
      setAge(range);
      setTimeout(() => heightRef.current?.focus(), 0);
    };

    const handleHeightEnter = () => {
      setTimeout(() => weightRef.current?.focus(), 0);
    };

    const handleWeightEnter = () => {
      setTimeout(() => nextButtonRef.current?.focus(), 0);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center leading-relaxed">
                Let us know some basics
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Это поможет рассчитать безопасный темп снижения
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedGender === "female"
                    ? "border-green-500 bg-green-100"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  onClick={() => handleGenderSelect("female")}
                >
                  <Image
                    src="/basicspage/peruanw.png"
                    alt="Female"
                    width={64}
                    height={64}
                    className="mb-2 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">Female</span>
                </div>
                <div
                  className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedGender === "male"
                    ? "border-green-500 bg-green-100"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  onClick={() => handleGenderSelect("male")}
                >
                  <Image
                    src="/basicspage/peruanm.png"
                    alt="Male"
                    width={64}
                    height={64}
                    className="mb-2 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">Male</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <div ref={ageRef} tabIndex={-1} className="grid grid-cols-3 sm:grid-cols-5 gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg">
                  {["18–24", "25–34", "35–44", "45–54", "55+"].map(range => (
                    <button
                      type="button"
                      key={range}
                      onClick={() => handleAgeSelect(range)}
                      className={`text-center p-3 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium
                      ${age === range
                          ? "border-green-500 bg-green-100 text-green-800"
                          : "border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50"
                        }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <NumericInputWithControls
                  label="Height (cm)"
                  value={height}
                  onChange={setHeight}
                  onBlur={() => setTouched((t) => ({ ...t, height: true }))}
                  min={HEIGHT_MIN}
                  max={HEIGHT_MAX}
                  inputRef={heightRef}
                  onEnterPress={handleHeightEnter}
                />
                <NumericInputWithControls
                  label="Weight (kg)"
                  value={weight}
                  onChange={setWeight}
                  onBlur={() => setTouched((t) => ({ ...t, weight: true }))}
                  min={WEIGHT_MIN}
                  max={WEIGHT_MAX}
                  inputRef={weightRef}
                  onEnterPress={handleWeightEnter}
                />
              </div>
              <p className="text-xs text-gray-500 text-center -mt-2 mb-4">
                Приблизительные значения подойдут — план всё равно подстроим.
              </p>
              <Button
                ref={nextButtonRef}
                // ✅ ИЗМЕНЕНИЕ: Заменили onClick на onMouseDown
                onMouseDown={() => {
                  if (isFormValid) {
                    setShowBMIPage(true);
                  }
                }}
                onClick={(e) => e.preventDefault()} // Добавим это, чтобы предотвратить двойное срабатывание
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isFormValid) {
                    setShowBMIPage(true);
                  }
                }}
                disabled={!isFormValid}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base sm:text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderBMIPage = () => {
    if (!selectedGender || !age || !height || !weight) {
      return null
    }

    const BMI_TABLE = {
      female: { "18-29": 22, "30-44": 23, "45-75": 24 },
      male: { "18-29": 23, "30-44": 24, "45-75": 25 },
    }

    const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10

    let ageBand = "18-29"
    const ageStart = parseInt(age.split('–')[0]);
    if (ageStart >= 30 && ageStart <= 44) ageBand = "30-44"
    else if (ageStart >= 45) ageBand = "45-75"

    const meanBMI = BMI_TABLE[selectedGender as keyof typeof BMI_TABLE][ageBand as keyof typeof BMI_TABLE.female]
    const diff = Math.round(((bmi - meanBMI) / meanBMI) * 100)
    const comparison = diff > 0 ? "higher" : "lower"

    const getBMICategory = (bmi: number) => {
      if (bmi < 18.5) return "Below avg"
      if (bmi < 25) return "Comfortable"
      if (bmi < 30) return "Slightly above"
      return "Well above"
    }

    const markerPosition = Math.min(Math.max((bmi / 40) * 100, 0), 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Your Body Mass Index (BMI) </h2>
              </div>

              <Card className="rounded-xl bg-muted/5 shadow-md p-6 space-y-5 max-w-[440px] mx-auto mb-8">
                <div className="relative">
                  <div
                    className="absolute -top-12 transform -translate-x-1/2 z-10"
                    style={{ left: `${markerPosition}%` }}
                  >
                    <Badge className="bg-slate-800 text-white rounded-full px-4 py-1">You – {bmi}</Badge>
                  </div>
                  <div
                    className="absolute -top-12 h-12 border-l border-dashed border-muted transform -translate-x-1/2"
                    style={{ left: `${markerPosition}%` }}
                  ></div>
                  <div className="relative pt-1 pb-3">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-emerald-500 via-amber-400 to-rose-500"></div>
                    <div
                      className="absolute top-1/2 w-5 h-5 border-2 border-white bg-slate-800 shadow rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${markerPosition}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2 px-1">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>

                {/* ✅ ИЗМЕНЕНИЕ: Добавили адаптивные классы */}
                {/* На мобильных будет просто flex, на десктопе flex c justify-between */}
                <div className="relative -top-2 flex sm:justify-between uppercase tracking-normal leading-tight text-[9px] sm:text-[11px]">
                  {["Below avg", "Comfortable", "Slightly above", "Well above"].map((cat) => (
                    <span
                      key={cat}
                      // На мобильных: flex-1 text-center. На десктопе: возвращаем к sm:flex-initial и sm:text-left
                      className={`flex-1 text-center sm:flex-initial sm:text-left ${cat === getBMICategory(bmi) ? "font-bold text-primary" : ""}`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="text-center mt-2">
                  <span className="text-xs text-gray-500">ИМТ — лишь ориентир и не является диагнозом</span>
                </div>

                {(() => {
                  const category = getBMICategory(bmi)
                  let healthNote = ""
                  let goodNews = ""

                  if (bmi < 18.5) {
                    healthNote = "Ниже комфортного диапазона; возможен недостаток питательных веществ, витаминов и энергии."
                    goodNews = "Небольшое увеличение калорий при регулярном питании обычно быстро восстанавливает энергию."
                  } else if (bmi >= 18.5 && bmi < 25) {
                    healthNote = "ИМТ в пределах нормы, но это не отражает состав тела или уровень стресса."
                    goodNews = "Поддерживайте постоянство сна, движения и потребления белка — наш план установит простые еженедельные цели."
                  } else if (bmi >= 25 && bmi < 30) {
                    healthNote = "Немного выше комфортного диапазона; со временем это может нагружать суставы и сердце."
                    goodNews = "Потеря всего 5–7% веса заметно снизит нагрузку и риск дальнейших проблем со здоровьем."
                  } else {
                    healthNote = "Большая нагрузка на организм; повышается риск проблем с суставами и серьезных заболеваний."
                    goodNews = "Пошаговые привычки приведут к более быстрой потеря веса и улучшение самочувствия уже в первые недели."
                  }

                  return (
                    <>
                      <div className="rounded bg-amber-50 p-4 flex gap-3">
                        <div className="w-5 h-5 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">!</div>
                        <div className="text-sm">
                          <span className="font-bold">Health note:</span> {healthNote}
                        </div>
                      </div>
                      <div className="rounded bg-emerald-50 p-4 flex gap-3">
                        <div className="w-5 h-5 bg-emerald-400 text-white rounded-full flex items-center justify-center text-xs font-bold">!</div>
                        <div className="text-sm">
                          <span className="font-bold">Good news:</span> {goodNews}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </Card>

              {(() => {
                let comparisonText = ""
                if (bmi < 18.5) {
                  comparisonText = "Ваш показатель ниже среднего для вашей возрастной группы."
                } else if (bmi >= 18.5 && bmi < 25) {
                  comparisonText = "Ваш показатель соответствует среднему уровню для вашей возрастной группы."
                } else if (bmi >= 25 && bmi < 30) {
                  comparisonText = "Ваш показатель немного выше среднего среди женщин вашего возраста."
                } else {
                  comparisonText = "Ваш показатель заметно выше среднего для вашей возрастной группы."
                }
                return (
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                    <p>{comparisonText}</p>
                  </div>
                )
              })()}
              <div className="text-center space-y-2 mb-8"></div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 px-4">
                <Button
                  onClick={() => setShowBMIPage(false)}
                  variant="outline"
                  className="w-full sm:flex-1 text-gray-500 hover:text-gray-700 py-3 text-base sm:text-lg rounded-full opacity-60 hover:opacity-100 border-2 border-gray-300 hover:border-gray-400"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    setShowBMIPage(false)
                    setCurrentStep(BODY_SHAPE_STEP)
                  }}
                  className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-base sm:text-lg rounded-full"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div >
      </div >
    )
  }


  const renderFinalResultsPage = () => {
    // --- Логика для определения типа телосложения ---
    const calculateBMI = (w: number, h: number) => Math.round((w / Math.pow(h / 100, 2)) * 10) / 10;
    const bmi = (weight && height) ? calculateBMI(weight, height) : 0;

    const getBodyType = (bmiValue: number) => {
      if (bmiValue > 28) {
        return {
          type: "Эндоморф",
          description: "Ваш тип склонен к набору веса из-за более медленного обмена веществ. Но есть и плюс: вы легче набираете мышечную массу. Главная задача — 'разогнать' метаболизм.",
        };
      }
      if (bmiValue < 22) {
        return {
          type: "Эктоморф",
          description: "Вам может быть сложно набирать вес, но проблема часто кроется в качестве тела. Цель — сбалансированное питание для поддержания энергии и тонуса.",
        };
      }
      return {
        type: "Мезоморф",
        description: "У вас сбалансированный тип, который хорошо откликается на изменения в питании и активности. Главное — придерживаться системы.",
      };
    };
    const bodyType = getBodyType(bmi);

    const keyHealthFactors = React.useMemo(() => {
        const labelMapping: Record<string, string> = {
            pregnancy: "Беременность",
            diet: "Диета",
            meds: "Медикаменты",
            menopause: "Менопауза",
            conditions: "Состояния",
        };

        return Object.entries(miniQuizAnswers)
            .map(([key, value]) => {
                const label = labelMapping[key];
                if (!label) return null;

                if (Array.isArray(value)) {
                    const filteredValues = value.filter(v => v !== "None of the above");
                    if (filteredValues.length > 0) {
                        return `${label}: ${filteredValues.join(', ')}`;
                    }
                } else if (typeof value === 'string' && value && value !== "No" && value !== "None" && !value.startsWith("No /")) {
                     return `${label}: ${value}`;
                }
                return null;
            })
            .filter(Boolean) as string[];
    }, [miniQuizAnswers]);

    const shapeMapping: Record<string, string> = {
        Slim: "Стройную",
        Toned: "Подтянутую",
        Curvy: "С изгибами",
        Athletic: "Спортивную",
    };
    
    const factorMapping = {
      eating: {
        a: "склонность к большим порциям и калорийной еде",
        b: "сильная тяга к сладкому",
        c: "употребление 'скрытых' калорий",
        mixed: "нерегулярное питание",
      },
      lifestyle: {
        a: "высокий уровень стресса и усталости",
        b: "физическая усталость и боли в теле",
        c: "эмоциональное переедание",
        mixed: "нестабильный режим дня и сна",
      }
    };

    const eatingProfile = eatingProfileSummaryKey ? eatingHabitActions[eatingProfileSummaryKey] : null;
    const lifestyleProfile = lifestyleProfileSummaryKey ? lifestyleHabitActions[lifestyleProfileSummaryKey] : null;
    const attemptsProfile = attemptsProfileSummaryKey ? attemptsHabitActions[attemptsProfileSummaryKey] : null;
    
    const lifestyleFactor = lifestyleProfileSummaryKey ? factorMapping.lifestyle[lifestyleProfileSummaryKey] : "повышенный уровень стресса";
    const eatingFactor = eatingProfileSummaryKey ? factorMapping.eating[eatingProfileSummaryKey] : "нерегулярное питание";
    
    // ✅ ВОССТАНОВЛЕННАЯ ЛОГИКА: Находим персональные инсайты
    const relevantInsights = answers
        .filter(a => (a.questionId === 'attempts-1' || a.questionId === 'attempts-2') && attemptInsights[a.questionId]?.[a.answer])
        .map(a => attemptInsights[a.questionId][a.answer]);

    const ingredientDatabase = {
      GREEN_TEA: {
        name: "Зелёный чай",
        explanation: "Его мощные антиоксиданты помогут вашему организму справиться с последствиями гормона стресса (кортизола), который, как показывают ваши ответы, влияет на вас.",
      },
      APPLE_VINEGAR: {
        name: "Яблочный уксус",
        explanation: "Поможет стабилизировать уровень сахара в крови, чтобы разорвать порочный круг 'резкий голод -> срыв на сладкое', который вы у себя отмечали.",
      },
      AFRICAN_MANGO: {
        name: "Африканское манго",
        explanation: "Эффективно помогает контролировать аппетит, что особенно важно, когда привычка к большим или частым порциям мешает достичь цели.",
      },
      GUARANA: {
        name: "Гуарана",
        explanation: "Мягко поддерживает метаболизм и дает естественный заряд энергии, помогая бороться с усталостью, о которой вы упоминали.",
      },
    };

    const problemMapping = {
      eating: {
        a: ["BIG_APPETITE", "SUGAR_CRAVINGS"],
        b: ["SUGAR_CRAVINGS"],
        c: ["SUGAR_CRAVINGS"],
        mixed: ["SUGAR_CRAVINGS"],
      },
      lifestyle: {
        a: ["HIGH_STRESS", "LOW_ENERGY"],
        b: ["LOW_ENERGY"],
        c: ["HIGH_STRESS"],
        mixed: ["LOW_ENERGY"],
      },
    };

    const solutionMapping = {
      HIGH_STRESS: {
        title: "Чтобы бороться с последствиями стресса:",
        ingredients: [ingredientDatabase.GREEN_TEA],
      },
      SUGAR_CRAVINGS: {
        title: "Чтобы уменьшить тягу к сладкому и срывы:",
        ingredients: [ingredientDatabase.APPLE_VINEGAR],
      },
      BIG_APPETITE: {
        title: "Чтобы контролировать аппетит без чувства голода:",
        ingredients: [ingredientDatabase.AFRICAN_MANGO],
      },
      LOW_ENERGY: {
        title: "Чтобы повысить уровень энергии и поддержать метаболизм:",
        ingredients: [ingredientDatabase.GUARANA],
      },
    };
    const getUserSolutions = () => {
      const problems = new Set<string>();
      if (eatingProfileSummaryKey && problemMapping.eating[eatingProfileSummaryKey as keyof typeof problemMapping.eating]) {
        problemMapping.eating[eatingProfileSummaryKey as keyof typeof problemMapping.eating].forEach(p => problems.add(p));
      }
      if (lifestyleProfileSummaryKey && problemMapping.lifestyle[lifestyleProfileSummaryKey as keyof typeof problemMapping.lifestyle]) {
        problemMapping.lifestyle[lifestyleProfileSummaryKey as keyof typeof problemMapping.lifestyle].forEach(p => problems.add(p));
      }
      const groupedSolutions = new Map<string, typeof ingredientDatabase.GREEN_TEA[]>();
      problems.forEach(problemKey => {
        const solution = solutionMapping[problemKey as keyof typeof solutionMapping];
        if (solution) {
          if (!groupedSolutions.has(solution.title)) {
            groupedSolutions.set(solution.title, []);
          }
          groupedSolutions.get(solution.title)?.push(...solution.ingredients);
        }
      });
      return Array.from(groupedSolutions.entries());
    };
    const userSolutions = getUserSolutions();
    const otherAnswersCount = letterAnswers.filter(l => l === 'n').length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-4 mb-2">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-6 md:p-8 space-y-6">

            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="font-bold text-lg text-green-800 mb-3 text-center">Ваш профиль: Основные показатели</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
                <div><div className="text-sm text-gray-600">Возраст</div><div className="font-semibold text-lg">{age} лет</div></div>
                <div><div className="text-sm text-gray-600">Рост</div><div className="font-semibold text-lg">{height} см</div></div>
                <div><div className="text-sm text-gray-600">Вес</div><div className="font-semibold text-lg">{weight} кг</div></div>
                <div><div className="text-sm text-gray-600">ИМТ</div><div className="font-semibold text-lg">{bmi}</div></div>
              </div>
              <div className="text-center bg-white rounded-lg p-3">
                <p className="font-semibold text-gray-800">Ваш тип телосложения: {bodyType.type}</p>
                <p className="text-sm text-gray-600 mt-1">{bodyType.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {desiredShape && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-500 text-sm mb-2">Ваша цель</h4>
                        <p className="text-gray-800 text-sm">
                            Вы стремитесь к <strong>{shapeMapping[desiredShape] || desiredShape}</strong> фигуре. Это отличная и достижимая цель!
                        </p>
                    </div>
                )}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-500 text-sm mb-2">Ключевые факторы здоровья</h4>
                    {keyHealthFactors.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                            {keyHealthFactors.map((factor, index) => (
                                <li key={index}>{factor}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-800 text-sm">Вы не указали особых ограничений.</p>
                    )}
                </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-center text-gray-800 mb-4">Анализ ваших ответов</h3>
              <div className="space-y-4">
                {eatingProfile && (
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <p><span className="font-semibold">Питание:</span> {eatingProfile.title}</p>
                    <p className="text-sm text-gray-700 mt-1"><span className="font-bold text-green-600">Цель:</span> {eatingProfile.goal}</p>
                  </div>
                )}
                {lifestyleProfile && (
                  <div className="p-4 bg-sky-50 rounded-xl">
                    <p><span className="font-semibold">Образ жизни:</span> {lifestyleProfile.title}</p>
                    <p className="text-sm text-gray-700 mt-1"><span className="font-bold text-green-600">Цель:</span> {lifestyleProfile.goal}</p>
                  </div>
                )}
                {attemptsProfile && (
                  <div className="p-4 bg-violet-50 rounded-xl">
                    <p><span className="font-semibold">Ваши методы:</span> {attemptsProfile.title}</p>
                    <p className="text-sm text-gray-700 mt-1"><span className="font-bold text-green-600">Цель:</span> {attemptsProfile.goal}</p>
                  </div>
                )}
              </div>
            </div>

            {/* ✅ ВОССТАНОВЛЕННЫЙ БЛОК: Ваши инсайты */}
            {relevantInsights.length > 0 && (
                <div>
                    <h3 className="font-bold text-xl text-center text-gray-800 mb-4">Ваши инсайты</h3>
                    <div className="space-y-4">
                        {relevantInsights.map((insight, index) => (
                            <div key={index} className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                                <p className="font-semibold text-blue-800">{insight.title}</p>
                                <p className="text-sm text-gray-700 mt-1">{insight.solution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {otherAnswersCount > 0 && (
              <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-center mb-2">Особые заметки для вашего плана</h4>
                <p className="text-sm text-gray-700 text-center">
                  {otherAnswersCount >= 3
                    ? "Мы заметили, что вы часто выбирали 'Другое'. Это говорит о вашей уникальной ситуации. Наш план — это гибкая основа, которую вы сможете легко адаптировать под себя."
                    : "Мы учли, что некоторые стандартные ситуации вам не подходят. План будет составлен с учетом этой гибкости."
                  }
                </p>
              </div>
            )}

            <div className="border-2 border-green-600 rounded-xl p-5 shadow-inner bg-white">
              <h3 className="font-bold text-xl text-center text-green-700 mb-4">Ваш персональный путь к результату</h3>
              <p className="text-sm text-gray-700 mb-4">
                Судя по вашим ответам, вы испытываете как минимум два фактора, которые сильно замедляют метаболизм: <strong>{lifestyleFactor}</strong> и <strong>{eatingFactor}</strong>.
                В таких случаях диетологи рекомендуют начинать не с жестких диет, а с лёгкого плана питания и поддержки организма через безопасные растительные комплексы.
              </p>
              <h4 className="font-semibold text-gray-800 mb-2">Натуральные компоненты, подобранные для решения ваших задач:</h4>

              {userSolutions.length > 0 ? (
                userSolutions.map(([title, ingredients], index) => (
                  <div key={index} className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">{title}</h5>
                    <div className="bg-green-50 rounded-lg p-4 space-y-2">
                      {ingredients.map(ing => (
                        <div key={ing.name}>
                          <p className="font-bold text-green-700">{ing.name}</p>
                          <p className="text-sm text-gray-600">{ing.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-700 text-center">Мы подбираем для вас лучшие компоненты...</p>
              )}
              <p className="text-sm text-gray-600 mt-4">
                Такой комплексный подход помогает мягко перезапустить обмен веществ и избежать срывов, решая первопричины набора веса.
              </p>
            </div>

            <div className="text-center">
              <p className="font-semibold mb-3">Мы поможем вам найти безопасные и 100% натуральные добавки, а еще дадим:</p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <span className="text-left font-medium text-gray-800">Легкий план по питанию на 14 дней</span>
                </div>
                <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-left font-medium text-gray-800">Памятка по привычкам для быстрого результата</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <div className="flex items-start sm:items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                <CheckCircle2 className="w-5 h-5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span>Эта страница будет добавлена в ваш персональный план</span>
              </div>
              <Button
                onClick={() => setCurrentStep(16)}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Добавить все в план
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                Информация обучающая, не заменяет консультацию врача
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 14. Шаг: какую фигуру вы хотите
  const renderBodyShapeStep = () => {
    const options = [
      { key: "Slim", title: "Стройную", hint: "Лёгкая, изящная", img: "/bodyshape/slim.jpg" },
      { key: "Toned", title: "Подтянутую", hint: "Рельеф и упругость", img: "/bodyshape/toned.jpg" },
      { key: "Curvy", title: "С изгибами", hint: "Мягкие женственные", img: "/bodyshape/curved.jpg" },
      { key: "Athletic", title: "Спортивную", hint: "Баланс и сила", img: "/bodyshape/athletic.jpg" },
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        {/* ИЗМЕНЕНИЕ: Убрали лишний отступ py-8 отсюда */}
        <div className="max-w-3xl mx-auto">
          {/* ИЗМЕНЕНИЕ: Добавили стандартный отступ py-4 сюда */}
          <div className="text-center py-4 mb-2">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">Какую фигуру вы хотите?</h2>
            <p className="mt-3 text-center text-gray-600">
              Выберите силуэт — мы подстроим рекомендации именно под эту цель.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {options.map(opt => {
                const selected = desiredShape === opt.key
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setDesiredShape(opt.key)}
                    aria-pressed={selected}
                    className={[
                      "group w-full rounded-2xl p-4 transition",
                      "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-500",
                      selected ? "ring-2 ring-emerald-500 bg-emerald-50/60" : ""
                    ].join(" ")}
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-50/60 ring-1 ring-emerald-100/60 overflow-hidden mb-2">
                        <Image
                          src={opt.img}
                          alt={opt.title}
                          width={80}
                          height={112}
                          sizes="64px"
                          className="w-16 h-16 object-contain"
                          priority={false}
                        />
                      </div>
                      <div className="text-gray-900 font-semibold">{opt.title}</div>
                      <div className="text-gray-500 text-xs mt-1">{opt.hint}</div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="px-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                Назад
              </Button>

              {/* Сохраняем ответ и идём к результатам */}
              <Button
                disabled={!desiredShape}
                onClick={() => {
                  if (!desiredShape) return
                  const entry: QuizAnswer = {
                    questionId: "goal:body-shape",
                    answer: desiredShape,
                    category: "goal",
                  }
                  setAnswers(prev => [
                    ...prev.filter(a => a.questionId !== "goal:body-shape"),
                    entry
                  ])
                  setCurrentStep(2) // RESULTS_STEP
                }}
                className={[
                  "px-8 rounded-full text-white font-medium",
                  desiredShape ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
                ].join(" ")}
              >
                Далее
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderPreQuestionnaireIntroPage = () => {
    // Данные для иконок вынесли в массив для удобства
    const introIcons = [
      { emoji: "🍼", label: "Беременность" },
      { emoji: "🥦", label: "Рацион" },
      { emoji: "💊", label: "Таблетки" },
      { emoji: "🧬", label: "Гормоны" },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto py-10">
          {/* Header */}
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-center mb-4">Сделаем рекомендации ещё точнее</h2>

              <p className="text-gray-700 text-lg text-center mb-6">
                Мы уже знаем ваш рост, вес и цель. Осталось учесть особенности питания, гормонального фона и возможные
                ограничения, чтобы рецепт действительно подошёл именно вам.
              </p>

              {/* ИЗМЕНЕНИЕ: Новый подход к выравниванию для более компактного вида */}
              <div className="flex justify-center items-start mb-6">
                {introIcons.map((item) => (
                  <div key={item.label} className="flex flex-col items-center w-20"> {/* Задаем каждому блоку фиксированную ширину */}
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-2">
                      {item.emoji}
                    </div>
                    <span className="text-xs text-center">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700 mb-8">
                <ul className="space-y-1">
                  <li>• Ответы займут меньше минуты</li>
                  <li>• Никаких персональных данных</li>
                  <li>• Можно пропустить вопрос, если не уверены</li>
                </ul>
              </div>

              <Button
                onClick={() => setCurrentStep(3)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base sm:text-lg rounded-full"
              >
                Начать 5 вопросов
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  };

  const renderMiniQuestionPage = () => {
    const question = miniQuestions[miniQuizStep]
    if (!question) return null

    const handleRadioChange = (value: string) => {
      setMiniQuizAnswers((prev) => ({
        ...prev,
        [question.id]: value,
      }))
    }

    const handleCheckboxChange = (option: string, checked: boolean) => {
      setMiniQuizAnswers((prev) => {
        const currentAnswers = (prev[question.id] as string[]) || []

        if (checked) {
          return {
            ...prev,
            [question.id]: [...currentAnswers, option],
          }
        } else {
          return {
            ...prev,
            [question.id]: currentAnswers.filter((item) => item !== option),
          }
        }
      })
    }

    const isValidAnswer = () => {
      const answer = miniQuizAnswers[question.id]
      if (question.type === "radio") {
        return !!answer
      } else {
        return Array.isArray(answer) && answer.length > 0
      }
    }

    const handleNext = () => {
      if (miniQuizStep === 4) {
        // After last mini question, mark as completed and go to intro page
        setMiniQuizCompleted(true)
        setCurrentStep(4)
      } else {

        setMiniQuizStep(miniQuizStep + 1)
      }
    }

    const handleSkip = () => {
      // Mark answer as skipped
      setMiniQuizAnswers((prev) => ({
        ...prev,
        [question.id]: question.type === "radio" ? "" : [],
      }))

      if (miniQuizStep === 4) {
        setCurrentStep(4)
      } else {
        setMiniQuizStep(miniQuizStep + 1)
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto py-10">
          {/* Header */}
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <span></span>
            <span>Step {miniQuizStep + 1} of 5</span>
          </div>

          {/* Question Card */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-green-600 text-xl font-semibold mb-6">{question.title}</h2>

              {question.type === "radio" ? (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleRadioChange(option)}
                      className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-colors ${miniQuizAnswers[question.id] === option
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:bg-green-300 hover:bg-green-50"
                        }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${miniQuizAnswers[question.id] === option ? "border-green-500 bg-green-500" : "border-gray-300"
                          }`}
                      >
                        {miniQuizAnswers[question.id] === option && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <span className="flex-1 text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        const currentAnswers = (miniQuizAnswers[question.id] as string[]) || []
                        const isChecked = currentAnswers.includes(option)
                        handleCheckboxChange(option, !isChecked)
                      }}
                      className="flex items-center space-x-3 p-4 rounded-xl border hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${((miniQuizAnswers[question.id] as string[]) || []).includes(option)
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                          }`}
                      >
                        {((miniQuizAnswers[question.id] as string[]) || []).includes(option) && (
                          <div className="text-white text-xs">✓</div>
                        )}
                      </div>
                      <span className="flex-1 text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="mt-8 space-y-4">
                <Button
                  onClick={handleNext}
                  disabled={!isValidAnswer()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base sm:text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {miniQuizStep === 4 ? "Учтем в плане" : "Next"}
                </Button>

                <div className="text-center">
                  <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700 text-sm underline">
                    Skip
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderPreMainQuizIntroPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto py-10">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>

        <div className="relative">
          <div className="hidden sm:flex absolute -top-7 right-2 items-center gap-2 text-sm lg:text-base text-gray-500">
            <Timer className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" strokeWidth={2} />
            <span>2 минуты</span>
          </div>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-6 sm:p-8">
              <div className="sm:hidden flex items-center justify-end gap-1 text-xs text-gray-500 mb-2">
                <Timer className="w-4 h-4 text-gray-400" strokeWidth={1.75} />
                <span>2 минуты</span>
              </div>

              <div className="text-center">

                <PlanPreviewLocked />

                {/* --- ИЗМЕНЕНИЕ: Заголовок теперь здесь, ПОД планом --- */}
                <h2 className="text-2xl font-bold text-gray-800 mt-6">
                  Осталось ответить на пару коротких вопросов
                </h2>

                <div className="mt-6 text-left rounded-xl border border-green-200 bg-green-50 px-5 py-4">
                  <div className="flex items-start gap-4">
                    <Gift className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        После опроса — персональный <span className="whitespace-nowrap">14-дневный план</span>
                      </p>
                      <ul className="mt-3 space-y-2 text-gray-700 text-base">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                          <span>Питание: пошаговые рекомендации на каждый день</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                          <span>Простые привычки и персональные советы</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                          <span>Поддержка и напоминания</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentStep(5)}
                  className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 text-sm sm:text-base"
                >
                  Перейти к вопросам и получить план
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderEatingSummaryPage = () => {
    const summaryKey = eatingProfileSummaryKey || 'mixed';
    const content = eatingHabitActions[summaryKey];

    const handleContinue = () => {
      if (isPlanApplied) return;
      setIsPlanApplied(true);
      setTimeout(() => {
        setShowFact(false);
        setCurrentQuizStep(3);
        setIsPlanApplied(false);
      }, 1500);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        {/* ИЗМЕНЕНИЕ: Убрали py-10 и добавили pt-12 для умеренного отступа сверху */}
        <div className="max-w-2xl mx-auto pt-12">
          {/* ИЗМЕНЕНИЕ: Пустой div с классом py-8 был полностью удален */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0 sm:p-0">

              <Image
                src={content.imageSrc}
                alt="Habit illustration"
                width={600}
                height={400}
                className="w-full h-56 object-contain"
              />

              <div className="border-t border-gray-100"></div>

              <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-gray-50/50">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                  {content.title}
                </h2>

                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Рекомендация</h3>
                    <p className="text-base text-gray-800 leading-relaxed mt-2">{content.habit}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваша цель на неделю</h3>
                    <p className="text-base text-gray-800 leading-relaxed mt-2">{content.goal}</p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">
                    {content.rationale}
                  </p>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={isPlanApplied}
                  className={`w-full mt-6 text-white py-3 text-base sm:text-lg rounded-full transition-all duration-300 ${isPlanApplied ? "bg-emerald-500" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isPlanApplied ? (
                    <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5" /> Учтем в плане!</span>
                  ) : ("Применить в плане")}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">{content.promise}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderLifestyleSummaryPage = () => {
    const summaryKey = lifestyleProfileSummaryKey || 'mixed';
    const content = lifestyleHabitActions[summaryKey];

    const handleContinue = () => {
      if (isPlanApplied) return;
      setIsPlanApplied(true);
      setTimeout(() => {
        setShowLifestyleSummary(false);
        setCurrentQuizStep(7);
        setIsPlanApplied(false);
      }, 1500);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        {/* ИЗМЕНЕНИЕ: Убрали py-10 и добавили pt-12 для умеренного отступа сверху */}
        <div className="max-w-2xl mx-auto pt-12">
          {/* ИЗМЕНЕНИЕ: Пустой div с классом py-8 был полностью удален */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0 sm:p-0">

              <Image
                src={content.imageSrc}
                alt="Lifestyle illustration"
                width={600}
                height={400}
                className="w-full h-56 object-contain"
              />

              <div className="border-t border-gray-100"></div>

              <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-gray-50/50">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                  {content.title}
                </h2>

                <div className="space-y-4">
                  <div className="bg-sky-50 p-4 rounded-xl border-l-4 border-sky-400 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Рекомендация</h3>
                    <p className="text-base text-gray-800 leading-relaxed mt-2">{content.habit}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваша цель на неделю</h3>
                    <p className="text-base text-gray-800 leading-relaxed mt-2">{content.goal}</p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">
                    {content.rationale}
                  </p>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={isPlanApplied}
                  className={`w-full mt-6 text-white py-3 text-base sm:text-lg rounded-full transition-all duration-300 ${isPlanApplied ? "bg-emerald-500" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isPlanApplied ? (
                    <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5" /> Добавлено!</span>
                  ) : ("Добавить в мой план")}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">{content.promise}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAttemptsSummaryPage = () => {
    const summaryKey = attemptsProfileSummaryKey || 'mixed';
    const content = attemptsHabitActions[summaryKey];

    const handleContinue = () => {
      if (isPlanApplied) return;
      setIsPlanApplied(true);
      setTimeout(() => {
        setShowAttemptsSummary(false);
        setCurrentStep(12);
        setIsPlanApplied(false);
      }, 1500);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        {/* ИЗМЕНЕНИЕ: Убрали py-10 и добавили pt-12 для умеренного отступа сверху */}
        <div className="max-w-2xl mx-auto pt-12">
          {/* ИЗМЕНЕНИЕ: Пустой div с классом py-8 был полностью удален */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0 sm:p-0">

              <Image
                src={content.imageSrc}
                alt="Approach illustration"
                width={600}
                height={400}
                className="w-full h-56 object-contain"
              />

              <div className="border-t border-gray-100"></div>

              <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-gray-50/50">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                  {content.title}
                </h2>

                <div className="space-y-4">
                  <div className="bg-violet-50 p-4 rounded-xl border-l-4 border-violet-400 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваш новый подход</h3>
                    <p className="text-base text-gray-800 leading-relaxed mt-2">{content.habit}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваша первая цель</h3>
                    <p className="text-base text-gray-800 leading-relaxed mt-2">{content.goal}</p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">
                    {content.rationale}
                  </p>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={isPlanApplied}
                  className={`w-full mt-6 text-white py-3 text-base sm:text-lg rounded-full transition-all duration-300 ${isPlanApplied ? "bg-emerald-500" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isPlanApplied ? (
                    <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5" /> Добавлено!</span>
                  ) : ("Добавить в мой план")}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">{content.promise}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderQuizQuestion = () => {
    const question = quizQuestions[currentQuizStep];
    if (!question) return null;

    if (showFact) return renderEatingSummaryPage();
    if (showLifestyleSummary) return renderLifestyleSummaryPage();
    if (showAttemptsSummary) return renderAttemptsSummaryPage();

    // Новая, упрощенная логика выбора ответа
    const onSelectAnswer = (q: Question, optionText: string) => {
      const insight = attemptInsights[q.id]?.[optionText];

      // Сразу записываем ответ в любом случае
      recordAnswer(q.id, optionText, q.category);

      if (insight) {
        // Если есть подсказка -> просто показать её и ждать нажатия кнопки внутри
        setExpandedInsight({ questionId: q.id, answer: optionText });
      } else {
        // Если подсказки нет -> СРАЗУ переходим к следующему шагу
        advanceToNextStep();
      }
    };

    // Новая функция для кнопки в подсказке
    const handleAddToPlanAndAdvance = () => {
      setIsInsightAdded(true);
      advanceToNextStep();
    }

    const handleOtherClick = () => {
      const randomMessage = confirmationMessages[Math.floor(Math.random() * confirmationMessages.length)];
      setShowConfirmation(randomMessage);

      setTimeout(() => {
        recordAnswer(question.id, "None of the above", question.category, 'n');
        setShowConfirmation(null);
        advanceToNextStep();
      }, 1200);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4 relative overflow-hidden">
        {showConfirmation && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-fade-in-out">
            {showConfirmation}
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          {/* ИЗМЕНЕНИЕ: Уменьшили отступ с py-8 до py-4 */}
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso: {Math.round(getQuizProgress())}%</span>
              <span>{currentQuizStep + 1}/10</span>
            </div>
            <div className="flex gap-1 h-2">
              {/* Прогресс-бар без изменений */}
              <div className="flex-[3] bg-gray-200 rounded-l-full overflow-hidden">
                <div className="h-full bg-green-600 transition-all duration-300 ease-out" style={{ width: currentQuizStep < 3 ? `${(currentQuizStep / 3) * 100}%` : "100%" }}></div>
              </div>
              <div className="flex-[4] bg-gray-200 overflow-hidden">
                <div className="h-full bg-green-600 transition-all duration-300 ease-out" style={{ width: currentQuizStep < 3 ? "0%" : currentQuizStep < 7 ? `${((currentQuizStep - 3) / 4) * 100}%` : "100%" }}></div>
              </div>
              <div className="flex-[3] bg-gray-200 rounded-r-full overflow-hidden">
                <div className="h-full bg-green-600 transition-all duration-300 ease-out" style={{ width: currentQuizStep < 7 ? "0%" : `${((currentQuizStep - 7) / 3) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="font-semibold text-green-600 text-2xl mb-5">{getSectionTitle()}</h2>
                <h3 className="font-medium text-gray-800 leading-relaxed text-lg">{question.question}</h3>
                <p className="text-sm text-gray-500 mt-2">(Выберите наиболее близкий вариант)</p>
              </div>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const isSelected = expandedInsight?.answer === option.text;
                  const insightData = attemptInsights[question.id]?.[option.text];

                  return (
                    <div key={index}>
                      <div
                        onClick={() => onSelectAnswer(question, option.text)}
                        className={`flex items-center gap-4 p-4 border-2 rounded-3xl cursor-pointer transition-all ${isSelected ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-green-300 hover:bg-green-50"}`}
                      >
                        <div className="text-2xl">{option.emoji}</div>
                        <span className="text-gray-700 flex-1">{option.text}</span>
                      </div>

                      {/* ИЗМЕНЕНИЕ: Блок с подсказкой теперь имеет одну кнопку, которая переключает на следующий шаг */}
                      {isSelected && insightData && (
                        <div className="mt-2 p-4 bg-green-50 border-t-2 border-green-200 rounded-b-3xl animate-accordion-down">
                          <h4 className="font-bold text-green-800">{insightData.title}</h4>
                          <p className="text-sm text-gray-700 mt-1 mb-4">{insightData.solution}</p>
                          <Button
                            onClick={handleAddToPlanAndAdvance}
                            size="sm"
                            className="w-full text-xs sm:text-sm rounded-full bg-white text-green-700 border border-green-200 hover:bg-green-100"
                          >
                            <span className="flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              <span>Добавить в мой план и продолжить</span>
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div
                  onClick={handleOtherClick}
                  className={`flex items-center gap-4 p-4 border-2 rounded-3xl cursor-pointer transition-all border-gray-200 hover:border-green-300 hover:bg-green-50`}
                  style={{ pointerEvents: showConfirmation ? 'none' : 'auto' }}
                >
                  <div className="text-2xl">🤔</div>
                  <span className="text-gray-700 flex-1">Другое</span>
                </div>
              </div>

              {/* Блок с кнопкой "Далее" полностью удален */}

            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderTransitionPage = () => {
    const options = [
      "Надела бы любимое платье, в которое уже не влезаю",
      "Сходила бы в бассейн или поехала на пляж, чтобы поплавать в бикини",
      "Поиграла бы с детьми в догонялки",
      "Выделила бы время досугу и обошла любимые улицы города пешком",
      "Начала бы жить более активной жизнью",
      "Начала бы жить",
    ];

    const handleSelection = (option: string) => {
      setFinalGoals((prev) => {
        if (prev.includes(option)) {
          // Если уже выбран - убираем
          return prev.filter((item) => item !== option);
        } else {
          // Если не выбран - добавляем
          return [...prev, option];
        }
      });
    };

    const handleNext = () => {
      // Сохраняем все выбранные ответы как один, через запятую
      const combinedAnswer = finalGoals.join(", ");
      analyzeAnswers([...answers, { questionId: "final-goal", answer: combinedAnswer, category: "goal" }]);
      // ИЗМЕНЕНИЕ: Пропускаем шаг 13 и переходим сразу к шагу 14
      setCurrentStep(14);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="font-semibold text-green-600 text-2xl mb-5">Последний вопрос</h2>
                <h3 className="font-medium text-gray-800 leading-relaxed text-lg">
                  Если бы у вас был вес вашей мечты, что бы вы сделали?
                </h3>
                <p className="text-sm text-gray-500 mt-2">(Можно выбрать несколько вариантов)</p>
              </div>

              {/* Checkbox Options */}
              <div className="space-y-4">
                {options.map((option, index) => {
                  const isSelected = finalGoals.includes(option);
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelection(option)}
                      className={`flex items-center gap-4 p-4 border-2 rounded-3xl cursor-pointer transition-all ${isSelected ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-green-300 hover:bg-green-50"}`}
                    >
                      <div className={`w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-gray-700 flex-1 ${option.includes("жить") && !option.includes("активной") ? "font-bold" : ""}`}>{option}</span>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="mt-8">
                <Button
                  onClick={handleNext}
                  disabled={finalGoals.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base sm:text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Перейти к рекомендациям
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // --- НАЧАЛО: НОВАЯ СТРАНИЦА БЛАГОДАРНОСТИ ---
  const renderThankYouPage = () => {
    if (!orderDetails) return null; // Защита на случай, если данных нет

    const [timer, setTimer] = React.useState(120); // 2 минуты в секундах

    React.useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const whatsappLink = `https://wa.me/${orderDetails.phone.replace(/\D/g, '')}`;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Спасибо за ваш заказ, {orderDetails.name}!</h1>
              <p className="text-gray-600 mt-2">Ваш путь к здоровью и красоте начался!</p>

              <div className="mt-8 space-y-4 text-left">
                {/* Блок подтверждения */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-800">Заявка №{orderDetails.orderId} получена</p>
                  <p className="text-sm text-gray-600 mt-1">Мы свяжемся с вами для подтверждения в течение 15 минут в рабочее время (10:00–20:00).</p>
                </div>

                {/* Блок WhatsApp */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-green-800">План отправлен в WhatsApp</p>
                      <p className="text-sm text-gray-700 mt-1">На номер: <strong>{orderDetails.phone}</strong></p>
                    </div>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 text-sm font-semibold flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Открыть чат
                    </a>
                  </div>
                  {/* Таймер */}
                  {timer > 0 && (
                    <div className="mt-3 text-xs text-center text-gray-500 bg-white/70 rounded-full p-1">
                      Материалы придут в течение <span className="font-mono font-semibold">{formattedTime}</span>
                    </div>
                  )}
                </div>

                {/* Дублирующая ссылка на Email */}
                <div className="text-center">
                  <button className="text-sm text-gray-500 hover:text-green-600 underline flex items-center gap-1 mx-auto">
                    <Mail className="w-4 h-4" />
                    Отправить копию на email
                  </button>
                </div>

                {/* FAQ */}
                <div className="pt-4 text-sm">
                  <details className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <summary className="font-semibold cursor-pointer">Что делать, если сообщение не пришло?</summary>
                    <p className="mt-2 text-gray-600">Проверьте, правильно ли указан номер. Если всё верно, подождите 5 минут. Иногда бывают задержки. Если ничего не придет, наш оператор поможет при звонке.</p>
                  </details>
                  <details className="mt-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <summary className="font-semibold cursor-pointer">Как изменить номер или данные заказа?</summary>
                    <p className="mt-2 text-gray-600">Просто сообщите об этом оператору, когда он с вами свяжется для подтверждения заказа. Он внесет все необходимые изменения.</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderOfferPage = () => {
    // --- ДАННЫЕ ДЛЯ СТРАНИЦЫ ---
    const userGoal = finalGoals.length > 0 ? finalGoals[0] : "Начала бы жить";
    const dynamicTitlePart = (motivationContent[userGoal]?.title || "Ваш путь к мечте")
      .replace("Вот как", "Ваш путь к тому, чтобы");
    const dynamicHeadline = `${dynamicTitlePart} — начинается здесь.`;

    const buildSubtitle = () => {
      const parts = new Set<string>();
      if (eatingProfileSummaryKey) parts.add(subtitleKeywords.eating[eatingProfileSummaryKey]);
      if (lifestyleProfileSummaryKey) parts.add(subtitleKeywords.lifestyle[lifestyleProfileSummaryKey]);
      if (attemptsProfileSummaryKey) parts.add(subtitleKeywords.attempts[attemptsProfileSummaryKey]);
      return Array.from(parts).join(', ');
    };

    const getWhyItSuitsYouPoints = () => {
      const points = [];
      if (eatingProfileSummaryKey) points.push(whyItSuitsYouMapping.eating[eatingProfileSummaryKey]);
      if (lifestyleProfileSummaryKey) points.push(whyItSuitsYouMapping.lifestyle[lifestyleProfileSummaryKey]);
      if (attemptsProfileSummaryKey) points.push(whyItSuitsYouMapping.attempts[attemptsProfileSummaryKey]);
      return points;
    };
    const whyItSuitsYouPoints = getWhyItSuitsYouPoints();

    let effectKey: keyof typeof comprehensiveEffectContent = 'mixed';
    if (eatingProfileSummaryKey === 'a' && lifestyleProfileSummaryKey === 'a' && attemptsProfileSummaryKey === 'a') {
      effectKey = 'all_a';
    } else if (eatingProfileSummaryKey === 'b' && lifestyleProfileSummaryKey === 'b' && attemptsProfileSummaryKey === 'b') {
      effectKey = 'all_b';
    } else if (eatingProfileSummaryKey === 'c' && lifestyleProfileSummaryKey === 'c' && attemptsProfileSummaryKey === 'c') {
      effectKey = 'all_c';
    }
    const dynamicEffectText = comprehensiveEffectContent[effectKey];

    const getSafetyKey = () => {
      const conditions = (miniQuizAnswers.conditions as string[]) || [];
      const meds = (miniQuizAnswers.meds as string) || '';
      if (conditions.includes('High blood pressure')) return 'high_pressure';
      if (conditions.includes('Prediabetes / type 2 diabetes')) return 'diabetes';
      if (meds === 'Hormonal contraceptives') return 'contraceptives';
      if (conditions.includes('PCOS')) return 'pcos';
      return 'default';
    };
    const dynamicSafetyText = safetyContent[getSafetyKey()];
    
    const objections = [
      { icon: Leaf, title: "100% натуральный состав", text: "Только растительные компоненты — без гормонов, химии и привыкания. Это особенно важно, если вы ищете безопасное решение." },
      { icon: HeartPulse, title: "Безопасно и совместимо", text: dynamicSafetyText },
      { icon: ThumbsUp, title: "Комплексный эффект", text: dynamicEffectText },
      { icon: Check, title: "Гарантированные результаты", text: "При соблюдении всех рекомендаций вы начинаете видеть изменения уже через 7–10 дней, что подтверждается отзывами наших клиенток." },
    ];
    
    // ✅ НАЧАЛО: НОВАЯ ЛОГИКА ДЛЯ ДИНАМИЧЕСКИХ СПИСКОВ
    const dynamicPlanList = React.useMemo(() => {
        const list = [];
        if (eatingProfileSummaryKey && planContentDatabase.eating[eatingProfileSummaryKey]) {
            list.push(planContentDatabase.eating[eatingProfileSummaryKey]);
        }
        if (lifestyleProfileSummaryKey && planContentDatabase.lifestyle[lifestyleProfileSummaryKey]) {
            list.push(planContentDatabase.lifestyle[lifestyleProfileSummaryKey]);
        }
        if (attemptsProfileSummaryKey && planContentDatabase.attempts[attemptsProfileSummaryKey]) {
            list.push(planContentDatabase.attempts[attemptsProfileSummaryKey]);
        }
        return list.length > 0 ? list : ["Простые и сытные перуанские блюда на 20-30 минут."];
    }, [eatingProfileSummaryKey, lifestyleProfileSummaryKey, attemptsProfileSummaryKey]);

    const dynamicHandbookList = React.useMemo(() => {
        const list = [];
        if (lifestyleProfileSummaryKey && handbookContentDatabase.lifestyle[lifestyleProfileSummaryKey]) {
            list.push(handbookContentDatabase.lifestyle[lifestyleProfileSummaryKey]);
        }
         if (eatingProfileSummaryKey && handbookContentDatabase.eating[eatingProfileSummaryKey]) {
            list.push(handbookContentDatabase.eating[eatingProfileSummaryKey]);
        }
        if (desiredShape && shapeMapping[desiredShape]) {
            list.push(`Конкретные шаги, как прийти к <strong>${shapeMapping[desiredShape].toLowerCase()}</strong> фигуре.`);
        } else {
            list.push("Советы по достижению фигуры вашей мечты.");
        }
        return list;
    }, [eatingProfileSummaryKey, lifestyleProfileSummaryKey, desiredShape]);
    // ✅ КОНЕЦ НОВОЙ ЛОГИКИ

    const testimonials = [
      {
        isExpert: true,
        name: "Д-р Елена Рохас, Нутрициолог",
        quote: "Я рекомендую Esbelita своим пациенткам, которые борются со стрессом и гормональными колебаниями. Состав нацелен на первопричины, а не на симптомы, что обеспечивает безопасный и стабильный результат.",
        stars: 5,
        img: ShieldCheck
      },
      { name: "Мария, 34, Лима", quote: "Похудела на 4.2 кг в первый месяц, не чувствуя себя обделенной. План простой, и я наконец-то контролирую тягу к сладкому.", stars: 5, img: "/avatars/1-ar.jpg", orderId: "3108B" },
      { name: "Кармен, 41, Арекипа", quote: "Безопасно с моими лекарствами от гипертонии (проверила состав с врачом). Видимые изменения уже через 10 дней.", stars: 5, img: "/avatars/2-ar.jpg", orderId: "2911C" },
      { name: "София, 29, Куско", quote: "Главное — ушла отечность и появилась энергия! Вес уходит медленно, но стабильно, и я чувствую себя прекрасно.", stars: 4, img: "/avatars/3-ar.jpg", orderId: "4502A" },
    ];

    const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();
      setOrderDetails({ name, phone, email, orderId });
      setCurrentStep(18);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg ring-1 ring-black/5 p-6 md:p-8 space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center leading-tight">
              {dynamicHeadline}
            </h1>

            <div className="text-center">
              <p className="text-base sm:text-lg text-gray-800">Мы проанализировали ваши ответы и подготовили решение, которое учитывает: <br /> <span className="font-bold text-green-700">{buildSubtitle()}</span>.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {objections.map(item => (
                <div key={item.title} className="flex items-start gap-3 bg-green-50/70 p-4 rounded-xl border border-green-100">
                  <item.icon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-gray-100 rounded-xl aspect-square w-full max-w-sm mx-auto md:max-w-none flex items-center justify-center">
                    <Leaf className="w-24 h-24 text-gray-300"/>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-xl text-gray-800">Ключевые факты о "Esbelita Natural":</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1"/>
                            <span className="text-gray-700">Разработано в Перу с учетом местных особенностей питания и образа жизни.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1"/>
                            <span className="text-gray-700">Не "сжигает" жир принудительно, а помогает организму мягко нормализовать обмен веществ.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1"/>
                            <span className="text-gray-700">Прошел добровольную сертификацию качества и безопасности.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1"/>
                            <span className="text-gray-700">Всего 2 капсулы в день для эффективной поддержки вашего плана питания.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Почему этот подход подходит именно вам</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {whyItSuitsYouPoints.map((point, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Ваша проблема</p>
                    <p className="text-base font-bold text-gray-800 my-2">{point.problem}</p>
                    <div className="w-16 h-[1px] bg-green-200 mx-auto my-3"></div>
                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">Наше решение</p>
                    <p className="text-sm text-gray-700 mt-2">{point.solution}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* ✅ ИЗМЕНЕНИЕ: Списки теперь динамические */}
            <div className="text-center">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-8 h-8 text-green-700 flex-shrink-0" />
                    <h3 className="font-bold text-lg text-green-800">Что будет в вашем плане</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    {dynamicPlanList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-8 h-8 text-green-700 flex-shrink-0" />
                    <h3 className="font-bold text-lg text-green-800">Что будет в вашей памятке</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    {dynamicHandbookList.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-2 border-green-600 rounded-xl p-5 shadow-inner bg-white">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-green-700 mb-4">Ваше персональное предложение</h2>
              <div className="mb-4">
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span>Комплекс "Esbelita Natural" + План + Памятка</span>
                  <span className="font-semibold text-gray-500 line-through">198 PEN</span>
                </div>
              </div>
              <div className="text-center bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">В благодарность за прохождение теста, мы дарим вам <b>единоразовую скидку 50%</b> на ваш первый курс.</p>
              </div>
              <div className="border-t border-b border-gray-200 py-3 text-center">
                <div className="flex justify-center items-baseline gap-2 font-semibold">
                  <span className="text-gray-800 text-base sm:text-lg">Итоговая цена:</span>
                  <span className="text-green-700 text-2xl sm:text-3xl">99 PEN</span>
                  <span className="text-gray-500 text-sm sm:text-base">(≈3.3 PEN/день)</span>
                </div>
              </div>
            </div>

            <form ref={orderFormRef} id="order-form" className="space-y-4" onSubmit={handleOrderSubmit}>
              <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800">Куда отправить план и подтверждение заказа?</h3>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Полное имя *</label>
                <input id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-sm sm:placeholder:text-base" placeholder="Введите ваше полное имя" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Номер телефона *</label>
                <input id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-sm sm:placeholder:text-base" placeholder="План питания придет на WhatsApp" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email (опционально)</label>
                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-sm sm:placeholder:text-base" placeholder="Если WhatsApp неудобен" />
              </div>
              <div className="text-xs text-gray-500 pl-4 space-y-1">
                <p>• Телефон будет использоваться для подтверждения заказа капсул.</p>
                <p>• Мы не передаем ваши данные и не рассылаем спам.</p>
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={sendSampleNow} onChange={(e) => setSendSampleNow(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">Прислать пример дня из плана питания сейчас в WhatsApp</span>
                </label>
              </div>

              <div className="pt-2 text-center">
                <Button className="w-full md:w-auto md:px-12 bg-green-600 hover:bg-green-700 text-white rounded-full py-3 sm:py-4 text-sm sm:text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
                  Заказать со скидкой
                </Button>
              </div>
            </form>

            <div className="pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Что говорят наши клиенты</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((t, i) => {
                  const IconComponent = t.isExpert ? t.img : null;
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between ${t.isExpert ? 'bg-gradient-to-br from-green-100 to-sky-100 border border-green-200' : 'bg-gradient-to-br from-green-50 to-peach-50'}`}
                    >
                      <div className="flex items-start gap-3">
                        {t.isExpert && IconComponent && <IconComponent className="w-10 h-10 text-green-700 flex-shrink-0" />}
                        {!t.isExpert && typeof t.img === 'string' && <Image src={t.img} alt={t.name} width={40} height={40} className="rounded-full" />}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-gray-800">{t.name}</p>
                          </div>
                          <p className="text-gray-700 italic leading-relaxed text-sm">“{t.quote}”</p>
                        </div>
                      </div>
                      {t.orderId && <p className="text-right text-xs text-green-700/80 mt-2">Проверено заказом №{t.orderId}</p>}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="pt-6">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Прозрачность и безопасность</h3>
                <div className="space-y-4 divide-y divide-gray-200">
                  <div className="pt-4 first:pt-0">
                    <h4 className="font-semibold text-gray-800 flex items-start sm:items-center gap-2">
                      <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />Из чего состоит Esbelita Natural:
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 mt-2 pl-4 text-sm space-y-2">
                      <li>L-Карнитин тартрат (150мг): Ускоряет транспортировку жиров.</li>
                      <li>Экстракт зеленого чая (100мг): Мощный антиоксидант.</li>
                      <li>Экстракт гуараны (75мг): Природный источник энергии.</li>
                      <li>Яблочный уксус (50мг): Помогает контролировать сахар.</li>
                      <li>Экстракт африканского манго (50мг): Снижает аппетит.</li>
                    </ul>
                  </div>
                  <div className="pt-4">
                    <h4 className="font-semibold text-gray-800 flex items-start sm:items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />Сертификаты и регистрации:
                    </h4>
                    <p className="text-gray-600 mt-2 text-sm">Продукт имеет добровольный сертификат соответствия. <a href="#" className="text-green-600 underline">Скачать PDF</a></p>
                    <p className="text-gray-600 mt-1 text-sm">Регистрационный номер: P2998419N/NAESBM</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">*Не является лекарственным средством. Перед применением рекомендуется проконсультироваться с врачом.</p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Часто задаваемые вопросы</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <details className="rounded-xl border border-gray-200 p-3"><summary className="cursor-pointer font-medium">Нужно ли соблюдать жесткую диету?</summary><p className="mt-2">Нет. Комплекс и план питания созданы, чтобы вы худели без стресса и срывов. План предлагает сытные и простые блюда, а капсулы помогают снизить тягу к вредному. Вам не придется голодать.</p></details>
                <details className="rounded-xl border border-gray-200 p-3"><summary className="cursor-pointer font-medium">Эффект временный, а вес вернется?</summary><p className="mt-2">Наш подход нацелен на изменение привычек и нормализацию обмена веществ, а не на быструю потерю воды. Это создает устойчивый результат. Памятка по привычкам поможет вам закрепить его после окончания курса.</p></details>
                <details className="rounded-xl border border-gray-200 p-3"><summary className="cursor-pointer font-medium">Я могу купить потом или в магазине?</summary><p className="mt-2">Это специальное предложение — скидка 50% и бесплатные бонусы — доступно только здесь и сейчас в благодарность за прохождение опроса. В магазинах продукт продается по полной цене и без персонального плана.</p></details>
                <details className="rounded-xl border border-gray-200 p-3"><summary className="cursor-pointer font-medium">Как-то слишком хорошо звучит, в чем подвох?</summary><p className="mt-2">Подвоха нет. Мы уверены в своем продукте и плане, поэтому готовы предложить лучшие условия тем, кто прошел опрос и серьезно настроен на результат. Ваш успех — наша лучшая реклама.</p></details>
                <details className="rounded-xl border border-gray-200 p-3"><summary className="cursor-pointer font-medium">Слишком дорого...</summary><p className="mt-2">Стоимость курса на месяц со скидкой — 99 PEN. Это всего около 3.3 PEN в день. За эту цену вы получаете не просто капсулы, а комплексное решение с планом питания и памяткой, что гораздо выгоднее, чем одна консультация у диетолога.</p></details>
                <details className="rounded-xl border border-gray-200 p-3"><summary className="cursor-pointer font-medium">Есть ли противопоказания?</summary><p className="mt-2">Не рекомендуется принимать при беременности, кормлении грудью, а также при индивидуальной непереносимости компонентов. Если у вас есть хронические заболевания, проконсультируйтесь с врачом перед началом курса.</p></details>
              </div>
            </div>

            <div className="pt-8 text-center bg-gradient-to-t from-green-50 rounded-2xl p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Вы дочитали до конца. Это значит, вы действительно готовы к переменам.</h3>
              <a href="#order-form" className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white rounded-full py-2 px-8 sm:py-3 sm:px-12 text-sm sm:text-base font-semibold shadow-lg transition-transform transform hover:scale-105">
                Да, я готова! Вернуться к форме заказа
              </a>
            </div>
          </div>

          <footer className="text-center text-sm text-gray-500 py-10">
            <p className="text-xs text-gray-400">Этот продукт не был оценен DIGEMID. Индивидуальные результаты могут отличаться. Не заменяет консультацию врача.</p>
          </footer>
        </div>
      </div>
    );
  };

// Main render logic
const CurrentPageComponent = () => {
  if (currentStep === 0) return renderLandingPage()
  if (currentStep === 1) {
    if (showBMIPage) {
      return renderBMIPage()
    }
    return renderBasicsPage()
  }
  if (currentStep === 2) return renderPreQuestionnaireIntroPage()
  if (currentStep === 3) return renderMiniQuestionPage()
  if (currentStep === 4) return renderPreMainQuizIntroPage()
  if (currentStep === 5) return renderQuizQuestion()
  if (currentStep === BODY_SHAPE_STEP) return renderBodyShapeStep()
  if (currentStep === 12) return renderTransitionPage()
  // Шаг 13 удален
  if (currentStep === 14) return renderFinalResultsPage()
  if (currentStep === 16) return <LoadingPage onComplete={() => setCurrentStep(17)} />
  if (currentStep === 17) return renderOfferPage()
  if (currentStep === 18) return renderThankYouPage()
  return null;
};

return (
  <>
    <CurrentPageComponent />
    <StickyCta isVisible={isCtaVisible && currentStep === 17} />
  </>
);
};
