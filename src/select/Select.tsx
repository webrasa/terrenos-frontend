import { Listbox } from '@headlessui/react';

import { SelectButton } from './SelectButton';
import { SelectionOption } from './SelectOption';

export type ISelectOption = {
  id: string;
  label: string;
};

type ISelectProps<T> = {
  value: T;
  currentLabel: string;
  handleChange: (value: T) => void;
  optionList: ISelectOption[];
};

/**
 * An accessible React <select> component with design style.
 * @component
 * @params props - Component props.
 * @param props.value - Current selected value in select.
 * @param props.currentLabel - Current value of the select option.
 * @param props.handleCancel - Callback function when the value changes.
 * @param props.optionList -  Available options in the Dropdown list.
 */
const Select = <T,>(props: ISelectProps<T>) => (
  <Listbox value={props.value} onChange={props.handleChange}>
    <div className="relative">
      <SelectButton text={props.currentLabel} />

      <div className="absolute mt-1 w-full rounded-md bg-white shadow-md">
        <Listbox.Options className="max-h-60 overflow-auto rounded-md border border-gray-200 py-1 leading-6 shadow-sm focus:outline-none">
          {props.optionList.map((option) => (
            <SelectionOption
              key={option.id}
              value={option}
              label={option.label}
            />
          ))}
        </Listbox.Options>
      </div>
    </div>
  </Listbox>
);

export { Select };
