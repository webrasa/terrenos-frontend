import { ReactNode } from 'react';

import { Logo } from '../templates/Logo';

type IFullCenterSectionProps = {
  children: ReactNode;
  icon?: ReactNode;
  title: string;
  description?: string;
};

const FullCenterSection = (props: IFullCenterSectionProps) => (
  <div className="flex justify-center items-center min-h-screen bg-primary-100">
    <div className="w-full max-w-md text-center">
      <Logo xl />

      <div className="py-7 px-6 mt-5 bg-white rounded-md">
        {props.icon && <div className="mb-1">{props.icon}</div>}

        <h1 className="text-xl font-semibold">{props.title}</h1>

        <div className="mt-4">
          {props.description && (
            <div className="mb-4 text-sm">{props.description}</div>
          )}

          <div className="text-left">{props.children}</div>
        </div>
      </div>
    </div>
  </div>
);

export { FullCenterSection };
