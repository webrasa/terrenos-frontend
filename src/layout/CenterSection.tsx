import { ReactNode } from 'react';

type ICenterSectionProps = {
  children: ReactNode;
};

const CenterSection = (props: ICenterSectionProps) => (
  <div className="md:h-full md:flex md:items-center md:justify-center">
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-y-12">
      {props.children}
    </div>
  </div>
);

export { CenterSection };
