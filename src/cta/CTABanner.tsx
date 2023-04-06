import type { ReactNode } from 'react';

type ICTABannerProps = {
  title: string;
  subtitle: string;
  button: ReactNode;
};

/**
 * A Call to action banner.
 * @component
 */
const CTABanner = (props: ICTABannerProps) => (
  <div className="flex flex-col rounded-md bg-primary-100 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:p-12 sm:text-left">
    <div className="text-2xl font-semibold">
      <div className="text-gray-900">{props.title}</div>
      <div className="text-primary-500">{props.subtitle}</div>
    </div>

    <div className="mt-3 whitespace-nowrap sm:ml-2 sm:mt-0">{props.button}</div>
  </div>
);

export { CTABanner };
