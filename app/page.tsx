"use client"

import { useState, useEffect } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Leaf, Users, Clock, Shield, Gift, CheckCircle2, Lock, ShieldCheck, Check, HeartPulse, TrendingUp, ThumbsUp, BookOpen, CalendarCheck, Lightbulb, Target, Sparkles, MessageSquare, Loader2, Edit3, Timer, Mail, ClipboardCheck, Flame } from "lucide-react"
import Image from "next/image"
import { IMaskInput } from 'react-imask';

function QuizHeader() {
  return (
    // Этот div теперь имеет меньше отступов и выравнивает всё по левому краю
    // py-2 -> маленький отступ сверху/снизу (padding-top и padding-bottom)
    // px-4 -> небольшой отступ по бокам, чтобы текст не прилипал к краю экрана
    <div className="py-2 px-4">
      {/* justify-start -> прижать к левому краю (раньше было justify-center)
        gap-1.5 -> уменьшили зазор между иконкой и текстом
      */}
      <div className="flex items-center justify-start gap-1.5">
        {/* w-6 h-6 -> сделали иконку-сердечко меньше (width и height) */}
        <Heart className="w-6 h-6 text-green-600" />
        {/* text-xl -> сделали текст "NaturalSlim" меньше (размер шрифта) */}
        <span className="text-xl font-bold text-gray-800">NaturalSlim</span>
      </div>
    </div>
  );
}

function ScrollFade() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"
    />
  );
}

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

        <div className="relative p-4 sm:p-5 blur-sm select-none pointer-events-none">
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
              "Сон: цель 7–8 часов, без гаджетов за 60 мин", // <-- ВОТ ЭТОТ ПУНКТ МЫ ВЕРНУЛИ
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                <CheckCircle2 className="h-4 w-4 text-gray-400" />
                <span className="text-[13px] text-gray-700">{t}</span>
              </div>
            ))}
          </div>

          {/* БЛОК «СЕГОДНЯ: 3 ШАГА» ПО-ПРЕЖНЕМУ УДАЛЁН */}

        </div>

        {/* лёгкая «вуаль» для усиления эффекта замка */}
        <div className="pointer-events-none absolute inset-0 bg-white/20" />
      </div>
    </div>
  )
}

