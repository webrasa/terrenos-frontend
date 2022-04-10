import { ReactNode } from 'react';

type ICenterSectionProps = {
  children: ReactNode;
};

const CenterSection = (props: ICenterSectionProps) => (
  <div className="md:flex md:min-h-full md:items-center md:justify-center">
    {props.children}
  </div>
);

export { CenterSection };
