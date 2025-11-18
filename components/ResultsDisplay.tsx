'use client';

import { useState } from 'react';
import { SalaryComparisonResult, salaryCalculator } from '@/lib/SalaryCalculator';
import { ProductComparison } from './ProductComparison';

interface ResultsDisplayProps {
  result: SalaryComparisonResult;
  onReset: () => void;
}

/**
 * Component for displaying salary comparison results
 *
 * Shows the detailed breakdown of salary changes between 2025 and 2026,
 * including employee and employer costs.
 */
export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('bg-BG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('bg-BG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'always',
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Loss Display */}
      <div className="bg-gradient-to-br from-danger-950 to-black border-2 border-danger-500 rounded-2xl p-8 shadow-2xl shadow-danger-900/40">
        <div className="text-center space-y-4">
          <h2 className="text-xl md:text-2xl text-danger-300 font-semibold">
            Вашата годишна загуба през 2026 година
          </h2>

          <div className="text-5xl md:text-7xl font-black text-danger-500 animate-pulse-slow">
            {formatCurrency(Math.abs(result.annualNetSalaryDifference))} лв.
          </div>

          <div className="text-lg md:text-xl text-danger-300">
            <span className="font-bold">{formatPercentage(result.percentageChange)}%</span> спрямо 2025 г.
          </div>

          <div className="pt-4 border-t border-danger-500/30 space-y-4">
            <div>
              <p className="text-zinc-400 text-sm md:text-base">
                Месечна загуба за служителя
              </p>
              <p className="text-3xl md:text-4xl font-bold text-danger-400 mt-2">
                {formatCurrency(Math.abs(result.netSalaryDifference))} лв.
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm md:text-base">
                Годишна загуба за работодателя
              </p>
              <p className="text-3xl md:text-4xl font-bold text-orange-400 mt-2">
                {formatCurrency(Math.abs(result.annualEmployerCostDifference))} лв.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 2025 */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
          <div className="text-center space-y-3">
            <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
              2025 година
            </div>
            <div className="text-3xl font-bold text-green-400">
              {formatCurrency(result.year2025.netSalary)} лв.
            </div>
            <div className="text-xs text-zinc-500">
              Брутна: {formatCurrency(result.year2025.grossSalary)} лв.
            </div>
          </div>
        </div>

        {/* 2026 */}
        <div className="bg-zinc-900 border border-danger-600 rounded-xl p-6">
          <div className="text-center space-y-3">
            <div className="text-sm font-semibold text-danger-400 uppercase tracking-wide">
              2026 година
            </div>
            <div className="text-3xl font-bold text-danger-500">
              {formatCurrency(result.year2026.netSalary)} лв.
            </div>
            <div className="text-xs text-zinc-500">
              Брутна: {formatCurrency(result.year2026.grossSalary)} лв.
            </div>
          </div>
        </div>
      </div>

      {/* Product Comparison */}
      <ProductComparison annualDifference={result.annualNetSalaryDifference} />

      {/* Detailed Breakdown Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-xl p-4 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">
            {showDetails ? '▼' : '▶'} Детайлна разбивка на данъци и осигуровки
          </span>
          <span className="text-xs text-zinc-500">
            Разходи за работодател и служител
          </span>
        </div>
      </button>

      {/* Detailed Breakdown */}
      {showDetails && (
        <div className="bg-black border border-zinc-800 rounded-xl p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Employee Contributions */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              📊 Осигуровки за служителя
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* 2025 Employee */}
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-zinc-400 mb-3">2025 година</div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Пенсии (6.58%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employeeContributions.pension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ОЗМ (1.4%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employeeContributions.sickness)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Безработица (0.4%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employeeContributions.unemployment)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ДЗПО (2.2%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employeeContributions.supplementaryPension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Здравно (3.2%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employeeContributions.health)} лв.</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-700">
                  <span className="text-white font-semibold">Общо осигуровки:</span>
                  <span className="text-green-400 font-mono font-bold">{formatCurrency(result.year2025.totalEmployeeContributions)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Данък (10%):</span>
                  <span className="text-green-400 font-mono font-bold">{formatCurrency(result.year2025.incomeTax)} лв.</span>
                </div>
              </div>

              {/* 2026 Employee */}
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-danger-400 mb-3">2026 година</div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Пенсии (7.47%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employeeContributions.pension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ОЗМ (1.4%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employeeContributions.sickness)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Безработица (0.4%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employeeContributions.unemployment)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ДЗПО (2.2%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employeeContributions.supplementaryPension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Здравно (3.2%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employeeContributions.health)} лв.</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-700">
                  <span className="text-white font-semibold">Общо осигуровки:</span>
                  <span className="text-danger-400 font-mono font-bold">{formatCurrency(result.year2026.totalEmployeeContributions)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Данък (10%):</span>
                  <span className="text-danger-400 font-mono font-bold">{formatCurrency(result.year2026.incomeTax)} лв.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Employer Contributions */}
          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">
              🏢 Разходи за работодателя
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* 2025 Employer */}
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-zinc-400 mb-3">2025 година</div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Пенсии (8.22%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employerContributions.pension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ОЗМ (2.1%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employerContributions.sickness)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Безработица (0.6%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employerContributions.unemployment)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ДЗПО (2.8%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employerContributions.supplementaryPension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ТЗПБ (0.4%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employerContributions.occupationalAccidents)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Здравно (4.8%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2025.employerContributions.health)} лв.</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-zinc-700">
                  <span className="text-white font-semibold">Общо осигуровки:</span>
                  <span className="text-green-400 font-mono font-bold">{formatCurrency(result.year2025.totalEmployerContributions)} лв.</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-zinc-700">
                  <span className="text-white font-semibold">Общо разходи:</span>
                  <span className="text-blue-400 font-mono font-bold">{formatCurrency(result.year2025.totalEmployerCost)} лв.</span>
                </div>
              </div>

              {/* 2026 Employer */}
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-danger-400 mb-3">2026 година</div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Пенсии (9.33%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employerContributions.pension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ОЗМ (2.1%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employerContributions.sickness)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Безработица (0.6%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employerContributions.unemployment)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ДЗПО (2.8%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employerContributions.supplementaryPension)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ТЗПБ (0.4%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employerContributions.occupationalAccidents)} лв.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Здравно (4.8%):</span>
                  <span className="text-white font-mono">{formatCurrency(result.year2026.employerContributions.health)} лв.</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-zinc-700">
                  <span className="text-white font-semibold">Общо осигуровки:</span>
                  <span className="text-danger-400 font-mono font-bold">{formatCurrency(result.year2026.totalEmployerContributions)} лв.</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-zinc-700">
                  <span className="text-white font-semibold">Общо разходи:</span>
                  <span className="text-danger-400 font-mono font-bold">{formatCurrency(result.year2026.totalEmployerCost)} лв.</span>
                </div>
              </div>
            </div>

            {/* Employer Cost Increase */}
            <div className="mt-4 bg-danger-950/30 border border-danger-500/30 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm text-zinc-400">Увеличение на разходите за работодател</p>
                <p className="text-2xl font-bold text-danger-400 mt-1">
                  +{formatCurrency(result.employerCostDifference)} лв./месец
                </p>
                <p className="text-sm text-danger-500 mt-1">
                  Годишно: +{formatCurrency(result.annualEmployerCostDifference)} лв.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
      >
        ← Изчисли друга заплата
      </button>
    </div>
  );
}
