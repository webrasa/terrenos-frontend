import classNames from 'classnames';

type IButtonProps = {
  loading?: boolean;
  xs?: boolean;
  sm?: boolean;
  xl?: boolean;
  secondary?: boolean;
  red?: boolean;
  green?: boolean;
  full?: boolean;
  children: string;
};

/**
 * @component
 * @params {Object} props - Component props.
 * @param {boolean} props.loading - Display loading indicator.
 * @param {boolean} props.xs - Button in xs size.
 * @param {boolean} props.sm - Button in sm size.
 * @param {boolean} props.xl - Button in xl size.
 * @param {boolean} props.secondary - Indicates if the button is a secondary button.
 * @param {boolean} props.red - Indicates if the button is a red button.
 * @param {boolean} props.green - Indicates if the button is a green button.
 * @param {boolean} props.full - Indicates if the button takes 100% width.
 * @param {boolean} props.children - Children components.
 */
const Button = (props: IButtonProps) => {
  const btnClass = classNames({
    btn: true,
    'btn-xs': props.xs,
    'btn-sm': props.sm,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-secondary': props.secondary,
    'btn-primary': !props.secondary,
    'btn-red': props.red,
    'btn-green': props.green,
    'w-full': props.full,
  });

  return (
    <div className={btnClass}>
      {props.loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin h-5 w-5 text-white mr-1"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-flex rounded-md border items-center justify-center;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          .btn-xs {
            @apply text-sm py-2 px-2;
          }

          .btn-sm {
            @apply text-base font-medium py-2 px-3;
          }

          .btn-primary {
            @apply text-white bg-primary-500 border-gray-100;
          }

          .btn-primary:hover {
            @apply bg-primary-600;
          }

          .btn-primary:active {
            @apply bg-primary-500;
          }

          .btn-secondary {
            @apply bg-white text-gray-700 border-gray-400;
          }

          .btn-secondary:hover {
            @apply bg-gray-100;
          }

          .btn-secondary:active {
            @apply bg-white;
          }

          .btn-red {
            @apply text-white bg-red-500 border-gray-100;
          }

          .btn-red:hover {
            @apply bg-red-600;
          }

          .btn-red:active {
            @apply bg-red-500;
          }

          .btn-green {
            @apply text-white bg-green-600 border-gray-100;
          }

          .btn-green:hover {
            @apply bg-green-700;
          }

          .btn-green:active {
            @apply bg-green-600;
          }
        `}
      </style>
    </div>
  );
};

export { Button };
