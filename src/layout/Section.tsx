import { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const Section = (props: ISectionProps) => (
  <div className="py-8 px-3 lg:px-6">
    {props.title || props.description ? (
      <div className="py-5 px-4 bg-white rounded-md border-gray-200">
        {props.title && (
          <div className="text-xl font-semibold text-gray-800">
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
