import classNames from 'classnames';
import type { MouseEventHandler } from 'react';

type IPillProps = {
  base?: boolean;
  greenBorder?: boolean;
  blackBorder?: boolean;
  name: string;
  disableCursorPointer?: boolean;
  translation: Function;
  onClickHandler?: MouseEventHandler<HTMLDivElement>;
};

/**
 * Pill component with design style.
 * @component
 * @params props - Component props.
 * @param props.base - Indicates if the pill is a base pill.
 * @param props.greenBorder - Indicates if the pill has green border.
 * @param props.blackBorder - Indicates if the pill has black border.
 * @param props.name - Indicates name of the pill
 * @param props.disableCursorPointer - Indicates if cursor is disabled
 * @param props.translation - Indicates translation for the component
 * @param props.onClickHandler - Indicates function for onclick event
 */

const Pill = (props: IPillProps) => {
  const pillClass = classNames({
    'pill-base': props.base,
    'pill-green-border': props.greenBorder,
    'pill-black-border': props.blackBorder,
    'cursor-pointer': !props.disableCursorPointer,
  });

  return (
    <div className={pillClass} onClick={props.onClickHandler}>
      {props.onClickHandler && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#AEAEAE"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}
      {props.translation(`attributes.${props.name}`)}
      <style jsx>
        {`
          .pill-base {
            @apply inline-flex items-center rounded-3xl justify-center ring-1 ring-inset text-black bg-white text-sm font-medium px-3 py-1.5 h-8 w-fit;
          }

          .pill-green-border {
            @apply ring-primary-600;
          }

          .pill-black-border {
            @apply ring-black;
          }
        `}
      </style>
    </div>
  );
};

export { Pill };
