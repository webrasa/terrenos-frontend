import { ReactNode } from 'react';

type ICenterSectionProps = {
  children: ReactNode;
};

const CenterSection = (props: ICenterSectionProps) => (
  <div className="md:flex md:justify-center md:items-center md:h-full">
    <div className="grid grid-cols-1 gap-y-12 w-full max-w-4xl md:grid-cols-3">
      {props.children}
    </div>
  </div>
);

export { CenterSection };
