/**
 * ReverseSalaryCalculator - Bulgarian salary calculator with configurable parameters
 *
 * This calculator allows users to input either net or gross salary and calculates
 * all related values including employer costs. Users can customize tax parameters
 * like ДЗПО percentage and maximum insurable income.
 *
 * @author Martin Kuvandzhiev
 * @version 1.0.0
 */

/**
 * Configurable tax parameters
 */
export interface TaxParameters {
  /** Maximum insurable income (Максимален осигурителен доход) in EUR */
  maxInsurableIncome: number;
  
  /** ДЗПО percentage for employee (as decimal, e.g., 0.022 for 2.2%) */
  dzpoEmployeeRate: number;
  
  /** ДЗПО percentage for employer (as decimal, e.g., 0.028 for 2.8%) */
  dzpoEmployerRate: number;
  
  /** Pension fund rate for employee (as decimal) */
  pensionEmployeeRate: number;
  
  /** Pension fund rate for employer (as decimal) */
  pensionEmployerRate: number;
  
  /** Health insurance rate for employee (as decimal) */
  healthEmployeeRate: number;
  
  /** Health insurance rate for employer (as decimal) */
  healthEmployerRate: number;
  
  /** Sickness and maternity rate for employee (as decimal) */
  sicknessEmployeeRate: number;
  
  /** Sickness and maternity rate for employer (as decimal) */
  sicknessEmployerRate: number;
  
  /** Unemployment rate for employee (as decimal) */
  unemploymentEmployeeRate: number;
  
  /** Unemployment rate for employer (as decimal) */
  unemploymentEmployerRate: number;
  
  /** Occupational accidents rate for employer (as decimal) */
  occupationalAccidentsRate: number;
  
  /** Personal income tax rate (as decimal) */
  incomeTaxRate: number;
}

/**
 * Calculation result with all salary components
 */
export interface ReverseSalaryResult {
  /** Gross salary (Брутна заплата) */
  grossSalary: number;
  /** Net salary (Нетна заплата) */
  netSalary: number;
  /** Total employer cost */
  totalEmployerCost: number;
  /** Total employee contributions */
  totalEmployeeContributions: number;
  /** Total employer contributions */
  totalEmployerContributions: number;
  /** Income tax amount */
  incomeTax: number;
  /** Breakdown of employee contributions */
  employeeContributions: {
    pension: number;
    health: number;
    sickness: number;
    unemployment: number;
    dzpo: number;
  };
  /** Breakdown of employer contributions */
  employerContributions: {
    pension: number;
    health: number;
    sickness: number;
    unemployment: number;
    dzpo: number;
    occupationalAccidents: number;
  };
}

/**
 * Default tax parameters for 2026
 */
export const DEFAULT_TAX_PARAMETERS_2026: TaxParameters = {
  maxInsurableIncome: 2300,
  dzpoEmployeeRate: 0.022,
  dzpoEmployerRate: 0.028,
  pensionEmployeeRate: 0.0747,
  pensionEmployerRate: 0.0933,
  healthEmployeeRate: 0.032,
  healthEmployerRate: 0.048,
  sicknessEmployeeRate: 0.014,
  sicknessEmployerRate: 0.021,
  unemploymentEmployeeRate: 0.004,
  unemploymentEmployerRate: 0.006,
  occupationalAccidentsRate: 0.004,
  incomeTaxRate: 0.10,
};

/**
 * Reverse salary calculator class
 */
