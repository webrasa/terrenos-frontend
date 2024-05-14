import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { Button } from '@/button/Button';

const arrayElements = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

export default function FilterAttributes() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item],
    );
  };

  return (
    <div className="mr-5 mt-6 w-40 flex-col text-left">
      <Menu as="div" className="inline-block w-40 text-left">
        <Menu.Button
          className="inline-flex w-full justify-between rounded border border-gray-500 bg-white px-4 py-2 text-sm font-semibold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          onClick={() => setIsOpen(!isOpen)}
        >
          Search by Attribute
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute right-0 z-10 mb-4 mr-11 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-xl ring-1 ring-black/5 focus:outline-none"
          >
            <div className="pb-5 pl-10 pr-20 pt-10 text-black">
              <p className="w-80 pb-5 text-lg font-semibold">
                Select which attributes you would like to see in your search
              </p>
              <p className="text-sm font-normal">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-10">
              {arrayElements.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <label
                      className={`${
                        active ? 'text-black' : 'text-gray-900'
                      } group flex w-28 items-center rounded-md p-2 text-sm`}
                    >
                      <input
                        type="checkbox"
                        className={`mr-2 appearance-none checked:border-transparent checked:bg-green-600 checked:hover:bg-green-700 focus:ring-0 focus:ring-offset-0 checked:focus:ring-0 checked:focus:ring-offset-0`}
                        checked={selectedItems.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      {item}
                    </label>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className="flex justify-end py-10 pr-10">
              <Button btn-xl onClickHandler={() => setIsOpen(false)}>
                Confirm
              </Button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
