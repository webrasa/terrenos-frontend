import { ReactNode } from 'react';

import { Menu } from '@headlessui/react';
import { PropsOf } from '@headlessui/react/dist/types';
import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';

type IMenuInternalLinkProps = {
  active?: boolean;
};

const MenuInternalLink = (
  props: PropsOf<'a'> &
    React.PropsWithChildren<LinkProps> &
    IMenuInternalLinkProps
) => {
  const { href, children, active, ...rest } = props;

  return (
    <Link href={href}>
      <a
        className={classNames(
          'flex justify-between py-2 px-4 w-full text-sm font-semibold leading-5 text-left',
          active ? 'text-white bg-primary-500' : 'text-gray-700'
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};

type IMenuLinkProps = {
  href: string;
  children: ReactNode;
};

const MenuLink = (props: IMenuLinkProps) => (
  <Menu.Item>
    {({ active }) => (
      <MenuInternalLink href={props.href} active={active}>
        {props.children}
      </MenuInternalLink>
    )}
  </Menu.Item>
);

export { MenuLink };
