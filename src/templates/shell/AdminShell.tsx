import type { ReactNode } from 'react';

import { Logo } from '../Logo';
import { AvatarMenu } from './AvatarMenu';

type IAdminShellProps = {
  title: string;
  children: ReactNode;
};

/**
 * Admin Shell used for Super Admin.
 * @component
 */
const AdminShell = (props: IAdminShellProps) => (
  <div className="flex h-screen text-gray-600 antialiased">
    <div className="flex flex-1 flex-col overflow-hidden bg-primary-100">
      <header className="flex h-16 items-center justify-between bg-white p-3 sm:px-6">
        <div className="text-lg font-bold text-gray-900">
          <Logo />
        </div>

        <div className="ml-auto">
          <AvatarMenu />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-8">
        {props.children}
      </div>
    </div>
  </div>
);

export { AdminShell };
