import type { Attributes } from '@/types/IComponents';
import type { ISearchFilters, ISearchGetData } from '@/types/Search';

import FilterAttributes from './filterAttributes';
import FilterMenu from './filterMenu';
import FilterRangeSlider from './filterRangeSlider';

type IFilterProps = {
  getData: ISearchGetData;
  attributesData: Array<Attributes>;
  sort: Function;
  translations: Function;
  translationCommon: Function;
  setFilters: Function;
  filters: ISearchFilters;
};

const Filter = (props: IFilterProps) => {
  return (
    <div className="ml-5 flex w-3/4 items-center justify-between">
      <div className="flex flex-col">
        <FilterRangeSlider
          minValue={0}
          maxValue={1000000}
          type="price"
          translation={props.translations}
          setFilters={props.setFilters}
          filters={props.filters}
        />
      </div>
      <div className="flex flex-col">
        <FilterRangeSlider
          minValue={0}
          maxValue={1000000}
          type="surface"
          translation={props.translations}
          setFilters={props.setFilters}
          filters={props.filters}
        />
      </div>
      <FilterAttributes
        attributesData={props.attributesData}
        translation={props.translations}
        translationCommon={props.translationCommon}
        setFilters={props.setFilters}
        filters={props.filters}
      />
      <FilterMenu sort={props.sort} translations={props.translations} />
    </div>
  );
};

export default Filter;
