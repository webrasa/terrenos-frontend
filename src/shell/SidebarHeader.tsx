import { ReactNode, useEffect } from 'react';

import className from 'classnames';
import { useRouter } from 'next/router';

import { ToggleMenuButton } from '../button/ToggleMenuButton';
import { useAuth } from '../hooks/UseAuth';
import { useMenu } from '../hooks/UseMenu';
import { Sidebar } from './Sidebar';

type ISidebarHeaderProps = {
  topLinks: ReactNode;
  bottomLinks: ReactNode;
  title: string;
  leftContent: ReactNode;
  children: ReactNode;
};

/**
 * @component
 * @params props - Component props.
 * @param props.topLinks - Menu located at the top of the sidebar.
 * @param props.bottomLinks - Menu located at the bottom of the sidebar.
 * @param props.title - Page title to display in the header.
 * @param props.leftContent - Elements to be display at the left side of the header.
 * @param props.children - Children components.
 */
const SidebarHeader = (props: ISidebarHeaderProps) => {
  const { showMenu, handleToggleMenu, handleClose } = useMenu();
  const router = useRouter();
  const { currentTeam } = useAuth();

  useEffect(() => {
    handleClose();
  }, [router, currentTeam]);

  const clickableBgClass = className(
    'fixed',
    'w-full',
    'h-full',
    'z-30',
    'inset-0',
    'bg-black',
    'opacity-50',
    'cursor-default',
    {
      hidden: !showMenu,
    },
    'lg:hidden'
  );

  return (
    <div className="flex h-screen text-gray-600 antialiased">
      <button
        className={clickableBgClass}
        onClick={handleClose}
        aria-label="Close"
        type="button"
        tabIndex={-1}
      />

      <Sidebar
        show={showMenu}
        topLinks={props.topLinks}
        bottomLinks={props.bottomLinks}
      />

      <div className="flex flex-1 flex-col overflow-hidden bg-primary-100">
        <header className="flex h-16 items-center justify-between bg-white p-3 sm:px-6">
          <div className="mr-2 lg:hidden">
            <ToggleMenuButton onClick={handleToggleMenu} />
          </div>

          <div className="text-lg font-bold text-gray-900">{props.title}</div>

          <div className="ml-auto">{props.leftContent}</div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-8">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { SidebarHeader };
