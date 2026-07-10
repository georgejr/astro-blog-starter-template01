const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export function formatCurrency(value: number): string {
  return usd.format(value);
}

export function formatNumber(value: number): string {
  return number.format(value);
}

export function formatKw(value: number): string {
  return `${value.toFixed(1)} kW`;
}

export function formatKwh(value: number): string {
  return `${number.format(Math.round(value))} kWh`;
}

export function formatYears(value: number): string {
  return `${value.toFixed(1)} years`;
}

export function formatSqFt(value: number): string {
  return `${number.format(Math.round(value))} sq ft`;
}
