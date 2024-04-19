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
