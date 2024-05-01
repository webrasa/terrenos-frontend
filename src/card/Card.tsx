import classNames from 'classnames';
import { getCookie, setCookie } from 'cookies-next';
import type { ChangeEventHandler } from 'react';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Button } from '@/button/Button';
import { MenuDropdownItem } from '@/navigation/MenuDropdownItem';

type IPropertyCardProps = {
  id: string;
  images: string[];
  price: string;
  sizeMeters: number;
  sizeAcres: number;
  location: string;
  secondLocation: string;
  showDropdown?: boolean;
  showEditButton?: boolean;
  numberOfDays?: number;
  numberOfViews?: number;
  numberOfFavorites?: number;
  onChangeHandler?: ChangeEventHandler<HTMLSelectElement>;
};

/**
 * PropertyCard component that displays a swipeable image gallery and property details.
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} props.id - Product id
 * @param {string[]} props.images - Array of image URLs for the property.
 * @param {string} props.price - Price of the property.
 * @param {number} props.sizeMeters - Size of the property in square meters.
 * @param {number} props.sizeAcres - Size of the property in acres.
 * @param {string} props.location - Primary location of the property.
 * @param {string} props.secondLocation - Secondary location of the property.
 * @param {boolean} [props.showDropdown=false] - Determines if the dropdown should be displayed.
 * @param {boolean} [props.showEditButton=false] - Determines if the edit button should be displayed.
 * @param {number} [props.numberOfDays=0] - Number of days since the property was listed.
 * @param {number} [props.numberOfViews=0] - Number of views the property has received.
 * @param {number} [props.numberOfFavorites=0] - Number of times the property has been favorited.
 */

const PropertyCard = ({
  id,
  images,
  price,
  sizeMeters,
  sizeAcres,
  location,
  secondLocation,
  showDropdown = false,
  showEditButton = false,
  numberOfDays = 0,
  numberOfViews = 0,
  numberOfFavorites = 0,
  onChangeHandler,
}: IPropertyCardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex((current) => (current + 1) % images.length),
    onSwipedRight: () =>
      setActiveIndex(
        (current) => (current - 1 + images.length) % images.length,
      ),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const [favoriteCookie, setFavoditeCookie] = useState<string[]>([]);

  const toggleFavorite = () => {
    let idsString = getCookie('likedProperties') || '';

    let ids = idsString ? idsString.split('-') : [];

    if (ids.includes(id)) {
      ids = ids.filter((currentId: any) => currentId !== id);
    } else {
      ids.push(id);
    }

    idsString = ids.join('-');

    setCookie('likedProperties', idsString);
    setFavoditeCookie(ids);

    setIsFavorited(!isFavorited);
  };

  const cardClass = classNames({
    'rounded-lg': true,
    'overflow-hidden': true,
    'shadow-lg': true,
    'border-2': true,
    'w-80': true,
  });

  const updateFavoriteCookie = () => {
    const idsString = getCookie('likedProperties') || '';

    const ids = idsString ? idsString.split('-') : [];

    setFavoditeCookie(ids);
  };

  useEffect(() => {
    updateFavoriteCookie();
  }, []);

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
        <div className="absolute bottom-2 flex w-full justify-center">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`indicator ${index === activeIndex ? 'indicatorActive' : ''}`}
            />
          ))}
        </div>
        {!showDropdown && !showEditButton && (
          <button
            className="absolute right-2 top-2 scale-125 text-primary-600"
            onClick={toggleFavorite}
          >
            {!favoriteCookie.includes(id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            )}
          </button>
        )}
      </div>
      <div className="p-2.5">
        <div className="align-center flex justify-between">
          <h3 className="text-lg font-bold text-black">{price}</h3>
          <p className="text-sm text-black">{`${sizeMeters} Sq Meters | ${sizeAcres} Acres`}</p>
        </div>
        <p className="mt-2 text-sm text-black">{location}</p>
        <p className="mt-2 text-sm text-black">
          <b>{secondLocation}</b>
        </p>
        <>
          {showDropdown && showEditButton && (
            <>
              <div className="flex items-center justify-between text-sm text-black">
                <span>
                  <strong>{numberOfDays} days</strong> on Terrenoss
                </span>
                <span>
                  <strong>{numberOfViews}</strong> Views
                </span>
                <span className="flex gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  <strong>{numberOfFavorites}</strong> favorites
                </span>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <div className="w-full rounded-lg border border-primary-600">
                  <MenuDropdownItem
                    selected="markAsSold"
                    items={[
                      { value: 'markAsSold', name: 'Mark as sold' },
                      { value: 'setToPending', name: 'Set to pending' },
                      {
                        value: 'takeOffTheMarket',
                        name: 'Take off the market',
                      },
                    ]}
                    onChangeHandler={onChangeHandler}
                    rounded={true}
                    id="cardDropdown"
                  ></MenuDropdownItem>
                </div>
                <Button>Edit</Button>
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
