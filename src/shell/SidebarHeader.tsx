import { ReactNode } from 'react';

import className from 'classnames';

import { ToggleMenuButton } from '../button/ToggleMenuButton';
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
    <div className="flex h-screen antialiased text-gray-600">
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

      <div className="flex overflow-hidden flex-col flex-1 bg-primary-100">
        <header className="flex justify-between items-center p-3 h-16 bg-white sm:px-6">
          <div className="mr-2 lg:hidden">
            <ToggleMenuButton onClick={handleToggleMenu} />
          </div>

          <div className="text-lg font-bold text-gray-900">{props.title}</div>

          <div className="ml-auto">{props.leftContent}</div>
        </header>

        <div className="overflow-x-hidden overflow-y-auto flex-1 py-8">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { SidebarHeader };
