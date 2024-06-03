import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Button } from '@/button/Button';
import type { Attributes } from '@/types/IComponents';
import type { ISearchFilters } from '@/types/Search';

type IFilterAttributesSliderProps = {
  attributesData: Array<Attributes>;
  translation: Function;
  translationCommon: Function;
  setFilters: Function;
  filters: ISearchFilters;
};

export default function FilterAttributes(props: IFilterAttributesSliderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Attributes[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkIfSelected = (
    list: Array<Attributes>,
    item: Attributes,
  ): boolean => {
    const selectedItemsList = list.filter((el) => el.name === item.name);
    if (selectedItemsList && selectedItemsList.length > 0) return true;
    return false;
  };

  const handleCheckboxChange = (item: Attributes) => {
    setSelectedItems((prevSelectedItems) => {
      if (checkIfSelected(prevSelectedItems, item)) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem.name !== item.name,
        );
      }
      return [...prevSelectedItems, item];
    });
  };

  const handleConfirm = () => {
    const attributes = selectedItems.map((el) => el.id);
    props.setFilters({ ...props.filters, attributes: attributes.toString() });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let arrayOfFiltersAttributes: Array<String> | any = [];
    if (props.filters.attributes) {
      arrayOfFiltersAttributes =
        typeof props.filters.attributes === 'string'
          ? props.filters.attributes.split(',')
          : props.filters.attributes;
    }

    const filteredAttributes = props.attributesData.filter((value) =>
      arrayOfFiltersAttributes.some((str: string) => Number(str) === value.id),
    );
    if (JSON.stringify(selectedItems) !== JSON.stringify(filteredAttributes))
      setSelectedItems(filteredAttributes);
  }, [props.filters.attributes, props.attributesData]);

  return (
    <div className="mr-5 flex-col" ref={containerRef}>
      <Menu as="div" className="inline-block w-40 text-left">
        <MenuButton
          className="inline-flex w-full justify-between rounded border border-gray-500 bg-white px-4 py-2 text-sm font-semibold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          onClick={() => setIsOpen(!isOpen)}
        >
          {props.translation('filtersSection.attributePlaceholder')}
        </MenuButton>
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            static
            className="absolute right-0 z-10 mb-4 mr-11 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-xl ring-1 ring-black/5 focus:outline-none"
          >
            <div className="pb-5 pl-10 pr-20 pt-10 text-black">
              <p className="w-80 pb-5 text-lg font-semibold">
                {props.translation('filtersSection.attributeModalTitle')}
              </p>
              <p className="text-sm font-normal">
                {props.translation('filtersSection.attributeModalSubTitle')}
              </p>
            </div>
            <div className="custom-scroll grid h-48 grid-cols-2 gap-x-4 gap-y-2 pl-10">
              {props.attributesData.map((item, index) => (
                <MenuItem key={index}>
                  {({ active }) => (
                    <label
                      className={`${
                        active ? 'text-black' : 'text-gray-900'
                      } group flex w-28 items-center rounded-md p-2 text-sm`}
                    >
                      <input
                        type="checkbox"
                        className={`mr-2 appearance-none checked:border-transparent checked:bg-primary-600 checked:hover:bg-primary-600 focus:ring-0 focus:ring-offset-0 checked:focus:ring-0 checked:focus:ring-offset-0`}
                        checked={checkIfSelected(selectedItems, item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      {props.translationCommon(`attributes.${item.name}`)}
                    </label>
                  )}
                </MenuItem>
              ))}
            </div>
            <div className="flex justify-end py-10 pr-10">
              <Button btn-xl onClickHandler={handleConfirm}>
                {props.translation('filtersSection.attributeModalButtonTitle')}
              </Button>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
