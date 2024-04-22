import React, { useState } from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { FavoriteBorder, Favorite, ExpandLess } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Button } from '@mui/material';

type IPropertyCardProps = {
  images: string[];
  price: string;
  sizeMeters: number;
  sizeAcres: number;
  location: string;
  secondLocation: string;
  showDropdown?: boolean;
  showEditButton?: boolean;
};

/**
 * PropertyCard component that displays a swipeable image gallery and property details.
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} props.images - Array of image URLs for the property.
 * @param {string} props.price - Price of the property.
 * @param {number} props.sizeMeters - Size of the property in square meters.
 * @param {number} props.sizeAcres - Size of the property in acres.
 * @param {string} props.location - Primary location of the property.
 * @param {string} props.secondLocation - Secondary location of the property.
 * @param {boolean} [props.showDropdown=false] - Determines if the dropdown should be displayed.
 * @param {boolean} [props.showEditButton=false] - Determines if the edit button should be displayed.
 */

const PropertyCard = ({
  images,
  price,
  sizeMeters,
  sizeAcres,
  location,
  secondLocation,
  showDropdown = false,
  showEditButton = false,
}: IPropertyCardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((current) => (current + 1) % images.length),
    onSwipedRight: () => setActiveIndex((current) => (current - 1 + images.length) % images.length),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const toggleFavorite = () => setIsFavorited(!isFavorited);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [dropdownTitle, setDropdownTitle] = useState('Mark as sold');

  const handleMenuItemClick = (title: string) => {
    setDropdownTitle(title);
    handleClose();
  };

  const cardClass = classNames({
    'rounded-lg': true,
    'overflow-hidden': true,
    'shadow-lg': true,
    'border-2': true,
    'w-fit': true
  });

  return (
    <div className={cardClass}>
      <div className="relative" {...handlers}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`${index === activeIndex ? 'image imageVisible' : 'image imageHidden'}`}
          />
        ))}
        <div className="absolute bottom-2 w-full flex justify-center">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`indicator ${index === activeIndex ? 'indicatorActive' : ''}`}
            />
          ))}
        </div>
        <IconButton className="absolute top-2 right-2 scale-125 text-primary-600" onClick={toggleFavorite}>
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </div>
      <div className="p-4">
        <div className="flex align-center justify-between">
          <h3 className="text-lg font-bold text-black">{price}</h3>
          <p className="text-sm text-black">{`${sizeMeters} Sq Meters | ${sizeAcres} Acres`}</p>
        </div>
        <p className="text-sm text-black mt-2">{location}</p>
        <p className="text-sm text-black mt-2"><b>{secondLocation}</b></p>
        <>
          {(showDropdown && showEditButton) && (
          <>
            <div className="flex justify-between items-center text-sm text-black space-x-2">
              <span><strong>10 days</strong> on Terrenoss</span>
              <span><strong>12</strong> Views</span>
              <span> 
                <IconButton>{<FavoriteBorder />}</IconButton><strong>2</strong> favorites</span>
            </div>
            <div className="flex justify-end space-x-2 mt-3">
              <Button 
                endIcon={<ExpandLess />}
                onClick={handleClick}
                variant="outlined"
                color="success"
                className="rounded-xl min-w-[235px] normal-case text-black"
              >
                {dropdownTitle}
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                classes={{ paper: "min-w-[235px] rounded-lg" }}
              >
                <MenuItem onClick={() => handleMenuItemClick('Mark as sold')}>
                  Mark as sold
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Set to pending')}>
                  Set to pending
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Take off the market')}>
                  Take off the market
                </MenuItem>
              </Menu>
              <Button
                onClick={() => { /* edit logic */ }}
                variant="contained"
                className="normal-case bg-white hover:bg-white text-primary-600 p-2 border-none shadow-none hover:border-none hover:shadow-none"
                startIcon={<img src="/assets/images/edit_square_FILL0_wght400_GRAD0_opsz24.png" alt="Edit" />}
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </>
      </div>
      <style jsx>{`
        .cardClass {
          @apply rounded-lg overflow-hidden shadow-lg border-2 w-fit;
        }
        .image {
          @apply top-0 w-full h-48 object-cover rounded transition-opacity duration-500 ease-in-out;
        }
        .imageHidden {
          @apply opacity-0 absolute;
        }
        .imageVisible {
          @apply opacity-100;
        }
        .indicator {
          @apply h-3 w-3 rounded-full mx-1 transition-opacity duration-300 bg-white;
        }
        .indicatorActive {
          @apply scale-125;
        }        
      `}</style>

    </div>
  );
};

export { PropertyCard };
