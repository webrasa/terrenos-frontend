export type ISearchGetData = {
  execute: (...args: any[]) => Promise<false | void>;
  pending: boolean;
  value: void | null;
};

export type ISearchFilters = {
  priceFrom: string;
  priceTo: string;
  surfaceFrom: string;
  surfaceTo: string;
  attributes: string;
  sortBy: string;
  countryId: string;
  regionId: string;
  cityId: string;
  districtId: string;
  userLocation: string;
};
