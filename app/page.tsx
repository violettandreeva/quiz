"use client"

import { useState } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Leaf, Users, Clock, Shield, ArrowRight } from "lucide-react"
import Image from "next/image"

/* ----------  LoadingPage.tsx (local component) ---------- */
interface LoadingPageProps {
  onComplete: () => void
}

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

  React.useEffect(() => {
    if (allComplete) {
      // Small pause so the user can see the finished list
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
    }, 500)

    return () => clearTimeout(id)
  }, [activeStep, allComplete, onComplete, steps.length])

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #f7fdf9, #fffdf5)" }}
    >
      {/* floating particles */}
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

      {/* header logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Heart className="w-8 h-8 text-green-600" />
        <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
      </div>

      {/* center card */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          {/* spinner & title */}
          <div className="flex items-center gap-3 mb-5 justify-center">
            <div
              className="w-8 h-8 border-[3px] border-green-600 border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: "1.2s" }}
            />
            <h3 className="text-lg font-semibold text-gray-800">Загрузка</h3>
          </div>

          {/* checklist */}
          <div className="space-y-3 mb-6">
            {steps.map((text, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 transition-all duration-500 ${idx <= activeStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* icon */}
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

                {/* text */}
                <span
                  className={`text-sm font-medium transition-colors duration-1000 ${idx === activeStep && !completed[idx]
                      ? "text-green-600 animate-pulse"
                      : completed[idx]
                        ? "text-gray-700"
                        : "text-gray-500"
                    }`}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* progress bar */}
          {!allComplete && (
            <div className="mb-6">
              <div className="w-full h-1 bg-gray-200 rounded-full">
                <div
                  className="h-1 bg-green-600 rounded-full transition-all duration-300"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* footer hint */}
          <p className="text-xs text-gray-500 text-center">Это займёт меньше минуты…</p>
        </div>
      </div>
    </div>
  )
}

interface QuizAnswer {
  questionId: string
  answer: string
  category: "eating" | "lifestyle" | "attempts"
}

interface Question {
  id: string
  category: "eating" | "lifestyle" | "attempts"
  question: string
  options: { text: string; emoji: string }[]
}

const quizQuestions: Question[] = [
  // Eating Section (3 questions)
  {
    id: "eating-1",
    category: "eating",
    question: "Вы проснулись в 9 часов утра в выходной, какой завтрак вы выберете?",
    options: [
      { text: "Яйца с жареными колбасками, тамале или пара булочек с кофе с сахаром", emoji: "🍳" },
      { text: "Тортильи или лепешки с начинкой: сладкой кукурузой, сыром, авокадо или вареньем", emoji: "🌯" },
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
      { text: "Сендвич с колбасками или свининой, пару эмпанад и газировка", emoji: "" },
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
      "Муж чем-то недоволен, а дети снова носятся по дому, вам как обычно сложно уследить за всем, как будете справляться со стрессом?",
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
      "Сегодня у вас много дел по дому, как и вчера, вы сильно устаете и объективно недосыпаете. Во сколько вы сегодня ляжете и проснетесь завтра?",
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

const explanationTexts = {
  text_90a: `Вам знакома ситуация, когда вкусная еда становится единственным утешением после трудного дня, а забота о себе откладывается на потом? Вы не одиноки. Миллионы женщин вашего возраста в Перу живут в постоянном водовороте дел, где на себя просто не хватает ни сил, ни времени. Организм, пытаясь справиться со стрессом и недосыпанием, требует быстрой энергии, а это часто приводит к выбору высококалорийной, но пустой еды. Отсюда и проблемы со здоровьем, и ощущение, что тело вас подводит. Вы пытаетесь что-то изменить, но циклы срывов и усталости выбивают из колеи. Это не ваша слабость, а результат того, что тело и мозг ищут кратчайший путь к "комфорту" в условиях постоянного напряжения. Многие ищут быстрое решение, потому что устали от бесконечных безуспешных попыток.`,
  text_90b: `Кажется, вы хорошо знакомы с тем, как неправильное питание влияет на ваше самочувствие, и уже чувствуете на себе последствия избыточного веса – боли, отеки, одышку. Вы понимаете, что многие из ваших привычек не идеальны, но разорвать этот круг бывает очень трудно. Возможно, вы осознаете, что нужен комплексный подход, но не знаете, как его реализовать в своей насыщенной жизни, где стресс и усталость постоянно берут верх.`,
  text_90c: `Кажется, вы стремитесь к более здоровому образу жизни, но сталкиваетесь с серьёзными препятствиями, которые не дают двигаться вперёд. Выбирая сладкое или фастфуд, вы ищете быстрый способ поднять настроение — но это лишь временно. Чувство усталости и недосып, частые боли в спине и суставах — это не просто возраст, а сигналы тела, что что-то идёт не так. Когда сил нет совсем, а спорт кажется испытанием, люди откладывают активность, а попытки диет заканчиваются срывами. Это распространённая проблема: организм истощён, а старые привычки, помогавшие справляться со стрессом, превратились в ловушку.`,
  text_80d: `Похоже, вы осознаёте важность здорового питания и стараетесь придерживаться его, но повседневная жизнь вносит свои коррективы. Отс��тствие серьёзных диагнозов объясняется тем, что вы ещё не довели себя до критического состояния, но уже ощущаете усталость, одышку и снижение энергии. Стресс и недосып, вызванные графиком и обязанностями, приводят к раздражительности и незапланированному перееданию. Многие женщины в вашей ситуации стесняются или не находят в себе сил для регулярной активности. Возникает замкнутый круг: вы знаете, что нужно делать, но найти устойчивую мотивацию трудно, особенно когда результаты приходят медленно.`,
  text_95d: `Вы производите впечатление человека, который хорошо контролирует свою жизнь и здоровье. Нет серьёзных проблем с весом или сопутствующими состояниями, вы умеете управлять стрессом и находить время для активности. Ваши пищевые привычки — осознанный выбор. Вы придерживаетесь целей и не поддаётесь распространённым искушениям. Это пример для подражания. Но, возможно, вам всё же чего-то не хватает — быстрого результата в условиях, если жизнь резко сменит темп, или гибкого инструмента поддержки на будущее.`,
  text_90a_b_end: `Ваши ответы показывают, что вы оказались в сложном замкнутом кругу, где питание усугубляет проблемы со здоровьем, а стресс и усталость ведут к ещё большему перееданию. Вы, вероятно, пытались диеты, но сильные привычки и "скрытые" соблазны дома приводят к срывам. Это типичная ситуация, когда человек чувствует себя бессильным перед тягой к еде и отсутствием энергии для стабильных изменений.`,
  text_only_ab: `Ваши ответы показывают, что еда — важный инструмент снятия напряжения. Вы уже ощущаете последствия: отеки, боли, нагрузка на сердце или дыхание. Попытки контролировать питание часто прерываются из‑за усталости и потребности в эмоциональном комфорте. Это распространённо, когда энергия на исходе, а мозг ищет быстрый наградный сигнал.`,
  text_c_then_ab: `Вы стараетесь питаться правильно и, возможно, периодически активны, но хроническая усталость и недосып подрывают усилия. Вы знаете "как надо", но режим дня и стресс мешают дисциплине. Это похоже на ситуацию, когда человек готов к изменениям, но внешние обстоятельства и внутреннее истощение мешают довести начатое до конца. Многие женщины в вашем возрасте через это проходят, временно теряя веру в свои силы.`,
  text_mix_dc_a: `Похоже, вы активный и занятый человек, который может пропускать приёмы пищи или питаться нерегулярно. Постоянная гонка и стресс приводят к тому, что вы компенсируете напряжение едой. Пока нет явных тяжёлых проблем, но вы чувствуете, что такой темп выматывает, и ищете простое решение для поддержки формы. Это типичный сценарий для тех, кто старается успеть всё и не хочет тратить часы на сложные методики похудения.`,
  text_fallback: `У вас смешанный профиль: разные привычки проявляются в разных блоках. Это означает, что нет одного "главного" барьера — есть несколько поменьше: усталость, стресс, несистемное питание и эпизоды компенсационного аппетита. Это даёт гибкость: достаточно устранить 1–2 ключевых триггера, чтобы сдвинуться вперёд.`,
}

const explanationRules = [
  {
    id: "95d",
    priority: 10,
    titlePattern: "ddd dddd ddd",
    check: (s: AnswerStats) => s.pct.d >= 0.95,
    text: explanationTexts.text_95d,
  },
  {
    id: "90a_with_b_end",
    priority: 9,
    titlePattern: "aaa aaaa bbb",
    check: (s: AnswerStats) => s.pct.a >= 0.9 && s.block3.every((l) => l === "b"),
    text: explanationTexts.text_90a_b_end,
  },
  {
    id: "90a",
    priority: 8,
    titlePattern: "aaa aaaa aaa",
    check: (s: AnswerStats) => s.pct.a >= 0.9,
    text: explanationTexts.text_90a,
  },
  {
    id: "90b",
    priority: 7,
    titlePattern: "bbb bbbb bbb",
    check: (s: AnswerStats) => s.pct.b >= 0.9,
    text: explanationTexts.text_90b,
  },
  {
    id: "90c",
    priority: 6,
    titlePattern: "ccc cccc ccc",
    check: (s: AnswerStats) => s.pct.c >= 0.9,
    text: explanationTexts.text_90c,
  },
  {
    id: "80d",
    priority: 5,
    titlePattern: "—",
    check: (s: AnswerStats) => s.pct.d >= 0.8 && s.pct.d < 0.95,
    text: explanationTexts.text_80d,
  },
  {
    id: "dda_ssda_aaa",
    priority: 4,
    titlePattern: "dda ssda aaa",
    check: (s: AnswerStats) => {
      const firstTwo = s.block1.concat(s.block2)
      const dc = firstTwo.filter((l) => l === "d" || l === "c").length
      const ab = firstTwo.length - dc
      return dc > ab && s.block3.filter((l) => l === "a").length >= 3
    },
    text: explanationTexts.text_mix_dc_a,
  },
  {
    id: "ssb_aaab_aab",
    priority: 3,
    titlePattern: "ssb aaab aab",
    check: (s: AnswerStats) => {
      const c1 = s.block1.filter((l) => l === "c").length
      const b2 = s.block2.every((l) => l === "a" || l === "b")
      const b3 = s.block3.every((l) => l === "a" || l === "b")
      return c1 >= 3 && b2 && b3
    },
    text: explanationTexts.text_c_then_ab,
  },
  {
    id: "bab_aaba_bbb",
    priority: 2,
    titlePattern: "bab aaba bbb",
    check: (s: AnswerStats) => s.all.every((l) => l === "a" || l === "b") && !(s.pct.a >= 0.9),
    text: explanationTexts.text_only_ab,
  },
  {
    id: "fallback",
    priority: 1,
    titlePattern: "mixed",
    check: (_s: AnswerStats) => true,
    text: explanationTexts.text_fallback,
  },
].sort((a, b) => b.priority - a.priority)

function pickExplanation(letters: string[]) {
  const stats = buildStats(letters)
  const rule = explanationRules.find((r) => r.check(stats))!
  return { pattern: rule.titlePattern, text: rule.text }
}

export default function WeightLossQuizApp() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [userProfile, setUserProfile] = useState<string>("")

  const [selectedGender, setSelectedGender] = useState<string>("")
  const [age, setAge] = useState<number | undefined>(undefined)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [weight, setWeight] = useState<number | undefined>(undefined)

  const [showBMIPage, setShowBMIPage] = useState(false)
  const [currentQuizStep, setCurrentQuizStep] = useState(0)

  const [miniQuizStep, setMiniQuizStep] = useState(0)
  const [miniQuizAnswers, setMiniQuizAnswers] = useState<Record<string, string | string[]>>({})
  const [miniQuizCompleted, setMiniQuizCompleted] = useState(false)

  const [showFact, setShowFact] = useState(false)
  const [showTestimonial1, setShowTestimonial1] = useState(false)

  const [showReassurance, setShowReassurance] = useState(false)
  const [pendingAnswer, setPendingAnswer] = useState<QuizAnswer | null>(null)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)

  const [letterAnswers, setLetterAnswers] = useState<string[]>([])

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

  const handleAnswer = (questionId: string, answer: string, category: "eating" | "lifestyle" | "attempts") => {
    const newAnswers = [...answers.filter((a) => a.questionId !== questionId), { questionId, answer, category }]
    setAnswers(newAnswers)

    // Track letter answers for explanation
    const question = quizQuestions[currentQuizStep]
    const optionIndex = question.options.findIndex((opt) => opt.text === answer)
    const letter = ["a", "b", "c", "d"][optionIndex] || "a"

    const newLetterAnswers = [...letterAnswers]
    newLetterAnswers[currentQuizStep] = letter
    setLetterAnswers(newLetterAnswers)

    if (currentQuizStep === 2) {
      // After third eating question, show fact screen
      setShowFact(true)
      return
    } else if (currentQuizStep === 6) {
      // After lifestyle questions, show fact2
      setCurrentStep(9)
      return
    } else if (currentQuizStep === 9) {
      // After attempts questions, show fact3
      setCurrentStep(11)
      return
    } else {
      setCurrentQuizStep(currentQuizStep + 1)
    }
  }

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
    const msg = reassuranceMessages[q.id]?.[optionText]
    if (msg) {
      setPendingAnswer({ questionId: q.id, answer: optionText, category: q.category })
      setPendingMessage(msg)
      setShowReassurance(true)
    } else {
      handleAnswer(q.id, optionText, q.category)
    }
  }

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-11 mt-5 mr-2 ml-2">
              Обретите фигуру мечты всего за 10 вопросов
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <p className="text-xl text-green-700 font-semibold my-2 text-center">
                Тест прошли уже более 20000 женщин по всему миру{" "}
              </p>
              <div className="flex -space-x-2 overflow-hidden justify-center flex-wrap">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Woman avatar 1"
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-sm"
                />
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Woman avatar 2"
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-sm"
                />
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Woman avatar 3"
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-sm"
                />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 text-lg leading-relaxed py-1.5 mx-0">
                Добро пожаловать на один из самых точных тестов, помогающий найти причины, по которым лишний вес не
                уходит. В конце вы получите персонализированный план. Он может включать рекомендации по питанию/режиму и натуральные добавки, которые помогут вам достичь желаемого результата.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <Clock className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 my-0 py-3">{"Менее 5 минут"} </span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">100% Анонимно</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <Leaf className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Натуральные решения</span>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep(1)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all my-4"
            >
              Начать прямо сейчас
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Более 1,340+ женщин в Перу уже получили персональные рекомендации совершенно бесплатно </span>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Индивидуальный подход </h3>
              </div>
              <p className="text-gray-600">
                Каждая женщина уникальна. Наш анализ учитывает ваш образ жизни, стресс и прошлый опыт, чтобы предоставить
                вам конкретные рекомендации, с которыми вы сможете достичь наилучший результат в кратчайшие сроки.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-peach-600" />
                </div>
                <h3 className="font-semibold text-gray-800">100% Одобрено нутрициологами </h3>
              </div>
              <p className="text-gray-600">
                Наши рекомендации предоставляют самые безопасные и натуральные методы, которые были созданы при участии
                ведущих нутрициологов страны для гарантированного результата без вреда для здоровья.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderBasicsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mb-8"></div>

        {/* Question Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center leading-relaxed">
              Let us know some basics
            </h2>

            {/* Gender Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedGender === "female"
                    ? "border-green-500 bg-green-100"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                onClick={() => setSelectedGender("female")}
              >
                <Image
                  src="/placeholder.svg?height=64&width=64"
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
                onClick={() => setSelectedGender("male")}
              >
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Male"
                  width={64}
                  height={64}
                  className="mb-2 rounded-full"
                />
                <span className="text-gray-700 font-medium">Male</span>
              </div>
            </div>

            {/* Age Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                min={18}
                max={60}
                step={1}
                onChange={(e) => setAge(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Height and Weight Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height cm</label>
                <input
                  type="number"
                  placeholder="Enter height"
                  min={130}
                  max={220}
                  step={1}
                  onChange={(e) => setHeight(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight kg</label>
                <input
                  type="number"
                  placeholder="Enter weight"
                  min={40}
                  max={180}
                  step={1}
                  onChange={(e) => setWeight(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Next Button */}
            <Button
              onClick={() => setShowBMIPage(true)}
              disabled={!selectedGender || !age || !height || !weight}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderBMIPage = () => {
    if (!selectedGender || !age || !height || !weight) {
      return null
    }

    const BMI_TABLE = {
      female: { "18-29": 22, "30-44": 23, "45-60": 24 },
      male: { "18-29": 23, "30-44": 24, "45-60": 25 },
    }

    const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10

    let ageBand = "18-29"
    if (age >= 30 && age <= 44) ageBand = "30-44"
    else if (age >= 45) ageBand = "45-60"

    const meanBMI = BMI_TABLE[selectedGender as keyof typeof BMI_TABLE][ageBand as keyof typeof BMI_TABLE.female]
    const diff = Math.round(((bmi - meanBMI) / meanBMI) * 100)
    const comparison = diff > 0 ? "higher" : "lower"

    const getBMICategory = (bmi: number) => {
      if (bmi < 18.5) return "Underweight"
      if (bmi < 25) return "Normal weight"
      if (bmi < 30) return "Overweight"
      return "Obese"
    }

    const markerPosition = Math.min(Math.max((bmi / 40) * 100, 0), 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center py-3">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mb-8"></div>

          {/* BMI Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Your Body Mass Index (BMI) </h2>
              </div>

              <Card className="rounded-xl bg-muted/5 shadow-md p-6 space-y-5 max-w-[440px] mx-auto mb-8">
                {/* Badge and marker section */}
                <div className="relative">
                  {/* Badge positioned above the scale */}
                  <div
                    className="absolute -top-12 transform -translate-x-1/2 z-10"
                    style={{ left: `${markerPosition}%` }}
                  >
                    <Badge className="bg-slate-800 text-white rounded-full px-4 py-1">You – {bmi}</Badge>
                  </div>

                  {/* Vertical dotted line */}
                  <div
                    className="absolute -top-12 h-12 border-l border-dashed border-muted transform -translate-x-1/2"
                    style={{ left: `${markerPosition}%` }}
                  ></div>

                  {/* Gradient bar */}
                  <div className="relative">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-emerald-500 via-amber-400 to-rose-500"></div>

                    {/* Circular marker */}
                    <div
                      className="absolute top-1/2 w-5 h-5 border-2 border-white bg-slate-800 shadow rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${markerPosition}%` }}
                    ></div>
                  </div>

                  {/* Tick labels */}
                  <div className="flex justify-between text-xs mt-2 px-1">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>

                {/* Category labels */}
                <div className="flex justify-between text-xs uppercase tracking-wide">
                  {["Underweight", "Normal", "Overweight", "High"].map((cat) => (
                    <span key={cat} className={cat === getBMICategory(bmi) ? "font-bold text-primary" : ""}>
                      {cat}
                    </span>
                  ))}
                </div>

                {/* WHO Classification label */}
                <div className="text-center">
                  <span className="text-xs text-gray-500">Classification based on WHO guidelines</span>
                </div>

                {/* Dynamic cards based on BMI category */}
                {(() => {
                  const category = getBMICategory(bmi)
                  let healthNote = ""
                  let goodNews = ""

                  if (bmi < 18.5) {
                    // Underweight
                    healthNote = "Below the comfortable range: possible nutrient deficiencies and hormonal imbalances."
                    goodNews = "A small increase in calories and protein can quickly bring you back to normal."
                  } else if (bmi >= 18.5 && bmi < 25) {
                    // Normal
                    healthNote = "BMI is in the healthy range, but it doesn't show body composition or stress level."
                    goodNews = "Maintain sleep, movement, and protein — that keeps metabolism active."
                  } else if (bmi >= 25 && bmi < 30) {
                    // Overweight
                    healthNote = "Higher risk of hypertension and insulin resistance if weight stays the same."
                    goodNews = "Losing just 5–7% of your weight noticeably lowers blood pressure and sugar cravings."
                  } else {
                    // High (Obese)
                    healthNote = "Heavy load on heart and joints; risk of type 2 diabetes increases."
                    goodNews = "The first −3–4 kg reduce inflammation and improve sleep — a great start."
                  }

                  return (
                    <>
                      {/* Health note card */}
                      <div className="rounded bg-amber-50 p-4 flex gap-3">
                        <div className="w-5 h-5 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          !
                        </div>
                        <div className="text-sm">
                          <span className="font-bold">Health note:</span> {healthNote}
                        </div>
                      </div>

                      {/* Good news card */}
                      <div className="rounded bg-emerald-50 p-4 flex gap-3">
                        <div className="w-5 h-5 bg-emerald-400 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          !
                        </div>
                        <div className="text-sm">
                          <span className="font-bold">Good news:</span> {goodNews}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </Card>

              {/* Population comparison fact box */}
              {(() => {
                let comparisonText = ""

                if (bmi < 18.5) {
                  comparisonText = "Your value is below average for your age group."
                } else if (bmi >= 18.5 && bmi < 25) {
                  comparisonText = "Your value matches the average level for your age group."
                } else if (bmi >= 25 && bmi < 30) {
                  comparisonText = "Your value is slightly above average among women your age."
                } else {
                  comparisonText = "Your value is noticeably above the average for your age group."
                }

                return (
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                    <p>{comparisonText}</p>
                  </div>
                )
              })()}
              <div className="text-center space-y-2 mb-8"></div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
                <Button
                  onClick={() => setShowBMIPage(false)}
                  variant="outline"
                  className="w-full sm:flex-1 text-gray-500 hover:text-gray-700 py-3 text-lg rounded-full opacity-60 hover:opacity-100 border-2 border-gray-300 hover:border-gray-400"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    setShowBMIPage(false)
                    setCurrentStep(2) // Move to pre-questionnaire intro page
                  }}
                  className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
                >
                  Звучит реалистично!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderMotivationPage = () => (
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
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Вы не одиноки</h2>

            <div className="space-y-4 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Исследования показывают, что 87% женщин сталкиваются с теми же трудностями в похудении, что и вы. Это не
                ваша вина — современный ритм жизни, стресс и гормональные изменения создают реальные препятствия.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Но есть хорошие новости: тысячи женщин уже нашли решение с помощью наших персонализированных рекомендаций.
                Они смогли достичь своих целей, и вы тоже сможете!
              </p>
            </div>

            {/* Image Gallery */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Image
                src="/placeholder.svg?height=90&width=140"
                alt="Success story 1"
                width={140}
                height={90}
                className="rounded-lg shadow-sm"
              />
              <Image
                src="/placeholder.svg?height=90&width=140"
                alt="Success story 2"
                width={140}
                height={90}
                className="rounded-lg shadow-sm"
              />
              <Image
                src="/placeholder.svg?height=90&width=140"
                alt="Success story 3"
                width={140}
                height={90}
                className="rounded-lg shadow-sm"
              />
            </div>

            <p className="text-sm font-medium text-center mb-2">Гарантированный результат наших рекомендаций для вас*</p>

            <p className="text-xs text-center text-gray-400 mb-8">* Индивидуальные результаты могут отличаться</p>

            <Button
              onClick={() => setCurrentStep(14)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
            >
              Перейти к рекомендациям
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPreQuestionnaireIntroPage = () => (
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
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Сделаем рекомендации ещё точнее</h2>

            <p className="text-gray-700 text-lg text-center mb-6">
              Мы уже знаем ваш рост, вес и цель. Осталось учесть особенности питания, гормонального фона и возможные
              ограничения, чтобы рецепт действительно подошёл именно вам.
            </p>

            {/* Icon Grid */}
            <div className="flex justify-center mb-6 flex-wrap gap-x-5">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  🍼
                </div>
                <span className="text-xs text-center px-0 mx-0">{"Беременность"}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  🥦
                </div>
                <span className="text-xs text-center">Рацион</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  💊
                </div>
                <span className="text-xs text-center">Таблетки</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  🔥
                </div>
                <span className="text-xs text-center">Гормоны</span>
              </div>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
            >
              Продолжить
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

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
            <CardContent className="px-8 py-10">
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {miniQuizStep === 4 ? "Finish" : "Next"}
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

        {/* Hero Illustration */}
        <Image
          src="/placeholder.svg?height=160&width=240"
          alt="Illustration"
          width={240}
          height={160}
          className="mx-auto mb-8"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Мы почти готовы! Осталось ответить на 10 коротких вопросов
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Ваши ответы помогут нам подобрать рекомендации с точностью до деталей. Пожалуйста, отвечайте максимально честно
          — здесь нет "правильных" или "неправильных" вариантов, а всё, что вы укажете, хранится строго конфиденциально.
        </p>

        <Button
          onClick={() => setCurrentStep(5)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full text-lg mb-3"
        >
          Начать опрос
        </Button>

        {/* Helper Text */}
      </div>
    </div>
  )

  const renderQuizQuestion = () => {
    const question = quizQuestions[currentQuizStep]
    if (!question) return null

    if (showFact) {
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

            {/* Progress Bar */}

            {/* Fact Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="font-semibold text-green-600 text-2xl mb-5">{"Факт"}</h2>
                </div>

                {/* Image Block */}
                <div className="mb-6 text-center">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Latin American nutrition statistics"
                    width={300}
                    height={200}
                    className="mx-auto rounded-lg shadow-sm"
                  />
                </div>

                {/* Fact Box */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold">{""}</span> В Латинской Америке более 50% людей имеют избыточный вес, а
                  распространённость ожирения среди взрослых составляет 24,2%. Это напрямую связано с нездоровым питанием,
                  сладкими напитками и частыми перекусами.
                  <p className="mt-2 text-xs text-gray-500">
                    Источник:{" "}
                    <a
                      href="https://www.unicef.org/lac/media/42906/file/Social%20norms,%20nutrition%20and%20body%20image%20in%20latin%20america%20and%20the%20caribbean.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      UNICEF (региональный отчёт)
                    </a>
                  </p>
                </div>

                {/* Continue Button */}
                <div className="mt-8">
                  <Button
                    onClick={() => {
                      setShowFact(false)
                      setShowTestimonial1(true)
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
                  >
                    Продолжить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (showTestimonial1) {
      return renderFirstTestimonialPage()
    }

    if (showReassurance && pendingMessage && pendingAnswer) {
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

            {/* Reassurance Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{pendingMessage}</p>
                </div>

                <Button
                  onClick={() => {
                    handleAnswer(pendingAnswer.questionId, pendingAnswer.answer, pendingAnswer.category)
                    setShowReassurance(false)
                    setPendingAnswer(null)
                    setPendingMessage(null)
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
                >
                  Продолжить
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

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
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso: {Math.round(getQuizProgress())}%</span>
              <span>{currentQuizStep + 1}/10</span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex gap-1 h-2">
              {/* Segment 1: Questions 1-3 */}
              <div className="flex-[3] bg-gray-200 rounded-l-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all duration-300 ease-out"
                  style={{
                    width: currentQuizStep < 3 ? `${((currentQuizStep + 1) / 3) * 100}%` : "100%",
                  }}
                ></div>
              </div>

              {/* Segment 2: Questions 4-7 */}
              <div className="flex-[4] bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all duration-300 ease-out"
                  style={{
                    width:
                      currentQuizStep < 3 ? "0%" : currentQuizStep < 7 ? `${((currentQuizStep - 2) / 4) * 100}%` : "100%",
                  }}
                ></div>
              </div>

              {/* Segment 3: Questions 8-10 */}
              <div className="flex-[3] bg-gray-200 rounded-r-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all duration-300 ease-out"
                  style={{
                    width: currentQuizStep < 7 ? "0%" : `${((currentQuizStep - 6) / 3) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-semibold text-green-600 text-2xl mb-5">{getSectionTitle()}</h2>
                <h3 className="font-medium text-gray-800 leading-relaxed text-lg">{question.question}</h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => onSelectAnswer(question, option.text)}
                    className="flex items-center gap-4 p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all border-2 rounded-3xl"
                  >
                    <div className="text-2xl">{option.emoji}</div>
                    <span className="text-gray-700 flex-1">{option.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderFirstTestimonialPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>

        {/* Testimonial Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-green-600 text-2xl mb-5">Результат Элены </h2>
            </div>

            {/* Image */}
            <div className="mb-6 text-center">
              <Image
                src="/placeholder.svg?height=140&width=140"
                alt="Testimonial participant"
                width={140}
                height={140}
                className="mx-auto rounded-full shadow-sm"
              />
            </div>
            {/* Result text */}
            <div className="mb-4 text-center"></div>
            {/* Quote */}
            <div className="mb-6 text-center">
              <p className="text-gray-700 text-lg italic leading-relaxed">
                "Я думала, что проблема только в моей силе воли. Оказалось, дело было в неправильном подходе к питанию и
                постоянном стрессе."
              </p>
            </div>

            {/* Bullet List */}
            <div className="mb-8 bg-green-50 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Сбросила 7,5 кг за полтора месяца</li>
                <li>• Перестала заедать стресс</li>
                <li>• Улучшился сон и энергия</li>
                <li>• Не сидела на жестких диетах </li>
              </ul>
            </div>

            {/* Continue Button */}
            <div className="mt-8">
              <Button
                onClick={() => {
                  setShowTestimonial1(false)
                  setCurrentQuizStep(3)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
              >
                Продолжить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderFactPage2 = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso: {Math.round(getQuizProgress())}%</span>
            <span>{currentQuizStep + 1}/10</span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex gap-1 h-2">
            {/* Segment 1: Questions 1-3 */}
            <div className="flex-[3] bg-gray-200 rounded-l-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{
                  width: currentQuizStep < 3 ? `${((currentQuizStep + 1) / 3) * 100}%` : "100%",
                }}
              ></div>
            </div>

            {/* Segment 2: Questions 4-7 */}
            <div className="flex-[4] bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{
                  width:
                    currentQuizStep < 3 ? "0%" : currentQuizStep < 7 ? `${((currentQuizStep - 2) / 4) * 100}%` : "100%",
                }}
              ></div>
            </div>

            {/* Segment 3: Questions 8-10 */}
            <div className="flex-[3] bg-gray-200 rounded-r-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{
                  width: currentQuizStep < 7 ? "0%" : `${((currentQuizStep - 6) / 3) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Fact Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-green-600 text-2xl mb-5">Факт</h2>
            </div>

            {/* Image Block */}
            <div className="mb-6 text-center">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Sleep and weight statistics"
                width={300}
                height={200}
                className="mx-auto rounded-lg shadow-sm"
              />
            </div>

            {/* Fact Box */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
              Хронический стресс и недостаток сна существенно усложняют похудение, так как увеличивают выработку гормона
              кортизола, стимулирующего аппетит, и снижают уровень гормона лептина, отвечающего за чувство насыщения, что
              приводит к перееданию и замедлению метаболизма. Как результат, избыточный вес значительно повышает риски
              развития таких заболеваний, как диабет, высокое кровяное давление и проблемы с суставами.
              <p className="mt-2 text-xs text-gray-500">
                Источник:{" "}
                <a
                  href="https://www.sleepfoundation.org/physical-health/weight-loss-and-sleep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Сон и потеря веса (статья)
                </a>
                ,{" "}
                <a
                  href="https://www.healthline.com/health/stress/stress-and-weight-gain#diagnosis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Стресс и потеря веса (статья)
                </a>
              </p>
            </div>

            {/* Continue Button */}
            <div className="mt-8">
              <Button
                onClick={() => {
                  setCurrentQuizStep(7)
                  setCurrentStep(5)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
              >
                Продолжить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderFactPage3 = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso: {Math.round(getQuizProgress())}%</span>
            <span>{currentQuizStep + 1}/10</span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex gap-1 h-2">
            {/* Segment 1: Questions 1-3 */}
            <div className="flex-[3] bg-gray-200 rounded-l-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{
                  width: currentQuizStep < 3 ? `${((currentQuizStep + 1) / 3) * 100}%` : "100%",
                }}
              ></div>
            </div>

            {/* Segment 2: Questions 4-7 */}
            <div className="flex-[4] bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{
                  width:
                    currentQuizStep < 3 ? "0%" : currentQuizStep < 7 ? `${((currentQuizStep - 2) / 4) * 100}%` : "100%",
                }}
              ></div>
            </div>

            {/* Segment 3: Questions 8-10 */}
            <div className="flex-[3] bg-gray-200 rounded-r-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{
                  width: currentQuizStep < 7 ? "0%" : `${((currentQuizStep - 6) / 3) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Fact Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-green-600 text-2xl mb-5">Факт</h2>
            </div>

            {/* Image Block */}
            <div className="mb-6 text-center">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Diet statistics"
                width={300}
                height={200}
                className="mx-auto rounded-lg shadow-sm"
              />
            </div>

            {/* Fact Box */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
              Многим женщинам крайне сложно отказаться от вредной еды из-за эмоциональной зависимости и чувства вины после
              переедания. Поддержание диеты становится особенно трудным в условиях семьи, где доступность любимых, но
              нездоровых продуктов для детей постоянно провоцирует срывы. В сочетании с хронической усталостью и нехваткой
              времени на спорт, это создает замкнутый круг, мешающий достичь желаемого веса.
              <p className="mt-2 text-xs text-gray-500">
                Источник:{" "}
                <a
                  href="https://www.healthline.com/health/emotional-eating"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Еда на эмоциях: Что вам следует знать
                </a>
              </p>
            </div>

            {/* Continue Button */}
            <div className="mt-8">
              <Button
                onClick={() => {
                  setCurrentStep(12)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full"
              >
                Продолжить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTransitionPage = () => (
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
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-green-600 text-2xl mb-5">Последний вопрос</h2>
              <h3 className="font-medium text-gray-800 leading-relaxed text-lg">
                Если бы ты имела вес своей мечты, что бы ты сделала сейчас?
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-4">
              <div
                onClick={() => {
                  analyzeAnswers(answers)
                  setCurrentStep(13)
                }}
                className="flex items-center gap-4 p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all border-2 rounded-3xl"
              >
                <span className="text-gray-700 flex-1">Надела бы любимое платье, в которое уже не влезаю</span>
              </div>
              <div
                onClick={() => {
                  analyzeAnswers(answers)
                  setCurrentStep(13)
                }}
                className="flex items-center gap-4 p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all border-2 rounded-3xl"
              >
                <span className="text-gray-700 flex-1">
                  Сходила бы в бассейн или поехала на пляж, чтобы поплавать в бикини
                </span>
              </div>
              <div
                onClick={() => {
                  analyzeAnswers(answers)
                  setCurrentStep(13)
                }}
                className="flex items-center gap-4 p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all border-2 rounded-3xl"
              >
                <span className="text-gray-700 flex-1">Поиграла бы с детьми в догонялки</span>
              </div>
              <div
                onClick={() => {
                  analyzeAnswers(answers)
                  setCurrentStep(13)
                }}
                className="flex items-center gap-4 p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all border-2 rounded-3xl"
              >
                <span className="text-gray-700 flex-1">
                  Выделила бы время досугу и обошла любимые улицы города пешком
                </span>
              </div>
              <div
                onClick={() => {
                  analyzeAnswers(answers)
                  setCurrentStep(13)
                }}
                className="flex items-center gap-4 p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all border-2 rounded-3xl"
              >
                <span className="text-gray-700 flex-1">Начала бы жить более активной жизнью</span>
              </div>
              <div
                onClick={() => {
                  analyzeAnswers(answers)
                  setCurrentStep(13)
                }}
                className="flex items-center gap-4 p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all border-2 rounded-3xl"
              >
                <span className="text-gray-700 flex-1">
                  Начала бы <strong>жить</strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderExplanationPage = () => {
    // Derive letters per answer
    const letters: string[] = answers.map((a) => {
      // @ts-ignore optional letter
      if (a.letter && ["a", "b", "c", "d"].includes(a.letter)) return a.letter
      const q = quizQuestions.find((qz) => qz.id === a.questionId)
      if (!q) return "a"
      const idx = q.options.findIndex((o) => o.text === a.answer)
      return ["a", "b", "c", "d"][idx] || "a"
    })

    while (letters.length < 10) letters.push("a")

    const block1 = letters.slice(0, 3)
    const block2 = letters.slice(3, 7)
    const block3 = letters.slice(7, 10)

    const freq: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 }
    letters.forEach((l) => {
      if (freq[l] !== undefined) freq[l]++
    })
    const total = letters.length || 1
    const pct = (l: string) => Math.round((freq[l] / total) * 100)

    const patternAll = (arr: string[], l: string) => arr.every((x) => x === l)
    const majority = (l: string, th: number) => pct(l) >= th
    const onlyLetters = (allowed: string[]) => letters.every((l) => allowed.includes(l))
    const countIn = (arr: string[], l: string) => arr.filter((x) => x === l).length

    let title = ""
    let intro = ""
    let blocks: { icon?: string; title?: string; text: string }[] = []
    let list: string[] = []
    let footerNote = ""

    if ((patternAll(block1, "a") && patternAll(block2, "a") && patternAll(block3, "a")) || majority("a", 90)) {
      title = "Эмоциональное питание & усталость"
      intro =
        'Стресс, недосып и отсутствие времени толкают вас к "быстрой энергии". Это не слабость, а реакция нервной системы.'
      blocks = [
        {
          title: "Что происходит",
          text: "Организм ищет комфорт и быстрое топливо — сладкое, кофе с добавками, перекусы.",
        },
        { title: "Почему тяжело менять", text: "Усталость → тяга к калориям → чувство вины → ещё больше стресса." },
        { title: "Вы не одни", text: "Тысячи женщин в Перу живут в режиме постоянного напряжения и знают этот цикл." },
      ]
      list = [
        "Фокус сначала на восстановлении сна и энергии",
        "Мини‑замены вместо жёстких запретов",
        "Стабильные приёмы белка — против скачков голода",
      ]
      footerNote = "Быстрое решение ищут те, кто выгорел на многочисленных попытках — это нормально."
    } else if ((patternAll(block1, "b") && patternAll(block2, "b") && patternAll(block3, "b")) || majority("b", 90)) {
      title = "Накопленные последствия"
      intro = "Вы уже чувствуете тело: отёки, одышку, дискомфорт. Понимание есть — системы пока нет."
      blocks = [
        {
          title: "Замкнутый круг",
          text: "Стресс и усталость мешают готовить и двигаться → питание упрощается → самочувствие падает.",
        },
        {
          title: "Ваш ресурс",
          text: "Осознанность уже есть — нужно превратить её в простую последовательность действий.",
        },
      ]
      list = [
        "1 микро‑изменение за раз (например, завтрак с белком)",
        'План "готового выбора" для перекусов',
        "Лёгкая ежедневная активность вместо редких тяжёлых тренировок",
      ]
    } else if ((patternAll(block1, "c") && patternAll(block2, "c") && patternAll(block3, "c")) || majority("c", 90)) {
      title = "Истощение и ловушка привычек"
      intro = 'Вы хотите лучше, но тело истощено: сон, энергия, суставы. Старые "утешители" стали тормозом.'
      blocks = [
        {
          title: "Сигналы тела",
          text: 'Усталость, боли, тяга к фастфуду — маркеры перегрузки, а не просто "характер".',
        },
        { title: "Почему срывы", text: "Недовосстановление делает дисциплину хрупкой: мозг выбирает быстрый дофамин." },
      ]
      list = [
        "Сначала восстановить базу: сон + гидратация",
        'Мягкие растяжки / шаги до "спорта"',
        "Добавлять, а не вычитать: клетчатка, белок",
      ]
    } else if (majority("d", 95) || (patternAll(block1, "d") && patternAll(block2, "d") && patternAll(block3, "d"))) {
      title = "Высокий контроль и ресурс"
      intro = "У вас сформированы устойчивые привычки и самоконтроль. Вы близки к оптимуму."
      blocks = [
        { title: "Задача сейчас", text: 'Поддержать результат и иметь "быстрый план" на периоды стресса.' },
        { title: "Риск", text: "Перегореть от перфекционизма или пропустить ранние сигналы усталости." },
      ]
      list = [
        "Цифровые контрольные точки (сон, шаги, настроение)",
        "Периодизация питания/нагрузки",
        'Готовый "антикризисный" день с минимальным усилием',
      ]
    } else if (majority("d", 80)) {
      title = "Осознание без стабильной энергии"
      intro = 'Вы знаете "что правильно", но быт и недосып тянут назад.'
      blocks = [
        { title: "Почему буксуете", text: "Энергия низкая → сложно держать стабильность → разовые переедания." },
        { title: "Что важно", text: "Снизить когнитивную нагрузку: меньше решений — больше автоматизмов." },
      ]
      list = [
        "2–3 повторяемых базовых приёма пищи",
        '"Окно восстановления" перед сном (30–40 мин без гаджетов)',
        "Небольшие активные паузы вместо редких долгих тренировок",
      ]
    } else if (onlyLetters(["a", "b"]) && block3.every((l) => l === "a" || l === "b")) {
      title = "Комфорт‑еда и последствия"
      intro = "Питание помогает эмоциям, но тело уже подаёт сигналы перегрузки."
      blocks = [
        { title: "Привычка", text: "Стресс → быстрый вкусный стимул → краткое облегчение." },
        { title: "Цена", text: "Отёки, усталость, скачки сахара — замедленное восстановление." },
      ]
      list = [
        '"Парные привычки": стресс + короткое движение / дыхание',
        'Белковая "подложка" перед сладким',
        "Планируем удовольствия, не запрещаем",
      ]
    } else if (countIn(block1, "c") > 2 && onlyLetters(["a", "b", "c"]) && !letters.includes("d")) {
      title = "Готовность есть — ресурсов мало"
      intro = "У вас есть желание и, возможно, знания, но хроническая усталость срывает дисциплину."
      blocks = [
        { title: "Корень", text: "Энергетический дефицит восстановления, а не силы воли." },
        { title: "Что даёт прогресс", text: "Микро‑ритуалы сна и питания + трекинг пары простых метрик." },
      ]
      list = [
        "Одинаковое время подъёма 5–6 дней в неделю",
        "Мини‑утро: вода + белок",
        "Порог входа в активность ≤5 минут",
      ]
    } else {
      title = "Смешанный профиль"
      intro = "Есть элементы усталости, эмоционального питания и поиска контроля."
      blocks = [
        { title: "Фокус", text: 'Собрать "минимальный каркас": сон, вода, белок, шаги.' },
        { title: "Дальше", text: "Точечно корректировать эмоциональные паттерны." },
      ]
      list = [
        "1 базовая привычка каждые 5–7 дней",
        "Отслеживать настроение vs перекусы",
        "Постепенное усложнение активности",
      ]
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">{title}</h2>
            <p className="text-gray-700 text-base leading-relaxed mb-6">{intro}</p>

            <div className="space-y-4 mb-6">
              {blocks.map((b, i) => (
                <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-4">
                  {b.title && <h3 className="font-semibold text-gray-800 mb-1">{b.title}</h3>}
                  <p className="text-gray-700 text-sm leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>

            {list.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-2">Что делать сейчас</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {list.map((li, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-0.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {footerNote && (
              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 leading-relaxed">{footerNote}</div>
            )}

            <button
              onClick={() => setCurrentStep(15)}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-full text-lg transition-colors"
            >
              Согласны?
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderResultPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-8">
          {/* Page Headline */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Your personalized plan is ready!</h2>

          {/* Intro Paragraph */}
          <p className="text-gray-700 text-lg leading-relaxed italic text-center mb-8">
            Based on your answers, you're facing at least two factors that strongly slow down metabolism: irregular meals
            and elevated stress levels. In such cases nutritionists advise starting not with strict diets or exhausting
            workouts, but with a gentle nutrition‑adjustment plan and supporting the body through safe micronutrients and
            plant complexes.
          </p>

          {/* Cards Container */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Natural Ingredients Card */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🍃</span>
                <h3 className="text-xl font-semibold text-gray-800">Natural ingredients</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  African mango
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Guarana
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Green tea
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Apple cider vinegar
                </li>
              </ul>
            </div>

            {/* How They Help Card */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⚙️</span>
                <h3 className="text-xl font-semibold text-gray-800">How they help</h3>
              </div>
              <ul className="space-y-3 text-gray-700 mb-4">
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✅</span>
                  Controls appetite
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✅</span>
                  Reduces sugar cravings
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✅</span>
                  Gently boosts fat burning\
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✅</span>
                  Decreases fluid retention
                </li>
              </ul>
              <p className="text-sm text-gray-500 italic\">No strain on the heart or nervous system.</p>
            </div>
          </div>

          {/* Closing Quote */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-6 mb-8">
            <p className="text-gray-700 leading-relaxed italic">
              \ "This approach gently resets your metabolism, lowers stress‑related food cravings, and prevents setbacks.
              It's the very path most women follow to shed excess weight safely and without harsh restrictions."
            </p>
          </div>
        </div>

        {/* CTA Block */}
        <div className="text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We'll hand‑pick the safest 100% natural supplements for you and give easy nutrition tips. Ready to see your
            plan?
          </p>
          <Button
            onClick={() => setCurrentStep(16)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Yes, let's continue
          </Button>
        </div>
      </div>
    </div>
  )

  const renderOfferPage = () => (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 p-4 relative overflow-hidden">
            {/* Floating dots animation background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-green-400 rounded-full animate-pulse"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                animationDuration: "8s",
            }}
                    ></div>
        ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center py-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Heart className="w-8 h-8 text-green-600" />
                        <span className="text-2xl font-bold text-gray-800">NaturalSlim</span>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 md:p-12 mb-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-6">\
                                We have found a solution that has already helped twelve thousand women in Peru lose excess weight
                            </h1>
                            <p className="text-xl md:text-2xl font-medium text-gray-600 mb-8">\
                                100% natural • Safe for hypertension and diabetes • First results in 7–10 days
                            </p>
                            <Button
                                className="bg-[#38B000] hover:bg-[#2F9000] text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 mb-4"
                            onClick={() => {
                                document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
                            }}
              >
                            Get −50% and personal plan
                        </Button>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="relative">
                            <Image
                                src="/placeholder.svg?height=400&width=300"
                                alt="Esbelita natural weight loss supplement bottle"
                                width={300}
                                height={400}
                                className="drop-shadow-2xl"
                            />
                            <div className="absolute -top-4 -right-4 bg-[#FFCF00] text-gray-800 font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                            −50%
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Benefits List */ }
    <div className="bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 md:p-12 mb-8" >
        <div className="grid md:grid-cols-2 gap-6">
            {[
                "100% plant-based formula – no hormones, no chemicals, no dependency",
            "Clinically gentle – compatible with hypertension, diabetes and most medication (doctor consultation advised)",
            "Visible results – stimulates gentle fat burning, reduces water retention",
            "Cuts sugar cravings and calms food anxiety",
            "Realistic pace – up to 2–4 kg per month without drastic changes",
            "Holistic impact – weight, hormones, energy, sleep and mood in one course",
            "Cost-effective – cheaper than a daily coffee; full course, no hidden upsells"
            ].map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#38B000] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" 
                    />
                </svg>
            </div>
            <p className="text-gray-700 leading-relaxed">{benefit}</p>
        </div>
            ))
}
          </div >
        </div >

    {/* Urgency Banner */ }
    <div className = "bg-[#FFEF87] border border-yellow-300 rounded-2xl p-4 mb-8 text-center" >
          <p className="text-gray-800 font-medium mb-2">
            Summer rush: only 47 bottles left. Your −50% coupon is reserved for 15 minutes.
          </p>
          <div className="flex justify-center gap-2">\
            <div className="bg-white px-3 py-1 rounded-lg shadow-sm font-bold text-gray-800">14</div>
            <span className="font-bold text-gray-800">:</span>
            <div className="bg-white px-3 py-1 rounded-lg shadow-sm font-bold text-gray-800">32</div>
          </div>
        </div >

    {/* Product & Form Block */ }
    < div id = "order-form" className = "bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 md:p-12 mb-8" >
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Card */}
            <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-peach-50 rounded-2xl p-6 shadow-md relative">
                    <div className="absolute -top-3 -right-3 bg-[#FFCF00] text-gray-800 font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                        Best Seller
                    </div>
                    <div className="text-center">
                        <Image
                            src="/placeholder.svg?height=250&width=180"
                            alt="Esbelita natural weight loss supplement - best seller"
                            width={180}
                            height={250}
                            className="mx-auto mb-4 drop-shadow-lg"
                        />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Esbelita Natural</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Complete 30-day course with African mango, guarana, green tea and apple cider vinegar.
                            Gentle metabolism support for sustainable weight management.
                        </p>
                    </div>
                </div>
            </div>

            {/* Lead Capture Form */}
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Secure your discount now</h3>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#38B000] focus:border-[#38B000]"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#38B000] focus:border-[#38B000]"
                            placeholder="+51 999 999 999"
                        />
                    </div>
                    <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                            WhatsApp (Optional)
                        </label>
                        <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#38B000] focus:border-[#38B000]"
                            placeholder="WhatsApp number (if different)"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#38B000] hover:bg-[#2F9000] text-white py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                        aria-label="Lock in your 50% discount on Esbelita Natural"
                    >
                        Lock my discount
                    </Button>
                    <p className="text-xs text-gray-500 text-center">We never share your data.</p>
                </form>
            </div>
        </div>
        </div>

    {/* Testimonials */ }
    <div className = "bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">What our customers say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "María, 34, Lima",
                quote: "Lost 6 kg in my first month without feeling deprived. My energy levels are amazing now!",
                avatar: "/placeholder.svg?height=60&width=60"
              },
              {
                name: "Carmen, 41, Arequipa", 
                quote: "Finally something that works with my diabetes medication. My doctor is impressed with my progress.",
                avatar: "/placeholder.svg?height=60&width=60"
              },
              {
                name: "Rosa, 28, Cusco",
                quote: "The sugar cravings disappeared after just one week. I feel in control of my eating again.",
                avatar: "/placeholder.svg?height=60&width=60"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-peach-50 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={`Customer testimonial from ${testimonial.name}`}
                    width={60}
                    height={60}
                    className="rounded-full shadow-sm"
                  />
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[#FFCF00] text-lg">★</span>
                      ))}
                    </div>
                    <p className="font-medium text-gray-800">{testimonial.name}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

    {/* Research Section */ }
    <div className = "bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 md:p-12 mb-8" >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Backed by science</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                ingredient: "African Mango",
                finding: "Reduces body weight by 28% in clinical trials",
                journal: "Lipids in Health and Disease"
              },
              {
                ingredient: "Guarana",
                finding: "Increases fat oxidation by 24% during exercise",
                journal: "Journal of Nutritional Science"
              },
              {
                ingredient: "Green Tea",
                finding: "Boosts metabolism by 4-5% naturally",
                journal: "American Journal of Clinical Nutrition"
              },
              {
                ingredient: "Apple Cider Vinegar",
                finding: "Reduces belly fat and improves insulin sensitivity",
                journal: "Bioscience, Biotechnology, Biochemistry"
              }
            ].map((study, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-peach-50 rounded-2xl p-4 shadow-sm text-center">
                <Image
                  src={`/placeholder.svg?height=80&width=80&query=${study.ingredient} research journal cover`}
                  alt={`Scientific research on ${study.ingredient}`}
                  width={80}
                  height={80}
                  className="mx-auto mb-3 rounded-lg shadow-sm"
                />
                <h4 className="font-bold text-gray-800 mb-2">{study.ingredient}</h4>
                <p className="text-sm text-gray-600 mb-2">{study.finding}</p>
                <p className="text-xs text-gray-500 italic">{study.journal}</p>
                <a href="#" className="text-xs text-[#38B000] hover:underline">Read source</a>
              </div>
            ))}
          </div>
        </div>

    {/* FAQ Accordion */ }
    < div className = "bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 md:p-12 mb-8" >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "Is Esbelita safe with my current medications?",
                answer: "Esbelita is made from natural plant extracts and is generally well-tolerated. However, we always recommend consulting with your doctor before starting any new supplement, especially if you're taking medication for hypertension, diabetes, or other conditions."
              },
              {
                question: "How long does one course last?",
                answer: "Each bottle contains a 30-day supply. Most customers see initial results within 7-10 days, with significant changes typically occurring after 2-3 months of consistent use."
              },
              {
                question: "Do I need to follow a strict diet?",
                answer: "No strict diet required! Esbelita works by naturally reducing cravings and supporting your metabolism. We provide simple nutrition guidelines to maximize your results, but no extreme restrictions."
              },
              {
                question: "Can I take this if I'm pregnant or breastfeeding?",
                answer: "We do not recommend Esbelita during pregnancy or breastfeeding. Please wait until after this period and consult with your healthcare provider before starting any weight management program."
              },
              {
                question: "Do I need to exercise intensively?",
                answer: "Not at all! While light physical activity is beneficial for overall health, Esbelita is designed to work without requiring intense exercise routines. Even a 15-minute daily walk can enhance your results."
              },
              {
                question: "What if it doesn't work for me?",
                answer: "We offer a 60-day money-back guarantee. If you're not satisfied with your results after following the program consistently, simply contact our customer service for a full refund."
              }
            ].map((faq, index) => (
              <details key={index} className="group border border-gray-200 rounded-2xl">
                <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 rounded-2xl">
                  <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                  <span className="text-[#38B000] group-open:rotate-180 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

    {/* Secondary CTA */ }
    < div className = "bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 md:p-12 mb-8 text-center" >
          <Image
            src="/placeholder.svg?height=300&width=200"
            alt="Esbelita Natural - Get your 50% discount now"
            width={200}
            height={300}
            className="mx-auto mb-6 drop-shadow-2xl"
          />
          <Button 
            className="bg-[#38B000] hover:bg-[#2F9000] text-white px-12 py-4 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => {
              document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            I want −50% now
          </Button>
        </div>
      </div>

    {/* Footer */ }
    < footer className = "bg-white/90 backdrop-blur shadow-lg rounded-3xl p-8 text-center" >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-green-600" />
          <span className="text-xl font-bold text-gray-800">NaturalSlim</span>
        </div>
        <div className="flex justify-center gap\`\`\`jsx
text-gray-800">NaturalSlim</div>
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="text-gray-600 hover:text-[#38B000] text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-[#38B000] text-sm">Terms of Service</a>
          <a href="#" className="text-gray-600 hover:text-[#38B000] text-sm">Contact</a>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
          This product has not been evaluated by DIGEMID. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Testimonials are not necessarily representative of what anyone else using this product may experience. This website and its content are for informational purposes only and are not intended to replace professional medical advice, diagnosis, or treatment.
        </p>
      </footer>
</div >
  )


  {/* Floating WhatsApp Chat Badge */ }
    <div className = "fixed bottom-6 right-6 z-50">
        <button
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
            aria-label="Contact us on WhatsApp"
        >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1" />
            </svg>
        </button>
    </div>

// Main render logic
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
if (currentStep === 9) return renderFactPage2()
if (currentStep === 11) return renderFactPage3()
if (currentStep === 12) return renderTransitionPage()
if (currentStep === 13) return renderMotivationPage()
if (currentStep === 14) return renderExplanationPage()
if (currentStep === 15) return renderResultPage()
if (currentStep === 16) return <LoadingPage onComplete={() => setCurrentStep(17)} />
if (currentStep === 17) return renderOfferPage()
if (currentStep === 18) return renderThankYouPage()

return null
}
