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
      expect(TAX_CONFIG_2025.maxInsurableIncome).toBe(2111.46);
      expect(TAX_CONFIG_2025.employee.pension).toBe(0.0658);
      expect(TAX_CONFIG_2025.employer.pension).toBe(0.0822);
      expect(TAX_CONFIG_2025.incomeTaxRate).toBe(0.10);
    });

    test('2026 configuration should have correct values', () => {
      expect(TAX_CONFIG_2026.year).toBe(2026);
      expect(TAX_CONFIG_2026.maxInsurableIncome).toBe(2300);
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
      const grossSalary = 1500;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);

      // Calculate expected values
      const totalContributionRate = 0.0658 + 0.014 + 0.004 + 0.022 + 0.032; // 0.1378
      const expectedContributions = grossSalary * totalContributionRate; // 206.7
      const expectedTaxableIncome = grossSalary - expectedContributions; // 1293.3
      const expectedTax = expectedTaxableIncome * 0.10; // 129.33
      const expectedNet = expectedTaxableIncome - expectedTax; // 1163.97

      expect(result.grossSalary).toBe(1500);
      expect(result.totalEmployeeContributions).toBeCloseTo(206.7, 1);
      expect(result.incomeTax).toBeCloseTo(129.33, 1);
      expect(result.netSalary).toBeCloseTo(1163.97, 1);
    });

    test('should calculate net salary correctly for salary above max insurable income (2025)', () => {
      const grossSalary = 2500;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);

      // Contributions are capped at 2111.46
      const contributionBase = 2111.46;
      const totalContributionRate = 0.0658 + 0.014 + 0.004 + 0.022 + 0.032; // 0.1378
      const expectedContributions = contributionBase * totalContributionRate; // 290.96
      const expectedTaxableIncome = grossSalary - expectedContributions; // 2209.04
      const expectedTax = expectedTaxableIncome * 0.10; // 220.904
      const expectedNet = expectedTaxableIncome - expectedTax; // 1988.14

      expect(result.grossSalary).toBe(2500);
      expect(result.totalEmployeeContributions).toBeCloseTo(290.96, 1);
      expect(result.incomeTax).toBeCloseTo(220.90, 1);
      expect(result.netSalary).toBeCloseTo(1988.14, 1);
    });

    test('should calculate employer contributions correctly (2025)', () => {
      const grossSalary = 1500;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);

      // Employer contributions
      const expectedPension = 1500 * 0.0822; // 123.3
      const expectedSickness = 1500 * 0.021; // 31.5
      const expectedUnemployment = 1500 * 0.006; // 9
      const expectedSupplementary = 1500 * 0.028; // 42
      const expectedOccupational = 1500 * 0.004; // 6
      const expectedHealth = 1500 * 0.048; // 72

      expect(result.employerContributions.pension).toBeCloseTo(123.3, 1);
      expect(result.employerContributions.sickness).toBeCloseTo(31.5, 1);
      expect(result.employerContributions.unemployment).toBeCloseTo(9, 1);
      expect(result.employerContributions.supplementaryPension).toBeCloseTo(42, 1);
      expect(result.employerContributions.occupationalAccidents).toBeCloseTo(6, 1);
      expect(result.employerContributions.health).toBeCloseTo(72, 1);

      const totalEmployer = 123.3 + 31.5 + 9 + 42 + 6 + 72; // 283.8
      expect(result.totalEmployerContributions).toBeCloseTo(283.8, 1);
      expect(result.totalEmployerCost).toBeCloseTo(1783.8, 1);
    });

    test('should calculate net salary correctly for 2026 with new rates', () => {
      const grossSalary = 1500;
      const result = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2026);

      // Calculate expected values with 2026 rates
      const totalContributionRate = 0.0747 + 0.014 + 0.004 + 0.022 + 0.032; // 0.1467
      const expectedContributions = grossSalary * totalContributionRate; // 220.05
      const expectedTaxableIncome = grossSalary - expectedContributions; // 1279.95
      const expectedTax = expectedTaxableIncome * 0.10; // 127.995
      const expectedNet = expectedTaxableIncome - expectedTax; // 1151.955

      expect(result.grossSalary).toBe(1500);
      expect(result.totalEmployeeContributions).toBeCloseTo(220.05, 1);
      expect(result.incomeTax).toBeCloseTo(127.99, 1);
      expect(result.netSalary).toBeCloseTo(1151.96, 1);
    });

    test('should handle max insurable income increase in 2026', () => {
      const grossSalary = 2250;

      const result2025 = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2025);
      const result2026 = calculator.calculateNetFromGross(grossSalary, TAX_CONFIG_2026);

      // In 2025, contributions are capped at 2111.46
      // In 2026, contributions are on full 2250 (below max of 2300)
      expect(result2025.totalEmployeeContributions).toBeLessThan(result2026.totalEmployeeContributions);
    });
  });

  describe('compareSalaryBetweenYears', () => {
    test('should correctly compare salaries for 2000 EUR net in 2025', () => {
      const comparison = calculator.compareSalaryBetweenYears(2000);

      // Verify that gross salary is calculated correctly
      expect(comparison.year2025.netSalary).toBeCloseTo(2000, 0);

      // Verify that the same gross salary yields less net in 2026
      expect(comparison.year2026.netSalary).toBeLessThan(comparison.year2025.netSalary);

      // Verify negative difference (loss)
      expect(comparison.netSalaryDifference).toBeLessThan(0);

      // Verify annual difference is 12x monthly
      expect(comparison.annualNetSalaryDifference).toBeCloseTo(comparison.netSalaryDifference * 12, 1);

      // Verify percentage change is negative
      expect(comparison.percentageChange).toBeLessThan(0);
    });

    test('should correctly compare salaries for 1000 EUR net in 2025', () => {
      const comparison = calculator.compareSalaryBetweenYears(1000);

      expect(comparison.year2025.netSalary).toBeCloseTo(1000, 0);
      expect(comparison.year2026.netSalary).toBeLessThan(comparison.year2025.netSalary);
      expect(comparison.netSalaryDifference).toBeLessThan(0);
    });

    test('should correctly calculate employer cost differences', () => {
      const comparison = calculator.compareSalaryBetweenYears(1500);

      // Employer costs should increase in 2026 due to higher pension contribution
      expect(comparison.year2026.totalEmployerCost).toBeGreaterThan(comparison.year2025.totalEmployerCost);
      expect(comparison.employerCostDifference).toBeGreaterThan(0);
      expect(comparison.annualEmployerCostDifference).toBeCloseTo(comparison.employerCostDifference * 12, 1);
    });

    test('should handle salaries at max insurable income threshold', () => {
      // Test at 2025 max threshold
      const comparison1 = calculator.compareSalaryBetweenYears(2000);
      expect(comparison1.year2025.grossSalary).toBeGreaterThanOrEqual(TAX_CONFIG_2025.maxInsurableIncome);

      // Test at 2026 max threshold
      const comparison2 = calculator.compareSalaryBetweenYears(2200);
      expect(comparison2.year2025.grossSalary).toBeGreaterThanOrEqual(TAX_CONFIG_2026.maxInsurableIncome);
    });

    test('should maintain calculation accuracy across different salary ranges', () => {
      const testSalaries = [500, 1000, 1500, 2000, 2500, 3000];

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
      const annualDifference = -600; // Lost 600 EUR per year
      const breadPrice = 1.25;

      const lostBreads = calculator.calculateProductLoss(annualDifference, breadPrice);
      expect(lostBreads).toBe(480); // 600 / 1.25 = 480
    });

    test('should handle different product prices', () => {
      const annualDifference = -300;

      expect(calculator.calculateProductLoss(annualDifference, 1.5)).toBe(200);
      expect(calculator.calculateProductLoss(annualDifference, 5)).toBe(60);
      expect(calculator.calculateProductLoss(annualDifference, 12.5)).toBe(24);
    });

    test('should floor the result (no partial products)', () => {
      const annualDifference = -50;
      const productPrice = 15;

      const result = calculator.calculateProductLoss(annualDifference, productPrice);
      expect(result).toBe(3); // 50 / 15 = 3.33... -> 3
    });

    test('should handle zero difference', () => {
      expect(calculator.calculateProductLoss(0, 5)).toBe(0);
    });

    test('should use absolute value of difference', () => {
      expect(calculator.calculateProductLoss(-50, 5)).toBe(10);
      expect(calculator.calculateProductLoss(50, 5)).toBe(10);
    });
  });

  describe('getConfig', () => {
    test('should return correct configuration for 2025', () => {
      const config = calculator.getConfig(2025);
      expect(config.year).toBe(2025);
      expect(config.maxInsurableIncome).toBe(2111.46);
    });

    test('should return correct configuration for 2026', () => {
      const config = calculator.getConfig(2026);
      expect(config.year).toBe(2026);
      expect(config.maxInsurableIncome).toBe(2300);
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
      const result = calculator.calculateNetFromGross(250, TAX_CONFIG_2025);
      expect(result.netSalary).toBeGreaterThan(0);
      expect(result.netSalary).toBeLessThan(250);
    });

    test('should handle very high salaries', () => {
      const result = calculator.calculateNetFromGross(5000, TAX_CONFIG_2025);
      expect(result.netSalary).toBeGreaterThan(0);
      expect(result.totalEmployeeContributions).toBe(
        Math.round(TAX_CONFIG_2025.maxInsurableIncome * 0.1378 * 100) / 100
      );
    });

    test('should handle salary exactly at max insurable income', () => {
      const result2025 = calculator.calculateNetFromGross(2111.46, TAX_CONFIG_2025);
      const result2026 = calculator.calculateNetFromGross(2300, TAX_CONFIG_2026);

      expect(result2025.grossSalary).toBe(2111.46);
      expect(result2026.grossSalary).toBe(2300);
    });
  });

  describe('Real-world Scenarios', () => {
    test('Scenario: Person earning 2000 EUR net in 2025', () => {
      const comparison = calculator.compareSalaryBetweenYears(2000);

      console.log('\n=== Сценарий: Човек с 2000 EUR нетна заплата през 2025 ===');
      console.log(`Брутна заплата: ${comparison.year2025.grossSalary.toFixed(2)} EUR`);
      console.log(`Нетна заплата 2025: ${comparison.year2025.netSalary.toFixed(2)} EUR`);
      console.log(`Нетна заплата 2026: ${comparison.year2026.netSalary.toFixed(2)} EUR`);
      console.log(`Месечна загуба: ${comparison.netSalaryDifference.toFixed(2)} EUR`);
      console.log(`Годишна загуба: ${comparison.annualNetSalaryDifference.toFixed(2)} EUR`);
      console.log(`Процентна промяна: ${comparison.percentageChange.toFixed(2)}%`);
      console.log(`Разход за работодател 2025: ${comparison.year2025.totalEmployerCost.toFixed(2)} EUR`);
      console.log(`Разход за работодател 2026: ${comparison.year2026.totalEmployerCost.toFixed(2)} EUR`);
      console.log(`Увеличение за работодател: ${comparison.employerCostDifference.toFixed(2)} EUR/месец`);

      expect(comparison.year2025.netSalary).toBeCloseTo(2000, 0);
      expect(comparison.netSalaryDifference).toBeLessThan(0);
    });

    test('Scenario: Minimum wage worker', () => {
      const minWageNet = 477; // Approximate minimum wage net in EUR
      const comparison = calculator.compareSalaryBetweenYears(minWageNet);

      console.log('\n=== Сценарий: Работещ на минимална заплата ===');
      console.log(`Нетна заплата 2025: ${comparison.year2025.netSalary.toFixed(2)} EUR`);
      console.log(`Нетна заплата 2026: ${comparison.year2026.netSalary.toFixed(2)} EUR`);
      console.log(`Месечна загуба: ${comparison.netSalaryDifference.toFixed(2)} EUR`);

      expect(comparison.year2025.netSalary).toBeCloseTo(minWageNet, 0);
    });

    test('Scenario: High earner above max insurable income', () => {
      const highNetSalary = 2500;
      const comparison = calculator.compareSalaryBetweenYears(highNetSalary);

      console.log('\n=== Сценарий: Високо платен служител ===');
      console.log(`Брутна заплата: ${comparison.year2025.grossSalary.toFixed(2)} EUR`);
      console.log(`Нетна заплата 2025: ${comparison.year2025.netSalary.toFixed(2)} EUR`);
      console.log(`Нетна заплата 2026: ${comparison.year2026.netSalary.toFixed(2)} EUR`);
      console.log(`Месечна загуба: ${comparison.netSalaryDifference.toFixed(2)} EUR`);
      console.log(`Годишна загуба: ${comparison.annualNetSalaryDifference.toFixed(2)} EUR`);

      expect(comparison.year2025.grossSalary).toBeGreaterThan(TAX_CONFIG_2025.maxInsurableIncome);
    });
  });
});
