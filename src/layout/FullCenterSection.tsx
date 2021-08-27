import { ReactNode } from 'react';

import { Logo } from '../templates/Logo';

type IFullCenterSectionProps = {
  title: string;
  children: ReactNode;
};

const FullCenterSection = (props: IFullCenterSectionProps) => (
  <div className="min-h-screen flex items-center justify-center bg-primary-100">
    <div className="max-w-md w-full text-center">
      <Logo xl />

      <div className="mt-10 px-6 py-7 bg-white rounded-md">
        <h1 className="text-xl font-semibold">{props.title}</h1>

        <div className="mt-6 flex-row space-y-4 items-end">
          {props.children}
        </div>
      </div>
    </div>
  </div>
);

export { FullCenterSection };
