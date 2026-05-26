'use client';

import { useState } from 'react';
import { salaryCalculator } from '@/lib/SalaryCalculator';

interface ProductComparisonProps {
  annualDifference: number;
}

interface Product {
  name: string;
  emoji: string;
  price: number;
  unit: string;
}

/**
 * Common Bulgarian products for comparison
 */
const PRODUCTS: Product[] = [
  { name: 'Хляб', emoji: '🍞', price: 1.02, unit: 'хляб' },
  { name: 'Мляко', emoji: '🥛', price: 1.59, unit: 'литър' },
  { name: 'Кафе', emoji: '☕', price: 1.28, unit: 'кафе' },
  { name: 'Яйца', emoji: '🥚', price: 0.15, unit: 'яйце' },
  { name: 'Бензин', emoji: '⛽', price: 1.33, unit: 'литър' },
  { name: 'Козунак', emoji: '🥖', price: 4.09, unit: 'козунак' },
  { name: 'Айрян', emoji: '🥤', price: 1.28, unit: 'бутилка' },
  { name: 'Месо свинско', emoji: '🥩', price: 5.73, unit: 'кг' },
  { name: 'Картофи', emoji: '🥔', price: 1.02, unit: 'кг' },
  { name: 'Домати', emoji: '🍅', price: 2.20, unit: 'кг' },
];

/**
 * Component for displaying purchasing power comparison
 *
 * Shows how many common products could have been purchased
 * with the annual salary difference.
 */
export function ProductComparison({ annualDifference }: ProductComparisonProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [customPrice, setCustomPrice] = useState<string>('');
  const [showCustom, setShowCustom] = useState(false);

  const lostProducts = showCustom && customPrice
    ? salaryCalculator.calculateProductLoss(annualDifference, parseFloat(customPrice))
    : salaryCalculator.calculateProductLoss(annualDifference, selectedProduct.price);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('bg-BG').format(value);
  };

  return (
    <div className="bg-gradient-to-br from-orange-950/40 to-black border-2 border-orange-600/30 rounded-2xl p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-orange-300 mb-4 text-center">
        🛒 Какво губите на година?
      </h3>

      <p className="text-zinc-400 text-sm md:text-base text-center mb-6">
        С годишната ви загуба от <span className="text-danger-400 font-bold">
          {formatNumber(Math.abs(annualDifference))} EUR
        </span> бихте могли да си купите:
      </p>

      {/* Product Selector */}
      {!showCustom ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {PRODUCTS.map((product) => (
              <button
                key={product.name}
                onClick={() => setSelectedProduct(product)}
                className={`p-3 rounded-lg border-2 transition-all transform hover:scale-105 ${
                  selectedProduct.name === product.name
                    ? 'bg-orange-600 border-orange-500 shadow-lg shadow-orange-600/50'
                    : 'bg-zinc-900 border-zinc-700 hover:border-orange-600/50'
                }`}
              >
                <div className="text-3xl mb-1">{product.emoji}</div>
                <div className="text-xs text-white font-semibold">{product.name}</div>
                <div className="text-xs text-zinc-400">{product.price.toFixed(2)} EUR</div>
              </button>
            ))}
          </div>

          {/* Result Display */}
          <div className="bg-black/60 border border-orange-500/50 rounded-xl p-6 text-center">
            <div className="text-5xl md:text-6xl mb-2">{selectedProduct.emoji}</div>
            <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">
              {formatNumber(lostProducts)}
            </div>
            <div className="text-lg md:text-xl text-zinc-300">
              {lostProducts === 1 ? selectedProduct.unit :
                selectedProduct.unit === 'хляб' ? 'хляба' :
                selectedProduct.unit === 'козунак' ? 'козунака' :
                selectedProduct.unit === 'кафе' ? 'кафета' :
                selectedProduct.unit === 'яйце' ? 'яйца' :
                selectedProduct.unit === 'бутилка' ? 'бутилки' :
                selectedProduct.unit === 'литър' ? 'литра' :
                selectedProduct.unit === 'кг' ? 'килограма' :
                selectedProduct.unit}
            </div>
            <div className="mt-3 text-sm text-zinc-500">
              По {selectedProduct.price.toFixed(2)} EUR за {selectedProduct.unit}
            </div>
          </div>

          <button
            onClick={() => setShowCustom(true)}
            className="w-full text-sm text-orange-400 hover:text-orange-300 underline transition-colors"
          >
            Изчисли с друга цена →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Custom Price Input */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Въведете цена на продукт (EUR)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="10.00"
              className="w-full px-4 py-3 bg-black border-2 border-orange-500/50 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {customPrice && parseFloat(customPrice) > 0 && (
            <div className="bg-black/60 border border-orange-500/50 rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">
                {formatNumber(lostProducts)}
              </div>
              <div className="text-lg text-zinc-300">
                продукта по {parseFloat(customPrice).toFixed(2)} EUR
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setShowCustom(false);
              setCustomPrice('');
            }}
            className="w-full text-sm text-orange-400 hover:text-orange-300 underline transition-colors"
          >
            ← Назад към продуктите
          </button>
        </div>
      )}
    </div>
  );
}
