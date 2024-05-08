import FilterAttributes from './filterAttributes';
import FilterMenu from './filterMenu';
import FilterRangeSlider from './filterRangeSlider';

const Filter = () => {
  return (
    <div className="ml-5 flex w-1/2">
      <FilterRangeSlider />
      <FilterRangeSlider />
      <FilterAttributes />
      <FilterMenu />
    </div>
  );
};

export default Filter;
