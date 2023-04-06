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
  <div className="px-3 py-8 lg:px-6">
    {props.title || props.description ? (
      <div className="rounded-md border-gray-200 bg-white px-4 py-5">
        {props.title && (
          <div className="text-xl font-semibold text-gray-800">
            {props.title}
          </div>
        )}
        {props.description && (
          <div className="mb-3 mt-1">{props.description}</div>
        )}

        {props.children}
      </div>
    ) : (
      props.children
    )}
  </div>
);

export { Section };
