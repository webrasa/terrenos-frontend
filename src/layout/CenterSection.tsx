import type { ReactNode } from 'react';

type ICenterSectionProps = {
  children: ReactNode;
};

const CenterSection = (props: ICenterSectionProps) => (
  <div className="flex min-h-full flex-col items-center justify-center">
    {props.children}
  </div>
);

export { CenterSection };
