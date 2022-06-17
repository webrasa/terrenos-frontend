import { Listbox } from '@headlessui/react';
import classNames from 'classnames';

export type ISidebarSelectOptionProps = {
  value: string | number;
  label: string;
};

/**
 * An accessible <option> tag that will be rendered in the dropdown of SidebarSelect.
 * @component
 */
const SidebarSelectionOption = (props: ISidebarSelectOptionProps) => (
  <Listbox.Option
    value={props.value}
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
          {props.label}
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
);

export { SidebarSelectionOption };
