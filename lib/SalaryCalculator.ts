/**
 * SalaryCalculator - Comprehensive Bulgarian salary and tax calculator
 *
 * This class handles all calculations related to Bulgarian salary taxation,
 * including employee and employer contributions for both 2025 and 2026 tax years.
 *
 * @author Martin Kuvandzhiev
 * @version 1.0.0
 */

/**
 * Tax configuration for a specific year
 */
export interface TaxConfig {
  /** Year for which this configuration applies */
  year: number;

  /** Maximum insurable income (Максимален осигурителен доход) in BGN */
  maxInsurableIncome: number;

  /** Employee contributions (as decimal, e.g., 0.0658 for 6.58%) */
  employee: {
    /** Pension fund (Фонд пенсии) */
    pension: number;
    /** General illness and maternity (Фонд общо заболяване и майчинство) */
    sickness: number;
    /** Unemployment fund (Фонд безработица) */
    unemployment: number;
    /** Supplementary mandatory pension insurance (ДЗПО) */
    supplementaryPension: number;
    /** Health insurance (Фонд здравно осигуряване) */
    health: number;
  };

  /** Employer contributions (as decimal) */
  employer: {
    /** Pension fund (Фонд пенсии) */
    pension: number;
    /** General illness and maternity (Фонд общо заболяване и майчинство) */
    sickness: number;
    /** Unemployment fund (Фонд безработица) */
    unemployment: number;
    /** Supplementary mandatory pension insurance (ДЗПО) */
    supplementaryPension: number;
    /** Occupational accidents and diseases fund (Фонд ТЗПБ) */
    occupationalAccidents: number;
    /** Health insurance (Фонд здравно осигуряване) */
    health: number;
  };

  /** Personal income tax rate (Данък за физическите лица) */
  incomeTaxRate: number;
}

/**
 * Result of salary calculations
 */
export interface SalaryCalculationResult {
  /** Gross salary (Брутна заплата) */
  grossSalary: number;
  /** Net salary (Нетна заплата) */
  netSalary: number;
  /** Total employee contributions */
  totalEmployeeContributions: number;
  /** Total employer contributions */
  totalEmployerContributions: number;
  /** Total cost to employer */
  totalEmployerCost: number;
  /** Income tax amount */
  incomeTax: number;
  /** Breakdown of employee contributions */
  employeeContributions: {
    pension: number;
    sickness: number;
    unemployment: number;
    supplementaryPension: number;
    health: number;
  };
  /** Breakdown of employer contributions */
  employerContributions: {
    pension: number;
    sickness: number;
    unemployment: number;
    supplementaryPension: number;
    occupationalAccidents: number;
    health: number;
  };
}

/**
 * Comparison result between two tax years
 */
export interface SalaryComparisonResult {
  /** Results for 2025 */
  year2025: SalaryCalculationResult;
  /** Results for 2026 */
  year2026: SalaryCalculationResult;
  /** Difference in net salary */
  netSalaryDifference: number;
  /** Annual difference in net salary */
  annualNetSalaryDifference: number;
  /** Percentage change in net salary */
  percentageChange: number;
  /** Difference in employer cost */
  employerCostDifference: number;
  /** Annual difference in employer cost */
  annualEmployerCostDifference: number;
}

/**
 * Tax configurations for 2025 and 2026
 */
const TAX_CONFIG_2025: TaxConfig = {
  year: 2025,
  maxInsurableIncome: 4130,
  employee: {
    pension: 0.0658,
    sickness: 0.014,
    unemployment: 0.004,
    supplementaryPension: 0.022,
    health: 0.032,
  },
  employer: {
    pension: 0.0822,
    sickness: 0.021,
    unemployment: 0.006,
    supplementaryPension: 0.028,
    occupationalAccidents: 0.004,
    health: 0.048,
  },
  incomeTaxRate: 0.10,
};

const TAX_CONFIG_2026: TaxConfig = {
  year: 2026,
  maxInsurableIncome: 4600,
  employee: {
    pension: 0.0658 + 0.0089, // 6.58% + 0.89% increase = 7.47%
    sickness: 0.014,
    unemployment: 0.004,
    supplementaryPension: 0.022,
    health: 0.032,
  },
  employer: {
    pension: 0.0822 + 0.0111, // 8.22% + 1.11% increase = 9.33% for 2026
    sickness: 0.021,
    unemployment: 0.006,
    supplementaryPension: 0.028,
    occupationalAccidents: 0.004,
    health: 0.048,
  },
  incomeTaxRate: 0.10,
};

