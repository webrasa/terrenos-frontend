import { Menu } from '@headlessui/react';
import type { PropsOf } from '@headlessui/react/dist/types';
import classNames from 'classnames';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type IMenuInternalLinkProps = {
  active?: boolean;
};

const MenuInternalLink = (
  props: PropsOf<'a'> &
    React.PropsWithChildren<LinkProps> &
    IMenuInternalLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const { href, children, active, ...rest } = props;

  return (
    <Link href={href}>
      <a
        ref={ref}
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

// Instead of applying direct forwardRef on MenuInternalLink, we use an intermediate component for Ref.
// This avoid an eslint error and the solution was provided by: https://github.com/jsx-eslint/eslint-plugin-react/issues/2269
const MenuInternalLinkRef = forwardRef(MenuInternalLink);

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
      <MenuInternalLinkRef href={props.href} active={active}>
        {props.children}
      </MenuInternalLinkRef>
    )}
  </Menu.Item>
);

export { MenuLink };
