export type ISearchGetData = {
  execute: (...args: any[]) => Promise<false | void>;
  pending: boolean;
  value: void | null;
};

export type ISearchFilters = {
  priceFrom?: string | string[] | undefined;
  priceTo?: string | string[] | undefined;
  surfaceFrom?: string | string[] | undefined;
  surfaceTo?: string | string[] | undefined;
  attributes?: string | string[] | undefined;
  sortBy?: string | string[] | undefined;
  countryId?: string | string[] | undefined;
  regionId?: string | string[] | undefined;
  cityId?: string | string[] | undefined;
  districtId?: string | string[] | undefined;
  userLocation?: string | string[] | undefined;
};
