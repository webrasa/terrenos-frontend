import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { getCookie } from 'cookies-next';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useEffect, useState } from 'react';

import { useUnit } from '@/store/unitContext';

type RangeSlider = 'surface' | 'price';

type IFilterRangeSliderProps = {
  minValue: number;
  maxValue: number;
  type: RangeSlider;
};

/**
 * Pill component with design style.
 * @component
 * @params props - Component props.
 * @param props.minValue - Indicates the minValue of the rangeSlider.
 * @param props.maxValue - Indicates the maxValue of the rangeSlider.
 * @param props.type - Indicates the type of the rangeSlider.
 */
const FilterRangeSlider = (props: IFilterRangeSliderProps) => {
  // States
  const [value, setValue] = useState<number[]>([
    props.minValue,
    props.maxValue,
  ]);
  const [displayedRange, setDisplayedRange] = useState<string>(
    `Any ${props.type}`,
  );
  const { unit, setUnit } = useUnit();

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const newRange = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setValue(newRange);
    if (newRange[0] !== props.minValue || newRange[1] !== props.maxValue) {
      setDisplayedRange(`${newRange[0]} EUR - ${newRange[1]} EUR`);
    } else {
      setDisplayedRange(`Any ${props.type}`);
    }
  };

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
          setDisplayedRange(`${newValues[0]} EUR - ${newValues[1]} EUR`);
        } else {
          setDisplayedRange(`Any ${props.type}`);
        }
      }
    };

  // Hooks
  useEffect(() => {
    setUnit(getCookie('unit') || 'currency');
  }, []);

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
                    value={value[0]}
                    onChange={handleInputChange(0)}
                    type="number"
                    inputProps={{ min: props.minValue, max: props.maxValue }}
                  />

                  <TextField
                    variant="standard"
                    className=""
                    value={value[1]}
                    onChange={handleInputChange(1)}
                    type="number"
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
