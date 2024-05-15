import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useState } from 'react';

const FilterRangeSlider = ({ minValue, maxValue, type }) => {
  const [value, setValue] = useState<number[]>([minValue, maxValue]);
  const [displayedRange, setDisplayedRange] = useState<string>(
    `Any ${type === 'price' ? 'Price' : 'Surface'}`,
  );

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const newRange = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setValue(newRange);
    if (newRange[0] !== minValue || newRange[1] !== maxValue) {
      setDisplayedRange(`${newRange[0]} EUR - ${newRange[1]} EUR`);
    } else {
      setDisplayedRange(`Any ${type === 'price' ? 'Price' : 'Surface'}`);
    }
  };

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (!Number.isNaN(newValue)) {
        const newValues = [...value];
        newValues[index] = newValue;
        setValue(newValues);
        if (newValues[0] !== minValue || newValues[1] !== maxValue) {
          setDisplayedRange(`${newValues[0]} EUR - ${newValues[1]} EUR`);
        } else {
          setDisplayedRange(`Any ${type === 'price' ? 'Price' : 'Surface'}`);
        }
      }
    };

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
              textTransform: 'capitalize',
              color:
                value[0] === minValue && value[1] === maxValue
                  ? 'black'
                  : 'white',
              backgroundColor:
                value[0] === minValue && value[1] === maxValue
                  ? 'white'
                  : '#009f52',
              borderColor: '#64668b8c',
              borderWidth: '1px', // Set the border width
              borderStyle: 'solid', // Specify the border style
              boxShadow: 'none',
              '&:hover': {
                backgroundColor:
                  value[0] === minValue && value[1] === maxValue
                    ? 'white'
                    : '#009f52',
                color:
                  value[0] === minValue && value[1] === maxValue
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
                  min={minValue}
                  max={maxValue}
                  sx={{ color: '#009f52' }}
                />
                <div className="mb-2 flex justify-between">
                  <TextField
                    className="mr-2 border-b"
                    value={value[0]}
                    onChange={handleInputChange(0)}
                    type="number"
                    inputProps={{ min: minValue, max: maxValue }}
                  />
                  <TextField
                    className=""
                    value={value[1]}
                    onChange={handleInputChange(1)}
                    type="number"
                    inputProps={{ min: minValue, max: maxValue }}
                  />
                </div>
              </div>
            </div>
            <p className="mx-7 my-2 text-gray-500">
              {`${type.charAt(0).toUpperCase()}${type.slice(1)} range of the selected service.`}
            </p>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default FilterRangeSlider;
