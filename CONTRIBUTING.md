# Ръководство за разработчици

Благодарим за интереса към проекта! Това ръководство ще ви помогне да започнете да допринасяте за "Какво ми взима държавата".

## 📋 Съдържание

- [Как да започнете](#как-да-започнете)
- [Структура на кода](#структура-на-кода)
- [Стандарти за код](#стандарти-за-код)
- [Тестване](#тестване)
- [Pull Request процес](#pull-request-процес)

## 🚀 Как да започнете

### Предварителни изисквания

- Node.js 18+
- npm или yarn
- Git

### Локална настройка

1. **Fork-нете репозиторито**

   Кликнете на "Fork" бутона в GitHub.

2. **Клонирайте вашия fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/kakvomivzimat.git
   cd kakvomivzimat
   ```

3. **Инсталирайте зависимостите**

   ```bash
   npm install
   ```

4. **Стартирайте development сървъра**

   ```bash
   npm run dev
   ```

   Отворете [http://localhost:3000](http://localhost:3000)

5. **Пуснете тестовете**

   ```bash
   npm test
   ```

## 🏗️ Структура на кода

### Директории

```
kakvomivzimat/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + SEO
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React компоненти
│   ├── SalaryCalculatorForm.tsx
│   ├── ResultsDisplay.tsx
│   └── ProductComparison.tsx
├── lib/                   # Бизнес логика
│   ├── SalaryCalculator.ts
│   └── SalaryCalculator.test.ts
└── public/                # Static assets
```

### Файлова конвенция

- **React компоненти**: PascalCase (напр. `SalaryCalculatorForm.tsx`)
- **Utility функции**: camelCase (напр. `formatCurrency.ts`)
- **Типове**: PascalCase с `.types.ts` суфикс
- **Тестове**: Същото име като файла + `.test.ts` суфикс

## 📝 Стандарти за код

### TypeScript

- **Винаги типизирайте параметри и return values**

  ```typescript
  // ✅ Добро
  function calculateTax(salary: number): number {
    return salary * 0.1;
  }

  // ❌ Лошо
  function calculateTax(salary) {
    return salary * 0.1;
  }
  ```

- **Използвайте интерфейси за обекти**

  ```typescript
  // ✅ Добро
  interface TaxConfig {
    year: number;
    rate: number;
  }

  // ❌ Лошо
  type TaxConfig = {
    year: number;
    rate: number;
  }
  ```

- **Избягвайте `any`**

  Използвайте `unknown` ако не знаете типа, след което type guard.

### React компоненти

- **Функционални компоненти с TypeScript**

  ```typescript
  interface Props {
    salary: number;
    onCalculate: (result: number) => void;
  }

  export function SalaryDisplay({ salary, onCalculate }: Props) {
    // ...
  }
  ```

- **Client компоненти трябва да имат `'use client'` директива**

  ```typescript
  'use client';

  import { useState } from 'react';

  export function InteractiveComponent() {
    // ...
  }
  ```

- **Документирайте сложни компоненти**

  ```typescript
  /**
   * Component for displaying salary comparison results
   *
   * @param result - Comparison result from SalaryCalculator
   * @param onReset - Callback when user wants to reset
   */
  export function ResultsDisplay({ result, onReset }: Props) {
    // ...
  }
  ```

### Styling

- **Използвайте Tailwind utility classes**

  ```tsx
  // ✅ Добро
  <div className="bg-black text-white p-4 rounded-lg">

  // ❌ Лошо
  <div style={{ background: 'black', color: 'white', padding: '1rem' }}>
  ```

- **Групирайте responsive classes**

  ```tsx
  <div className="text-sm md:text-base lg:text-lg">
  ```

- **Използвайте semantic class names за повторяеми стилове**

  ```css
  /* globals.css */
  .btn-primary {
    @apply bg-danger-600 hover:bg-danger-700 text-white font-bold py-2 px-4 rounded;
  }
  ```

### Коментари и документация

- **JSDoc за публични функции и класове**

  ```typescript
  /**
   * Calculates net salary from gross salary
   *
   * @param grossSalary - The gross salary amount in BGN
   * @param config - Tax configuration to use
   * @returns Full calculation result including all contributions
   *
   * @example
   * ```typescript
   * const result = calculator.calculateNetFromGross(5000, TAX_CONFIG_2025);
   * console.log(result.netSalary); // 3987.80
   * ```
   */
  public calculateNetFromGross(grossSalary: number, config: TaxConfig): SalaryCalculationResult {
    // ...
  }
  ```

- **Inline коментари само за сложна логика**

  ```typescript
  // Calculate contributions capped at max insurable income
  const contributionBase = Math.min(grossSalary, config.maxInsurableIncome);
  ```

## 🧪 Тестване

### Писане на тестове

- **Всяка нова функционалност трябва да има тестове**
- **Тестовете трябва да бъдат descriptive**

  ```typescript
  describe('SalaryCalculator', () => {
    describe('calculateNetFromGross', () => {
      test('should calculate correctly for salary below max insurable income', () => {
        // ...
      });

      test('should cap contributions at max insurable income', () => {
        // ...
      });
    });
  });
  ```

- **Тествайте edge cases**

  ```typescript
  test('should handle very low salaries', () => {
    const result = calculator.calculateNetFromGross(500, config);
    expect(result.netSalary).toBeGreaterThan(0);
  });

  test('should handle very high salaries', () => {
    const result = calculator.calculateNetFromGross(10000, config);
    expect(result.totalEmployeeContributions).toBeLessThan(grossSalary);
  });
  ```

### Пускане на тестове

```bash
# Всички тестове
npm test

# Watch mode
npm run test:watch

# С coverage
npm test -- --coverage
```

### Test-Driven Development (TDD)

Препоръчваме да използвате TDD за нови функционалности:

1. Напишете failing test
2. Имплементирайте минимален код за да мине теста
3. Refactor
4. Повторете

## 🔄 Pull Request процес

### Преди да отворите PR

1. **Създайте feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Commit-вайте промените**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Използвайте [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - нова функционалност
   - `fix:` - bug fix
   - `docs:` - документация
   - `style:` - форматиране
   - `refactor:` - рефакториране
   - `test:` - добавяне на тестове
   - `chore:` - build tasks, и т.н.

3. **Уверете се че всички тестове минават**

   ```bash
   npm test
   npm run build
   ```

4. **Push към вашия fork**

   ```bash
   git push origin feature/amazing-feature
   ```

### Отваряне на Pull Request

1. Отидете на оригиналното repo в GitHub
2. Кликнете "New Pull Request"
3. Изберете вашия feature branch
4. Попълнете PR template:

   ```markdown
   ## Описание
   Кратко описание на промените

   ## Тип промяна
   - [ ] Bug fix
   - [ ] Нова функционалност
   - [ ] Breaking change
   - [ ] Документация

   ## Как да тествате
   1. Стъпка 1
   2. Стъпка 2

   ## Checklist
   - [ ] Кодът следва стандартите на проекта
   - [ ] Самопрегледах кода
   - [ ] Коментирах сложните части
   - [ ] Направих съответни промени в документацията
   - [ ] Промените не генерират нови warnings
   - [ ] Добавих тестове които доказват че fix-а работи
   - [ ] Новите и съществуващите unit tests минават локално
   - [ ] Зависимостите са актуални
   ```

### Review процес

1. Maintainer-ите ще прегледат вашия PR
2. Отговорете на коментарите и направете необходимите промени
3. Push-нете допълнителни commits към същия branch
4. След одобрение, PR-ът ще бъде merge-нат

## 🎯 Идеи за допринасяне

### За начинаещи

- 🐛 Fix typos в документацията
- 📝 Подобрете коментарите в кода
- 🎨 Подобрете Tailwind стиловете
- ✅ Добавете още unit tests

### За напреднали

- ⚡ Performance оптимизации
- 🌐 Internationalization (i18n)
- 📊 Добавяне на charts и visualizations
- 🔍 Advanced SEO features
- 📱 Progressive Web App (PWA) features

### Специфични области

#### Данъци и формули

Ако имате експертиза в българското данъчно законодателство:
- Верифицирайте формулите
- Добавете edge cases
- Документирайте законовите основания

#### UI/UX

- Подобрете accessibility (a11y)
- Добавете анимации
- Подобрете mobile experience
- Добавете dark/light mode toggle

#### DevOps

- Setup CI/CD pipeline
- Добавете E2E testing
- Performance monitoring
- Error tracking

## 📞 Въпроси?

Ако имате въпроси:

1. Проверете [документацията](README.md)
2. Потърсете в [existing issues](https://github.com/yourusername/kakvomivzimat/issues)
3. Отворете нов issue с таг `question`

## 🙏 Благодарности

Благодарим че допринасяте за проекта! Всяко подобрение, дори най-малкото, прави разлика.

---

**Забележка**: Този проект следва [Code of Conduct](CODE_OF_CONDUCT.md). Като участвате, се очаква да го спазвате.
