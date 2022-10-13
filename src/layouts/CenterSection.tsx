import type { ReactNode } from 'react';

type ICenterSectionProps = {
  children: ReactNode;
};

/**
 * Center the content using all height available.
 * @component
 */
const CenterSection = (props: ICenterSectionProps) => (
  <div className="flex min-h-full flex-col items-center justify-center">
    {props.children}
  </div>
);

export { CenterSection };
