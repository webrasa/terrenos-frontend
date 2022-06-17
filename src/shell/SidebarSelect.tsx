import { Listbox } from '@headlessui/react';

import { SidebarSelectButton } from './SidebarSelectButton';
import { SidebarSelectionOption } from './SidebarSelectOption';

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
 * An accessible React <select> component with design style.
 * @component
 * @params props - Component props.
 * @param props.value - Current selected value in select.
 * @param props.currentLabel - Current value of the select option.
 * @param props.handleCancel - Callback function when the value changes.
 * @param props.optionList -  Available options in the Dropdown list.
 */
const SidebarSelect = (props: ISidebarSelectionProps) => (
  <Listbox value={props.value} onChange={props.handleChange}>
    <SidebarSelectButton text={props.currentLabel} />

    <div className="absolute mt-1 w-full rounded-md bg-white shadow-md">
      <Listbox.Options className="max-h-60 overflow-auto rounded-md border border-gray-200 py-1 leading-6 shadow-sm focus:outline-none">
        {props.optionList.map((option, ind) => (
          <SidebarSelectionOption
            key={option.id}
            value={ind}
            label={option.label}
          />
        ))}
      </Listbox.Options>
    </div>
  </Listbox>
);

export { SidebarSelect };
