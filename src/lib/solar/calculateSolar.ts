import type {
  SolarCalculatorInput,
  SolarCalculatorResult,
  SolarRating,
  ValidationError,
} from './types';

// System losses: inverter efficiency, wiring, soiling, temperature, etc.
export const PERFORMANCE_RATIO = 0.78;

// Rough footprint of one residential panel including spacing.
export const SQ_FT_PER_PANEL = 20;

export const FEDERAL_TAX_CREDIT_RATE = 0.3;

export const BATTERY_COSTS = {
  none: 0,
  small: 9000,
  'whole-home': 18000,
} as const;

export function validateInput(input: SolarCalculatorInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!(input.monthlyBill > 0)) {
    errors.push({ field: 'monthlyBill', message: 'Please enter a monthly bill greater than $0.' });
  }
  if (!(input.electricityRate > 0)) {
    errors.push({ field: 'electricityRate', message: 'Please enter an electricity rate greater than $0/kWh.' });
  }
  if (!(input.sunHoursPerDay >= 1 && input.sunHoursPerDay <= 8)) {
    errors.push({ field: 'sunHoursPerDay', message: 'Sun hours should be between 1 and 8 per day.' });
  }
  if (!(input.panelWattage >= 250 && input.panelWattage <= 600)) {
    errors.push({ field: 'panelWattage', message: 'Panel wattage should be between 250 W and 600 W.' });
  }
  if (!(input.costPerWatt >= 1 && input.costPerWatt <= 8)) {
    errors.push({ field: 'costPerWatt', message: 'Installed cost should be between $1 and $8 per watt.' });
  }
  if (input.roofAreaSqFt !== undefined && !(input.roofAreaSqFt > 0)) {
    errors.push({ field: 'roofAreaSqFt', message: 'Roof area, if provided, must be greater than 0 sq ft.' });
  }

  return errors;
}

function getRating(paybackYears: number): SolarRating {
  if (paybackYears <= 7) return 'strong';
  if (paybackYears <= 11) return 'moderate';
  return 'long';
}

export const RATING_LABELS: Record<SolarRating, string> = {
  strong: 'Strong solar candidate',
  moderate: 'Moderate solar candidate',
  long: 'Longer payback period',
};

function getBatteryAdvice(input: SolarCalculatorInput): string {
  if (input.monthlyBill < 100) {
    return 'A battery may not be financially necessary unless you need backup power.';
  }
  if (input.monthlyBill > 250) {
    return 'A larger battery may make sense if your utility has time-of-use rates or poor net metering.';
  }
  return 'A small battery may be useful for outage protection.';
}

export function calculateSolar(input: SolarCalculatorInput): SolarCalculatorResult {
  const monthlyUsageKwh = input.monthlyBill / input.electricityRate;
  const yearlyUsageKwh = monthlyUsageKwh * 12;
  const targetProductionKwh = yearlyUsageKwh * input.desiredOffset;

  const systemSizeKw =
    targetProductionKwh / (input.sunHoursPerDay * 365 * PERFORMANCE_RATIO);

  const panelSizeKw = input.panelWattage / 1000;
  const panelCount = Math.ceil(systemSizeKw / panelSizeKw);
  const requiredRoofAreaSqFt = panelCount * SQ_FT_PER_PANEL;

  const roofFits =
    input.roofAreaSqFt !== undefined
      ? input.roofAreaSqFt >= requiredRoofAreaSqFt
      : undefined;

  const grossCost = systemSizeKw * 1000 * input.costPerWatt;
  const taxCredit = input.includeFederalTaxCredit
    ? grossCost * FEDERAL_TAX_CREDIT_RATE
    : 0;
  const netCost = grossCost - taxCredit;

  const yearlySavings = targetProductionKwh * input.electricityRate;
  const monthlySavings = yearlySavings / 12;
  const paybackYears = netCost / yearlySavings;

  const batteryCost = BATTERY_COSTS[input.batteryOption];
  const totalCostWithBattery = netCost + batteryCost;
  const paybackWithBattery = totalCostWithBattery / yearlySavings;

  return {
    monthlyUsageKwh,
    yearlyUsageKwh,
    targetProductionKwh,
    systemSizeKw,
    panelCount,
    requiredRoofAreaSqFt,
    roofFits,
    grossCost,
    taxCredit,
    netCost,
    yearlySavings,
    monthlySavings,
    paybackYears,
    batteryCost,
    totalCostWithBattery,
    paybackWithBattery,
    rating: getRating(paybackYears),
    batteryAdvice: getBatteryAdvice(input),
  };
}

// TODO (future features):
// - location-based sun hours by ZIP code
// - local electricity rate lookup
// - local incentive database
// - battery ROI model (time-of-use arbitrage)
// - net metering rules
// - shading factor
// - roof direction/orientation and pitch
// - seasonal production curve
// - comparison with no-solar scenario (utility rate inflation)
