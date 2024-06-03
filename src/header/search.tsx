import { Combobox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import type { DropdownItem } from '@/types/DropdownItem';
import type { ISearchHome } from '@/types/IHome';
import type { ISearchFilters } from '@/types/Search';

type ISearchProps = {
  indexTranslations: Function;
  data: Array<ISearchHome>;
  url: string;
  setFilters?: Function;
  filters?: ISearchFilters;
  userLocation?: string;
};

export default function AutoComplete(props: ISearchProps) {
  const [selectedLocation, setSelectedLocation] = useState<ISearchHome | null>({
    value: '',
    name: '',
  });
  const [query, setQuery] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const filteredLocations =
    query === ''
      ? props.data
      : props.data.filter((location) =>
          location.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  const handleSelect = (location: DropdownItem | null) => {
    if (!location) return;

    setSelectedLocation(location);
    if (!props.filters)
      setTimeout(() => {
        setIsDisabled(true);
      }, 200);

    let url = '';

    if (location.value === 'currentLocation') {
      if (props.setFilters)
        props.setFilters({
          ...props.filters,
          userLocation: props.userLocation,
        });
      url = props.url;
    } else {
      let countryId: string = '';
      let regionId: string = '';
      let cityId: string = '';
      let districtId: string = '';

      const [first, second] = location.value.split('-');
      switch (first) {
        case '1':
          countryId = second || '';
          if (props.setFilters)
            props.setFilters({
              ...props.filters,
              countryId: second || '',
            });
          url = props.url;
          break;
        case '2':
          regionId = second || '';
          if (props.setFilters)
            props.setFilters({
              ...props.filters,
              regionId: second || '',
            });
          break;
        case '3':
          cityId = second || '';
          if (props.setFilters)
            props.setFilters({
              ...props.filters,
              cityId: second || '',
            });
          break;
        case '4':
          districtId = second || '';
          if (props.setFilters)
            props.setFilters({
              ...props.filters,
              districtId: second || '',
            });
          break;
        default:
          break;
      }

      url = `/search?countryId=${countryId}&regionId=${regionId}&cityId=${cityId}&districtId=${districtId}&userLocation=`;
    }

    setQuery('');
    router.push(url);
  };

  // Hooks
  useEffect(() => {
    if (
      (props.filters?.countryId ||
        props.filters?.regionId ||
        props.filters?.cityId ||
        props.filters?.districtId) &&
      filteredLocations &&
      filteredLocations.length > 0
    ) {
      let loc;

      if (props.filters?.countryId)
        loc = filteredLocations.find(
          (floc) => floc.value === `1-${props.filters?.countryId}`,
        );

      if (props.filters?.regionId)
        loc = filteredLocations.find(
          (floc) => floc.value === `2-${props.filters?.regionId}`,
        );

      if (props.filters?.cityId)
        loc = filteredLocations.find(
          (floc) => floc.value === `3-${props.filters?.cityId}`,
        );

      if (props.filters?.districtId)
        loc = filteredLocations.find(
          (floc) => floc.value === `4-${props.filters?.districtId}`,
        );

      if (loc && selectedLocation?.value !== loc?.value)
        setSelectedLocation(
          loc || {
            value: '',
            name: '',
          },
        );
    }
  }, [props.filters, filteredLocations]);

  return (
    <div className="top-16 md:w-full">
      <Combobox
        value={selectedLocation}
        onChange={(location) => {
          handleSelect(location);
          setSelectedLocation(location);
        }}
        disabled={isDisabled}
      >
        <div className="relative">
          <div className="relative h-16 w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              autoComplete="off"
              className="w-full border-none bg-white py-2 pl-3 pr-10 text-sm leading-10 text-gray-900 focus:ring-0"
              displayValue={(location: DropdownItem) => location?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 m-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#009F52"
                className="size-12"
              >
                <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
                  clipRule="evenodd"
                />
              </svg>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredLocations?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  {props.indexTranslations('heroSection.nothingFound')}
                </div>
              ) : (
                filteredLocations?.slice(0, 3).map((location) => {
                  // Extract first digit from value
                  const firstDigit = location.value.charAt(0);

                  // Define SVG element based on the first digit
                  let svgElement: JSX.Element;
                  switch (firstDigit) {
                    case '1':
                      svgElement = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      );
                      break;
                    case '2':
                      svgElement = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                          />
                        </svg>
                      );
                      break;
                    case '3':
                      svgElement = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                          />
                        </svg>
                      );
                      break;
                    case '4':
                      svgElement = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          />
                        </svg>
                      );
                      break;
                    default:
                      svgElement = (
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
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      );
                  }

                  return (
                    <Combobox.Option
                      key={location.value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-primary-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={location}
                    >
                      {({ active }) => (
                        <>
                          <span className="block truncate font-normal">
                            {location.name}
                          </span>
                          {
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3  text-black ${
                                active ? 'stroke-white' : 'stroke-primary-600'
                              }`}
                            >
                              {svgElement}
                            </span>
                          }
                        </>
                      )}
                    </Combobox.Option>
                  );
                })
              )}
              <Combobox.Option
                value={{ value: 'currentLocation', name: 'Current location' }}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 border-t border-gray-400 pr-4 ${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900'
                  }`
                }
              >
                {({ active }) => (
                  <>
                    <span className="block truncate font-normal">
                      Use my current location
                    </span>
                    {
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3  text-black ${
                          active ? 'stroke-white' : 'stroke-primary-600'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </span>
                    }
                  </>
                )}
              </Combobox.Option>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
