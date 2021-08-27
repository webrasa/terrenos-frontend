import { ReactNode } from 'react';

import classNames from 'classnames';

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
        <div className="text-primary-500 text-sm font-bold">
          {props.subtitle}
        </div>
        <h3 className="mt-1 text-3xl text-gray-900 font-semibold">
          {props.title}
        </h3>
        <div className="mt-3 text-lg leading-7">{props.children}</div>
        {props.action && <div className="mt-4">{props.action}</div>}
      </div>

      <div className="w-full md:w-1/2 md:p-5 lg:p-10 flex items-center justify-center">
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
