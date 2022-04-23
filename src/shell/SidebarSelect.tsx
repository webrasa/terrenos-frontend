import { Listbox } from '@headlessui/react';
import classNames from 'classnames';

type ISidebarSelectionProps = {
  value: number;
  currentLabel: string;
  handleChange: (value: number) => void;
  optionList: {
    id: string;
    label: string;
  }[];
};

/**
 * @component
 * @params props - Component props.
 * @param props.value - Current selected value in select.
 * @param props.currentLabel - Current value of the select option.
 * @param props.handleCancel - Called when the value changes.
 * @param props.optionList -  Available options in the Dropdown list.
 */
const SidebarSelect = (props: ISidebarSelectionProps) => (
  <Listbox value={props.value} onChange={props.handleChange}>
    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 py-2 pr-10 pl-3 text-left font-semibold text-gray-800 shadow-sm focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200/50">
      <span className="block truncate">{props.currentLabel}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 stroke-current stroke-2 text-gray-500"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <path d="m8 9 4-4 4 4M16 15l-4 4-4-4" />
        </svg>
      </span>
    </Listbox.Button>

    <div className="absolute mt-1 w-full rounded-md bg-white shadow-md">
      <Listbox.Options className="max-h-60 overflow-auto rounded-md border border-gray-200 py-1 leading-6 shadow-sm focus:outline-none">
        {props.optionList.map((team, ind) => (
          <Listbox.Option
            key={team.id}
            value={ind}
            className={({ active }) => {
              return classNames(
                'relative cursor-default select-none py-2 pr-9 pl-3 focus:outline-none',
                active ? 'bg-primary-500 text-white' : 'text-gray-900'
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
                  {team.label}
                </span>

                {selected && (
                  <span
                    className={classNames(
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                      active ? 'text-white' : 'text-primary-600'
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 stroke-current stroke-2"
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
);

export { SidebarSelect };
