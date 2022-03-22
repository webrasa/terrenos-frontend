import { ReactNode, useState } from 'react';

import { Listbox } from '@headlessui/react';
import classNames from 'classnames';

import { Logo } from '../templates/Logo';

type ISidebarProps = {
  show?: boolean;
  topLinks: ReactNode;
  bottomLinks: ReactNode;
};

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

/**
 * Sidebar menu.
 * @component
 * @params props - Component props.
 * @param show - Indicates if the component need be displayed.
 * @param props.topLinks - Menu located at the top of the sidebar.
 * @param props.bottomLinks - Menu located at the bottom of the sidebar.
 */
const Sidebar = (props: ISidebarProps) => {
  const sidebarClass = classNames(
    'w-64',
    'inset-y-0',
    'left-0',
    'z-40',
    'bg-white',
    'overflow-y-auto',
    'py-8',
    'px-3',
    'flex',
    'flex-col',
    'fixed',
    'lg:static',
    'transition',
    'duration-300',
    'ease-in-out',
    'transform',
    {
      'translate-x-0': props.show,
      '-translate-x-full': !props.show,
    },
    'lg:translate-x-0'
  );

  const [selectedPeople, setSelectedPeople] = useState(people?.[0]?.name);

  return (
    <div className={sidebarClass}>
      <div className="text-center">
        <Logo />
      </div>

      <div className="relative mt-3">
        <Listbox value={selectedPeople} onChange={setSelectedPeople}>
          <Listbox.Button className="relative py-2 pr-10 pl-3 w-full font-semibold text-left text-gray-800 rounded-md border border-gray-300 focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200/50 shadow-sm cursor-default">
            <span className="block truncate">{selectedPeople}</span>
            <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-gray-500 stroke-current stroke-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="m8 9 4-4 4 4M16 15l-4 4-4-4" />
              </svg>
            </span>
          </Listbox.Button>

          <div className="absolute mt-1 w-full bg-white rounded-md shadow-md">
            <Listbox.Options className="overflow-auto py-1 max-h-60 leading-6 rounded-md border border-gray-200 focus:outline-none shadow-xs">
              {people.map((elt) => (
                <Listbox.Option
                  key={elt.name}
                  value={elt.name}
                  className={({ active }) => {
                    return classNames(
                      'relative py-2 pr-9 pl-3 focus:outline-none cursor-default select-none',
                      active ? 'text-white bg-primary-500' : 'text-gray-900'
                    );
                  }}
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          'block truncate',
                          selected ? 'font-semibold' : 'font-normal'
                        )}
                      >
                        {elt.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            'flex absolute inset-y-0 right-0 items-center pr-4',
                            active ? 'text-white' : 'text-primary-600'
                          )}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 stroke-current stroke-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M0 0h24v24H0z" stroke="none" />
                            <path d="m5 12 5 5L20 7" />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className="flex-1 mt-5">{props.topLinks}</div>

      <div>{props.bottomLinks}</div>
    </div>
  );
};

export { Sidebar };
