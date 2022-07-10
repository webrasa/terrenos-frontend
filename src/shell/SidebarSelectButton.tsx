import { Listbox } from '@headlessui/react';

type ISidebarSelectButtonProps = {
  text: string;
};

/**
 * Button to render before any interaction with SidebarSelect component.
 * User need to click on this button to start the interaction with the select component.
 * @component
 * @params props - Component props.
 * @param props.text - Button text used to display.
 */
const SidebarSelectButton = (props: ISidebarSelectButtonProps) => (
  <Listbox.Button
    className="relative w-full cursor-default rounded-md border border-gray-300 py-2 pr-10 pl-3 text-left font-semibold text-gray-800 shadow-sm focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200/50"
    data-testid="team-selection"
  >
    <span className="block truncate">{props.text}</span>
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
);

export { SidebarSelectButton };
