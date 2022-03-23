import { ReactNode } from 'react';

type ICenterSectionProps = {
  children: ReactNode;
};

const CenterSection = (props: ICenterSectionProps) => (
  <div className="md:flex md:justify-center md:items-center md:min-h-full">
    {props.children}
  </div>
);

export { CenterSection };
