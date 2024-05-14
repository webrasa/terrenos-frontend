export type Unit = 'sqm' | 'acres' | 'hectares';

const conversionFactors: Record<Unit, number> = {
  sqm: 1,
  acres: 1 / 4046.86,
  hectares: 1 / 10000,
};

const unitNames: Record<Unit, string> = {
  sqm: 'Sq Meters',
  acres: 'Acres',
  hectares: 'Hectares',
};

export const convertAndFormatUnit = (value: number, unit: Unit): string => {
  const factor = conversionFactors[unit];
  const unitName = unitNames[unit];
  const convertedValue = value * factor;
  return `${convertedValue} ${unitName}`;
};
