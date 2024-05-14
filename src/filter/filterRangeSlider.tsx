import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useState } from 'react';

const FilterRangeSlider = () => {
  const [value, setValue] = React.useState<number[]>([0, 100]);
  const [displayedRange, setDisplayedRange] = useState<string>('Any');

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const newRange = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setValue(newRange);
    if (newRange[0] !== 0 || newRange[1] !== 100) {
      setDisplayedRange(`${newRange[0]} EUR - ${newRange[1]} EUR`);
    } else {
      setDisplayedRange('Any');
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
              justifyContent:
                value[0] === 0 && value[1] === 100 ? 'left' : 'center',
              fontSize: '14px',
              width: value[0] === 0 && value[1] === 100 ? '120px' : '180px',
              textTransform: 'capitalize',
              color: value[0] === 0 && value[1] === 100 ? 'black' : 'white',
              backgroundColor:
                value[0] === 0 && value[1] === 100 ? 'white' : '#009f52',
              borderColor: '#64668b8c',
              borderWidth: '1px', // Set the border width
              borderStyle: 'solid', // Specify the border style
              boxShadow: 'none',
              '&:hover': {
                backgroundColor:
                  value[0] === 0 && value[1] === 100 ? 'white' : '#009f52',
                color: value[0] === 0 && value[1] === 100 ? 'black' : 'white',
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
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className="mx-7 mt-4 w-60">
              <Slider
                value={value}
                onChange={handleSliderChange}
                sx={{ color: '#009f52' }}
              />
              <div className="mb-2 flex justify-between">
                <div className="border-b">{`${value[0]} EUR`}</div>
                <div className="border-b">{`${value[1]} EUR`}</div>
              </div>
            </div>
            <p className="mx-7 my-2 text-gray-500">
              Price range of the selected service.
            </p>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default FilterRangeSlider;
