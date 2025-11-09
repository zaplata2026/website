import { SalaryCalculatorForm } from '@/components/SalaryCalculatorForm';

/**
 * Home page component
 *
 * This is the main landing page for the salary calculator application.
 * It's optimized for SEO with Next.js App Router and server-side rendering.
 */
export default function Home() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Какво ми взима държавата',
    description: 'Калкулатор за данъци и осигуровки в България 2025-2026',
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
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Header */}
      <header className="border-b border-danger-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-danger-500 via-orange-500 to-danger-600 bg-clip-text text-transparent">
            Какво ми взима държавата
          </h1>
          <p className="text-center text-zinc-400 text-sm md:text-base mt-1">
            Калкулатор за данъци и осигуровки 2025-2026
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Разберете колко <span className="text-danger-500">по-малко пари</span><br />
            ще получавате през 2026
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Новият бюджет увеличава данъците и осигуровките. Изчислете точно колко
            ще загубите от заплатата си всеки месец.
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
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/50 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-zinc-500 text-sm space-y-2">
            <p>
              Калкулаторът използва официалните данъчни ставки за 2025 и 2026 година
            </p>
            <p>
              Цените на продуктите се базират на средни цени за 2025 година.
            </p>
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
