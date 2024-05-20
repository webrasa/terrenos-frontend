import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import type { MouseEventHandler } from 'react';
import { Fragment } from 'react';

type IFilterMenuProps = {
  translation: Function;
  onClickHandler?: MouseEventHandler<HTMLDivElement>;
};
const filerMenuOptions = [
  'newest',
  'priceHighToLow',
  'priceLowToHigh',
  'updatedRecently',
  'trending',
];
const active = 'updatedRecently';
export default function FilterMenu() {
  return (
    <div className="w-10">
      <Menu as="div">
        <div>
          <MenuButton className="inline-flex justify-center py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mr-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-white/50 focus:outline-none">
            <div className="p-1 ">
              {filerMenuOptions.map((menuOption) => (
                <MenuItem key={menuOption}>
                  <button
                    className={`group mb-1 flex w-full items-center rounded-md p-2 text-sm text-gray-900 hover:bg-primary-600 hover:text-white ${active === menuOption ? 'bg-primary-600 text-white' : ''} `}
                  >
                    {menuOption}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
