import { ReactNode } from 'react';

type ILandingSectionProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
};

/**
 * @component
 * @params props - Component props.
 * @param props.title - Section title to display.
 * @param props.subtitle - Section subtitle to display.
 * @param props.description - Section description to display.
 * @param props.yPadding - Tailwind CSS classes for padding in `y` axis.
 * @param props.children - Children components.
 */
const LandingSection = (props: ILandingSectionProps) => (
  <div
    className={`max-w-screen-xl mx-auto px-3 sm:px-5 lg:px-6 ${
      props.yPadding ? props.yPadding : 'py-16'
    }`}
  >
    {(props.title || props.subtitle || props.description) && (
      <div className="mx-auto mb-12 w-full text-center md:w-4/5 lg:w-3/4 xl:w-2/3">
        {props.subtitle && (
          <div className="text-sm font-bold text-primary-500">
            {props.subtitle}
          </div>
        )}
        {props.title && (
          <h2 className="text-4xl font-bold text-gray-900">{props.title}</h2>
        )}
        {props.description && (
          <div className="mt-4 text-xl">{props.description}</div>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { LandingSection };
