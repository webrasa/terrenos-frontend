import FilterAttributes from './filterAttributes';
import FilterMenu from './filterMenu';
import FilterRangeSlider from './filterRangeSlider';

const Filter = () => {
  return (
    <div className="ml-5 flex w-1/2">
      <div className="flex flex-col">
        <span className="text-base font-semibold text-black">Price range</span>
        <FilterRangeSlider />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-semibold text-black">
          Square meters
        </span>
        <FilterRangeSlider />
      </div>
      <FilterAttributes />
      <FilterMenu />
    </div>
  );
};

export default Filter;
