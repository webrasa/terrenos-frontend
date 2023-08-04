import Link from 'next/link';
import type { ReactNode } from 'react';

import { SidebarHeader } from '@/shell/SidebarHeader';
import { SidebarLink } from '@/shell/SidebarLink';

import { AvatarMenu } from './AvatarMenu';
import { SidebarTeamSelection } from './SidebarTeamSelection';

type IShellProps = {
  title: string;
  children: ReactNode;
};

/**
 * Shell used for user dashboard.
 * @component
 */
const Shell = (props: IShellProps) => (
  <SidebarHeader
    title={props.title}
    select={<SidebarTeamSelection />}
    topLinks={
      <>
        <Link href="/dashboard">
          <SidebarLink
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                <path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
              </svg>
            }
          >
            Dashboard
          </SidebarLink>
        </Link>

        <Link href="/dashboard/form-example">
          <SidebarLink
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M12 3a3 3 0 00-3 3v12a3 3 0 003 3M6 3a3 3 0 013 3v12a3 3 0 01-3 3M13 7h7a1 1 0 011 1v8a1 1 0 01-1 1h-7M5 7H4a1 1 0 00-1 1v8a1 1 0 001 1h1M17 12h.01M13 12h.01" />
              </svg>
            }
          >
            Random Form
          </SidebarLink>
        </Link>

        <Link href="/dashboard/another-example">
          <SidebarLink
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <rect x="7" y="3" width="14" height="14" rx="2" />
                <path d="M17 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
              </svg>
            }
          >
            Another example
          </SidebarLink>
        </Link>
      </>
    }
    bottomLinks={
      <>
        <Link href="/dashboard/members">
          <SidebarLink
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
              </svg>
            }
          >
            Members
          </SidebarLink>
        </Link>

        <Link href="/dashboard/settings">
          <SidebarLink
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          >
            Settings
          </SidebarLink>
        </Link>

        <Link href="/dashboard/logout">
          <SidebarLink
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
              </svg>
            }
          >
            Sign Out
          </SidebarLink>
        </Link>
      </>
    }
    leftContent={<AvatarMenu />}
  >
    {props.children}
  </SidebarHeader>
);

export { Shell };
