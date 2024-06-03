import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import type { CookieValueTypes } from 'cookies-next';
import { getCookie } from 'cookies-next';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useEffect, useState } from 'react';

import useDebounce from '@/hooks/UseDebounce';
import { useUnit } from '@/store/unitContext';
import type { ISearchFilters } from '@/types/Search';

type RangeSlider = 'surface' | 'price';

type IFilterRangeSliderProps = {
  minValue: number;
  maxValue: number;
  type: RangeSlider;
  translation: Function;
  setFilters: Function;
  filters: ISearchFilters;
};

/**
 * Pill component with design style.
 * @component
 * @params props - Component props.
 * @param props.minValue - Indicates the minValue of the rangeSlider.
 * @param props.maxValue - Indicates the maxValue of the rangeSlider.
 * @param props.type - Indicates the type of the rangeSlider.
 * @param props.getData - Function to get search data.
 * @param props.translation - Function for translating text.
 * @param props.setFilters - Function to set filters.
 * @param props.filters - Object containing all filters.
 */
const FilterRangeSlider = (props: IFilterRangeSliderProps) => {
  // States
  const [value, setValue] = useState<number[]>([
    props.minValue,
    props.maxValue,
  ]);
  const [extension, setExtension] = useState<String | CookieValueTypes>('');

  const getButtonText = () => {
    return props.type === 'price'
      ? props.translation('filtersSection.priceRangeLabel')
      : props.translation('filtersSection.squareMetersLabel');
  };
  const [displayedRange, setDisplayedRange] = useState<string>(getButtonText());
  const { unit } = useUnit();

  const debouncedSearch = useDebounce(displayedRange, 500);

  const cleanRange = () => {
    if (
      props.type === 'price' &&
      (props.filters.priceFrom !== '' || props.filters.priceTo !== '')
    ) {
      props.setFilters({ ...props.filters, priceFrom: '', priceTo: '' });
    } else if (
      props.type === 'surface' &&
      (props.filters.surfaceFrom !== '' || props.filters.surfaceTo !== '')
    ) {
      props.setFilters({
        ...props.filters,
        surfaceFrom: '',
        surfaceTo: '',
      });
    }
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const newRange = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setValue(newRange);
    if (newRange[0] !== props.minValue || newRange[1] !== props.maxValue) {
      setDisplayedRange(
        `${newRange[0]} ${extension} - ${newRange[1]} ${extension}`,
      );
    } else {
      setDisplayedRange(getButtonText());
    }
  };

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 0) {
      const dsSplit = debouncedSearch.split('-');
      if (dsSplit[0] && dsSplit[1]) {
        const from = dsSplit[0].replace(/\D/g, '').trim();
        const to = dsSplit[1].replace(/\D/g, '').trim();
        if (
          props.type === 'price' &&
          (props.filters.priceTo !== to || props.filters.priceFrom !== from)
        ) {
          props.setFilters({ ...props.filters, priceFrom: from, priceTo: to });
        } else if (
          props.type === 'surface' &&
          (props.filters.surfaceTo !== to || props.filters.surfaceFrom !== from)
        ) {
          props.setFilters({
            ...props.filters,
            surfaceFrom: from,
            surfaceTo: to,
          });
        }
      } else {
        cleanRange();
      }
    }
  }, [debouncedSearch]);

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (!Number.isNaN(newValue)) {
        const newValues = [...value];
        newValues[index] = newValue;
        setValue(newValues);
        if (
          newValues[0] !== props.minValue ||
          newValues[1] !== props.maxValue
        ) {
          setDisplayedRange(
            `${newValues[0]} ${extension} - ${newValues[1]} ${extension}`,
          );
        } else {
          setDisplayedRange(getButtonText());
        }
      }
    };

  // Hooks
  useEffect(() => {
    setExtension(props.type === 'price' ? getCookie('currency') : unit);
  }, []);

  // THIS NEEDS TO BE TALKED THRU
  // useEffect(() => {
  //   if (props.minValue !== value[0] || props.maxValue !== value[1]) {
  //     setValue([props.minValue, props.maxValue]);
  //   }
  // }, [props.maxValue, props.minValue]);

  useEffect(() => {
    if (
      props.type === 'price' &&
      (props.filters.priceFrom || props.filters.priceTo) &&
      (Number(props.filters.priceFrom) !== value[0] ||
        Number(props.filters.priceTo) !== value[1])
    ) {
      const from = props.filters.priceFrom || value[0];
      const to = props.filters.priceTo || value[1];
      setDisplayedRange(`${from} ${extension} - ${to} ${extension}`);
      setValue([Number(from), Number(to)]);
    } else if (
      props.type === 'surface' &&
      (props.filters.surfaceFrom || props.filters.surfaceTo) &&
      (Number(props.filters.surfaceFrom) !== value[0] ||
        Number(props.filters.surfaceTo) !== value[1])
    ) {
      const from = props.filters.surfaceFrom || value[0];
      const to = props.filters.surfaceTo || value[1];
      setDisplayedRange(`${from} ${extension} - ${to} ${extension}`);
      setValue([Number(from), Number(to)]);
    }
  }, [props.filters]);

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className="mr-3 text-left">
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{
              justifyContent: 'center',
              fontSize: '14px',
              minWidth: '140px',
              textTransform: 'none',
              color:
                value[0] === props.minValue && value[1] === props.maxValue
                  ? 'black'
                  : 'white',
              backgroundColor:
                value[0] === props.minValue && value[1] === props.maxValue
                  ? 'white'
                  : '#009f52',
              borderColor: '#64668b8c',
              borderWidth: '1px', // Set the border width
              borderStyle: 'solid', // Specify the border style
              boxShadow: 'none',
              '&:hover': {
                backgroundColor:
                  value[0] === props.minValue && value[1] === props.maxValue
                    ? 'white'
                    : '#009f52',
                color:
                  value[0] === props.minValue && value[1] === props.maxValue
                    ? 'black'
                    : 'white',
                boxShadow: 'none',
                transition: 'none',
              },
            }}
          >
            {displayedRange}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <div className="mx-7 mt-4 w-60">
              <div>
                <Slider
                  value={value}
                  onChange={handleSliderChange}
                  min={props.minValue}
                  max={props.maxValue}
                  sx={{ color: '#009f52' }}
                />
                <div className="mb-2 flex justify-between">
                  <TextField
                    variant="standard"
                    className="mr-2 border-b focus:outline-none"
                    value={`${value[0]} ${extension}`}
                    onChange={handleInputChange(0)}
                    type="string"
                    inputProps={{ min: props.minValue, max: props.maxValue }}
                  />

                  <TextField
                    variant="standard"
                    className=""
                    value={`${value[1]} ${extension}`}
                    onChange={handleInputChange(1)}
                    type="string"
                    inputProps={{ min: props.minValue, max: props.maxValue }}
                  />
                </div>
              </div>
            </div>
            <p className="mx-7 my-2 text-gray-500">
              {`${props.type === 'price' ? 'Price' : 'Surface'} range of the selected service.`}
            </p>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default FilterRangeSlider;