// Компонент для мобильного "пуш" уведомления
function MobileInsightPush({
  insightData,
  onConfirm,
  isVisible,
}: {
  insightData: { title: string; solution: string };
  onConfirm: () => void;
  isVisible: boolean;
}) {
  return (
    // 👇 НОВЫЙ БЛОК: Полупрозрачный фон с размытием на весь экран
    <div
      className={`
        fixed inset-0 z-50 flex items-end justify-center p-4
        transition-opacity duration-300 ease-in-out block sm:hidden
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} // Управляем затемнением через стиль
    >
      {/* 👇 ИЗМЕНЕНИЕ: Сама карточка теперь с градиентом и новой анимацией */}
      <div
        className={`
          w-full rounded-2xl shadow-2xl border border-gray-200/50
          bg-gradient-to-br from-green-50 to-white p-4
          transition-all duration-300 ease-in-out transform
          ${isVisible ? "translate-y-0" : "translate-y-12"}
        `}
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }} // Добавляем размытие фона
      >
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full ring-4 ring-white">
            <Lightbulb className="w-5 h-5 text-green-600" />
          </div>
          {/* 👇 ИЗМЕНЕНИЕ: Добавили min-w-0 для исправления текста */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-800 break-words">{insightData.title}</h4>
            <p className="text-sm text-gray-600 mt-1 mb-4 break-words">{insightData.solution}</p>
            <Button
              onClick={onConfirm}
              size="sm"
              className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold text-sm shadow-md"
            >
              <span className="flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <span>Добавить в мой план</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
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
          className="w-full text-center bg-transparent border-none focus:ring-0 focus:outline-none py-3 text-base"
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

const StickyCta = ({ isVisible, variant = 'full' }: { isVisible: boolean, variant?: 'full' | 'simplified' }) => {
  if (!isVisible) return null;

  // Определяем текст в зависимости от варианта
  const mainText = variant === 'full'
    ? "Ваш полный пакет:"
    : "Ваш заказ:";

  const subText = variant === 'full'
    ? "Курс капсул + План питания + Памятка"
    : "Курс капсул со скидкой 50%";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 animate-slide-up">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="text-sm min-w-0">
          <p className="font-semibold text-gray-800">{mainText}</p>
          <p className="text-xs text-gray-600">{subText}</p>
        </div>
        <a
          href="#order-form"
          className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-lg text-center whitespace-nowrap"
        >
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
      <div className="absolute top-0 left-0 right-0">
        <QuizHeader />
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
      { text: "Салат с курицей гриль, киноа и заправленный оливковым маслом", emoji: "🥗" },
      { text: "Небольшой перекус, крекеры, снеки", emoji: "🍪" },
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
    question: "Как лишний вес уже влияет на ваше самочувствие?",
    options: [
      { text: "Уже есть диагнозы: холестерин, давление, преддиабет", emoji: "🚨" },
      { text: "Часто болит спина/колени, бывают отеки", emoji: "😰" },
      { text: "Чувствую постоянную усталость и одышку при ходьбе", emoji: "😮‍💨" },
      { text: "Пока ничего из перечисленного", emoji: "✅" },
    ],
  },
  {
    id: "lifestyle-2",
    category: "lifestyle",
    question: "Тяжелый день: усталость, стресс. Как вы расслабляетесь вечером?",
    options: [
      { text: "Заказываю сытный ужин (курицу, пиццу) и десерт", emoji: "🍗" },
      { text: "Смотрю ТВ со сладостями или снеками", emoji: "📺" },
      { text: "Раздражаюсь на всех, а потом съедаю лишнего", emoji: "😤" },
      { text: "Мне такая проблема не знакома", emoji: "🤷‍♀️" },
    ],
  },
  {
    id: "lifestyle-3",
    category: "lifestyle",
    question: "Как обычно выглядит ваш сон в будний день?",
    options: [
      { text: "Ложусь очень поздно, встаю очень рано, сна мало", emoji: "🌙" },
      { text: "Сон прерывистый, часто просыпаюсь разбитой", emoji: "😴" },
      { text: "Ложусь поздно, сплю до обеда, весь день в спешке", emoji: "😰" },
      { text: "Сплю мало из-за работы и дел, не хватает времени на себя", emoji: "⏰" },
    ],
  },
  {
    id: "lifestyle-4",
    category: "lifestyle",
    question: "Что вам больше всего мешает начать больше двигаться?",
    options: [
      { text: "Тяжесть в ногах, отеки и боль в пояснице", emoji: "🦵" },
      { text: "Нет сил после работы и домашних дел", emoji: "😴" },
      { text: "Стесняюсь своей фигуры в спортивной одежде", emoji: "😔" },
      { text: "Иду гулять, несмотря на усталость", emoji: "💪" },
    ],
  },
  // Previous Attempts Section (3 questions)
  {
    id: "attempts-1",
    category: "attempts",
    question: "Вы решили начать тренироваться дома. Что обычно происходит дальше?",
    options: [
      { text: "Начинаю, но быстро бросаю из-за усталости и отсутствия результата.", emoji: "😔" },
      { text: "Боль в суставах или одышка мешают продолжать.", emoji: "😰" },
      { text: "Откладываю 'на завтра', которое не наступает.", emoji: "📱" },
      { text: "Смогу заниматься стабильно, пока не увижу первые результаты.", emoji: "💪" },
    ],
  },
  {
    id: "attempts-2",
    category: "attempts",
    question: "Когда вы садитесь на диету, что чаще всего идёт не так?",
    options: [
      { text: "Срываюсь в конце тяжелого дня, а потом виню себя.", emoji: "😔" },
      { text: "Держусь всю неделю, но 'отрываюсь' на выходных.", emoji: "🍽️" },
      { text: "Теряю мотивацию, если быстро не вижу результат.", emoji: "🤷‍♀️" },
      { text: "Удерживаюсь без срывов.", emoji: "💪" },
    ],
  },
  {
    id: "attempts-3",
    category: "attempts",
    question: "Что, по-вашему, нужно, чтобы сдвинуться с мёртвой точки?",
    options: [
      { text: "Простое 'волшебное' средство: капсулы или напиток.", emoji: "💊" },
      { text: "Понятный план, который можно встроить в мою жизнь.", emoji: "📋" },
      { text: "Знаю, что делать (питание, сон), но не знаю, как всё совместить.", emoji: "🤔" },
      { text: "Хочу получить рекомендации, подходящие моему образу жизни.", emoji: "✨" },
    ],
  },
]

const reassuranceMessages: Record<string, Record<string, string>> = {
  "attempts-1": {
    "Начинаю, но быстро бросаю из-за усталости и отсутствия результата.":
      "Это абсолютно нормально! Большинство женщин сталкиваются с теми же трудностями. Главное — найти подход, который подойдет именно вам.",
    "Боль в суставах или одышка мешают продолжать.":
      "Ваше тело подает важные сигналы. Есть множество щадящих способов начать движение без боли и дискомфорта.",
    "Откладываю 'на завтра', которое не наступает.":
      "Откладывание — это защитная реакция психики. Мы поможем найти способ начать без стресса и самокритики.",
  },
  "attempts-2": {
    "Срываюсь в конце тяжелого дня, а потом виню себя.":
      "Эмоциональное переедание — это не недостаток силы воли, а естественная реакция на стресс. Это можно изменить с правильным подходом.",
    "Держусь всю неделю, но 'отрываюсь' на выходных.":
      "Цикл ограничений и срывов знаком многим. Секрет в том, чтобы найти баланс, при котором любимые блюда не станут запретными.",
    "Теряю мотивацию, если быстро не вижу результат.":
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
    "Начинаю, но быстро бросаю из-за усталости и отсутствия результата.": {
      title: "Усталость — главный враг мотивации.",
      solution: "Наш план начнется с восстановления энергии через питание, а не с изнурительных тренировок. Это даст силы для стабильного движения вперед.",
    },
    "Боль в суставах или одышка мешают продолжать.": {
      title: "Боль — это сигнал стоп. Начинать нужно не с тренировок.",
      solution: "Сначала мы сфокусируемся на питании, чтобы снять лишнюю нагрузку с суставов. Это самый безопасный и эффективный путь.",
    },
    "Откладываю 'на завтра', которое не наступает.": {
      title: "Откладывание — это защитная реакция на стресс.",
      solution: "Мы предложим микро-шаги, которые занимают 2-3 минуты в день. Это уберет страх перед 'большой задачей' и поможет начать.",
    },
  },
  "attempts-2": {
    "Срываюсь в конце тяжелого дня, а потом виню себя.": {
      title: "Заедание стресса — это не отсутствие воли, а биохимия.",
      solution: "План поможет стабилизировать сахар в крови. Когда нет резких скачков голода, противостоять эмоциональному перееданию гораздо проще.",
    },
    "Держусь всю неделю, но 'отрываюсь' на выходных.": {
      title: "Цикл ограничение-срыв — самая частая проблема.",
      solution: "Мы не будем запрещать любимые блюда. План научит, как вписывать их в рацион без вреда для результата и чувства вины.",
    },
    "Теряю мотивацию, если быстро не вижу результат.": {
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
  d: {
    title: "Ваш фокус — на создании стабильной основы",
    imageSrc: "/summary/eating-d.jpg",
    habit: "Ваш рацион нерегулярен → ставим крепкую базу — утренний приём пищи.",
    goal: "Обязательный завтрак в течение 60 минут после пробуждения: белок + клетчатка.",
    rationale: "Это поможет создать метаболическую 'опору' для всего дня.",
    promise: "В плане дадим 14 простых комбинаций завтрака “5 минут — и готово”.",
  },
  mixed: {
    title: "Ваш фокус — на сбалансированном питании",
    imageSrc: "/summary/eating-mixed.jpg",
    habit: "Ваш рацион непредсказуем — добавим обязательные качественные приемы пищм.",
    goal: "Начать обедать в одно и то же время сытными блюдами с хорошим кбжу.",
    rationale: "Хороший обед формирует насыщение в течение дня и не дает сорваться вечером на что-то вредное.",
    promise: "В итоговом плане дадим 5 быстрых и сытных вариантов обеда, которые удобно брать с собой.",
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
  d: {
    title: "Ваш фокус — на энергии и закреплении успеха",
    imageSrc: "/summary/lifestyle-d.jpg", // Примечание: нужно будет добавить картинку по этому пути
    habit: "Вы уже активны и не поддаетесь стрессу. Теперь можно закрепить результат и улучшить качество тела.",
    goal: "Добавить 1 силовую мини-тренировку (5-10 мин) 3 раза в неделю.",
    rationale: "Силовые тренировки ускоряют метаболизм в состоянии покоя и формируют подтянутый силуэт.",
    promise: "В плане дадим комплекс из 3-х легких упражнений, которые можно делать дома.",
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
  d: {
    title: "Ваш подход — от хорошего к отличному",
    imageSrc: "/summary/attempts-d.jpg", // Примечание: нужно будет добавить картинку по этому пути
    habit: "У вас есть дисциплина и мотивация. Теперь можно добавить более продвинутые техники.",
    goal: "Внедрить 1 новую 'продвинутую' привычку (например, циклирование углеводов) на 7 дней.",
    rationale: "Когда база уже есть, точечные улучшения дают максимальный эффект.",
    promise: "В памятке мы кратко опишем принцип циклирования углеводов.",
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
    d: { problem: "Риск замедления метаболизма", solution: "L-Карнитин помогает эффективно использовать энергию" }, // <-- ДОБАВЛЕНО
    mixed: { problem: "Нерегулярное питание", solution: "Гуарана дает энергию и снижает потребность в перекусах" },
  },
  lifestyle: {
    a: { problem: "Высокий уровень стресса", solution: "Антиоксиданты зеленого чая борются с последствиями кортизола" },
    b: { problem: "Физическая усталость", solution: "Гуарана служит натуральным источником бодрости" },
    c: { problem: "Эмоциональный голод", solution: "Стабилизация сахара снижает импульсивную тягу к еде" },
    d: { problem: "Плато в результатах", solution: "Комплекс поддерживает тонус для более эффективных тренировок" }, // <-- ДОБАВЛЕНО
    mixed: { problem: "Нестабильный сон", solution: "Снижение стресса улучшает качество отдыха" },
  },
  attempts: {
    a: { problem: "Поиск быстрого решения", solution: "Комплекс дает заметный эффект без жёстких диет" },
    b: { problem: "Важность системы", solution: "Всего 2 капсулы в день легко встроить в любой график" },
    c: { problem: "Сложность первого шага", solution: "Мягкий старт без побочных эффектов и стимуляторов высокой дозы" },
    d: { problem: "Нужны продвинутые инструменты", solution: "Формула помогает оптимизировать результаты, когда база уже есть" }, // <-- ДОБАВЛЕНО
    mixed: { problem: "Открытость новому", solution: "Проверенная формула, которая дополняет любой здоровый план" },
  },
};

const subtitleKeywords = {
  eating: {
    a: "контроль порций",
    b: "тягу к сладкому",
    c: "скрытые калории",
    d: "стабильность рациона", // <-- ДОБАВЛЕНО
    mixed: "режим питания",
  },
  lifestyle: {
    a: "уровень стресса",
    b: "усталость",
    c: "эмоциональный голод",
    d: "закрепление результата", // <-- ДОБАВЛЕНО
    mixed: "качество сна",
  },
  attempts: {
    a: "мягкий старт",
    b: "системный подход",
    c: "лёгкое начало",
    d: "оптимизацию прогресса", // <-- ДОБАВЛЕНО
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
    d: "Принципы тайминга приемов пищи для поддержания высокого метаболизма.", // <-- ДОБАВЛЕНО
    mixed: "Структурированное меню на день для создания стабильной основы питания.",
  },
  lifestyle: {
    a: "Добавление практик для восстановления от стресса в ваш обычный день.",
    b: "Рекомендации по легкому движению, которое дает энергию, а не забирает ее.",
    c: "Техники управления эмоциональным голодом, чтобы отличать его от физического.",
    d: "Советы по добавлению силовых мини-тренировок для ускорения метаболизма.", // <-- ДОБАВЛЕНО
    mixed: "Советы по налаживанию режима сна для регуляции гормонов аппетита.",
  },
  attempts: {
    a: "Фокус на быстрых первых результатах для поддержания высокой мотивации.",
    b: "Системный подход с одной ключевой привычкой в неделю для стабильного прогресса.",
    c: "Четкий и простой первый шаг, который можно сделать сразу после получения плана.",
    d: "Продвинутые техники для тех, кто хочет не просто похудеть, а улучшить качество тела.", // <-- ДОБАВЛЕНО
    mixed: "Объединение системности с поддержкой организма для предотвращения срывов.",
  }
};

const handbookContentDatabase = {
  eating: {
    a: "Чек-лист по добавлению овощей в каждый прием пищи для большей сытости.",
    b: "Список из 5 полезных перекусов, которые всегда должны быть под рукой.",
    c: "Простая инфографика о калорийности популярных соусов.",
    d: "Памятка 'Золотые часы': лучшее время для завтрака, обеда и ужина.", // <-- ДОБАВЛЕНО
    mixed: "Формула идеального завтрака, который запускает метаболизм.",
  },
  lifestyle: {
    a: "5-минутная техника дыхания для моментального снижения уровня стресса.",
    b: "Комплекс из 3 упражнений для утренней зарядки без нагрузки на суставы.",
    c: "Техника 'паузы': что делать в момент, когда хочется 'заесть' эмоции.",
    d: "Инфографика: 3 домашних упражнения с весом своего тела для тонуса.", // <-- ДОБАВЛЕНО
    mixed: "Гайд по 'гигиене сна': как подготовиться к качественному отдыху.",
  },
  attempts: {
    a: "Метод 'недельного замера', чтобы видеть результат не только на весах.",
    b: "Трекер для отслеживания одной ключевой привычки, чтобы видеть свой прогресс.",
    c: "Правило 'первых 24 часов' для максимально эффективного старта.",
    d: "Краткое объяснение принципа 'циклирования углеводов' для продвинутых.", // <-- ДОБАВЛЕНО
    mixed: "Советы, как не сбиться с курса и что делать, если произошел срыв.",
  }
};

const testimonials = [
  {
    isExpert: true,
    name: "Д-р Елена Рохас, Нутрициолог",
    quote: "Я рекомендую Esbelita своим пациенткам, которые борются со стрессом и гормональными колебаниями. Состав нацелен на первопричины, а не на симптомы, что обеспечивает безопасный и стабильный результат.",
    img: ShieldCheck
  },
  {
    name: "Мария, 35, Лима",
    quote: "Уже пробовала чаи для похудения, но они не помогали, так что была скептически настроена. Пила 2 курса этих капсул со всеми рекомендациями и наконец перестала тянуть поясница, которая меня мучала после родов. Спасибо.",
    stars: 5,
    weightLoss: "Сбросила 5.2 кг",
    img: "/testimonials/ba-1.jpg",
    orderId: "3108B"
  },
  {
    name: "Кармен, 41, Арекипа",
    quote: "Безопасно с моими лекарствами от гипертонии (проверила состав с врачом). Видимые изменения и прилив сил уже через 10 дней. Буду рекомендовать.",
    stars: 5,
    weightLoss: "Сбросила 7.5 кг",
    img: "/testimonials/ba-2.jpg",
    orderId: "2911C"
  },
  {
    name: "София, 40, Куско",
    quote: "Моя проблема это натирание во внутренней части бедер, отеки и постоянное вздутие. Уже после одного курса, почувствовала легкость, отечность ушла и мое тело выглядит более подтянуто, пью вторую банку. Вес уходит медленно, но стабильно.",
    stars: 4.5,
    weightLoss: "Сбросила 6 кг",
    img: "/testimonials/ba-3.jpg",
    orderId: "4502A"
  },
];

// ✅ ВСТАВЬТЕ ЭТОТ КОД В ВЕРХНЮЮ ЧАСТЬ ФАЙЛА

const problemSolutionMapping: Record<string, { problem: string; solution: string }> = {
  // --- БЛОК "ПИТАНИЕ" ---
  "Яйца с жареными колбасками, тамале или пара булочек с кофе с сахаром": { problem: "Высококалорийный завтрак", solution: "Снижение аппетита" },
  "Тортильи или лепешки с начинкой: сладкой кукурузой, сыром и авокадо": { problem: "Избыток углеводов утром", solution: "Стабилизация сахара" },
  "Каша с фруктами и различными добавками": { problem: "Риск скрытого сахара", solution: "Контроль глюкозы" },
  "Ничего – с утра не хочется есть": { problem: "Пропуск завтрака", solution: "Запуск метаболизма" },
  "Жареный рис овощами, картошкой и мясом": { problem: "Тяжелый обед", solution: "Улучшение пищеварения" },
  "Сендвич с колбасками или свининой, пару эмпанад и газировка": { problem: "Много обработанной еды", solution: "Поддержка метаболизма" },
  "Небольшой перекус, крекеры, снеки": { problem: "Недостаток белка в обед", solution: "Контроль голода" },
  "Большой капучино с сиропом, тортик или пирожное": { problem: "Сахарный срыв", solution: "Снижение тяги к сладкому" },
  "Кола или чича и пару печенек": { problem: "Жидкие калории", solution: "Стабилизация энергии" },
  "Ничего, не хочу опять срываться, но потом съем что-то дома": { problem: "Цикл ограничение-срыв", solution: "Снижение стресса" },

  // --- БЛОК "ОБРАЗ ЖИЗНИ" ---
  "Уже есть диагнозы: холестерин, давление, преддиабет": { problem: "Риски для здоровья", solution: "Антиоксидантная поддержка" },
  "Часто болит спина/колени, бывают отеки": { problem: "Нагрузка на суставы", solution: "Снижение отечности" },
  "Чувствую постоянную усталость и одышку при ходьбе": { problem: "Низкий уровень энергии", solution: "Природный энергетик" },
  "Заказываю сытный ужин (курицу, пиццу) и десерт": { problem: "Вечернее переедание", solution: "Контроль аппетита" },
  "Смотрю ТВ со сладостями или снеками": { problem: "Привычка заедать скуку", solution: "Снижение тяги к сладкому" },
  "Раздражаюсь на всех, а потом съедаю лишнего": { problem: "Заедание стресса", solution: "Борьба с кортизолом" },
  "Ложусь очень поздно, встаю очень рано, сна мало": { problem: "Недостаток сна", solution: "Улучшение восстановления" },
  "Сон прерывистый, часто просыпаюсь разбитой": { problem: "Плохое качество сна", solution: "Снижение стресса" },
  "Ложусь поздно, сплю до обеда, весь день в спешке": { problem: "Нарушение циркадных ритмов", solution: "Стабилизация энергии" },
  "Сплю мало из-за работы и дел, не хватает времени на себя": { problem: "Хроническая усталость", solution: "Природный энергетик" },
  "Тяжесть в ногах, отеки и боль в пояснице": { problem: "Задержка жидкости", solution: "Снижение отечности" },
  "Нет сил после работы и домашних дел": { problem: "Эмоциональное выгорание", solution: "Поддержка энергии" },
  "Стесняюсь своей фигуры в спортивной одежде": { problem: "Низкая самооценка", solution: "Ускорение результата" },

  // --- БЛОК "МЕТОДЫ ПОХУДЕНИЯ" ---
  "Начинаю, но быстро бросаю из-за усталости и отсутствия результата.": { problem: "Быстрая потеря мотивации", solution: "Видимый эффект" },
  "Боль в суставах или одышка мешают продолжать.": { problem: "Физический дискомфорт", solution: "Снижение нагрузки" },
  "Откладываю 'на завтра', которое не наступает.": { problem: "Прокрастинация", solution: "Повышение энергии" },
  "Срываюсь в конце тяжелого дня, а потом виню себя.": { problem: "Вечерние срывы", solution: "Контроль аппетита" },
  "Держусь всю неделю, но 'отрываюсь' на выходных.": { problem: "Эффект маятника", solution: "Стабилизация сахара" },
  "Теряю мотивацию, если быстро не вижу результат.": { problem: "Нужен быстрый старт", solution: "Ускорение метаболизма" },
  "Простое 'волшебное' средство: капсулы или напиток.": { problem: "Поиск простого решения", solution: "Легкость в применении" },
  "Понятный план, который можно встроить в мою жизнь.": { problem: "Нужна система", solution: "Дополнение к плану" },
  "Знаю, что делать (питание, сон), но не знаю, как всё совместить.": { problem: "Сложность в интеграции", solution: "Простота использования" },
};

const shapeMapping: Record<string, string> = {
  Slim: "Стройную",
  Toned: "Подтянутую",
  Curvy: "С изгибами",
  Athletic: "Спортивную",
};

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

const Star = ({ filled = false, half = false }) => (
  <svg className="w-4 h-4 text-amber-400" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={
      half
        ? "M12 2v15.27l-6.18 3.25 1.18-6.88-5-4.87 6.91-1.01L12 2z" // Новый, правильный путь для левой половины звезды
        : "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    } />
  </svg>
);

// Компонент, который рисует нужное количество звёзд
const StarRating = ({ rating = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <Star key={`full_${i}`} filled />)}
      {halfStar && <Star key={`half_1`} half filled />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty_${i}`} />)}
    </div>
  );
};

