import Link from 'next/link';
import type { ReactNode } from 'react';

import { SidebarHeader } from '@/shell/SidebarHeader';
import { SidebarLink } from '@/shell/SidebarLink';

type IAdminShellProps = {
  title: string;
  children: ReactNode;
};

/**
 * Admin Shell used for Super Admin.
 * @component
 */
const AdminShell = (props: IAdminShellProps) => (
  <SidebarHeader
    title={props.title}
    topLinks={
      <>
        <Link href="/admin-dashboard">
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

        <Link href="/admin-dashboard/user-list">
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
            Users
          </SidebarLink>
        </Link>

        <Link href="/admin-dashboard/team-list">
          <SidebarLink
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M10 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0M8 21v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M15 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0M17 10h2a2 2 0 0 1 2 2v1M5 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0M3 13v-1a2 2 0 0 1 2-2h2" />
              </svg>
            }
          >
            Teams
          </SidebarLink>
        </Link>
      </>
    }
    bottomLinks={
      <>
        <Link href="/dashboard">
          <SidebarLink
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1" />
              </svg>
            }
          >
            Exit Admin
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
  >
    {props.children}
  </SidebarHeader>
);

export { AdminShell };
