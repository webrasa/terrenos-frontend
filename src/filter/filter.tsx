import FilterAttributes from './filterAttributes';
import FilterMenu from './filterMenu';
import FilterRangeSlider from './filterRangeSlider';

const Filter = () => {
  return (
    <div className="ml-5 flex w-3/4 items-center justify-between">
      <div className="flex flex-col">
        <FilterRangeSlider minValue={0} maxValue={1000000} type="price" />
      </div>
      <div className="flex flex-col">
        <FilterRangeSlider minValue={0} maxValue={1000000} type="surface" />
      </div>
      <FilterAttributes />
      <FilterMenu />
    </div>
  );
};

export default Filter;