// * Определяет ключ профиля ('a', 'b', 'c' или 'mixed') на основе массива ответов.
//  * @param answers Массив буквенных ответов, например ['a', 'b', 'a'].
//  * @returns Ключ профиля.
//  */
const determineProfileKey = (answers: string[]): "a" | "b" | "c" | "mixed" => {
  const counts = { a: 0, b: 0, c: 0, d: 0 };

  // Считаем только ответы 'a', 'b', 'c'
  answers.forEach(answer => {
    if (answer in counts) {
      counts[answer as 'a' | 'b' | 'c']++;
    }
  });

  // Находим максимальное количество голосов
  let maxCount = 0;
  for (const key in counts) {
    if (counts[key as 'a' | 'b' | 'c'] > maxCount) {
      maxCount = counts[key as 'a' | 'b' | 'c'];
    }
  }

  // Если нет ответов a, b, c - возвращаем mixed
  if (maxCount === 0) {
    return 'mixed';
  }

  // Находим всех "победителей" (у кого максимальное количество голосов)
  const winners = [];
  for (const key in counts) {
    if (counts[key as keyof typeof counts] === maxCount) { // <-- Исправлено
      winners.push(key);
    }
  }

  // Если победитель один - возвращаем его. Если их несколько (ничья) - возвращаем mixed.
  if (winners.length === 1) {
    return winners[0] as "a" | "b" | "c";
  } else {
    return 'mixed';
  }
};

function LandingPage({ setCurrentStep }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4 pb-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* ИЗМЕНЕНИЕ: Уменьшили отступ с py-8 до py-4 */}
        <QuizHeader />

        {/* Hero Section */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-6 sm:p-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight mb-4">
              Узнайте свой путь к фигуре мечты за 10 вопросов
            </h1>
            <p className="text-base sm:text-lg text-green-700 font-semibold mb-6">
              Мини-меню + привычки под ваш режим. Отправим сразу в WhatsApp — бесплатно.
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6"> {/* Отступ был p-6, стал p-4 */}
              <p className="text-gray-700 text-sm sm:text-base"> {/* Размер текста был text-base, стал text-sm. Также убран leading-relaxed. */}
                Получите персонализированный план без строгих диет, включающий рекомендации по питанию и натуральные добавки для достижения вашей цели.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6"> {/* 3 колонки всегда, но зазор на десктопе (sm:) больше */}
              <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-lg shadow-sm"> {/* Отступы и зазоры на десктопе больше */}
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" /> {/* Иконка на десктопе больше */}
                <span className="text-gray-700 text-xs sm:text-sm">Менее 5 минут</span> {/* Текст на десктопе крупнее */}
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-xs sm:text-sm">100% Анонимно</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                {/* Мы вернули полный текст, который теперь будет просто уменьшаться на мобильных */}
                <span className="text-gray-700 text-xs sm:text-sm">Готовый план на 14 дней</span>
              </div>
            </div>
            <Button
              onClick={() => setCurrentStep(1)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transform hover:scale-105 transition-all px-8 py-4 text-lg"
            >
              Начать тест
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
        {/* <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-base">Индивидуальный подход</h3>
              </div>
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
        </div> */}
      </div>
    </div>
  );
}

