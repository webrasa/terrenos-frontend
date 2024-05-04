import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { Button } from '@/button/Button';

const arrayElements = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
];

export default function Example() {
  return (
    <div className="top-16 ml-10 mt-10 w-36 flex-col text-left">
      <span className="font-semibold text-black">Square meters</span>
      <Menu as="div" className="relative inline-block w-36 text-left">
        <div>
          <Menu.Button className="mt-2.5 inline-flex w-full justify-between rounded-md border border-gray-500 bg-white px-4 py-2 text-base font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Options
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="black"
              className="-mr-1 ml-2 mt-1 size-4 text-violet-200 hover:text-violet-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Menu.Button>
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
          <Menu.Items className="relative right-0 mb-4 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
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
                      <input type="checkbox" className="mr-2" />
                      {item}
                    </label>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className="flex justify-end py-10 pr-10">
              <Button btn-xl>Confirm</Button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
