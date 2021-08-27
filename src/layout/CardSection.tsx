import { ReactNode } from 'react';

type ICardSectionProps = {
  title: ReactNode;
  children: ReactNode;
};

const CardSection = (props: ICardSectionProps) => (
  <div className="px-3 lg:px-6 py-8 md:h-full md:flex md:items-center md:justify-center">
    <div className="max-w-screen-md w-full mb-24 border border-gray-200 rounded-md overflow-auto">
      <div className="px-6 py-5 bg-gray-100">{props.title}</div>

      <div className="px-6 py-7 bg-white">{props.children}</div>
    </div>
  </div>
);

export { CardSection };
