import type { ReactNode } from 'react';

import { Logo } from '@/templates/Logo';

type ISidebarHeaderProps = {
  select?: ReactNode;
  topLinks: ReactNode;
  bottomLinks: ReactNode;
  title: string;
  leftContent?: ReactNode;
  children: ReactNode;
};

/**
 * Dashboard header, displayed at the top of the application.
 * @component
 * @params props - Component props.
 * @param props.select - Select menu located at the top of the sidebar.
 * @param props.topLinks - Menu located at the top of the sidebar.
 * @param props.bottomLinks - Menu located at the bottom of the sidebar.
 * @param props.title - Page title to display in the header.
 * @param props.leftContent - Elements to be display at the left side of the header.
 * @param props.children - Children components.
 */
const SidebarHeader = (props: ISidebarHeaderProps) => {
  return (
    <div className="flex h-screen text-gray-600 antialiased">
      <div className="flex flex-1 flex-col overflow-hidden bg-primary-100">
        <header className="flex h-16 items-center justify-between bg-white p-3 sm:px-6">
          <div className="text-lg font-bold text-gray-900">
            <Logo />
          </div>

          {props.leftContent && (
            <div className="ml-auto">{props.leftContent}</div>
          )}
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-8">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { SidebarHeader };
