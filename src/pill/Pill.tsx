import classNames from 'classnames';

type IPillProps = {
  base?: boolean;
  greenBorder?: boolean;
  blackBorder?: boolean;
};

/**
 * Pill component with design style.
 * @component
 * @params props - Component props.
 * @param props.base - Indicates if the pill is a base pill.
 * @param props.greenBorder - Indicates if the pill has green border.
 * @param props.blackBorder - Indicates if the pill has black border.
 */

const Pill = (props: IPillProps) => {
  const pillClass = classNames({
    'pill-base': props.base,
    'pill-green-border': props.greenBorder,
    'pill-black-border': props.blackBorder,
  });

  return (
    <div className={pillClass}>
      Beachfront
      <style jsx>
        {`
          .pill-base {
            @apply inline-flex items-center ring-1 ring-inset text-black bg-white text-sm font-medium;
            justify-content: center;
            border-radius: 24px;
            width: fit-content;
            height: 34px;
            padding: 6px 11px;
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
