import type { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

/**
 * A Section used in the user dashboard.
 * @component
 */
const Section = (props: ISectionProps) => (
  <div className="py-8 px-3 lg:px-6">
    {props.title || props.description ? (
      <div className="rounded-md border-gray-200 bg-white py-5 px-4">
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
