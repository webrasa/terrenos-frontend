import { ReactNode } from 'react';

type ICardSectionProps = {
  title: ReactNode;
  children: ReactNode;
};

const CardSection = (props: ICardSectionProps) => (
  <div className="py-6 px-3 lg:px-6">
    <div className="overflow-auto mx-auto w-full max-w-screen-md rounded-md border border-gray-200">
      <div className="py-5 px-6 text-lg font-semibold text-gray-800 bg-gray-100">
        {props.title}
      </div>

      <div className="py-7 px-6 bg-white">{props.children}</div>
    </div>
  </div>
);

export { CardSection };
