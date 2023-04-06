import type { ReactNode } from 'react';

type ICardSectionProps = {
  title: ReactNode;
  children: ReactNode;
};

/**
 * A bordered section with title. Different background the title and the content.
 * @component
 */
const CardSection = (props: ICardSectionProps) => (
  <div className="px-3 py-6 lg:px-6">
    <div className="mx-auto w-full max-w-screen-md overflow-auto rounded-md border border-gray-200">
      <div className="bg-gray-100 px-6 py-5 text-lg font-semibold text-gray-800">
        {props.title}
      </div>

      <div className="bg-white px-6 py-7">{props.children}</div>
    </div>
  </div>
);

export { CardSection };
