import { ReactNode } from 'react';

type ICTABannerProps = {
  title: string;
  subtitle: string;
  button: ReactNode;
};

const CTABanner = (props: ICTABannerProps) => (
  <div className="flex flex-col p-4 text-center bg-primary-100 rounded-md sm:flex-row sm:justify-between sm:items-center sm:p-12 sm:text-left">
    <div className="text-2xl font-semibold">
      <div className="text-gray-900">{props.title}</div>
      <div className="text-primary-500">{props.subtitle}</div>
    </div>

    <div className="mt-3 sm:mt-0 sm:ml-2 whitespace-no-wrap">
      {props.button}
    </div>
  </div>
);

export { CTABanner };