/**
 * Main salary calculator class
 */
export class SalaryCalculator {
  private config2025: TaxConfig;
  private config2026: TaxConfig;

  /**
   * Creates a new SalaryCalculator instance
   * @param customConfig2025 - Optional custom tax configuration for 2025
   * @param customConfig2026 - Optional custom tax configuration for 2026
   */
  constructor(customConfig2025?: TaxConfig, customConfig2026?: TaxConfig) {
    this.config2025 = customConfig2025 || TAX_CONFIG_2025;
    this.config2026 = customConfig2026 || TAX_CONFIG_2026;
  }

  /**
   * Calculates gross salary from net salary using iterative refinement
   *
   * In Bulgaria, people typically know their net salary, but all calculations
   * are based on gross salary. This method reverse-engineers the gross salary
   * using an iterative approach to handle the complexity of capped contributions.
   *
   * @param netSalary - The net salary amount
   * @param config - Tax configuration to use
   * @returns The calculated gross salary
   */
  private calculateGrossFromNet(netSalary: number, config: TaxConfig): number {
    // Total employee contribution rate
    const totalContributionRate =
      config.employee.pension +
      config.employee.sickness +
      config.employee.unemployment +
      config.employee.supplementaryPension +
      config.employee.health;

    // First approximation: assume gross salary is below the max insurable income
    let grossSalary = netSalary / (1 - totalContributionRate - config.incomeTaxRate);

    // If the calculated gross is above the max insurable income, use different formula
    if (grossSalary > config.maxInsurableIncome) {
      // Contributions are capped at maxInsurableIncome
      const cappedContributions = config.maxInsurableIncome * totalContributionRate;
      // netSalary = grossSalary - cappedContributions - (grossSalary - cappedContributions) * incomeTaxRate
      // netSalary = grossSalary * (1 - incomeTaxRate) - cappedContributions * (1 - incomeTaxRate)
      grossSalary = (netSalary + cappedContributions * (1 - config.incomeTaxRate)) / (1 - config.incomeTaxRate);
    }

    // Iteratively refine to account for rounding errors
    // This ensures the calculated net from the gross matches the input net
    let iterations = 0;
    const maxIterations = 10;
    const tolerance = 0.01; // 1 cent tolerance

    while (iterations < maxIterations) {
      const calculatedResult = this.calculateNetFromGross(grossSalary, config);
      const difference = netSalary - calculatedResult.netSalary;

      if (Math.abs(difference) < tolerance) {
        break; // Close enough
      }

      // Adjust gross salary based on the difference
      // We need to scale the adjustment based on the effective tax rate
      const effectiveRate = 1 - (calculatedResult.netSalary / grossSalary);
      const adjustment = difference / (1 - effectiveRate);
      grossSalary += adjustment;

      iterations++;
    }

    return Math.round(grossSalary * 100) / 100;
  }

