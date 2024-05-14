import type {
  Attributes,
  Cities,
  Countries,
  Districts,
  Properties,
  Regions,
} from './IComponents';

export type IHome = {
  attributes: Array<Attributes>;
  cities: Array<Cities>;
  countries: Array<Countries>;
  districts: Array<Districts>;
  properties: Array<Properties>;
  regions: Array<Regions>;
  locations: Array<ISearchHome>;
};

export type ISearchHome = {
  value: string;
  name: string;
  id?: string;
};
