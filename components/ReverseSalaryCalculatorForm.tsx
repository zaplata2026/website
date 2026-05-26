'use client';

import { useState } from 'react';
import { ReverseSalaryCalculator, DEFAULT_TAX_PARAMETERS_2026, type TaxParameters, type ReverseSalaryResult } from '@/lib/ReverseSalaryCalculator';
import { ReverseSalaryResults } from './ReverseSalaryResults';

type CalculationMode = 'net' | 'gross' | 'employer';

export function ReverseSalaryCalculatorForm() {
  const [mode, setMode] = useState<CalculationMode>('net');
  const [inputValue, setInputValue] = useState<string>('');
  const [parameters, setParameters] = useState<TaxParameters>(DEFAULT_TAX_PARAMETERS_2026);
  const [result, setResult] = useState<ReverseSalaryResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleCalculate = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      alert('Моля, въведете валидна сума');
      return;
    }

    let calculatedResult: ReverseSalaryResult;
    
    switch (mode) {
      case 'net':
        calculatedResult = ReverseSalaryCalculator.calculateFromNet(value, parameters);
        break;
      case 'gross':
        calculatedResult = ReverseSalaryCalculator.calculateFromGross(value, parameters);
        break;
      case 'employer':
        calculatedResult = ReverseSalaryCalculator.calculateFromEmployerCost(value, parameters);
        break;
    }
    
    setResult(calculatedResult);
  };

  const updateParameter = (key: keyof TaxParameters, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setParameters(prev => ({
        ...prev,
        [key]: key === 'maxInsurableIncome' ? numValue : numValue / 100
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Calculator Card */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Универсален Калкулатор за Заплата
        </h2>
        
        {/* Mode Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-300 mb-3">
            Изберете какво искате да изчислите:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setMode('net')}
              className={`p-4 rounded-xl border-2 transition-all ${
                mode === 'net'
                  ? 'border-danger-500 bg-danger-500/10 text-white'
                  : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <div className="font-bold mb-1">От Нетна</div>
              <div className="text-xs">Знам нетната си заплата</div>
            </button>
            <button
              onClick={() => setMode('gross')}
              className={`p-4 rounded-xl border-2 transition-all ${
                mode === 'gross'
                  ? 'border-danger-500 bg-danger-500/10 text-white'
                  : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <div className="font-bold mb-1">От Брутна</div>
              <div className="text-xs">Знам брутната си заплата</div>
            </button>
            <button
              onClick={() => setMode('employer')}
              className={`p-4 rounded-xl border-2 transition-all ${
                mode === 'employer'
                  ? 'border-danger-500 bg-danger-500/10 text-white'
                  : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <div className="font-bold mb-1">От Разход</div>
              <div className="text-xs">Знам разхода за работодателя</div>
            </button>
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            {mode === 'net' && 'Нетна заплата (EUR)'}
            {mode === 'gross' && 'Брутна заплата (EUR)'}
            {mode === 'employer' && 'Общ разход за работодател (EUR)'}
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Въведете сума..."
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-danger-500 focus:border-transparent"
          />
        </div>

        {/* Advanced Parameters Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>{showAdvanced ? '▼' : '▶'}</span>
            Разширени настройки (ДОО, максимален осигурителен доход и др.)
          </button>
        </div>

        {/* Advanced Parameters */}
        {showAdvanced && (
          <div className="mb-6 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <h3 className="text-lg font-bold text-white mb-4">Параметри на осигуровките</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Максимален осигурителен доход (EUR)
                </label>
                <input
                  type="number"
                  value={parameters.maxInsurableIncome}
                  onChange={(e) => updateParameter('maxInsurableIncome', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  ДЗПО служител (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(parameters.dzpoEmployeeRate * 100).toFixed(2)}
                  onChange={(e) => updateParameter('dzpoEmployeeRate', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  ДЗПО работодател (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(parameters.dzpoEmployerRate * 100).toFixed(2)}
                  onChange={(e) => updateParameter('dzpoEmployerRate', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Пенсии служител (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(parameters.pensionEmployeeRate * 100).toFixed(2)}
                  onChange={(e) => updateParameter('pensionEmployeeRate', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Пенсии работодател (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(parameters.pensionEmployerRate * 100).toFixed(2)}
                  onChange={(e) => updateParameter('pensionEmployerRate', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Здравно служител (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(parameters.healthEmployeeRate * 100).toFixed(2)}
                  onChange={(e) => updateParameter('healthEmployeeRate', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Здравно работодател (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(parameters.healthEmployerRate * 100).toFixed(2)}
                  onChange={(e) => updateParameter('healthEmployerRate', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Подоходен данък (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={(parameters.incomeTaxRate * 100).toFixed(2)}
                  onChange={(e) => updateParameter('incomeTaxRate', e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-danger-600 to-danger-500 hover:from-danger-500 hover:to-danger-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-danger-500/50"
        >
          Изчисли
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8">
          <ReverseSalaryResults result={result} mode={mode} />
        </div>
      )}
    </div>
  );
}

