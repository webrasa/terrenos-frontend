import { ReactNode } from 'react';

import classNames from 'classnames';

import { Logo } from '../templates/Logo';
import { SidebarTeamSelection } from './SidebarTeamSelection';

type ISidebarProps = {
  show?: boolean;
  topLinks: ReactNode;
  bottomLinks: ReactNode;
};

/**
 * Sidebar menu.
 * @component
 * @params props - Component props.
 * @param show - Indicates if the component need be displayed.
 * @param props.topLinks - Menu located at the top of the sidebar.
 * @param props.bottomLinks - Menu located at the bottom of the sidebar.
 */
const Sidebar = (props: ISidebarProps) => {
  const sidebarClass = classNames(
    'w-64',
    'inset-y-0',
    'left-0',
    'z-40',
    'bg-white',
    'overflow-y-auto',
    'py-8',
    'px-3',
    'flex',
    'flex-col',
    'fixed',
    'lg:static',
    'transition',
    'duration-300',
    'ease-in-out',
    'transform',
    {
      'translate-x-0': props.show,
      '-translate-x-full': !props.show,
    },
    'lg:translate-x-0'
  );

  return (
    <div className={sidebarClass}>
      <div className="text-center">
        <Logo />
      </div>

      <div className="relative mt-3">
        <SidebarTeamSelection />
      </div>

      <div className="flex-1 mt-5">{props.topLinks}</div>

      <div>{props.bottomLinks}</div>
    </div>
  );
};

export { Sidebar };
