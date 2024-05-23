export type Unit = {
  name: string;
  shortName: string;
  symbol: string;
  conversionFactorToSqm: number;
};

const units: Array<Unit> = [
  {
    name: 'Square Meter',
    shortName: 'sqm',
    symbol: 'Sq Meters',
    conversionFactorToSqm: 1,
  },
  {
    name: 'Acre',
    shortName: 'acres',
    symbol: 'Acres',
    conversionFactorToSqm: 4046.86,
  },
  {
    name: 'Hectare',
    shortName: 'hectares',
    symbol: 'Hectares',
    conversionFactorToSqm: 10000,
  },
];


export const convertAndFormatUnit = (
  value: number,
  fromUnit: Unit['shortName'],
  toUnit: Unit['shortName']
): string => {
  const fromFactor =
    units.find((obj) => obj.shortName === fromUnit)?.conversionFactorToSqm ?? 1;
  const toFactor =
    units.find((obj) => obj.shortName === toUnit)?.conversionFactorToSqm ?? 1;
  
  const convertedValue = (value * fromFactor) / toFactor;
  const unitName = units.find((obj) => obj.shortName === toUnit)?.symbol ?? '';

  return `${convertedValue} ${unitName}`;
};