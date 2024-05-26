export type Currency = {
  name: String;
  shortName: String;
  symbol: String;
  usdParity: number;
  symbolBefore: Boolean;
};

const currencies: Array<Currency> = [
  {
    name: 'Dollar',
    shortName: 'usd',
    symbol: '$',
    usdParity: 1,
    symbolBefore: true,
  },
  {
    name: 'Euro',
    shortName: 'eur',
    symbol: '€',
    usdParity: 0.92,
    symbolBefore: false,
  },
  {
    name: 'Serbian Dinar',
    shortName: 'rsd',
    symbol: 'RSD',
    usdParity: 0.79,
    symbolBefore: false,
  },
];

export const convertAndFormatCurrency = (
  value: number,
  fromCurrency: Currency['shortName'],
  toCurrency: Currency['shortName'],
): string => {
  const fromRate =
    currencies.find((obj) => {
      return obj.shortName === fromCurrency;
    })?.usdParity ?? 1;
  const toRate =
    currencies.find((obj) => {
      return obj.shortName === toCurrency;
    })?.usdParity ?? 1;
  const convertedValue = (value / fromRate) * toRate;
  const roundedValue = Math.round(convertedValue);
  const currencySymbol = currencies.find((obj) => {
    return obj.shortName === toCurrency;
  })?.symbol;
  const symbolBefore = currencies.find((obj) => {
    return obj.shortName === toCurrency;
  })?.symbolBefore;
  return `${symbolBefore ? currencySymbol : ''}${roundedValue}${!symbolBefore ? currencySymbol : ''}`;
};
