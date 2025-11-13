'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { salaryCalculator, SalaryComparisonResult } from '@/lib/SalaryCalculator';
import { ResultsDisplay } from './ResultsDisplay';

/**
 * Main salary calculator form component
 *
 * This component provides the user interface for entering net salary
 * and displays the comparison between 2025 and 2026 tax calculations.
 */
export function SalaryCalculatorForm() {
  const [netSalary, setNetSalary] = useState<string>('');
  const [result, setResult] = useState<SalaryComparisonResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  /**
   * Handles input change with validation
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setNetSalary(value);
    }
  };

  /**
   * Handles form submission and calculation
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const salary = parseFloat(netSalary);
    if (isNaN(salary) || salary <= 0) {
      return;
    }

    setIsCalculating(true);

    // Simulate a brief calculation delay for better UX
    setTimeout(() => {
      const comparison = salaryCalculator.compareSalaryBetweenYears(salary);
      setResult(comparison);
      setIsCalculating(false);
    }, 300);
  };

  /**
   * Resets the calculator
   */
  const handleReset = () => {
    setNetSalary('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Calculator Form */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-danger-600/30 rounded-2xl p-8 shadow-2xl shadow-danger-900/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Каква заплата получихте миналия месец?
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              Въведете вашата нетна заплата от 2025 година
            </p>
          </div>

          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={netSalary}
              onChange={handleInputChange}
              placeholder="4000.00"
              className="w-full px-6 py-4 text-2xl md:text-3xl font-bold text-center bg-black border-2 border-danger-500/50 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-danger-500 focus:ring-4 focus:ring-danger-500/20 transition-all"
              disabled={isCalculating}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl md:text-3xl font-bold text-zinc-500">
              лв.
            </div>
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            disabled={!netSalary || isCalculating}
            className="w-full bg-gradient-to-r from-danger-600 to-danger-700 hover:from-danger-700 hover:to-danger-800 disabled:from-zinc-800 disabled:to-zinc-900 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg md:text-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-danger-900/30 disabled:shadow-none"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Изчислявам...
              </span>
            ) : (
              'Изчисли'
            )}
          </button>

          {/* Information box */}
          <div className="bg-black/40 border border-danger-500/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-danger-400 mb-2">
              ℹ️ Как работи калкулаторът?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              В България хората почти винаги имат информация за тяхната <strong className="text-white">нетна заплата</strong>.
              Но реално всички калкулации са върху <strong className="text-white">брутната им заплата</strong>.
              От 2026 година максималният осигурителен доход се увеличава от 4,130 лв. на 4,600 лв.,
              а пенсионните осигуровки се увеличават с 0.89% за служителя и 1.11% за работодателя. Калкулаторът показва колко по-малко пари
              ще получавате от 1 януари 2026.
            </p>
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8">
          <ResultsDisplay result={result} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}
