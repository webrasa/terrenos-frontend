import type { ReactChild, ReactNode } from 'react';

type ICardSectionProps = {
  title: ReactChild;
  children: ReactNode;
};

/**
 * A bordered section with title. Different background the title and the content.
 * @component
 */
const CardSection = (props: ICardSectionProps) => (
  <div className="py-6 px-3 lg:px-6">
    <div className="mx-auto w-full max-w-screen-md overflow-auto rounded-md border border-gray-200">
      <div className="bg-gray-100 py-5 px-6 text-lg font-semibold text-gray-800">
        {props.title}
      </div>

      <div className="bg-white py-7 px-6">{props.children}</div>
    </div>
  </div>
);

export { CardSection };
