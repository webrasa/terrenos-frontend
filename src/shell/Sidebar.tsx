import classNames from 'classnames';
import type { ReactNode } from 'react';

import { Logo } from '@/templates/Logo';

type ISidebarProps = {
  show?: boolean;
  select: ReactNode;
  topLinks: ReactNode;
  bottomLinks: ReactNode;
};

/**
 * Sidebar menu with two list of links.
 * One in the top of the sidebar and another one at the bottom.
 * @component
 * @params props - Component props.
 * @param props.show - Indicates if the component need be displayed.
 * @param props.select - Select menu located at the top of the sidebar.
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

      <div className="relative mt-3">{props.select}</div>

      <div className="mt-5 flex-1">{props.topLinks}</div>

      <div>{props.bottomLinks}</div>
    </div>
  );
};

export { Sidebar };