  /**
   * Calculates net salary from gross salary
   *
   * @param grossSalary - The gross salary amount
   * @param config - Tax configuration to use
   * @returns Full calculation result including all contributions and net salary
   */
  public calculateNetFromGross(grossSalary: number, config: TaxConfig): SalaryCalculationResult {
    // Determine the base for contributions (capped at max insurable income)
    const contributionBase = Math.min(grossSalary, config.maxInsurableIncome);

    // Calculate employee contributions
    const employeeContributions = {
      pension: Math.round(contributionBase * config.employee.pension * 100) / 100,
      sickness: Math.round(contributionBase * config.employee.sickness * 100) / 100,
      unemployment: Math.round(contributionBase * config.employee.unemployment * 100) / 100,
      supplementaryPension: Math.round(contributionBase * config.employee.supplementaryPension * 100) / 100,
      health: Math.round(contributionBase * config.employee.health * 100) / 100,
    };

    const totalEmployeeContributions =
      employeeContributions.pension +
      employeeContributions.sickness +
      employeeContributions.unemployment +
      employeeContributions.supplementaryPension +
      employeeContributions.health;

    // Calculate taxable income (gross - employee contributions)
    const taxableIncome = grossSalary - totalEmployeeContributions;

    // Calculate income tax
    const incomeTax = Math.round(taxableIncome * config.incomeTaxRate * 100) / 100;

    // Calculate net salary
    const netSalary = Math.round((taxableIncome - incomeTax) * 100) / 100;

    // Calculate employer contributions
    const employerContributions = {
      pension: Math.round(contributionBase * config.employer.pension * 100) / 100,
      sickness: Math.round(contributionBase * config.employer.sickness * 100) / 100,
      unemployment: Math.round(contributionBase * config.employer.unemployment * 100) / 100,
      supplementaryPension: Math.round(contributionBase * config.employer.supplementaryPension * 100) / 100,
      occupationalAccidents: Math.round(contributionBase * config.employer.occupationalAccidents * 100) / 100,
      health: Math.round(contributionBase * config.employer.health * 100) / 100,
    };

    const totalEmployerContributions =
      employerContributions.pension +
      employerContributions.sickness +
      employerContributions.unemployment +
      employerContributions.supplementaryPension +
      employerContributions.occupationalAccidents +
      employerContributions.health;

    // Total cost to employer
    const totalEmployerCost = Math.round((grossSalary + totalEmployerContributions) * 100) / 100;

    return {
      grossSalary,
      netSalary,
      totalEmployeeContributions: Math.round(totalEmployeeContributions * 100) / 100,
      totalEmployerContributions: Math.round(totalEmployerContributions * 100) / 100,
      totalEmployerCost,
      incomeTax,
      employeeContributions,
      employerContributions,
    };
  }

  /**
   * Compares salary calculations between 2025 and 2026
   *
   * Given a net salary from 2025, this calculates what the equivalent
   * net salary would be in 2026 with the new tax regulations.
   *
   * @param netSalary2025 - The net salary received in 2025
   * @returns Comparison results showing the difference between years
   */
  public compareSalaryBetweenYears(netSalary2025: number): SalaryComparisonResult {
    // Step 1: Calculate gross salary from 2025 net salary
    const grossSalary = this.calculateGrossFromNet(netSalary2025, this.config2025);

    // Step 2: Calculate full details for 2025
    const result2025 = this.calculateNetFromGross(grossSalary, this.config2025);

    // Step 3: Calculate what the same gross salary yields in 2026
    const result2026 = this.calculateNetFromGross(grossSalary, this.config2026);

    // Step 4: Calculate differences
    const netSalaryDifference = Math.round((result2026.netSalary - result2025.netSalary) * 100) / 100;
    const annualNetSalaryDifference = Math.round(netSalaryDifference * 12 * 100) / 100;
    const percentageChange = Math.round((netSalaryDifference / result2025.netSalary) * 10000) / 100;

    const employerCostDifference = Math.round((result2026.totalEmployerCost - result2025.totalEmployerCost) * 100) / 100;
    const annualEmployerCostDifference = Math.round(employerCostDifference * 12 * 100) / 100;

    return {
      year2025: result2025,
      year2026: result2026,
      netSalaryDifference,
      annualNetSalaryDifference,
      percentageChange,
      employerCostDifference,
      annualEmployerCostDifference,
    };
  }

  /**
   * Gets the tax configuration for a specific year
   *
   * @param year - The year (2025 or 2026)
   * @returns The tax configuration for that year
   */
  public getConfig(year: 2025 | 2026): TaxConfig {
    return year === 2025 ? this.config2025 : this.config2026;
  }

  /**
   * Calculates how many products can be bought with the annual difference
   *
   * @param annualDifference - Annual salary difference in BGN
   * @param productPrice - Price of a single product in BGN
   * @returns Number of products that could have been purchased
   */
  public calculateProductLoss(annualDifference: number, productPrice: number): number {
    return Math.floor(Math.abs(annualDifference) / productPrice);
  }
}

// Export singleton instance with default configurations
export const salaryCalculator = new SalaryCalculator();

// Export configurations for reference
export { TAX_CONFIG_2025, TAX_CONFIG_2026 };
