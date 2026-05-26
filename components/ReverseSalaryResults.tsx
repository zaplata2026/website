'use client';

import { type ReverseSalaryResult } from '@/lib/ReverseSalaryCalculator';

interface ReverseSalaryResultsProps {
  result: ReverseSalaryResult;
  mode: 'net' | 'gross' | 'employer';
}

export function ReverseSalaryResults({ result, mode }: ReverseSalaryResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Main Results */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Резултати</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Net Salary */}
          <div className={`p-4 rounded-xl border-2 ${mode === 'net' ? 'border-danger-500 bg-danger-500/10' : 'border-zinc-700 bg-zinc-800/50'}`}>
            <div className="text-sm text-zinc-400 mb-1">Нетна заплата</div>
            <div className="text-2xl font-bold text-white">{formatCurrency(result.netSalary)}</div>
            {mode === 'net' && <div className="text-xs text-danger-400 mt-1">Въведена стойност</div>}
          </div>
          
          {/* Gross Salary */}
          <div className={`p-4 rounded-xl border-2 ${mode === 'gross' ? 'border-danger-500 bg-danger-500/10' : 'border-zinc-700 bg-zinc-800/50'}`}>
            <div className="text-sm text-zinc-400 mb-1">Брутна заплата</div>
            <div className="text-2xl font-bold text-white">{formatCurrency(result.grossSalary)}</div>
            {mode === 'gross' && <div className="text-xs text-danger-400 mt-1">Въведена стойност</div>}
          </div>
          
          {/* Employer Cost */}
          <div className={`p-4 rounded-xl border-2 ${mode === 'employer' ? 'border-danger-500 bg-danger-500/10' : 'border-zinc-700 bg-zinc-800/50'}`}>
            <div className="text-sm text-zinc-400 mb-1">Разход за работодател</div>
            <div className="text-2xl font-bold text-white">{formatCurrency(result.totalEmployerCost)}</div>
            {mode === 'employer' && <div className="text-xs text-danger-400 mt-1">Въведена стойност</div>}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-zinc-800/50 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Осигуровки служител</div>
            <div className="text-lg font-bold text-white">{formatCurrency(result.totalEmployeeContributions)}</div>
          </div>
          
          <div className="p-3 bg-zinc-800/50 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Подоходен данък</div>
            <div className="text-lg font-bold text-white">{formatCurrency(result.incomeTax)}</div>
          </div>
          
          <div className="p-3 bg-zinc-800/50 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Осигуровки работодател</div>
            <div className="text-lg font-bold text-white">{formatCurrency(result.totalEmployerContributions)}</div>
          </div>
          
          <div className="p-3 bg-zinc-800/50 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Общо удръжки</div>
            <div className="text-lg font-bold text-danger-400">
              {formatCurrency(result.totalEmployeeContributions + result.incomeTax)}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Employee Contributions */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Осигуровки на служителя</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">Пенсионни осигуровки</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employeeContributions.pension)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">Здравни осигуровки</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employeeContributions.health)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">ОЗМ</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employeeContributions.sickness)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">Безработица</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employeeContributions.unemployment)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">ДЗПО</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employeeContributions.dzpo)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-bold text-white">Общо</span>
              <span className="text-sm font-bold text-danger-400">{formatCurrency(result.totalEmployeeContributions)}</span>
            </div>
          </div>
        </div>

        {/* Employer Contributions */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Осигуровки на работодателя</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">Пенсионни осигуровки</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employerContributions.pension)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">Здравни осигуровки</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employerContributions.health)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">ОЗМ</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employerContributions.sickness)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">Безработица</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employerContributions.unemployment)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">ДЗПО</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employerContributions.dzpo)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-sm text-zinc-400">ТЗПБ</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(result.employerContributions.occupationalAccidents)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-bold text-white">Общо</span>
              <span className="text-sm font-bold text-danger-400">{formatCurrency(result.totalEmployerContributions)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
