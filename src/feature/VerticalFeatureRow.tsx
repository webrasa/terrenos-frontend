import classNames from 'classnames';
import type { ReactNode } from 'react';

type IVerticalFeatureRowProps = {
  title: string;
  children: ReactNode;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean;
  action?: ReactNode;
  subtitle: string;
};

/**
 * A two-column feature section with one column for the image and another one for the text.
 * @component
 */
const VerticalFeatureRow = (props: IVerticalFeatureRowProps) => {
  const verticalFeatureClass = classNames(
    'vertical-feature',
    'first:mt-0',
    'mt-16',
    'flex',
    'flex-wrap',
    'items-center',
    'space-y-8',
    {
      'flex-row-reverse': props.reverse,
    }
  );

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full md:w-1/2">
        <div className="text-sm font-bold text-primary-500">
          {props.subtitle}
        </div>
        <h3 className="mt-1 text-3xl font-semibold text-gray-900">
          {props.title}
        </h3>
        <div className="mt-3 text-lg leading-7">{props.children}</div>
        {props.action && <div className="mt-4">{props.action}</div>}
      </div>

      <div className="flex w-full items-center justify-center md:w-1/2 md:p-5 lg:p-10">
        <img src={props.image.src} alt={props.image.alt} />
      </div>

      <style jsx>
        {`
          .vertical-feature :global(p) {
            @apply mt-2;
          }

          .vertical-feature :global(ul) {
            @apply mt-2;
          }
        `}
      </style>
    </div>
  );
};

export { VerticalFeatureRow };
