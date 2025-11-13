/**
 * Unit tests for SalaryCalculator
 *
 * These tests verify that all salary and tax calculations are correct
 * according to Bulgarian tax law for 2025 and 2026.
 */

import {
  SalaryCalculator,
  TAX_CONFIG_2025,
  TAX_CONFIG_2026,
  TaxConfig,
} from './SalaryCalculator';

describe('SalaryCalculator', () => {
  let calculator: SalaryCalculator;

  beforeEach(() => {
    calculator = new SalaryCalculator();
  });

  describe('Tax Configuration', () => {
    test('2025 configuration should have correct values', () => {
      expect(TAX_CONFIG_2025.year).toBe(2025);
      expect(TAX_CONFIG_2025.maxInsurableIncome).toBe(4130);
      expect(TAX_CONFIG_2025.employee.pension).toBe(0.0658);
      expect(TAX_CONFIG_2025.employer.pension).toBe(0.0822);
      expect(TAX_CONFIG_2025.incomeTaxRate).toBe(0.10);
    });

    test('2026 configuration should have correct values', () => {
      expect(TAX_CONFIG_2026.year).toBe(2026);
      expect(TAX_CONFIG_2026.maxInsurableIncome).toBe(4600);
      expect(TAX_CONFIG_2026.employee.pension).toBe(0.0747); // 6.58% + 0.89%
      expect(TAX_CONFIG_2026.employer.pension).toBe(0.0933); // 8.22% + 1.11%
      expect(TAX_CONFIG_2026.incomeTaxRate).toBe(0.10);
    });

    test('2026 pension contribution should be 0.89% higher for employee than 2025', () => {
      const difference = TAX_CONFIG_2026.employee.pension - TAX_CONFIG_2025.employee.pension;
      expect(Math.round(difference * 10000) / 10000).toBe(0.0089);
    });

    test('2026 pension contribution should be 1.11% higher for employer than 2025', () => {
      const difference = TAX_CONFIG_2026.employer.pension - TAX_CONFIG_2025.employer.pension;
      expect(Math.round(difference * 10000) / 10000).toBe(0.0111);
    });
  });

  describe('calculateNetFromGross', () => {
    test('should calculate net salary correctly for salary below max insurable income (2025)', () => {
      const grossSalary = 3000;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);

      // Calculate expected values
      const totalContributionRate = 0.0658 + 0.014 + 0.004 + 0.022 + 0.032; // 0.1378
      const expectedContributions = grossSalary * totalContributionRate; // 413.4
      const expectedTaxableIncome = grossSalary - expectedContributions; // 2586.6
      const expectedTax = expectedTaxableIncome * 0.10; // 258.66
      const expectedNet = expectedTaxableIncome - expectedTax; // 2327.94

      expect(result.grossSalary).toBe(3000);
      expect(result.totalEmployeeContributions).toBeCloseTo(413.4, 1);
      expect(result.incomeTax).toBeCloseTo(258.66, 1);
      expect(result.netSalary).toBeCloseTo(2327.94, 1);
    });

    test('should calculate net salary correctly for salary above max insurable income (2025)', () => {
      const grossSalary = 5000;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);

      // Contributions are capped at 4130
      const contributionBase = 4130;
      const totalContributionRate = 0.0658 + 0.014 + 0.004 + 0.022 + 0.032; // 0.1378
      const expectedContributions = contributionBase * totalContributionRate; // 569.114
      const expectedTaxableIncome = grossSalary - expectedContributions; // 4430.886
      const expectedTax = expectedTaxableIncome * 0.10; // 443.0886
      const expectedNet = expectedTaxableIncome - expectedTax; // 3987.7974

      expect(result.grossSalary).toBe(5000);
      expect(result.totalEmployeeContributions).toBeCloseTo(569.11, 1);
      expect(result.incomeTax).toBeCloseTo(443.09, 1);
      expect(result.netSalary).toBeCloseTo(3987.80, 1);
    });

    test('should calculate employer contributions correctly (2025)', () => {
      const grossSalary = 3000;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);

      // Employer contributions
      const expectedPension = 3000 * 0.0822; // 246.6
      const expectedSickness = 3000 * 0.021; // 63
      const expectedUnemployment = 3000 * 0.006; // 18
      const expectedSupplementary = 3000 * 0.028; // 84
      const expectedOccupational = 3000 * 0.004; // 12
      const expectedHealth = 3000 * 0.048; // 144

      expect(result.employerContributions.pension).toBeCloseTo(246.6, 1);
      expect(result.employerContributions.sickness).toBeCloseTo(63, 1);
      expect(result.employerContributions.unemployment).toBeCloseTo(18, 1);
      expect(result.employerContributions.supplementaryPension).toBeCloseTo(84, 1);
      expect(result.employerContributions.occupationalAccidents).toBeCloseTo(12, 1);
      expect(result.employerContributions.health).toBeCloseTo(144, 1);

      const totalEmployer = 246.6 + 63 + 18 + 84 + 12 + 144; // 567.6
      expect(result.totalEmployerContributions).toBeCloseTo(567.6, 1);
      expect(result.totalEmployerCost).toBeCloseTo(3567.6, 1);
    });

    test('should calculate net salary correctly for 2026 with new rates', () => {
      const grossSalary = 3000;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2026);

      // Calculate expected values with 2026 rates
      const totalContributionRate = 0.0747 + 0.014 + 0.004 + 0.022 + 0.032; // 0.1467
      const expectedContributions = grossSalary * totalContributionRate; // 440.1
      const expectedTaxableIncome = grossSalary - expectedContributions; // 2559.9
      const expectedTax = expectedTaxableIncome * 0.10; // 255.99
      const expectedNet = expectedTaxableIncome - expectedTax; // 2303.91

      expect(result.grossSalary).toBe(3000);
      expect(result.totalEmployeeContributions).toBeCloseTo(440.1, 1);
      expect(result.incomeTax).toBeCloseTo(255.99, 1);
      expect(result.netSalary).toBeCloseTo(2303.91, 1);
    });

    test('should handle max insurable income increase in 2026', () => {
      const grossSalary = 4500;

      const result2025 = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);
      const result2026 = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2026);

      // In 2025, contributions are capped at 4130
      // In 2026, contributions are capped at 4500 (below max of 4600)
      expect(result2025.totalEmployeeContributions).toBeLessThan(result2026.totalEmployeeContributions);
    });
  });

  describe('compareSalaryBetweenYears', () => {
    test('should correctly compare salaries for 4000 BGN net in 2025', () => {
      const comparison = calculator.compareSalaryBetweenYears(4000);

      // Verify that gross salary is calculated correctly
      expect(comparison.year2025.netSalary).toBeCloseTo(4000, 0);

      // Verify that the same gross salary yields less net in 2026
      expect(comparison.year2026.netSalary).toBeLessThan(comparison.year2025.netSalary);

      // Verify negative difference (loss)
      expect(comparison.netSalaryDifference).toBeLessThan(0);

      // Verify annual difference is 12x monthly
      expect(comparison.annualNetSalaryDifference).toBeCloseTo(comparison.netSalaryDifference * 12, 1);

      // Verify percentage change is negative
      expect(comparison.percentageChange).toBeLessThan(0);
    });

    test('should correctly compare salaries for 2000 BGN net in 2025', () => {
      const comparison = calculator.compareSalaryBetweenYears(2000);

      expect(comparison.year2025.netSalary).toBeCloseTo(2000, 0);
      expect(comparison.year2026.netSalary).toBeLessThan(comparison.year2025.netSalary);
      expect(comparison.netSalaryDifference).toBeLessThan(0);
    });

    test('should correctly calculate employer cost differences', () => {
      const comparison = calculator.compareSalaryBetweenYears(3000);

      // Employer costs should increase in 2026 due to higher pension contribution
      expect(comparison.year2026.totalEmployerCost).toBeGreaterThan(comparison.year2025.totalEmployerCost);
      expect(comparison.employerCostDifference).toBeGreaterThan(0);
      expect(comparison.annualEmployerCostDifference).toBeCloseTo(comparison.employerCostDifference * 12, 1);
    });

    test('should handle salaries at max insurable income threshold', () => {
      // Test at 2025 max threshold
      const comparison1 = calculator.compareSalaryBetweenYears(3500);
      expect(comparison1.year2025.grossSalary).toBeGreaterThanOrEqual(TAX_CONFIG_2025.maxInsurableIncome);

      // Test at 2026 max threshold
      const comparison2 = calculator.compareSalaryBetweenYears(3900);
      expect(comparison2.year2025.grossSalary).toBeGreaterThanOrEqual(TAX_CONFIG_2026.maxInsurableIncome);
    });

    test('should maintain calculation accuracy across different salary ranges', () => {
      const testSalaries = [1000, 2000, 3000, 4000, 5000, 6000];

      testSalaries.forEach((salary) => {
        const comparison = calculator.compareSalaryBetweenYears(salary);

        // Verify that recalculated net from gross matches input
        expect(comparison.year2025.netSalary).toBeCloseTo(salary, 0);

        // Verify consistency (with rounding tolerance)
        expect(comparison.netSalaryDifference).toBeCloseTo(
          comparison.year2026.netSalary - comparison.year2025.netSalary,
          2
        );
      });
    });
  });

  describe('calculateProductLoss', () => {
    test('should calculate correct number of lost products', () => {
      const annualDifference = -1200; // Lost 1200 BGN per year
      const breadPrice = 2.5;

      const lostBreads = calculator.calculateProductLoss(annualDifference, breadPrice);
      expect(lostBreads).toBe(480); // 1200 / 2.5 = 480
    });

    test('should handle different product prices', () => {
      const annualDifference = -600;

      expect(calculator.calculateProductLoss(annualDifference, 3)).toBe(200);
      expect(calculator.calculateProductLoss(annualDifference, 10)).toBe(60);
      expect(calculator.calculateProductLoss(annualDifference, 25)).toBe(24);
    });

    test('should floor the result (no partial products)', () => {
      const annualDifference = -100;
      const productPrice = 30;

      const result = calculator.calculateProductLoss(annualDifference, productPrice);
      expect(result).toBe(3); // 100 / 30 = 3.33... -> 3
    });

    test('should handle zero difference', () => {
      expect(calculator.calculateProductLoss(0, 10)).toBe(0);
    });

    test('should use absolute value of difference', () => {
      expect(calculator.calculateProductLoss(-100, 10)).toBe(10);
      expect(calculator.calculateProductLoss(100, 10)).toBe(10);
    });
  });

  describe('getConfig', () => {
    test('should return correct configuration for 2025', () => {
      const config = calculator.getConfig(2025);
      expect(config.year).toBe(2025);
      expect(config.maxInsurableIncome).toBe(4130);
    });

    test('should return correct configuration for 2026', () => {
      const config = calculator.getConfig(2026);
      expect(config.year).toBe(2026);
      expect(config.maxInsurableIncome).toBe(4600);
    });
  });

  describe('Custom Configuration', () => {
    test('should allow custom tax configurations', () => {
      const customConfig: TaxConfig = {
        year: 2027,
        maxInsurableIncome: 5000,
        employee: {
          pension: 0.08,
          sickness: 0.015,
          unemployment: 0.005,
          supplementaryPension: 0.025,
          health: 0.035,
        },
        employer: {
          pension: 0.10,
          sickness: 0.025,
          unemployment: 0.007,
          supplementaryPension: 0.03,
          occupationalAccidents: 0.005,
          health: 0.05,
        },
        incomeTaxRate: 0.12,
      };

      const customCalculator = new SalaryCalculator(customConfig, customConfig);
      const result = customCalculator.calculateNetFromGross(3000, customConfig);

      // Verify custom rates are used
      const totalContributionRate = 0.08 + 0.015 + 0.005 + 0.025 + 0.035; // 0.16
      const expectedContributions = 3000 * totalContributionRate; // 480
      const expectedTaxableIncome = 3000 - expectedContributions; // 2520
      const expectedTax = expectedTaxableIncome * 0.12; // 302.4
      const expectedNet = expectedTaxableIncome - expectedTax; // 2217.6

      expect(result.totalEmployeeContributions).toBeCloseTo(480, 1);
      expect(result.incomeTax).toBeCloseTo(302.4, 1);
      expect(result.netSalary).toBeCloseTo(2217.6, 1);
    });
  });

  describe('Edge Cases', () => {
    test('should handle very low salaries', () => {
      const result = calculator.calculateNetFromGross(500, TAX_CONFIG_2025);
      expect(result.netSalary).toBeGreaterThan(0);
      expect(result.netSalary).toBeLessThan(500);
    });

    test('should handle very high salaries', () => {
      const result = calculator.calculateNetFromGross(10000, TAX_CONFIG_2025);
      expect(result.netSalary).toBeGreaterThan(0);
      expect(result.totalEmployeeContributions).toBe(
        Math.round(TAX_CONFIG_2025.maxInsurableIncome * 0.1378 * 100) / 100
      );
    });

    test('should handle salary exactly at max insurable income', () => {
      const result2025 = calculator.calculateNetFromGross(4130, TAX_CONFIG_2025);
      const result2026 = calculator.calculateNetFromGross(4600, TAX_CONFIG_2026);

      expect(result2025.grossSalary).toBe(4130);
      expect(result2026.grossSalary).toBe(4600);
    });
  });

  describe('Real-world Scenarios', () => {
    test('Scenario: Person earning 4000 BGN net in 2025', () => {
      const comparison = calculator.compareSalaryBetweenYears(4000);

      console.log('\n=== Сценарий: Човек с 4000 лв. нетна заплата през 2025 ===');
      console.log(`Брутна заплата: ${comparison.year2025.grossSalary.toFixed(2)} лв.`);
      console.log(`Нетна заплата 2025: ${comparison.year2025.netSalary.toFixed(2)} лв.`);
      console.log(`Нетна заплата 2026: ${comparison.year2026.netSalary.toFixed(2)} лв.`);
      console.log(`Месечна загуба: ${comparison.netSalaryDifference.toFixed(2)} лв.`);
      console.log(`Годишна загуба: ${comparison.annualNetSalaryDifference.toFixed(2)} лв.`);
      console.log(`Процентна промяна: ${comparison.percentageChange.toFixed(2)}%`);
      console.log(`Разход за работодател 2025: ${comparison.year2025.totalEmployerCost.toFixed(2)} лв.`);
      console.log(`Разход за работодател 2026: ${comparison.year2026.totalEmployerCost.toFixed(2)} лв.`);
      console.log(`Увеличение за работодател: ${comparison.employerCostDifference.toFixed(2)} лв./месец`);

      expect(comparison.year2025.netSalary).toBeCloseTo(4000, 0);
      expect(comparison.netSalaryDifference).toBeLessThan(0);
    });

    test('Scenario: Minimum wage worker', () => {
      const minWageNet = 933; // Approximate minimum wage net
      const comparison = calculator.compareSalaryBetweenYears(minWageNet);

      console.log('\n=== Сценарий: Работещ на минимална заплата ===');
      console.log(`Нетна заплата 2025: ${comparison.year2025.netSalary.toFixed(2)} лв.`);
      console.log(`Нетна заплата 2026: ${comparison.year2026.netSalary.toFixed(2)} лв.`);
      console.log(`Месечна загуба: ${comparison.netSalaryDifference.toFixed(2)} лв.`);

      expect(comparison.year2025.netSalary).toBeCloseTo(minWageNet, 0);
    });

    test('Scenario: High earner above max insurable income', () => {
      const highNetSalary = 5000;
      const comparison = calculator.compareSalaryBetweenYears(highNetSalary);

      console.log('\n=== Сценарий: Високо платен служител ===');
      console.log(`Брутна заплата: ${comparison.year2025.grossSalary.toFixed(2)} лв.`);
      console.log(`Нетна заплата 2025: ${comparison.year2025.netSalary.toFixed(2)} лв.`);
      console.log(`Нетна заплата 2026: ${comparison.year2026.netSalary.toFixed(2)} лв.`);
      console.log(`Месечна загуба: ${comparison.netSalaryDifference.toFixed(2)} лв.`);
      console.log(`Годишна загуба: ${comparison.annualNetSalaryDifference.toFixed(2)} лв.`);

      expect(comparison.year2025.grossSalary).toBeGreaterThan(TAX_CONFIG_2025.maxInsurableIncome);
    });
  });
});
