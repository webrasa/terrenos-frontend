import { ReactNode } from 'react';

import { Logo } from '../templates/Logo';

type IFullCenterSectionProps = {
  children: ReactNode;
  icon?: ReactNode;
  title: string;
  description?: string;
};

const FullCenterSection = (props: IFullCenterSectionProps) => (
  <div className="min-h-screen flex items-center justify-center bg-primary-100">
    <div className="max-w-md w-full text-center">
      <Logo xl />

      <div className="mt-5 px-6 py-7 bg-white rounded-md">
        {props.icon && <div className="mb-1">{props.icon}</div>}

        <h1 className="text-xl font-semibold">{props.title}</h1>

        <div className="mt-4">
          {props.description && (
            <div className="text-sm mb-4">{props.description}</div>
          )}

          <div className="text-left">{props.children}</div>
        </div>
      </div>
    </div>
  </div>
);

export { FullCenterSection };