export class ReverseSalaryCalculator {
  /**
   * Calculate all salary components from gross salary
   */
  static calculateFromGross(grossSalary: number, params: TaxParameters): ReverseSalaryResult {
    const contributionBase = Math.min(grossSalary, params.maxInsurableIncome);
    
    // Calculate employee contributions
    const employeeContributions = {
      pension: Math.round(contributionBase * params.pensionEmployeeRate * 100) / 100,
      health: Math.round(contributionBase * params.healthEmployeeRate * 100) / 100,
      sickness: Math.round(contributionBase * params.sicknessEmployeeRate * 100) / 100,
      unemployment: Math.round(contributionBase * params.unemploymentEmployeeRate * 100) / 100,
      dzpo: Math.round(contributionBase * params.dzpoEmployeeRate * 100) / 100,
    };
    
    const totalEmployeeContributions = Object.values(employeeContributions).reduce((a, b) => a + b, 0);
    
    // Calculate taxable income and tax
    const taxableIncome = grossSalary - totalEmployeeContributions;
    const incomeTax = Math.round(taxableIncome * params.incomeTaxRate * 100) / 100;
    
    // Calculate net salary
    const netSalary = Math.round((taxableIncome - incomeTax) * 100) / 100;

    // Calculate employer contributions
    const employerContributions = {
      pension: Math.round(contributionBase * params.pensionEmployerRate * 100) / 100,
      health: Math.round(contributionBase * params.healthEmployerRate * 100) / 100,
      sickness: Math.round(contributionBase * params.sicknessEmployerRate * 100) / 100,
      unemployment: Math.round(contributionBase * params.unemploymentEmployerRate * 100) / 100,
      dzpo: Math.round(contributionBase * params.dzpoEmployerRate * 100) / 100,
      occupationalAccidents: Math.round(contributionBase * params.occupationalAccidentsRate * 100) / 100,
    };

    const totalEmployerContributions = Object.values(employerContributions).reduce((a, b) => a + b, 0);
    const totalEmployerCost = Math.round((grossSalary + totalEmployerContributions) * 100) / 100;

    return {
      grossSalary,
      netSalary,
      totalEmployerCost,
      totalEmployeeContributions: Math.round(totalEmployeeContributions * 100) / 100,
      totalEmployerContributions: Math.round(totalEmployerContributions * 100) / 100,
      incomeTax,
      employeeContributions,
      employerContributions,
    };
  }

  /**
   * Calculate all salary components from net salary using iterative refinement
   */
  static calculateFromNet(netSalary: number, params: TaxParameters): ReverseSalaryResult {
    // Total employee contribution rate
    const totalContributionRate =
      params.pensionEmployeeRate +
      params.healthEmployeeRate +
      params.sicknessEmployeeRate +
      params.unemploymentEmployeeRate +
      params.dzpoEmployeeRate;

    // First approximation
    let grossSalary = netSalary / (1 - totalContributionRate - params.incomeTaxRate);

    // If above max insurable income, use different formula
    if (grossSalary > params.maxInsurableIncome) {
      const cappedContributions = params.maxInsurableIncome * totalContributionRate;
      grossSalary = (netSalary + cappedContributions * (1 - params.incomeTaxRate)) / (1 - params.incomeTaxRate);
    }

    // Iteratively refine
    let iterations = 0;
    const maxIterations = 10;
    const tolerance = 0.01;

    while (iterations < maxIterations) {
      const calculatedResult = this.calculateFromGross(grossSalary, params);
      const difference = netSalary - calculatedResult.netSalary;

      if (Math.abs(difference) < tolerance) {
        break;
      }

      const effectiveRate = 1 - (calculatedResult.netSalary / grossSalary);
      const adjustment = difference / (1 - effectiveRate);
      grossSalary += adjustment;

      iterations++;
    }

    return this.calculateFromGross(Math.round(grossSalary * 100) / 100, params);
  }

  /**
   * Calculate all salary components from total employer cost
   */
  static calculateFromEmployerCost(employerCost: number, params: TaxParameters): ReverseSalaryResult {
    // Total employer contribution rate
    const totalEmployerRate =
      params.pensionEmployerRate +
      params.healthEmployerRate +
      params.sicknessEmployerRate +
      params.unemploymentEmployerRate +
      params.dzpoEmployerRate +
      params.occupationalAccidentsRate;

    // First approximation
    let grossSalary = employerCost / (1 + totalEmployerRate);

    // If above max insurable income, use different formula
    if (grossSalary > params.maxInsurableIncome) {
      const cappedEmployerContributions = params.maxInsurableIncome * totalEmployerRate;
      grossSalary = employerCost - cappedEmployerContributions;
    }

    // Iteratively refine
    let iterations = 0;
    const maxIterations = 10;
    const tolerance = 0.01;

    while (iterations < maxIterations) {
      const calculatedResult = this.calculateFromGross(grossSalary, params);
      const difference = employerCost - calculatedResult.totalEmployerCost;

      if (Math.abs(difference) < tolerance) {
        break;
      }

      const adjustment = difference / (1 + totalEmployerRate);
      grossSalary += adjustment;

      iterations++;
    }

    return this.calculateFromGross(Math.round(grossSalary * 100) / 100, params);
  }
}

