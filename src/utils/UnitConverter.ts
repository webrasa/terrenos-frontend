export type Unit = {
  name: string;
  shortName: string;
  symbol: string;
  shortSymbol: string;
  conversionFactorToSqm: number;
};

export const units: Array<Unit> = [
  {
    name: 'Square Meter',
    shortName: 'sqm',
    symbol: 'Sq Meters',
    shortSymbol: 'm²',
    conversionFactorToSqm: 1,
  },
  {
    name: 'Acres',
    shortName: 'acres',
    symbol: 'Acres',
    shortSymbol: 'a',
    conversionFactorToSqm: 4046.86,
  },
  {
    name: 'Hectares',
    shortName: 'hectares',
    symbol: 'Hectares',
    shortSymbol: 'ha',
    conversionFactorToSqm: 10000,
  },
];

export const convertAndFormatUnit = (
  value: number,
  fromUnit: Unit['shortName'],
  toUnit: Unit['shortName'],
): string => {
  const fromFactor =
    units.find((obj) => obj.shortName === fromUnit)?.conversionFactorToSqm ?? 1;
  const toFactor =
    units.find((obj) => obj.shortName === toUnit)?.conversionFactorToSqm ?? 1;

  const convertedValue = (value * fromFactor) / toFactor;
  const unitName = units.find((obj) => obj.shortName === toUnit)?.symbol ?? '';

  return `${convertedValue} ${unitName}`;
};

export const getUnit = (unit: Unit['shortName']): Unit => {
  return units.find((obj) => obj.shortName === unit) ?? (units[0] as Unit);
};