function BasicsPage({ selectedGender, setSelectedGender, age, setAge, height, setHeight, weight, setWeight, touched, setTouched, setShowBMIPage, ageRef, heightRef, weightRef, HEIGHT_MIN, HEIGHT_MAX, WEIGHT_MIN, WEIGHT_MAX,
  isValidHeight, isValidWeight }) {

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
        <QuizHeader />
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center leading-relaxed">
              Let us know some basics
            </h2>
            <p className="text-center text-sm sm:text-base mb-4 sm:mb-6">
              Это поможет рассчитать безопасный темп снижения
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedGender === "female" /* Отступ был p-6, стал p-4 */
                  ? "border-green-500 bg-green-100"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                onClick={() => handleGenderSelect("female")}
              >
                <Image
                  src="/basicspage/peruanw.png"
                  alt="Female"
                  width={48} // Размер был 64, стал 48
                  height={48} // Размер был 64, стал 48
                  className="mb-2 rounded-full"
                />
                <span className="text-gray-700 font-medium">Female</span>
              </div>
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedGender === "male" /* Отступ был p-6, стал p-4 */
                  ? "border-green-500 bg-green-100"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                onClick={() => handleGenderSelect("male")}
              >
                <Image
                  src="/basicspage/peruanm.png"
                  alt="Male"
                  width={48} // Размер был 64, стал 48
                  height={48} // Размер был 64, стал 48
                  className="mb-2 rounded-full"
                />
                <span className="text-gray-700 font-medium">Male</span>
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <div ref={ageRef} tabIndex={-1} className="grid grid-cols-3 sm:grid-cols-5 gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg">
                {["18–24", "25–34", "35–44", "45–54", "55+"].map(range => (
                  <button
                    type="button"
                    key={range}
                    onClick={() => handleAgeSelect(range)}
                    className={`text-center p-2 sm:p-3 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium
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
            <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
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
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BMIPage({ selectedGender, age, height, weight, setShowBMIPage, setCurrentStep, BODY_SHAPE_STEP }) {


  // ... (здесь идёт вся старая логика с расчётом ИМТ, она без изменений) ...
  if (!selectedGender || !age || !height || !weight) {
    return null
  }
  const BMI_TABLE = { female: { "18-29": 22, "30-44": 23, "45-75": 24 }, male: { "18-29": 23, "30-44": 24, "45-75": 25 }, }
  const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10
  let ageBand = "18-29"
  const ageStart = parseInt(age.split('–')[0]);
  if (ageStart >= 30 && ageStart <= 44) ageBand = "30-44"
  else if (ageStart >= 45) ageBand = "45-75"
  const meanBMI = BMI_TABLE[selectedGender as keyof typeof BMI_TABLE][ageBand as keyof typeof BMI_TABLE.female]
  const diff = Math.round(((bmi - meanBMI) / meanBMI) * 100)
  const comparison = diff > 0 ? "higher" : "lower"
  const getBMICategory = (bmi: number) => { if (bmi < 18.5) return "Below avg"; if (bmi < 25) return "Comfortable"; if (bmi < 30) return "Slightly above"; return "Well above" }
  const markerPosition = Math.min(Math.max((bmi / 40) * 100, 0), 100)


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto">
        <QuizHeader />
        <Card className="border-0 shadow-lg">
          {/* Мы добавили отступ pb-32, чтобы было место для кнопок внизу */}
          <CardContent className="p-4 sm:p-8">
            {/* ... (весь остальной контент страницы ИМТ без изменений) ... */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Your Body Mass Index (BMI) </h2>
            </div>
            <Card className="rounded-xl bg-muted/5 shadow-md p-4 space-y-5 max-w-[440px] mx-auto mb-6">
              <div className="relative">
                <div className="absolute -top-12 transform -translate-x-1/2 z-10" style={{ left: `${markerPosition}%` }} >
                  <Badge className="bg-slate-800 text-white rounded-full px-4 py-1">You – {bmi}</Badge>
                </div>
                <div className="absolute -top-12 h-12 border-l border-dashed border-muted transform -translate-x-1/2" style={{ left: `${markerPosition}%` }} ></div>
                <div className="relative pt-1 pb-3">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-emerald-500 via-amber-400 to-rose-500"></div>
                  <div className="absolute top-1/2 w-5 h-5 border-2 border-white bg-slate-800 shadow rounded-full transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${markerPosition}%` }} />
                </div>
                <div className="flex justify-between text-xs mt-2 px-1">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>
              <div className="relative -top-2 flex sm:justify-between uppercase tracking-normal leading-tight text-[9px] sm:text-[11px]">
                {["Below avg", "Comfortable", "Slightly above", "Well above"].map((cat) => (
                  <span key={cat} className={`flex-1 text-center sm:flex-initial sm:text-left ${cat === getBMICategory(bmi) ? "font-bold text-primary" : ""}`} >
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
                if (bmi < 18.5) { healthNote = "Ниже комфортного диапазона; возможен недостаток питательных веществ, витаминов и энергии."; goodNews = "Небольшое увеличение калорий при регулярном питании обычно быстро восстанавливает энергию." } else if (bmi >= 18.5 && bmi < 25) { healthNote = "ИМТ в пределах нормы, но это не отражает состав тела или уровень стресса."; goodNews = "Поддерживайте постоянство сна, движения и потребления белка — наш план установит простые еженедельные цели." } else if (bmi >= 25 && bmi < 30) { healthNote = "Немного выше комфортного диапазона; со временем это может нагружать суставы и сердце."; goodNews = "Потеря всего 5–7% веса заметно снизит нагрузку и риск дальнейших проблем со здоровьем." } else { healthNote = "Большая нагрузка на организм; повышается риск проблем с суставами и серьезных заболеваний."; goodNews = "Пошаговые привычки приведут к более быстрой потеря веса и улучшение самочувствия уже в первые недели." }
                return (
                  <>
                    <div className="rounded bg-amber-50 p-3 flex gap-2">
                      <div className="w-5 h-5 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">!</div>
                      <div className="text-sm">
                        <span className="font-bold">Health note:</span> {healthNote}
                      </div>
                    </div>
                    <div className="rounded bg-emerald-50 p-3 flex gap-2">
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
              if (bmi < 18.5) { comparisonText = "Ваш показатель ниже среднего для вашей возрастной группы." } else if (bmi >= 18.5 && bmi < 25) { comparisonText = "Ваш показатель соответствует среднему уровню для вашей возрастной группы." } else if (bmi >= 25 && bmi < 30) { comparisonText = "Ваш показатель немного выше среднего среди женщин вашего возраста." } else { comparisonText = "Ваш показатель заметно выше среднего для вашей возрастной группы." }
              return (
                <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                  <p>{comparisonText}</p>
                </div>
              )
            })()}
            <div className="text-center space-y-2 mb-8"></div>


            {/* --- НАЧАЛО: НАШИ НОВЫЕ КНОПКИ --- */}
            <div className="hidden sm:flex flex-col-reverse sm:flex-row gap-3">
              <Button
                onClick={() => setShowBMIPage(false)}
                variant="outline"
                className="w-full sm:w-auto sm:flex-1 bg-transparent hover:bg-gray-100 text-gray-500 rounded-full py-4 font-semibold text-lg border-2 border-gray-300"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  setShowBMIPage(false)
                  setCurrentStep(2)
                }}
                className="w-full sm:w-auto sm:flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-md"
              >
                Continue
              </Button>
            </div>

          </CardContent>
        </Card>
        <div className="sm:hidden h-24">
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
            <Button
              onClick={() => {
                setShowBMIPage(false)
                setCurrentStep(2)
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 font-semibold text-base shadow-lg"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


function FinalResultsPage({ finalGoals, eatingProfileSummaryKey, lifestyleProfileSummaryKey, attemptsProfileSummaryKey, answers, age, height, weight, desiredShape, miniQuizAnswers, letterAnswers, setCurrentStep, setUserPath }) {
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
        <QuizHeader />

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

          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-center text-gray-800 mb-3">Что дальше?</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Кнопка №1: Получить только план */}
                <Button
                  onClick={() => {
                    setUserPath('plan');
                    setCurrentStep(15);
                  }}
                  variant="outline"
                  className="flex-1 bg-white hover:bg-gray-100 text-gray-700 rounded-full py-3 font-semibold text-base border-2 border-gray-300"
                >
                  Получить памятку и план
                </Button>
                {/* Кнопка №2: Стандартный путь с капсулами */}
                <Button
                  onClick={() => {
                    setUserPath('capsules');
                    setCurrentStep(16);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full py-3 font-semibold text-base shadow-md h-auto"
                >
                  <div className="flex flex-col items-center">
                    <span>Найти подходящие капсулы</span>
                    <span className="text-xs font-normal opacity-80 mt-1">и получить план</span>
                  </div>
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Информация обучающая, не заменяет консультацию врача
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- НАЧАЛО: НОВАЯ, УЛУЧШЕННАЯ СТРАНИЦА ПЛАНА ---
function PlanInfoPage({
  setCurrentStep,
  eatingProfileSummaryKey,
  lifestyleProfileSummaryKey,
  attemptsProfileSummaryKey,
  desiredShape,
  setIsProcessingOrder,
  isProcessingOrder,
  setOrderDetails,
  answers // Получаем ответы пользователя
}) {

  // --- Логика для формы (без изменений) ---
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formEmail && !formEmail.includes('@')) {
      setEmailError('Пожалуйста, введите корректный email с символом "@"');
      return;
    }
    setIsProcessingOrder(true);
    const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();
    setTimeout(() => {
      setOrderDetails({ name: formName, phone: formPhone, email: formEmail, orderId });
      setCurrentStep(19);
      setIsProcessingOrder(false);
    }, 1500);
  };

  // ✅ ПРОВЕРКА: Убеждаемся, что динамический контент для плана и памятки на месте
  const dynamicPlanList = React.useMemo(() => {
    const list = [];
    if (eatingProfileSummaryKey && planContentDatabase.eating[eatingProfileSummaryKey]) list.push(planContentDatabase.eating[eatingProfileSummaryKey]);
    if (lifestyleProfileSummaryKey && planContentDatabase.lifestyle[lifestyleProfileSummaryKey]) list.push(planContentDatabase.lifestyle[lifestyleProfileSummaryKey]);
    if (attemptsProfileSummaryKey && planContentDatabase.attempts[attemptsProfileSummaryKey]) list.push(planContentDatabase.attempts[attemptsProfileSummaryKey]);
    return list.length > 0 ? list : ["Простые и сытные перуанские блюда на 20-30 минут."];
  }, [eatingProfileSummaryKey, lifestyleProfileSummaryKey, attemptsProfileSummaryKey]);

  const dynamicHandbookList = React.useMemo(() => {
    const list = [];
    if (lifestyleProfileSummaryKey && handbookContentDatabase.lifestyle[lifestyleProfileSummaryKey]) list.push(handbookContentDatabase.lifestyle[lifestyleProfileSummaryKey]);
    if (eatingProfileSummaryKey && handbookContentDatabase.eating[eatingProfileSummaryKey]) list.push(handbookContentDatabase.eating[eatingProfileSummaryKey]);
    if (desiredShape && shapeMapping[desiredShape]) list.push(`Конкретные шаги, как прийти к <strong>${shapeMapping[desiredShape].toLowerCase()}</strong> фигуре.`);
    else list.push("Советы по достижению фигуры вашей мечты.");
    return list;
  }, [eatingProfileSummaryKey, lifestyleProfileSummaryKey, desiredShape]);

  // 🔥 НОВАЯ ЛОГИКА: Создаем динамический список проблем на основе ответов
  const dynamicProblems = React.useMemo(() => {
    // Проходим по всем ответам квиза (вопросы 0-9)
    return quizQuestions.slice(0, 10).map(question => {
      const userAnswer = answers.find(ans => ans.questionId === question.id);
      if (userAnswer) {
        const mapping = problemSolutionMapping[userAnswer.answer];
        // Если для ответа есть соответствие в нашей новой базе, возвращаем его
        if (mapping) {
          return { problem: mapping.problem, solution: mapping.solution };
        }
      }
      return null;
    })
      .filter(Boolean); // Убираем пустые значения (ответы "Другое" и т.д.)
  }, [answers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4 pb-12">
      <div className="max-w-3xl mx-auto">
        <QuizHeader />
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardContent className="p-6 sm:p-8 space-y-8">

            <div className="text-center">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Ваш персональный план готов!</h1>
              <p className="text-base text-gray-600">
                Он создан на основе ваших ответов, чтобы помочь вам достичь цели фигуры — <strong>{shapeMapping[desiredShape]?.toLowerCase() || 'фигуры мечты'}</strong>.
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5">
              <h2 className="font-bold text-xl text-center text-green-800 mb-4">Что внутри вашего бесплатного пакета:</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3"><BookOpen className="w-8 h-8 text-green-700 flex-shrink-0" /><h3 className="font-semibold text-lg text-green-800">Персональный план</h3></div>
                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    {dynamicPlanList.map((item, index) => (<li key={index}>{item}</li>))}
                  </ul>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center gap-3 mb-3"><CheckCircle2 className="w-8 h-8 text-green-700 flex-shrink-0" /><h3 className="font-semibold text-lg text-green-800">Памятка по привычкам</h3></div>
                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    {dynamicHandbookList.map((item, index) => (<li key={index} dangerouslySetInnerHTML={{ __html: item }} />))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 🔥 ОБНОВЛЕННЫЙ БЛОК с динамическим контентом */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
                <div className="bg-white p-3 rounded-full ring-4 ring-sky-100"><TrendingUp className="w-10 h-10 text-sky-600 flex-shrink-0" /></div>
                <div>
                  <h3 className="font-bold text-lg text-sky-800">Для максимального результата:</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Ваш план — это мощная основа. Чтобы ускорить процесс, важно поддержать организм изнутри, решая корневые проблемы.
                  </p>
                </div>
              </div>
              {/* Рендерим наш новый динамический список */}
              {dynamicProblems.length > 0 && (
                <div className="mt-4 pt-4 border-t border-sky-200">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Как комплекс помог бы с вашими задачами:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {dynamicProblems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-4 h-4 mr-2 mt-0.5 text-sky-500">◆</span>
                        <span>{item.problem} – <span className="font-semibold text-sky-700">{item.solution}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <form id="plan-form" className="space-y-4 pt-4" onSubmit={handleOrderSubmit}>
              {/* ... (код формы остается без изменений) ... */}
              <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800">Куда отправить ваш бесплатный план?</h3><div><label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Полное имя *</label><input id="name" name="name" required value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base" placeholder="Введите ваше имя" /></div><div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Номер WhatsApp *</label><IMaskInput mask="+{51} (000) 000-000" id="phone" name="phone" required value={formPhone} onAccept={(value) => setFormPhone(value as string)} className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base" placeholder="+51 (___) ___-___" type="tel" /></div><div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email (опционально)</label><input id="email" name="email" type="email" value={formEmail} onChange={(e) => { setFormEmail(e.target.value); if (emailError) setEmailError(''); }} onBlur={() => { if (formEmail && !formEmail.includes('@')) { setEmailError('Пожалуйста, введите корректный email'); } else { setEmailError(''); } }} className={`w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base transition-colors ${emailError ? 'border-red-500' : 'border-gray-300'}`} placeholder="Если WhatsApp неудобен" />{emailError && <p className="mt-2 text-xs text-red-600 pl-4">{emailError}</p>}</div><div className="pt-2 text-center"><Button type="submit" disabled={isProcessingOrder} className="w-full max-w-md mx-auto bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-75">{isProcessingOrder ? (<span className="flex items-center justify-center"><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Отправка...</span>) : ("Получить план и памятку")}</Button><p className="text-xs text-gray-500 mt-3">Нажимая на кнопку, вы соглашаетесь с нашей политикой конфиденциальности.</p></div>
            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- НАЧАЛО: НОВАЯ, УЛУЧШЕННАЯ THANK YOU PAGE ---
function PlanThankYouPage({ setCurrentStep, orderDetails, setOrderDetails }) {
  // Если данных о заказе нет, ничего не показываем
  if (!orderDetails) return null;

  // --- Логика для редактирования номера ---
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState(orderDetails.phone);
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);

  const handleSavePhone = () => {
    setIsUpdatingPhone(true);
    setTimeout(() => {
      setOrderDetails({ ...orderDetails, phone: newPhone });
      setIsUpdatingPhone(false);
      setIsEditingPhone(false);
    }, 1500);
  };

  // --- 2-минутный таймер для доставки плана ---
  const [timer, setTimer] = React.useState(120);

  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4 pb-12">
      <div className="max-w-2xl mx-auto">
        <QuizHeader />
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardContent className="p-6 sm:p-8 space-y-6 text-center">

            <div>
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Спасибо, {orderDetails.name}!</h1>
              <p className="text-base text-gray-600 mt-2">
                Ваш персональный план уже в пути на номер WhatsApp:
              </p>
              <div className="mt-3 font-semibold text-lg bg-gray-100 border border-gray-200 rounded-full inline-block px-4 py-1">
                {orderDetails.phone}
              </div>

              {timer > 0 && (
                <div className="mt-3 text-xs text-center text-gray-500 bg-white/70 rounded-full p-1 max-w-xs mx-auto">
                  Материалы придут в течение <span className="font-mono font-semibold">{formattedTime}</span>
                </div>
              )}

              {isEditingPhone ? (
                <div className="mt-4 max-w-sm mx-auto space-y-2 text-left">
                  <IMaskInput
                    mask="+{51} (000) 000-000"
                    value={newPhone}
                    onAccept={(value) => setNewPhone(value as string)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <Button onClick={handleSavePhone} disabled={isUpdatingPhone} size="sm" className="w-full bg-green-600 hover:bg-green-700">
                    {isUpdatingPhone ? (
                      <span className="flex items-center justify-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Сохранение...</span>
                    ) : (
                      "Сохранить и отправить заново"
                    )}
                  </Button>
                </div>
              ) : (
                <button onClick={() => setIsEditingPhone(true)} className="mt-3 text-sm flex items-center justify-center gap-1.5 text-gray-500 hover:text-green-600 mx-auto">
                  <Edit3 className="w-4 h-4" />
                  <span>изменить номер</span>
                </button>
              )}
            </div>

            <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-5 shadow-inner">
              <h2 className="font-bold text-xl text-sky-800">Отличные новости!</h2>
              <p className="text-sm text-gray-700 mt-2 mb-4">
                Пока мы готовили ваш план, наша система подобрала комплекс натуральных компонентов, который идеально дополнит ваш план и поможет ускорить результат.
                В благодарность за уделённое время, мы зарезервировали для вас <strong>персональную скидку 50%</strong>.
              </p>
              <Button
                onClick={() => setCurrentStep(20)}
                className="w-full max-w-md mx-auto bg-green-600 hover:bg-green-700 text-white rounded-full py-3 font-semibold text-base shadow-lg transition-transform transform hover:scale-105"
              >
                Узнать подробнее
              </Button>
            </div>

            <p className="text-sm text-gray-500 pt-2">
              В любом случае, ваш бесплатный план уже в пути. Желаем вам прекрасных результатов!
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 14. Шаг: какую фигуру вы хотите
function BodyShapeStep({ desiredShape, setDesiredShape, setAnswers, setCurrentStep }) {
  const options = [
    { key: "Slim", title: "Стройную", hint: "Изящная, с плоским животом", img: "/bodyshape/slim.jpg" },
    { key: "Toned", title: "Подтянутую", hint: "С небольшой мышечной массой", img: "/bodyshape/toned.jpg" },
    { key: "Curvy", title: "С изгибами", hint: "Округлая женственная", img: "/bodyshape/curved.jpg" },
    { key: "Athletic", title: "Спортивную", hint: "С выраженными мышцами", img: "/bodyshape/athletic.jpg" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      {/* ИЗМЕНЕНИЕ: Убрали лишний отступ py-8 отсюда */}
      <div className="max-w-3xl mx-auto">
        {/* ИЗМЕНЕНИЕ: Добавили стандартный отступ py-4 сюда */}
        <QuizHeader />

        <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">Какую фигуру вы хотите?</h2>
          <p className="mt-3 text-center text-gray-600 text-sm sm:text-base">
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

          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
            {/* Кнопка "Далее" - Главный стиль с ПОЛНОСТЬЮ СОХРАНЕННОЙ ЛОГИКОЙ */}
            <Button
              disabled={!desiredShape}
              onClick={() => {
                if (!desiredShape) return;
                const entry: QuizAnswer = {
                  questionId: "goal:body-shape",
                  answer: desiredShape,
                  category: "goal",
                };
                setAnswers(prev => [
                  ...prev.filter(a => a.questionId !== "goal:body-shape"),
                  entry
                ]);
                setCurrentStep(3); // Переходим на страницу "Transition"
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreQuestionnaireIntroPage({ setCurrentStep }) {
  // Данные для иконок вынесли в массив для удобства
  const introIcons = [
    { emoji: "🍼", label: "Беременность" },
    { emoji: "🥦", label: "Рацион" },
    { emoji: "💊", label: "Таблетки" },
    { emoji: "🧬", label: "Гормоны" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4 pb-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <QuizHeader />

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Сделаем рекомендации ещё точнее</h2>

            <p className="text-gray-700 text-base sm:text-lg text-center mb-6">
              Мы уже знаем ваш рост, вес и цель. Осталось учесть особенности питания, гормонального фона и возможные
              ограничения, чтобы рецепт действительно подошёл именно вам.
            </p>

            {/* ИЗМЕНЕНИЕ: Новый подход к выравниванию для более компактного вида */}
            <div className="flex justify-center items-start mb-6">
              {introIcons.map((item) => (
                <div key={item.label} className="flex flex-col items-center w-20">
                  {/* Размеры круга и иконки стали меньше */}
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl mb-2">
                    {item.emoji}
                  </div>
                  <span className="text-xs text-center">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700 mb-6">
              <ul className="space-y-1">
                <li>• Ответы займут меньше минуты</li>
                <li>• Полностью конфиденциально</li>
                <li>• Можно пропустить вопрос, если не уверены</li>
              </ul>
            </div>

            <Button
              onClick={() => setCurrentStep(4)}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-md"
            >
              Начать 5 вопросов
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

function MiniQuestionPage({ miniQuizStep, miniQuizAnswers, setMiniQuizAnswers, setMiniQuizCompleted, setCurrentStep, setMiniQuizStep }) {

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
      setCurrentStep(5)
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
      setCurrentStep(5)
    } else {
      setMiniQuizStep(miniQuizStep + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50">
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          {/* New Header with Progress */}
          <div className="flex justify-between items-center mb-4">
            <QuizHeader />
            <span className="text-sm text-gray-600 px-4">Step {miniQuizStep + 1} of 5</span>
          </div>

          {/* Question Card */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-green-600 text-xl font-semibold mb-4">{question.title}</h2>

              {question.type === "radio" ? (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleRadioChange(option)}
                      className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-colors ${miniQuizAnswers[question.id] === option
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
                      className="flex items-center space-x-3 p-3 rounded-xl border hover:bg-green-50 transition-colors cursor-pointer"
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
              <div className="mt-6 space-y-4">
                <Button
                  onClick={handleNext}
                  disabled={!isValidAnswer()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  )
}

function PreMainQuizIntroPage({ setCurrentStep }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <QuizHeader />

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

                {/* Уменьшили отступ сверху с mt-6 до mt-4 */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-4">
                  Осталось ответить на пару коротких вопросов
                </h2>

                {/* Уменьшили отступ сверху и внутренние отступы px, py */}
                <div className="mt-4 text-left rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <div className="flex items-start gap-4">
                    <Gift className="w-8 h-8 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        После опроса — персональный <span className="whitespace-nowrap">14-дневный план</span>
                      </p>
                      <ul className="mt-3 space-y-2 text-gray-700 text-base">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>Питание: пошаговые рекомендации на каждый день</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>Простые привычки и персональные советы</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>Поддержка и напоминания</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Уменьшили отступ сверху с mt-8 до mt-6 */}
                <Button
                  onClick={() => setCurrentStep(6)}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-md"
                >
                  Перейти к вопросам
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EatingSummaryPage({ eatingProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowFact, setCurrentQuizStep }) {
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
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0 sm:p-0">
            {/* Высота картинки стала h-48 вместо h-56 */}
            <Image
              src={content.imageSrc}
              alt="Habit illustration"
              width={600}
              height={400}
              className="w-full h-48 object-contain"
            />

            <div className="border-t border-gray-100"></div>

            {/* Основные отступы p-6 -> p-4 */}
            <div className="p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50/50">
              {/* Заголовок стал меньше, отступ mb-6 -> mb-4 */}
              <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
                {content.title}
              </h2>

              {/* Расстояние между блоками space-y-4 -> space-y-3 */}
              <div className="space-y-3">
                {/* Отступы p-4 -> p-3, текст text-base -> text-sm, убран leading-relaxed */}
                <div className="bg-amber-50 p-3 rounded-xl border-l-4 border-amber-400 shadow-sm">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Рекомендация</h3>
                  <p className="text-sm text-gray-800 mt-1">{content.habit}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-xl border-l-4 border-green-500 shadow-sm">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ваша цель на неделю</h3>
                  <p className="text-sm text-gray-800 mt-1">{content.goal}</p>
                </div>
              </div>

              {/* Отступ mt-6 -> mt-4 */}
              <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-700">
                  {content.rationale}
                </p>
              </div>

              {/* Отступ mt-6 -> mt-4 */}
              <Button
                onClick={handleContinue}
                disabled={isPlanApplied}
                className="w-full mt-4 rounded-full py-3 font-semibold text-base shadow-md transition-all duration-300 bg-green-600 hover:bg-green-700 text-white disabled:bg-emerald-500"
              >
                {isPlanApplied ? (
                  <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5" /> Учтем в плане!</span>
                ) : ("Применить в плане")}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">{content.promise}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function LifestyleSummaryPage({ lifestyleProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowLifestyleSummary, setCurrentQuizStep }) {
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
      <div className="max-w-2xl mx-auto">
        {/* ИЗМЕНЕНИЕ: Пустой div с классом py-8 был полностью удален */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0 sm:p-0">

            <Image
              src={content.imageSrc}
              alt="Lifestyle illustration"
              width={600}
              height={400}
              className="w-full h-48 object-contain"
            />

            <div className="border-t border-gray-100"></div>

            <div className="p-4 sm:p-8 bg-gradient-to-b from-white to-gray-50/50">
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                {content.title}
              </h2>

              <div className="space-y-3">
                <div className="bg-sky-50 p-3 rounded-xl border-l-4 border-sky-400 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Рекомендация</h3>
                  <p className="text-sm text-gray-800 mt-1">{content.habit}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-xl border-l-4 border-green-500 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваша цель на неделю</h3>
                  <p className="text-sm text-gray-800 mt-1">{content.goal}</p>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  {content.rationale}
                </p>
              </div>

              <Button
                onClick={handleContinue}
                disabled={isPlanApplied}
                className="w-full mt-4 rounded-full py-4 font-semibold text-lg shadow-md transition-all duration-300 bg-green-600 hover:bg-green-700 text-white disabled:bg-emerald-500"
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

function AttemptsSummaryPage({ attemptsProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowAttemptsSummary, setCurrentStep }) {

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
      <div className="max-w-2xl mx-auto">
        {/* ИЗМЕНЕНИЕ: Пустой div с классом py-8 был полностью удален */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0 sm:p-0">

            <Image
              src={content.imageSrc}
              alt="Approach illustration"
              width={600}
              height={400}
              className="w-full h-48 object-contain"
            />

            <div className="border-t border-gray-100"></div>

            <div className="p-4 sm:p-8 bg-gradient-to-b from-white to-gray-50/50">
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                {content.title}
              </h2>

              <div className="space-y-3">
                <div className="bg-violet-50 p-3 rounded-xl border-l-4 border-violet-400 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваш новый подход</h3>
                  <p className="text-sm text-gray-800 mt-1">{content.habit}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-xl border-l-4 border-green-500 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваша первая цель</h3>
                  <p className="text-sm text-gray-800 mt-1">{content.goal}</p>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  {content.rationale}
                </p>
              </div>

              <Button
                onClick={handleContinue}
                disabled={isPlanApplied}
                className="w-full mt-4 rounded-full py-4 font-semibold text-lg shadow-md transition-all duration-300 bg-green-600 hover:bg-green-700 text-white disabled:bg-emerald-500"
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

function QuizQuestion({ currentQuizStep, showFact, showLifestyleSummary, showAttemptsSummary, EatingSummaryPage, LifestyleSummaryPage, AttemptsSummaryPage, recordAnswer, expandedInsight, setExpandedInsight, advanceToNextStep, setIsInsightAdded, showConfirmation, getSectionTitle, getQuizProgress, lastClickedOption, setLastClickedOption }) {

  const question = quizQuestions[currentQuizStep];
  if (!question) return null;

  if (showFact) return EatingSummaryPage; // ✅ Правильно: возвращаем готовый компонент
  if (showLifestyleSummary) return LifestyleSummaryPage; // ✅ Правильно
  if (showAttemptsSummary) return AttemptsSummaryPage; // ✅ Правильно

  // Новая, упрощенная логика выбора ответа
  const onSelectAnswer = (q: Question, optionText: string) => {
    const insight = attemptInsights[q.id]?.[optionText];

    // 1. Записываем ответ
    recordAnswer(q.id, optionText, q.category);

    // 2. Мгновенно подсвечиваем вариант
    setLastClickedOption(optionText);

    // 3. Через 300мс решаем, что делать дальше
    setTimeout(() => {
      if (insight) {
        // Если есть подсказка, показываем её
        setExpandedInsight({ questionId: q.id, answer: optionText });
      } else {
        // Если нет, переходим к следующему шагу
        advanceToNextStep();
      }
      // 4. Убираем подсветку
      setLastClickedOption(null);
    }, 300); // 300 миллисекунд — идеальное время для обратной связи
  };

  // Новая функция для кнопки в подсказке
  const handleAddToPlanAndAdvance = () => {
    setIsInsightAdded(true);
    advanceToNextStep();
  }

  const handleOtherClick = () => {
    recordAnswer(question.id, "None of the above", question.category, 'n');
    advanceToNextStep();
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
        <QuizHeader />
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
          {quizQuestions[currentQuizStep].options.map(option => {
            const insightData = attemptInsights[quizQuestions[currentQuizStep].id]?.[option.text];
            if (!insightData) return null;

            return (
              <MobileInsightPush
                key={option.text}
                insightData={insightData}
                onConfirm={handleAddToPlanAndAdvance}
                isVisible={expandedInsight?.answer === option.text}
              />
            );
          })}
          <CardContent className="p-4 sm:p-6">
            <div className="text-center mb-6"> {/* Отступ был mb-8, стал mb-6 */}
              {/* Заголовок секции стал меньше и отступ под ним тоже */}
              <h2 className="font-semibold text-green-600 text-xl sm:text-lg mb-3">{getSectionTitle()}</h2>
              <h3 className="font-medium text-gray-800 leading-snug text-lg sm:text-base">{question.question}</h3>
              <p className="text-xs text-gray-500 mt-2">(Выберите наиболее близкий вариант)</p>
            </div>


            <div className="space-y-4">
              {question.options.map((option, index) => {
                const isSelected = expandedInsight?.answer === option.text;
                const insightData = attemptInsights[question.id]?.[option.text];

                return (
                  <div key={index}>
                    <div
                      onClick={() => onSelectAnswer(question, option.text)}
                      className={`
                      flex items-center gap-4 p-4 border-2 rounded-3xl cursor-pointer transition-all 
                      ${(isSelected || lastClickedOption === option.text)
                          ? "border-green-400 bg-green-50"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                        }
                      `}
                    >
                      <div className="text-xl sm:text-2xl">{option.emoji}</div>
                      <span className="text-sm sm:text-base text-gray-700 flex-1">{option.text}</span>
                    </div>
                    {/* 👇 ИЗМЕНЕНИЕ: СТАРЫЙ БЛОК ТЕПЕРЬ ВИДЕН ТОЛЬКО НА ДЕСКТОПАХ */}
                    {isSelected && insightData && (
                      <div className="hidden sm:block mt-2 p-4 bg-green-50 border-t-2 border-green-200 rounded-b-3xl animate-accordion-down">
                        <h4 className="font-bold text-green-800 break-words">{insightData.title}</h4>
                        <p className="text-sm text-gray-700 mt-1 mb-4 break-words">{insightData.solution}</p>
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
                <div className="text-xl sm:text-2xl">🤔</div>
                <span className="text-sm sm:text-base text-gray-700 flex-1">Другое</span>
              </div>
            </div>

            {/* Блок с кнопкой "Далее" полностью удален */}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function TransitionPage({ finalGoals, setFinalGoals, analyzeAnswers, answers, setCurrentStep }) {

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
        <QuizHeader />

        {/* Question Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center mb-6"> {/* Отступ был mb-8, стал mb-6 */}
              {/* Заголовок стал меньше, отступ тоже */}
              <h2 className="font-semibold text-green-600 text-lg mb-3">Последний вопрос</h2>
              {/* Текст вопроса стал меньше */}
              <h3 className="font-medium text-gray-800 leading-snug text-base">
                Если бы у вас был вес вашей мечты, что бы вы сделали?
              </h3>
              <p className="text-xs text-gray-500 mt-2">(Можно выбрать несколько вариантов)</p>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-3"> {/* Расстояние между кнопками было space-y-4 */}
              {options.map((option, index) => {
                const isSelected = finalGoals.includes(option);
                return (
                  <div
                    key={index}
                    onClick={() => handleSelection(option)}
                    /* Отступы p-4 -> p-3, gap-4 -> gap-3, скругление rounded-3xl -> rounded-2xl */
                    className={`flex items-center gap-3 p-3 border-2 rounded-2xl cursor-pointer transition-all ${isSelected ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-green-300 hover:bg-green-50"}`}
                  >
                    {/* Размер квадратика-галочки стал меньше */}
                    <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                      {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    {/* Размер текста стал меньше */}
                    <span className={`text-sm text-gray-700 flex-1 ${option.includes("жить") && !option.includes("активной") ? "font-bold" : ""}`}>{option}</span>
                  </div>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="mt-6">
              <Button
                onClick={handleNext}
                disabled={finalGoals.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
function ThankYouPage({ orderDetails, setOrderDetails, userPath, variant = 'full' }) {
  if (!orderDetails) return null;

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState(orderDetails.phone);
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);
  const [timer, setTimer] = React.useState(120);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const whatsappLink = `https://wa.me/${orderDetails.phone.replace(/\D/g, '')}`;

  const handleSavePhone = () => {
    setIsUpdatingPhone(true);
    setTimeout(() => {
      setOrderDetails({ ...orderDetails, phone: newPhone });
      setIsUpdatingPhone(false);
      setIsEditingPhone(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto">
        <QuizHeader />
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 sm:p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Спасибо за ваш заказ, {orderDetails.name}!</h1>
            <p className="text-gray-600 mt-2">Ваш путь к здоровью и красоте начался!</p>
            <div className="mt-8 space-y-4 text-left">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-800">Заявка №{orderDetails.orderId} получена</p>
                <p className="text-sm text-gray-600 mt-1">Мы свяжемся с вами для подтверждения в течение 15 минут в рабочее время (10:00–20:00).</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-grow">
                    <p className="font-semibold text-green-800">План отправлен в WhatsApp</p>
                    <p className="text-sm text-gray-700 mt-1">На номер: <strong>{orderDetails.phone}</strong></p>
                    {isEditingPhone ? (
                      <div className="mt-3 space-y-2">
                        <IMaskInput
                          mask="+{51} (000) 000-000"
                          value={newPhone}
                          onAccept={(value) => setNewPhone(value as string)}
                          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <Button onClick={handleSavePhone} disabled={isUpdatingPhone} size="sm" className="bg-green-600 hover:bg-green-700">
                          {isUpdatingPhone ? (<span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Отправка...</span>) : ("Отправить")}
                        </Button>
                      </div>
                    ) : (
                      <button onClick={() => setIsEditingPhone(true)} className="mt-2 text-sm flex items-center gap-1.5 text-gray-500 hover:text-green-600">
                        <Edit3 className="w-4 h-4" />
                        <span>изменить номер</span>
                      </button>
                    )}
                  </div>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 text-sm font-semibold flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Открыть чат
                  </a>
                </div>
                {/* 🔥 ИЗМЕНЕНИЕ: Таймер теперь показывается ТОЛЬКО на оригинальной ('full') странице */}
                {variant === 'full' && timer > 0 && (
                  <div className="mt-3 text-xs text-center text-gray-500 bg-white/70 rounded-full p-1">
                    Материалы придут в течение <span className="font-mono font-semibold">{formattedTime}</span>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button className="text-sm text-gray-500 hover:text-green-600 underline flex items-center gap-1 mx-auto">
                  <Mail className="w-4 h-4" />
                  Отправить копию на email
                </button>
              </div>
              <div className="pt-4 text-sm space-y-2">
                <details className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <summary className="font-semibold cursor-pointer">Что делать, если сообщение с планом не пришло?</summary>
                  <p className="mt-2 text-gray-600">Проверьте, правильно ли указан номер. Если вы ошиблись, вы можете изменить его выше. Если всё верно, подождите 5 минут. Иногда бывают задержки.</p>
                </details>
                <details className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <summary className="font-semibold cursor-pointer">Как изменить номер?</summary>
                  <p className="mt-2 text-gray-600">Нажмите на кнопку "изменить номер" под вашим текущим номером в карточке "План отправлен на WhatsApp".</p>
                </details>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Вставьте этот код вместо вашей старой функции OfferPage

// --- НАЧАЛО: НОВАЯ, УМНАЯ OFFER PAGE ---
function OfferPage({
  finalGoals,
  eatingProfileSummaryKey,
  lifestyleProfileSummaryKey,
  attemptsProfileSummaryKey,
  miniQuizAnswers,
  desiredShape,
  sendSampleNow,
  setSendSampleNow,
  setIsProcessingOrder,
  isProcessingOrder,
  setOrderDetails,
  setCurrentStep,
  orderFormRef,
  userPath,
  variant = 'full',
  orderDetails
}) {

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [timer, setTimer] = React.useState(15 * 60);

  React.useEffect(() => {
    if (variant === 'simplified' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, variant]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formEmail && !formEmail.includes('@')) {
      setEmailError('Пожалуйста, введите корректный email с символом "@"');
      return;
    }
    setIsProcessingOrder(true);
    const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();
    setTimeout(() => {
      setOrderDetails({ name: formName, phone: formPhone, email: formEmail, orderId });
      setCurrentStep(variant === 'full' ? 18 : 21);
      setIsProcessingOrder(false);
    }, 3000);
  };

  const handleSimplifiedOrderSubmit = () => {
    setIsProcessingOrder(true);
    setTimeout(() => {
      setCurrentStep(21);
      setIsProcessingOrder(false);
    }, 1500);
  };

  const userGoal = finalGoals.length > 0 ? finalGoals[0] : "Начала бы жить"; const dynamicTitlePart = (motivationContent[userGoal]?.title || "Ваш путь к мечте").replace("Вот как", "Ваш путь к тому, чтобы"); const dynamicHeadline = `${dynamicTitlePart} — начинается здесь.`; const buildSubtitle = () => { const parts = new Set<string>(); if (eatingProfileSummaryKey) parts.add(subtitleKeywords.eating[eatingProfileSummaryKey]); if (lifestyleProfileSummaryKey) parts.add(subtitleKeywords.lifestyle[lifestyleProfileSummaryKey]); if (attemptsProfileSummaryKey) parts.add(subtitleKeywords.attempts[attemptsProfileSummaryKey]); return Array.from(parts).join(', '); }; const getWhyItSuitsYouPoints = () => { const points = []; if (eatingProfileSummaryKey) points.push(whyItSuitsYouMapping.eating[eatingProfileSummaryKey]); if (lifestyleProfileSummaryKey) points.push(whyItSuitsYouMapping.lifestyle[lifestyleProfileSummaryKey]); if (attemptsProfileSummaryKey) points.push(whyItSuitsYouMapping.attempts[attemptsProfileSummaryKey]); return points; }; const whyItSuitsYouPoints = getWhyItSuitsYouPoints(); let effectKey: keyof typeof comprehensiveEffectContent = 'mixed'; if (eatingProfileSummaryKey === 'a' && lifestyleProfileSummaryKey === 'a' && attemptsProfileSummaryKey === 'a') { effectKey = 'all_a'; } else if (eatingProfileSummaryKey === 'b' && lifestyleProfileSummaryKey === 'b' && attemptsProfileSummaryKey === 'b') { effectKey = 'all_b'; } else if (eatingProfileSummaryKey === 'c' && lifestyleProfileSummaryKey === 'c' && attemptsProfileSummaryKey === 'c') { effectKey = 'all_c'; } const dynamicEffectText = comprehensiveEffectContent[effectKey]; const getSafetyKey = () => { const conditions = (miniQuizAnswers.conditions as string[]) || []; const meds = (miniQuizAnswers.meds as string) || ''; if (conditions.includes('High blood pressure')) return 'high_pressure'; if (conditions.includes('Prediabetes / type 2 diabetes')) return 'diabetes'; if (meds === 'Hormonal contraceptives') return 'contraceptives'; if (conditions.includes('PCOS')) return 'pcos'; return 'default'; }; const dynamicSafetyText = safetyContent[getSafetyKey()]; const objections = [{ icon: Leaf, title: "100% натуральный состав", text: "Только растительные компоненты — без гормонов, химии и привыкания. Это особенно важно, если вы ищете безопасное решение." }, { icon: HeartPulse, title: "Безопасно и совместимо", text: dynamicSafetyText }, { icon: ThumbsUp, title: "Комплексный эффект", text: dynamicEffectText }, { icon: Check, title: "Гарантированные результаты", text: "При соблюдении всех рекомендаций вы начинаете видеть изменения уже через 7–10 дней, что подтверждается отзывами наших пользователей." },]; const dynamicPlanList = React.useMemo(() => { const list = []; if (eatingProfileSummaryKey && planContentDatabase.eating[eatingProfileSummaryKey]) { list.push(planContentDatabase.eating[eatingProfileSummaryKey]); } if (lifestyleProfileSummaryKey && planContentDatabase.lifestyle[lifestyleProfileSummaryKey]) { list.push(planContentDatabase.lifestyle[lifestyleProfileSummaryKey]); } if (attemptsProfileSummaryKey && planContentDatabase.attempts[attemptsProfileSummaryKey]) { list.push(planContentDatabase.attempts[attemptsProfileSummaryKey]); } return list.length > 0 ? list : ["Простые и сытные перуанские блюда на 20-30 минут."]; }, [eatingProfileSummaryKey, lifestyleProfileSummaryKey, attemptsProfileSummaryKey]); const dynamicHandbookList = React.useMemo(() => { const list = []; if (lifestyleProfileSummaryKey && handbookContentDatabase.lifestyle[lifestyleProfileSummaryKey]) { list.push(handbookContentDatabase.lifestyle[lifestyleProfileSummaryKey]); } if (eatingProfileSummaryKey && handbookContentDatabase.eating[eatingProfileSummaryKey]) { list.push(handbookContentDatabase.eating[eatingProfileSummaryKey]); } if (desiredShape && shapeMapping[desiredShape]) { list.push(`Конкретные шаги, как прийти к <strong>${shapeMapping[desiredShape].toLowerCase()}</strong> фигуре.`); } else { list.push("Советы по достижению фигуры вашей мечты."); } return list; }, [eatingProfileSummaryKey, lifestyleProfileSummaryKey, desiredShape]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-4xl mx-auto">
        <QuizHeader />
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg ring-1 ring-black/5 p-4 md:p-6 space-y-6">
          <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center leading-tight">{dynamicHeadline}</h1>
          <div className="text-center"><p className="text-base sm:text-lg text-gray-800">Мы проанализировали ваши ответы и подготовили решение, которое учитывает: <br /> <span className="font-bold text-green-700">{buildSubtitle()}</span>.</p></div>

          {/* 🔥 НОВЫЙ ЗАГОЛОВОК, КОТОРЫЙ ВИДЕН ВЕЗДЕ */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center pt-4">
            Натуральные добавки "Esbelita"
          </h2>

          <div className="grid md:grid-cols-2 gap-4">{objections.map(item => (<div key={item.title} className="flex items-start gap-3 bg-green-50/70 p-4 rounded-xl border border-green-100"><item.icon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /><div className="min-w-0"><h4 className="font-semibold text-gray-800">{item.title}</h4><p className="text-sm text-gray-600">{item.text}</p></div></div>))}</div>
          <div className="pt-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-100 rounded-xl aspect-square w-full flex items-center justify-center">
              <Image src="/1.jpg" alt="Esbelita Natural bottle" width={400} height={400} className="object-contain" />
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-gray-800">Ключевые факты о "Esbelita Natural":</h3>
              <ul className="space-y-3">
                <li className="grid grid-cols-[auto_1fr] gap-x-3 items-start"><CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                  <span className="text-gray-700">Разработано в Перу с учетом местных особенностей питания и образа жизни.</span>
                </li>
                <li className="grid grid-cols-[auto_1fr] gap-x-3 items-start"><CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                  <span className="text-gray-700">Не "сжигает" жир принудительно, а помогает организму мягко нормализовать обмен веществ.</span>
                </li>
                <li className="grid grid-cols-[auto_1fr] gap-x-3 items-start"><CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                  <span className="text-gray-700">Прошел добровольную сертификацию качества и безопасности.</span>
                </li>
                <li className="grid grid-cols-[auto_1fr] gap-x-3 items-start"><CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                  <span className="text-gray-700">Всего 2 капсулы в день для эффективной поддержки вашего плана питания.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-4"><h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Почему этот подход подходит именно вам</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{whyItSuitsYouPoints.map((point, index) => (<div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"><p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Ваша проблема</p><p className="text-base font-bold text-gray-800 my-2">{point.problem}</p><div className="w-16 h-[1px] bg-green-200 mx-auto my-3"></div><p className="text-sm font-semibold text-green-600 uppercase tracking-wide">Наше решение</p><p className="text-sm text-gray-700 mt-2">{point.solution}</p></div>))}</div></div>

          <div className="text-center">
            <div className="text-left">
              {variant === 'full' ? (
                <div className="grid md:grid-cols-2 gap-6"><div className="bg-green-50 border border-green-200 rounded-xl p-5"><div className="flex items-center gap-3 mb-3"><BookOpen className="w-8 h-8 text-green-700 flex-shrink-0" /><h3 className="font-bold text-lg text-green-800">Что будет в вашем плане</h3></div><ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">{dynamicPlanList.map((item, index) => (<li key={index}>{item}</li>))}</ul></div><div className="bg-green-50 border border-green-200 rounded-xl p-5"><div className="flex items-center gap-3 mb-3"><CheckCircle2 className="w-8 h-8 text-green-700 flex-shrink-0" /><h3 className="font-bold text-lg text-green-800">Что будет в вашей памятке</h3></div><ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">{dynamicHandbookList.map((item, index) => (<li key={index} dangerouslySetInnerHTML={{ __html: item }} />))}</ul></div></div>
              ) : (
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 md:col-span-2"><div className="flex items-center gap-3 mb-3"><Sparkles className="w-8 h-8 text-sky-700 flex-shrink-0" /><h3 className="font-bold text-lg text-sky-800">Как капсулы усилят ваш план</h3></div><p className="text-sm text-gray-700">Ваш план питания и привычек — это мощная основа. Капсулы работают как катализатор, помогая вашему организму быстрее адаптироваться к новому режиму, контролировать аппетит и бороться со стрессом, который часто мешает достичь цели.</p></div>
              )}
            </div>
          </div>

          <div className="border-2 border-green-600 rounded-xl p-4 shadow-inner bg-white">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-green-700 mb-3">Ваше персональное предложение</h2>
            {variant === 'simplified' && (
              <div className="text-center bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">Ваша <b>единоразовая скидка 50%</b> действительна в течение:</p>
                <div className={`text-3xl font-bold font-mono mt-1 tracking-wider transition-colors ${timer < 420 ? 'text-red-600' : 'text-gray-800'}`}>{formattedTime}</div>
              </div>
            )}
            <div className="border-t border-b border-gray-200 py-3 text-center">
              <div className="flex justify-center items-baseline gap-2 font-semibold">
                <span className="text-gray-800 text-base sm:text-lg">Итоговая цена:</span>

                {/* Зачеркнутая цена теперь большая и видна в обоих вариантах */}
                <span className="text-gray-400 line-through text-2xl">199 PEN</span>

                <span className="text-green-700 text-2xl sm:text-3xl">99 PEN</span>
                <span className="text-gray-500 text-sm sm:text-base">(≈3.3 PEN/день)</span>
              </div>
            </div>
          </div>

          {variant === 'full' ? (
            <form ref={orderFormRef} id="order-form" className="space-y-4" onSubmit={handleOrderSubmit}>
              <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800">Куда отправить план и подтверждение заказа?</h3>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Полное имя *</label>
                <input id="name" name="name" required value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base placeholder:text-base" placeholder="Введите ваше имя" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Номер телефона *</label>
                <IMaskInput mask="+{51} (000) 000-000" radix="." id="phone" name="phone" required value={formPhone} onAccept={(value) => setFormPhone(value as string)} className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base placeholder:text-base" placeholder="+51 (___) ___-___" type="tel" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email (опционально)</label><input id="email" name="email" type="email" value={formEmail} onChange={(e) => { setFormEmail(e.target.value); if (emailError) setEmailError(''); }} onBlur={() => { if (formEmail && !formEmail.includes('@')) { setEmailError('Пожалуйста, введите корректный email с символом "@"'); } else { setEmailError(''); } }} className={`w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base placeholder:text-base transition-colors ${emailError ? 'border-red-500' : 'border-gray-300'}`} placeholder="Если WhatsApp неудобен" />{emailError && <p className="mt-2 text-xs text-red-600 pl-4">{emailError}</p>}
              </div>
              <div className="pt-2 text-center">
                <Button type="submit" disabled={isProcessingOrder} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-75 disabled:cursor-wait">
                  {isProcessingOrder ? (<span className="flex items-center justify-center"><Loader2 className="w-5 h-5 mr-2 animate-spin" />Обработка...</span>) : ("Заказать со скидкой")}
                </Button>
              </div>
            </form>
          ) : (
            <div ref={orderFormRef} id="order-form" className="space-y-4 pt-4">
              <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800">Подтвердите данные для заказа</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div><span className="text-sm font-medium text-gray-500">Имя:</span><p className="font-semibold text-gray-800">{orderDetails?.name || 'Не указано'}</p></div>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(15)} className="text-xs text-gray-500 hover:text-green-600"><Edit3 className="w-3 h-3 mr-1" />Изменить</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div><span className="text-sm font-medium text-gray-500">Номер WhatsApp:</span><p className="font-semibold text-gray-800">{orderDetails?.phone || 'Не указан'}</p></div>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(15)} className="text-xs text-gray-500 hover:text-green-600"><Edit3 className="w-3 h-3 mr-1" />Изменить</Button>
                </div>
              </div>
              <div className="pt-2 text-center">
                <Button onClick={handleSimplifiedOrderSubmit} disabled={isProcessingOrder || timer === 0} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 font-semibold text-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-75 disabled:cursor-wait">
                  {isProcessingOrder ? (<span className="flex items-center justify-center"><Loader2 className="w-5 h-5 mr-2 animate-spin" />Подтверждаем...</span>) : (timer > 0 ? "Подтвердить заказ со скидкой" : "Время вышло")}
                </Button>
              </div>
            </div>
          )}

          <div className="pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Что говорят клиенты Ebelita</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{testimonials.map((t, i) => {
              if (t.isExpert) {
                const IconComponent = t.img; return (<div key={i} className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">{IconComponent && <IconComponent className="w-6 h-6 text-sky-600 flex-shrink-0" />}<p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                  </div>
                  <p className="text-gray-700 italic text-sm flex-grow">“{t.quote}”</p></div>);
              } else {
                return (<div key={i} className="bg-green-50/70 border border-green-100 rounded-xl p-4 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>{t.stars && <StarRating rating={t.stars} />}</div>
                  <p className="text-gray-700 italic text-sm flex-grow">“{t.quote}”</p>
                </div>);
              }
            })}</div>
          </div>
          <div className="pt-6"><div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Прозрачность и безопасность</h3>
            <div className="space-y-4 divide-y divide-gray-200">
              <div className="pt-4 first:pt-0">
                <h4 className="font-semibold text-gray-800 flex items-start sm:items-center gap-2"><Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />Из чего состоит Esbelita Natural:</h4>
                <ul className="list-disc list-inside text-gray-600 mt-2 pl-4 text-sm space-y-2">
                  <li>L-Карнитин тартрат (150мг): Ускоряет транспортировку жиров.</li>
                  <li>Экстракт зеленого чая (100мг): Мощный антиоксидант.</li>
                  <li>Экстракт гуараны (75мг): Природный источник энергии.</li>
                  <li>Яблочный уксус (50мг): Помогает контролировать сахар.</li>
                  <li>Экстракт африканского манго (50мг): Снижает аппетит.</li>
                </ul>
              </div>
              <div className="pt-4">
                <h4 className="font-semibold text-gray-800 flex items-start sm:items-center gap-2"><ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />Сертификаты и регистрации:</h4>
                <p className="text-gray-600 mt-2 text-sm">Продукт имеет добровольный сертификат соответствия. <a href="#" className="text-green-600 underline">Скачать PDF</a></p>
                <p className="text-gray-600 mt-1 text-sm">Регистрационный номер: P2998419N/NAESBM</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">*Не является лекарственным средством. Перед применением рекомендуется проконсультироваться с врачом.</p>
          </div>
          </div>
          <div className="pt-6"><h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Часто задаваемые вопросы</h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <details className="rounded-xl border border-gray-200 p-2">
                <summary className="cursor-pointer font-medium">Нужно ли соблюдать жесткую диету?</summary>
                <p className="mt-2">Нет. Комплекс и план питания созданы, чтобы вы худели без стресса и срывов. План предлагает сытные и простые блюда, а капсулы помогают снизить тягу к вредному. Вам не придется голодать.</p>
              </details>
              <details className="rounded-xl border border-gray-200 p-2">
                <summary className="cursor-pointer font-medium">Я боюсь что эффект временнный, а вес вернется</summary>
                <p className="mt-2">Наш подход нацелен на изменение привычек и нормализацию обмена веществ, а не на быструю потерю воды. Это создает устойчивый результат. Памятка по привычкам поможет вам закрепить его после окончания курса.</p>
              </details>
              <details className="rounded-xl border border-gray-200 p-2">
                <summary className="cursor-pointer font-medium">Я могу купить потом или в магазине?</summary>
                <p className="mt-2">Это специальное предложение — скидка 50% и бесплатные бонусы — доступно только здесь и сейчас в благодарность за прохождение опроса. В магазинах продукт не продается.</p>
              </details>
              <details className="rounded-xl border border-gray-200 p-2">
                <summary className="cursor-pointer font-medium">Слишком хорошо звучит, в чем подвох?</summary>
                <p className="mt-2">Подвоха нет. Мы уверены в своем продукте и плане, поэтому готовы предложить лучшие условия тем, кто прошел опрос и серьезно настроен на результат. Ваш успех — наша лучшая реклама.</p>
              </details>
              <details className="rounded-xl border border-gray-200 p-2">
                <summary className="cursor-pointer font-medium">Как-то дорого</summary>
                <p className="mt-2">Стоимость курса на месяц со скидкой — 99 PEN. Это всего около 3.3 PEN в день, дешевле чашки кофе. За эту цену вы получаете не просто капсулы, а комплексное решение с планом питания и памяткой, что гораздо выгоднее, чем одна консультация у диетолога.</p>
              </details><details className="rounded-xl border border-gray-200 p-2">
                <summary className="cursor-pointer font-medium">Есть ли противопоказания?</summary>
                <p className="mt-2">Не рекомендуется принимать при беременности, кормлении грудью, а также при индивидуальной непереносимости компонентов. Если у вас есть хронические заболевания, проконсультируйтесь с врачом перед началом курса.</p>
              </details>
            </div>
          </div>
          <div className="pt-8 text-center bg-gradient-to-t from-green-50 rounded-2xl p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Вы дочитали до конца. Это значит, вы действительно готовы к переменам.</h3>
            <a href="#order-form" className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white rounded-full py-2 px-8 sm:py-3 sm:px-12 text-sm sm:text-base font-semibold shadow-lg transition-transform transform hover:scale-105">Да, я готова! Вернуться к форме заказа</a>
          </div>
        </div>
        <footer className="text-center text-sm text-gray-500 py-10">
          <p className="text-xs text-gray-400">Этот продукт не был оценен DIGEMID. Индивидуальные результаты могут отличаться. Не заменяет консультацию врача.</p>
        </footer>
      </div>
    </div>
  );
};

// --- КОНЕЦ: НОВАЯ, УМНАЯ OFFER PAGE ---

// Старый код с фотографиями отзывов
{/* <div className="pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Что говорят наши клиенты</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {testimonials.map((t, i) => {
                const IconComponent = t.isExpert ? t.img : null;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl shadow-sm flex flex-col h-full ${t.isExpert ? 'bg-gradient-to-br from-green-100 to-sky-100 border border-green-200' : 'bg-white overflow-hidden'}`}
                  >
                    {t.isExpert ? (
                      <div className="p-4 flex flex-col justify-center h-full">
                        <div className="flex flex-col items-center text-center md:items-start md:text-left">
                          {IconComponent && <IconComponent className="w-8 h-8 text-green-600 mb-3" />}
                          <div>
                            <p className="font-semibold text-gray-800">{t.name}</p>
                            <p className="text-gray-700 italic leading-relaxed text-sm mt-2">“{t.quote}”</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-full h-40 bg-gray-200 flex-shrink-0">
                          <Image src={t.img} alt={`Отзыв от ${t.name}`} layout="fill" objectFit="cover" />
                          <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">До / После</span>
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                            {t.stars && <StarRating rating={t.stars} />}
                          </div>
                          {t.weightLoss && (
                            <div className="my-2 text-center bg-green-100 text-green-800 font-bold py-1.5 px-2 rounded-lg text-xs">
                              {t.weightLoss}
                            </div>
                          )}
                          <p className="text-gray-700 italic leading-relaxed text-xs flex-grow">“{t.quote}”</p>
                          {t.orderId && <p className="text-right text-xs text-green-700/80 mt-2">Проверено заказом №{t.orderId}</p>}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div> */}

// Main render logic
const CurrentPageComponent = ({
  currentStep,
  setCurrentStep,
  showBMIPage,
  selectedGender,
  age,
  height,
  weight,
  setShowBMIPage,
  setSelectedGender,
  setAge,
  setHeight,
  setWeight,
  touched,
  setTouched,
  ageRef,
  heightRef,
  weightRef,
  HEIGHT_MIN,
  HEIGHT_MAX,
  WEIGHT_MIN,
  WEIGHT_MAX,
  isValidHeight,
  isValidWeight,
  miniQuizStep,
  miniQuizAnswers,
  setMiniQuizAnswers,
  setMiniQuizCompleted,
  setMiniQuizStep,
  currentQuizStep,
  showFact,
  showLifestyleSummary,
  showAttemptsSummary,
  eatingProfileSummaryKey,
  isPlanApplied,
  setIsPlanApplied,
  setCurrentQuizStep,
  lifestyleProfileSummaryKey,
  setShowFact,
  setShowLifestyleSummary,
  attemptsProfileSummaryKey,
  setShowAttemptsSummary,
  recordAnswer,
  expandedInsight,
  setExpandedInsight,
  advanceToNextStep,
  setIsInsightAdded,
  showConfirmation,
  getSectionTitle,
  getQuizProgress,
  desiredShape,
  setDesiredShape,
  setAnswers,
  finalGoals,
  setFinalGoals,
  analyzeAnswers,
  answers,
  sendSampleNow,
  setSendSampleNow,
  setIsProcessingOrder,
  isProcessingOrder,
  setOrderDetails,
  orderFormRef,
  orderDetails,
  letterAnswers,
  lastClickedOption,
  setLastClickedOption,
  userPath,
  setUserPath
}) => {
  // --- НАЧАЛО: НОВАЯ, БОЛЕЕ НАДЕЖНАЯ ЛОГИКА ---

  // Шаги, которые являются ОБЩИМИ для всех пользователей ДО выбора пути
  const commonSteps: { [key: number]: () => JSX.Element } = {
    0: () => <LandingPage setCurrentStep={setCurrentStep} />,
    1: () => showBMIPage ? <BMIPage {...{ selectedGender, age, height, weight, setShowBMIPage, setCurrentStep }} /> : <BasicsPage {...{ selectedGender, setSelectedGender, age, setAge, height, setHeight, weight, setWeight, touched, setTouched, setShowBMIPage, ageRef, heightRef, weightRef, HEIGHT_MIN, HEIGHT_MAX, WEIGHT_MIN, WEIGHT_MAX, isValidHeight, isValidWeight }} />,
    2: () => <BodyShapeStep {...{ desiredShape, setDesiredShape, setAnswers, setCurrentStep }} />,
    3: () => <PreQuestionnaireIntroPage setCurrentStep={setCurrentStep} />,
    4: () => <MiniQuestionPage {...{ miniQuizStep, miniQuizAnswers, setMiniQuizAnswers, setMiniQuizCompleted, setCurrentStep, setMiniQuizStep }} />,
    5: () => <PreMainQuizIntroPage setCurrentStep={setCurrentStep} />,
    // Шаги основного квиза (6-11)
    6: () => <QuizQuestion {...{ currentQuizStep, showFact, showLifestyleSummary, showAttemptsSummary, EatingSummaryPage: <EatingSummaryPage {...{ eatingProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowFact, setCurrentQuizStep }} />, LifestyleSummaryPage: <LifestyleSummaryPage {...{ lifestyleProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowLifestyleSummary, setCurrentQuizStep }} />, AttemptsSummaryPage: <AttemptsSummaryPage {...{ attemptsProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowAttemptsSummary, setCurrentStep }} />, recordAnswer, expandedInsight, setExpandedInsight, advanceToNextStep, setIsInsightAdded, showConfirmation, getSectionTitle, getQuizProgress, lastClickedOption, setLastClickedOption }} />,
    7: () => <QuizQuestion {...{ currentQuizStep, showFact, showLifestyleSummary, showAttemptsSummary, EatingSummaryPage: <EatingSummaryPage {...{ eatingProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowFact, setCurrentQuizStep }} />, LifestyleSummaryPage: <LifestyleSummaryPage {...{ lifestyleProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowLifestyleSummary, setCurrentQuizStep }} />, AttemptsSummaryPage: <AttemptsSummaryPage {...{ attemptsProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowAttemptsSummary, setCurrentStep }} />, recordAnswer, expandedInsight, setExpandedInsight, advanceToNextStep, setIsInsightAdded, showConfirmation, getSectionTitle, getQuizProgress, lastClickedOption, setLastClickedOption }} />,
    8: () => <QuizQuestion {...{ currentQuizStep, showFact, showLifestyleSummary, showAttemptsSummary, EatingSummaryPage: <EatingSummaryPage {...{ eatingProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowFact, setCurrentQuizStep }} />, LifestyleSummaryPage: <LifestyleSummaryPage {...{ lifestyleProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowLifestyleSummary, setCurrentQuizStep }} />, AttemptsSummaryPage: <AttemptsSummaryPage {...{ attemptsProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowAttemptsSummary, setCurrentStep }} />, recordAnswer, expandedInsight, setExpandedInsight, advanceToNextStep, setIsInsightAdded, showConfirmation, getSectionTitle, getQuizProgress, lastClickedOption, setLastClickedOption }} />,
    9: () => <QuizQuestion {...{ currentQuizStep, showFact, showLifestyleSummary, showAttemptsSummary, EatingSummaryPage: <EatingSummaryPage {...{ eatingProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowFact, setCurrentQuizStep }} />, LifestyleSummaryPage: <LifestyleSummaryPage {...{ lifestyleProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowLifestyleSummary, setCurrentQuizStep }} />, AttemptsSummaryPage: <AttemptsSummaryPage {...{ attemptsProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowAttemptsSummary, setCurrentStep }} />, recordAnswer, expandedInsight, setExpandedInsight, advanceToNextStep, setIsInsightAdded, showConfirmation, getSectionTitle, getQuizProgress, lastClickedOption, setLastClickedOption }} />,
    10: () => <QuizQuestion {...{ currentQuizStep, showFact, showLifestyleSummary, showAttemptsSummary, EatingSummaryPage: <EatingSummaryPage {...{ eatingProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowFact, setCurrentQuizStep }} />, LifestyleSummaryPage: <LifestyleSummaryPage {...{ lifestyleProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowLifestyleSummary, setCurrentQuizStep }} />, AttemptsSummaryPage: <AttemptsSummaryPage {...{ attemptsProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowAttemptsSummary, setCurrentStep }} />, recordAnswer, expandedInsight, setExpandedInsight, advanceToNextStep, setIsInsightAdded, showConfirmation, getSectionTitle, getQuizProgress, lastClickedOption, setLastClickedOption }} />,
    11: () => <QuizQuestion {...{ currentQuizStep, showFact, showLifestyleSummary, showAttemptsSummary, EatingSummaryPage: <EatingSummaryPage {...{ eatingProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowFact, setCurrentQuizStep }} />, LifestyleSummaryPage: <LifestyleSummaryPage {...{ lifestyleProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowLifestyleSummary, setCurrentQuizStep }} />, AttemptsSummaryPage: <AttemptsSummaryPage {...{ attemptsProfileSummaryKey, isPlanApplied, setIsPlanApplied, setShowAttemptsSummary, setCurrentStep }} />, recordAnswer, expandedInsight, setExpandedInsight, advanceToNextStep, setIsInsightAdded, showConfirmation, getSectionTitle, getQuizProgress, lastClickedOption, setLastClickedOption }} />,
    12: () => <TransitionPage {...{ finalGoals, setFinalGoals, analyzeAnswers, answers, setCurrentStep }} />,
    14: () => <FinalResultsPage {...{ finalGoals, eatingProfileSummaryKey, lifestyleProfileSummaryKey, attemptsProfileSummaryKey, answers, age, height, weight, desiredShape, miniQuizAnswers, letterAnswers, setCurrentStep, setUserPath }} />
  };

  // 1. Сначала проверяем, есть ли текущий шаг в ОБЩИХ шагах
  if (commonSteps[currentStep]) {
    return commonSteps[currentStep]();
  }

  // 2. Если нет, то смотрим, какой ПУТЬ выбрал пользователь
  // --- ВЕТКА "СНАЧАЛА ПЛАН" ---
  if (userPath === 'plan') {
    const planSteps: { [key: number]: () => JSX.Element } = {
      15: () => <PlanInfoPage
        setCurrentStep={setCurrentStep}
        eatingProfileSummaryKey={eatingProfileSummaryKey}
        lifestyleProfileSummaryKey={lifestyleProfileSummaryKey}
        attemptsProfileSummaryKey={attemptsProfileSummaryKey}
        desiredShape={desiredShape}
        setIsProcessingOrder={setIsProcessingOrder}
        isProcessingOrder={isProcessingOrder}
        setOrderDetails={setOrderDetails}
        variant='simplified'
        answers={answers} // ✅ ДОБАВИЛИ ЭТУ СТРОКУ
      />,
      19: () => <PlanThankYouPage
        setCurrentStep={setCurrentStep}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
      />,
      20: () => <OfferPage {...{ finalGoals, eatingProfileSummaryKey, lifestyleProfileSummaryKey, attemptsProfileSummaryKey, miniQuizAnswers, desiredShape, sendSampleNow, setSendSampleNow, setIsProcessingOrder, isProcessingOrder, setOrderDetails, setCurrentStep, orderFormRef, userPath, variant: 'simplified', orderDetails }} />,
      21: () => <ThankYouPage {...{ orderDetails, setOrderDetails, userPath, variant: 'simplified' }} />
    };
    if (planSteps[currentStep]) {
      return planSteps[currentStep]();
    }
  }

  // --- ВЕТКА "СНАЧАЛА КАПСУЛЫ" (или если путь еще не выбран) ---
  if (userPath === 'capsules' || userPath === null) {
    const capsuleSteps: { [key: number]: () => JSX.Element } = {
      16: () => <LoadingPage onComplete={() => setCurrentStep(17)} />,
      17: () => <OfferPage {...{ finalGoals, eatingProfileSummaryKey, lifestyleProfileSummaryKey, attemptsProfileSummaryKey, miniQuizAnswers, desiredShape, sendSampleNow, setSendSampleNow, setIsProcessingOrder, isProcessingOrder, setOrderDetails, setCurrentStep, orderFormRef, userPath, variant: 'full' }} />,
      18: () => <ThankYouPage {...{ orderDetails, setOrderDetails, userPath, variant: 'full' }} />
    };
    if (capsuleSteps[currentStep]) {
      return capsuleSteps[currentStep]();
    }
  }

  // 3. Если по какой-то причине ничего не подошло (например, ошибка в номере шага),
  // мы вернёмся на главную, а не покажем белый экран. Это защита от ошибок.
  console.error(`Ошибка навигации: Не найден шаг ${currentStep} для пути "${userPath}"`);
  return <LandingPage setCurrentStep={setCurrentStep} />;
};



export default function WeightLossQuizApp() {

  const [lastClickedOption, setLastClickedOption] = useState<string | null>(null);
  const [userPath, setUserPath] = useState<'capsules' | 'plan' | null>(null);

  const [sendSampleNow, setSendSampleNow] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // НОВЫЙ КОД
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])

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

  const orderFormRef = React.useRef<HTMLFormElement>(null);

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

  // Этот эффект будет срабатывать каждый раз, когда меняется currentStep ИЛИ currentQuizStep
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep, currentQuizStep, showBMIPage, miniQuizStep, showFact, showLifestyleSummary, showAttemptsSummary]);

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



    // Логика после блока "Питание" (вопрос 2)
    if (currentQuizStep === 2) {
      const eatingAnswers = letterAnswers.slice(0, 3);
      const finalKey = determineProfileKey(eatingAnswers); // <-- ИСПОЛЬЗУЕМ НОВУЮ ЛОГИКУ
      setEatingProfileSummaryKey(finalKey);
      setShowFact(true);
      return;
    }
    // Логика после блока "Образ жизни" (вопрос 6)
    else if (currentQuizStep === 6) {
      const lifestyleAnswers = letterAnswers.slice(3, 7);
      const finalKey = determineProfileKey(lifestyleAnswers); // <-- ИСПОЛЬЗУЕМ НОВУЮ ЛОГИКУ
      setLifestyleProfileSummaryKey(finalKey);
      setShowLifestyleSummary(true);
      return;
    }
    // Логика после блока "Методы" (вопрос 9)
    else if (currentQuizStep === 9) {
      const attemptsAnswers = letterAnswers.slice(7, 10);
      const finalKey = determineProfileKey(attemptsAnswers); // <-- ИСПОЛЬЗУЕМ НОВУЮ ЛОГИКУ
      setAttemptsProfileSummaryKey(finalKey);
      setShowAttemptsSummary(true);
      return;
    }
    // Для всех остальных случаев - просто переход к следующему вопросу
    else {
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

  return (
    <>
      <CurrentPageComponent
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        showBMIPage={showBMIPage}
        selectedGender={selectedGender}
        age={age}
        height={height}
        weight={weight}
        setShowBMIPage={setShowBMIPage}
        setSelectedGender={setSelectedGender}
        setAge={setAge}
        setHeight={setHeight}
        setWeight={setWeight}
        touched={touched}
        setTouched={setTouched}
        ageRef={ageRef}
        heightRef={heightRef}
        weightRef={weightRef}
        HEIGHT_MIN={HEIGHT_MIN}
        HEIGHT_MAX={HEIGHT_MAX}
        WEIGHT_MIN={WEIGHT_MIN}
        WEIGHT_MAX={WEIGHT_MAX}
        isValidHeight={isValidHeight}
        isValidWeight={isValidWeight}
        BODY_SHAPE_STEP={BODY_SHAPE_STEP}
        miniQuizStep={miniQuizStep}
        miniQuizAnswers={miniQuizAnswers}
        setMiniQuizAnswers={setMiniQuizAnswers}
        setMiniQuizCompleted={setMiniQuizCompleted}
        setMiniQuizStep={setMiniQuizStep}
        currentQuizStep={currentQuizStep}
        showFact={showFact}
        showLifestyleSummary={showLifestyleSummary}
        showAttemptsSummary={showAttemptsSummary}
        eatingProfileSummaryKey={eatingProfileSummaryKey}
        isPlanApplied={isPlanApplied}
        setIsPlanApplied={setIsPlanApplied}
        setCurrentQuizStep={setCurrentQuizStep}
        lifestyleProfileSummaryKey={lifestyleProfileSummaryKey}
        setShowFact={setShowFact}
        setShowLifestyleSummary={setShowLifestyleSummary}
        attemptsProfileSummaryKey={attemptsProfileSummaryKey}
        setShowAttemptsSummary={setShowAttemptsSummary}
        recordAnswer={recordAnswer}
        expandedInsight={expandedInsight}
        setExpandedInsight={setExpandedInsight}
        advanceToNextStep={advanceToNextStep}
        setIsInsightAdded={setIsInsightAdded}
        showConfirmation={showConfirmation}
        getSectionTitle={getSectionTitle}
        getQuizProgress={getQuizProgress}
        desiredShape={desiredShape}
        setDesiredShape={setDesiredShape}
        setAnswers={setAnswers}
        finalGoals={finalGoals}
        setFinalGoals={setFinalGoals}
        analyzeAnswers={analyzeAnswers}
        answers={answers}
        sendSampleNow={sendSampleNow}
        setSendSampleNow={setSendSampleNow}
        setIsProcessingOrder={setIsProcessingOrder}
        isProcessingOrder={isProcessingOrder}
        setOrderDetails={setOrderDetails}
        orderFormRef={orderFormRef}
        orderDetails={orderDetails}
        letterAnswers={letterAnswers}
        lastClickedOption={lastClickedOption}
        userPath={userPath}
        setUserPath={setUserPath}
        setLastClickedOption={setLastClickedOption} />
      {![0, 1, 3, 16, 18].includes(currentStep) && <ScrollFade />}
      <StickyCta
        isVisible={isCtaVisible && (currentStep === 17 || currentStep === 20)}
        variant={currentStep === 17 ? 'full' : 'simplified'}
      />
    </>
  );
};