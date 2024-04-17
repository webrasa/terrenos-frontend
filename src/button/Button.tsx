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
  square?: boolean;
  puffy?: boolean;
  disabled?: boolean;
  greenBorder?: boolean;
};

/**
 * Button component with design style.
 * @component
 * @params props - Component props.
 * @param props.loading - Display loading indicator.
 * @param props.xs - Button in xs size.
 * @param props.sm - Button in sm size.
 * @param props.xl - Button in xl size.
 * @param props.secondary - Indicates if the button is a secondary button.
 * @param props.red - Indicates if the button is a red button.
 * @param props.green - Indicates if the button is a green button.
 * @param props.full - Indicates if the button takes 100% width.
 * @param props.children - Children components.
 * @param props.square - Indicates if the button have square edges.
 * @param props.puffy - Indicates if the button has padding.
 * @param props.disabled - Indicates if the button is disabled.
 * @param props.greenBorder - Indicates if the button have green border, created to be used with secondary button.
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
    'btn-square': props.square,
    'btn-puffy': props.puffy,
    'btn-disabled': props.disabled,
    'btn-green-border': props.greenBorder,
  });

  return (
    <div className={btnClass}>
      {props.loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 size-5 animate-spin text-white"
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
            @apply text-lg font-bold py-2 px-4;
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
            @apply text-white bg-primary-600 rounded-1.5xl;
          }

          .btn-primary:hover {
            @apply bg-primary-400;
          }

          .btn-primary:active {
            @apply bg-primary-800;
          }

          .btn-secondary {
            @apply bg-white text-black border-black;
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
          .btn-square {
            @apply rounded-none;
          }
          .btn-puffy {
            @apply p-4;
          }
          .btn-disabled {
            cursor: not-allowed;
            background: #009f52cc;
          }
          .btn-green-border {
            border: 1px solid #009f52;
          }
        `}
      </style>
    </div>
  );
};

export { Button };
