type IToggleMenuButtonProps = {
  onClick: () => void;
};

/**
 * A toggle button to show/hide component in small screen.
 * @component
 * @params {Object} props - Component props.
 * @param {Function} props.onClick - Function to run when the button is clicked.
 */
const ToggleMenuButton = (props: IToggleMenuButtonProps) => (
  <button
    className="p-2 text-gray-900 rounded-md hover:bg-white"
    onClick={props.onClick}
    type="button"
  >
    <svg
      className="stroke-current h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

export { ToggleMenuButton };
