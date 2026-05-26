import { ReverseSalaryCalculatorForm } from '@/components/ReverseSalaryCalculatorForm';
import { Analytics } from "@vercel/analytics/next";
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Универсален Калкулатор за Заплата - Изчисли Нетна, Брутна и Разход',
  description: 'Универсален калкулатор за заплата в България. Изчислете нетна заплата от брутна, брутна от нетна или общия разход за работодателя. Настройваеми параметри за ДЗПО и максимален осигурителен доход.',
  keywords: [
    'калкулатор заплата',
    'нетна от брутна',
    'брутна от нетна',
    'разход работодател',
    'ДЗПО калкулатор',
    'максимален осигурителен доход',
    'универсален калкулатор заплата',
  ],
};

export default function CalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Универсален Калкулатор за Заплата България',
    description: 'Изчислете нетна заплата, брутна заплата и разход за работодател с настройваеми параметри за осигуровки и данъци.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    inLanguage: 'bg-BG',
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-danger-500 via-orange-500 to-danger-600 bg-clip-text text-transparent">
                Универсален Калкулатор
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-1">
                Изчислете нетна, брутна заплата и разход за работодател
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-600"
            >
              ← Към сравнението 2025/2026
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            <span className="text-danger-500">Универсален Калкулатор</span><br />
            за Заплата в България
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
            Изчислете <strong className="text-zinc-300">нетна заплата</strong>, <strong className="text-zinc-300">брутна заплата</strong> или{' '}
            <strong className="text-zinc-300">общ разход за работодател</strong> с възможност за настройка на всички параметри.
          </p>
        </div>

        {/* Calculator */}
        <ReverseSalaryCalculatorForm />

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Двупосочни изчисления
            </h3>
            <p className="text-sm text-zinc-400">
              Изчислете от нетна към брутна, от брутна към нетна или от разход към всички останали
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Настройваеми параметри
            </h3>
            <p className="text-sm text-zinc-400">
              Променете ДЗПО процент, максимален осигурителен доход и всички други ставки
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Детайлна разбивка
            </h3>
            <p className="text-sm text-zinc-400">
              Вижте точна разбивка на всички осигуровки и данъци за служител и работодател
            </p>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            📋 Как работи калкулаторът?
          </h3>

          <div className="space-y-4 text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="text-danger-500 font-bold text-xl shrink-0">1</span>
              <div>
                <p className="font-semibold text-white">Изберете режим на изчисление</p>
                <p className="text-sm text-zinc-400">
                  Можете да изчислявате от нетна заплата, брутна заплата или общ разход за работодател
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-danger-500 font-bold text-xl shrink-0">2</span>
              <div>
                <p className="font-semibold text-white">Въведете сумата</p>
                <p className="text-sm text-zinc-400">
                  Въведете известната ви сума в лева
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-danger-500 font-bold text-xl shrink-0">3</span>
              <div>
                <p className="font-semibold text-white">Настройте параметрите (опционално)</p>
                <p className="text-sm text-zinc-400">
                  Можете да промените максималния осигурителен доход, процента на ДЗПО и други параметри
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/50 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-zinc-500 text-sm space-y-4">
            <p>
              Универсален калкулатор за заплата в България
            </p>
            <p className="text-xs text-zinc-600 mt-4">
              © 2025 &ldquo;Какво ми взима държавата&rdquo; • Създадено от Кори, AI агентът на encorp.ai.
            </p>
          </div>
        </div>
      </footer>
      <Analytics />
    </main>
  );
}
