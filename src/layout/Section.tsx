import { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const Section = (props: ISectionProps) => (
  <div className="px-3 lg:px-6 py-8">
    {props.title || props.description ? (
      <div className="px-4 py-5 border-gray-200 bg-white rounded-md">
        {props.title && (
          <div className="text-lg font-semibold text-gray-800">
            {props.title}
          </div>
        )}
        {props.description && (
          <div className="mt-1 mb-3">{props.description}</div>
        )}

        {props.children}
      </div>
    ) : (
      props.children
    )}
  </div>
);

export { Section };
