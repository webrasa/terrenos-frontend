export type Currency = 'usd' | 'eur' | 'rsd';

const conversionRates: Record<Currency, number> = {
  usd: 1,
  eur: 0.92,
  rsd: 0.79,
};

const currencySymbols: Record<Currency, string> = {
  usd: '$',
  eur: '€',
  rsd: 'RSD',
};

export const convertAndFormatCurrency = (
  value: number,
  fromCurrency: Currency,
  toCurrency: Currency
): string => {
  const fromRate = conversionRates[fromCurrency];
  const toRate = conversionRates[toCurrency];
  const convertedValue = (value / fromRate) * toRate;
  const roundedValue = Math.round(convertedValue);
  const currencySymbol = currencySymbols[toCurrency];

  switch (toCurrency) {
    case 'eur':
      return `${roundedValue}${currencySymbol}`;
    case 'rsd':
      return `${roundedValue} ${currencySymbol}`;
    default:
      return `${currencySymbol}${roundedValue}`;
  }
};
