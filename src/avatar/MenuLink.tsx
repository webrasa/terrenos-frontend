import { Menu } from '@headlessui/react';
import type { PropsOf } from '@headlessui/react/dist/types';
import classNames from 'classnames';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ReactNode } from 'react';

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
          'flex w-full justify-between py-2 px-4 text-left text-sm font-semibold leading-5',
          active ? 'bg-primary-500 text-white' : 'text-gray-700'
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
