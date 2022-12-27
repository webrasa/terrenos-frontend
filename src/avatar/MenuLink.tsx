import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ReactNode } from 'react';

type IMenuInternalLinkProps = {
  active?: boolean;
};

const MenuInternalLink = (
  props: React.PropsWithChildren<LinkProps> & IMenuInternalLinkProps
) => {
  const { href, children, active, ...rest } = props;

  return (
    <Link
      href={href}
      className={classNames(
        'flex w-full justify-between py-2 px-4 text-left text-sm font-semibold leading-5',
        active ? 'bg-primary-500 text-white' : 'text-gray-700'
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};

type IMenuLinkProps = {
  href: string;
  children: ReactNode;
};

/**
 * Link used in the Avatar Dropdown menu.
 * @component
 * @params props - Component props.
 * @param props.href - The URL of the page the link goes to.
 * @param props.children - Children components.
 */
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
