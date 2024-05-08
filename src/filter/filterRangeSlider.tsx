import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React from 'react';

const FilterRangeSlider = () => {
  const priceValue = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 100,
      label: 100,
    },
  ];

  const [value, setValue] = React.useState<number[]>([20, 40]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className="mr-3 mt-7 text-sm font-semibold">
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{
              textTransform: 'capitalize',
              backgroundColor: 'transparent',
              color: 'black',
              borderColor: '#64668b8c',
              borderWidth: '1px', // Set the border width
              borderStyle: 'solid', // Specify the border style
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                transition: 'none',
              },
            }}
          >
            Any
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-10 size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
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
            <div className="mx-7 mt-10 w-72">
              <Slider
                value={value}
                onChange={handleSliderChange}
                marks={priceValue}
                valueLabelDisplay="auto"
                sx={{ color: '#009f52' }}
              />
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default FilterRangeSlider;
