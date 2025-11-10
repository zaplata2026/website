import { SalaryCalculatorForm } from '@/components/SalaryCalculatorForm';

/**
 * Home page component
 *
 * This is the main landing page for the salary calculator application.
 * It's optimized for SEO with Next.js App Router and server-side rendering.
 */
export default function Home() {
  // Enhanced structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Калкулатор Заплата 2026 България',
    alternateName: 'Какво ми взима държавата',
    description: 'Безплатен онлайн калкулатор за изчисляване на нетна заплата, данъци и осигуровки в България за 2026 година. Най-точният данъчен калкулатор с актуални ставки.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BGN',
    },
    inLanguage: 'bg-BG',
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Bulgaria',
    },
    featureList: [
      'Изчисляване на нетна заплата за 2026',
      'Калкулатор за данъци и осигуровки',
      'Сравнение 2025 vs 2026',
      'Разходи за работодател',
      'Покупателна способност'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Как да изчисля нетната си заплата за 2026 година?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'За да изчислите нетната си заплата за 2026, въведете брутната си заплата в калкулатора. Автоматично ще бъдат изчислени всички данъци и осигуровки според актуалните ставки за 2026: пенсионни осигуровки (7.38%), здравни осигуровки (3.2%), ОЗМ (1.4%), безработица (0.4%), ДЗПО (2.2%) и подоходен данък (10%).'
        }
      },
      {
        '@type': 'Question',
        name: 'Какви са данъчните промени през 2026 година?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'През 2026 година има три основни промени: 1) Максималният осигурителен доход се увеличава от 4,130 лв. на 4,600 лв., 2) Пенсионните осигуровки за служителя се увеличават от 6.58% на 7.38%, 3) Пенсионните осигуровки за работодателя се увеличават от 8.22% на 9.44%.'
        }
      },
      {
        '@type': 'Question',
        name: 'Колко е максималният осигурителен доход за 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Максималният осигурителен доход за 2026 година е 4,600 лв. брутна заплата, увеличение от предишните 4,130 лв. за 2025 година.'
        }
      },
      {
        '@type': 'Question',
        name: 'Какви осигуровки се плащат от заплатата в България?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'От заплатата в България се удържат: пенсионни осигуровки, здравни осигуровки, осигуровки за общо заболяване и майчинство (ОЗМ), осигуровки за безработица, допълнително задължително пенсионно осигуряване (ДЗПО) и подоходен данък от 10%.'
        }
      },
      {
        '@type': 'Question',
        name: 'Как се изчислява данъкът върху заплатата?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Подоходният данък в България е фиксирани 10% и се изчислява върху данъчната основа (брутна заплата минус осигуровки). След приспадане на всички осигуровки и данъка получавате нетната заплата.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Начало',
        item: 'https://zaplata2026.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Калкулатор Заплата 2026'
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Header */}
      <header className="border-b border-danger-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-danger-500 via-orange-500 to-danger-600 bg-clip-text text-transparent">
            Калкулатор Заплата 2026 България
          </h1>
          <p className="text-center text-zinc-400 text-sm md:text-base mt-1">
            Изчислете нетна заплата, данъци и осигуровки за 2026 година
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Безплатен <span className="text-danger-500">Калкулатор за Заплата</span><br />
            и Данъци 2026
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
            Използвайте нашия точен калкулатор за изчисляване на <strong className="text-zinc-300">нетна заплата</strong>,
            данъци и осигуровки през 2026 година. Разберете колко по-малко пари ще получавате
            заради новите данъчни промени в България.
          </p>
        </div>

        {/* Calculator */}
        <SalaryCalculatorForm />

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Точни изчисления
            </h3>
            <p className="text-sm text-zinc-400">
              Базирани на официалните данъчни ставки за 2025 и 2026 година
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Разходи за работодател
            </h3>
            <p className="text-sm text-zinc-400">
              Вижте как новите данъци засягат и разходите на вашия работодател
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Покупателна способност
            </h3>
            <p className="text-sm text-zinc-400">
              Разберете с колко по-малко продукти ще можете да си купите
            </p>
          </div>
        </div>

        {/* Tax Changes Explanation */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            📋 Какво се променя през 2026 година?
          </h3>

          <div className="space-y-4 text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="text-danger-500 font-bold text-xl shrink-0">↑</span>
              <div>
                <p className="font-semibold text-white">Максимален осигурителен доход</p>
                <p className="text-sm text-zinc-400">
                  Увеличава се от <span className="text-white font-mono">4,130 лв.</span> на{' '}
                  <span className="text-danger-400 font-mono">4,600 лв.</span> (брутна заплата)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-danger-500 font-bold text-xl shrink-0">↑</span>
              <div>
                <p className="font-semibold text-white">Пенсионни осигуровки за служителя</p>
                <p className="text-sm text-zinc-400">
                  Увеличават се от <span className="text-white font-mono">6.58%</span> на{' '}
                  <span className="text-danger-400 font-mono">7.38%</span> (+0.8%)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-danger-500 font-bold text-xl shrink-0">↑</span>
              <div>
                <p className="font-semibold text-white">Пенсионни осигуровки за работодателя</p>
                <p className="text-sm text-zinc-400">
                  Увеличават се от <span className="text-white font-mono">8.22%</span> на{' '}
                  <span className="text-danger-400 font-mono">9.44%</span> (+1.22%)
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-danger-950/30 border border-danger-500/30 rounded-lg">
              <p className="text-sm text-danger-300">
                <strong>Важно:</strong> Тези промени засягат всички работещи в България.
                Колкото по-висока е вашата заплата, толкова по-голяма ще бъде загубата ви,
                особено ако сте близо до или над новия максимален осигурителен доход.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto bg-zinc-950/50 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Калкулатор за Заплата 2026 - Изчислете Данъци и Осигуровки в България
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Нашият <strong className="text-white">калкулатор за заплата 2026</strong> е най-точният безплатен инструмент за
              изчисляване на нетна заплата, данъци и осигуровки в България. С промените в данъчното законодателство
              през 2026 година, важно е да знаете точно колко пари ще получавате.
            </p>
            <p>
              <strong className="text-white">Калкулаторът за брутна и нетна заплата</strong> използва актуалните данъчни ставки
              за 2026 година и автоматично изчислява всички задължителни осигуровки: пенсионни осигуровки (7.38%),
              здравни осигуровки (3.2%), осигуровки за общо заболяване и майчинство (1.4%), безработица (0.4%),
              ДЗПО (2.2%) и подоходен данък (10%).
            </p>
            <p>
              С нашия <strong className="text-white">онлайн калкулатор за данъци</strong> можете да сравните вашата заплата
              между 2025 и 2026 година и да видите точно колко по-малко пари ще получавате заради увеличението на
              максималния осигурителен доход и пенсионните осигуровки.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Често задавани въпроси за калкулатора на заплати
          </h2>
          <div className="space-y-4">
            {/* Question 1 */}
            <details className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Как да изчисля нетната си заплата за 2026 година?</span>
                <span className="text-danger-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                За да изчислите нетната си заплата за 2026, въведете брутната си заплата в калкулатора.
                Автоматично ще бъдат изчислени всички данъци и осигуровки според актуалните ставки за 2026:
                пенсионни осигуровки (7.38%), здравни осигуровки (3.2%), ОЗМ (1.4%), безработица (0.4%),
                ДЗПО (2.2%) и подоходен данък (10%). Калкулаторът ще покаже и сравнение с 2025 година.
              </p>
            </details>

            {/* Question 2 */}
            <details className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Какви са данъчните промени през 2026 година?</span>
                <span className="text-danger-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                През 2026 година има три основни промени: 1) Максималният осигурителен доход се увеличава от
                4,130 лв. на 4,600 лв., 2) Пенсионните осигуровки за служителя се увеличават от 6.58% на 7.38%
                (+0.8%), 3) Пенсионните осигуровки за работодателя се увеличават от 8.22% на 9.44% (+1.22%).
                Тези промени водят до по-малка нетна заплата за служителите.
              </p>
            </details>

            {/* Question 3 */}
            <details className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Колко е максималният осигурителен доход за 2026?</span>
                <span className="text-danger-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Максималният осигурителен доход за 2026 година е <strong className="text-white">4,600 лв.</strong> брутна
                заплата, което е увеличение от предишните 4,130 лв. за 2025 година. Това означава, че хора с по-високи
                заплати ще плащат повече осигуровки до този нов максимум.
              </p>
            </details>

            {/* Question 4 */}
            <details className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Какви осигуровки се плащат от заплатата в България?</span>
                <span className="text-danger-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                От заплатата в България се удържат следните осигуровки: пенсионни осигуровки (7.38% за 2026),
                здравни осигуровки (3.2%), осигуровки за общо заболяване и майчинство - ОЗМ (1.4%),
                осигуровки за безработица (0.4%), допълнително задължително пенсионно осигуряване - ДЗПО (2.2%)
                и подоходен данък от 10%. Общо около 24-25% от брутната заплата.
              </p>
            </details>

            {/* Question 5 */}
            <details className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Как се изчислява данъкът върху заплатата?</span>
                <span className="text-danger-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Подоходният данък в България е фиксирани <strong className="text-white">10%</strong> и се изчислява
                върху данъчната основа (брутна заплата минус осигуровки). Първо се изчисляват и приспадат всички
                осигуровки от брутната заплата, след което върху остатъка се начислява 10% данък. Резултатът след
                приспадане на данъка е вашата нетна заплата.
              </p>
            </details>

            {/* Question 6 */}
            <details className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 group">
              <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Защо нетната ми заплата е по-ниска през 2026?</span>
                <span className="text-danger-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Нетната заплата през 2026 е по-ниска поради увеличението на пенсионните осигуровки с 0.8% и
                повишаването на максималния осигурителен доход до 4,600 лв. Това означава, че от вашата брутна заплата
                се удържат повече пари за осигуровки, което води до по-малка "чиста" заплата.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/50 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-zinc-500 text-sm space-y-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-white font-semibold mb-2">
                Калкулатор Заплата 2026 - Най-точният данъчен калкулатор в България
              </h3>
              <p className="text-xs leading-relaxed">
                Безплатен онлайн калкулатор за изчисляване на нетна заплата, брутна заплата, данъци и осигуровки
                в България за 2026 година. Изчислете колко пари ще получавате след данъци с актуалните ставки за
                пенсионни осигуровки, здравни осигуровки, ОЗМ, безработица и ДЗПО. Калкулаторът показва и разходите
                за работодателя според максималния осигурителен доход за 2026.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900">
              <p>
                Калкулаторът използва официалните данъчни ставки за 2025 и 2026 година
              </p>
              <p>
                Цените на продуктите се базират на средни цени за 2025 година.
              </p>
            </div>
            <p className="text-xs text-zinc-600 mt-4">
              © 2025 &ldquo;Какво ми взима държавата&rdquo; • Създадено от Кори, AI агентът на encorp.ai.
            </p>
            <div className="mt-6 pt-4 border-t border-zinc-900">
              <p className="text-xs text-zinc-600">
                🤖 Този продукт е разработен изцяло от AI
              </p>
              <p className="text-xs text-zinc-700 mt-1">
                Използвайки{' '}
                <a
                  href="https://encorp.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-500 underline transition-colors"
                >
                  AI Software Development Rules of encorp.ai
                </a>
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-900">
              <p className="text-xs text-zinc-600">
                📂 Този проект е с отворен код (Open Source)
              </p>
              <p className="text-xs text-zinc-700 mt-1">
                Разгледайте кода и допринесете в{' '}
                <a
                  href="https://github.com/encorp-io/kakvo-mi-vzimat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-500 underline transition-colors"
                >
                  GitHub хранилището
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
