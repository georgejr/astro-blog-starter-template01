export type BatteryOption = 'none' | 'small' | 'whole-home';

export type SolarRating = 'strong' | 'moderate' | 'long';

export interface SolarCalculatorInput {
  monthlyBill: number;
  electricityRate: number;
  sunHoursPerDay: number;
  desiredOffset: number;
  panelWattage: number;
  costPerWatt: number;
  roofAreaSqFt?: number;
  batteryOption: BatteryOption;
  includeFederalTaxCredit: boolean;
}

export interface SolarCalculatorResult {
  monthlyUsageKwh: number;
  yearlyUsageKwh: number;
  targetProductionKwh: number;
  systemSizeKw: number;
  panelCount: number;
  requiredRoofAreaSqFt: number;
  roofFits?: boolean;
  grossCost: number;
  taxCredit: number;
  netCost: number;
  yearlySavings: number;
  monthlySavings: number;
  paybackYears: number;
  batteryCost: number;
  totalCostWithBattery: number;
  paybackWithBattery: number;
  rating: SolarRating;
  batteryAdvice: string;
}

export interface ValidationError {
  field: keyof SolarCalculatorInput;
  message: string;
}
