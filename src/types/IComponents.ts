export type Attributes = {
  id: number;
  categoryId: number;
  name: string;
};

export type Cities = {
  id: number;
  key: string;
  name: string;
};

export type Countries = {
  id: number;
  key: string;
  name: string;
};

export type Districts = {
  id: number;
  key: string;
  name: string;
};

export type Properties = {
  id: number;
  address: string;
  city: Cities;
  cityId: number;
  country: Countries;
  countryId: number;
  createdAt: string;
  description: string;
  district: Districts;
  districtId: number;
  latitude: number;
  longtitude: number;
  price: number;
  region: Regions;
  saves: number;
  status: string;
  surface: number;
  taxes: number;
  title: string;
  type: string;
  updatedAt: string;
  views: number;
  propertyAttributes?: number[] | undefined;
  attributes?: number[] | undefined;
};

export type Regions = {
  id: number;
  key: string;
  name: string;
};

export type PropertyData = {
  id: number;
  userId: number;
  propertyId: number;
  property: Properties;
};
