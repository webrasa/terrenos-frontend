import { ReactNode } from 'react';

import { Menu } from '@headlessui/react';
import Avvvatars from 'avvvatars-react';
import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MenuLink } from '../avatar/MenuLink';
import { useAuth } from '../hooks/UseAuth';
import { SidebarHeader } from '../shell/SidebarHeader';
import { SidebarLink } from '../shell/SidebarLink';

type IShellProps = {
  title: string;
  children: ReactNode;
};

const Shell = (props: IShellProps) => {
  const { providerInfo } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await Auth.signOut();

    await router.push('/');
  };

  return (
    <SidebarHeader
      title={props.title}
      topLinks={
        <>
          <Link href="/dashboard">
            <a>
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
            </a>
          </Link>

          <Link href="/dashboard/add-todo">
            <a>
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
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                }
              >
                Add Todo
              </SidebarLink>
            </a>
          </Link>

          <Link href="/dashboard/form-example">
            <a>
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
                Random form
              </SidebarLink>
            </a>
          </Link>
        </>
      }
      bottomLinks={
        <>
          <Link href="/dashboard/settings">
            <a>
              <SidebarLink
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
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
            </a>
          </Link>

          <div>
            <button className="w-full" onClick={handleLogout} type="button">
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
                Sign out
              </SidebarLink>
            </button>
          </div>
        </>
      }
      leftContent={
        <Menu>
          <Menu.Button>
            <Avvvatars
              value={providerInfo.email}
              size={48}
              border={true}
              borderSize={2}
              borderColor="#e2e8f0"
            />
          </Menu.Button>

          <Menu.Items className="absolute right-4 w-56 bg-white rounded-md border border-gray-200 divide-y divide-gray-200 outline-none shadow-lg">
            <div className="py-3 px-4">
              <p className="text-sm leading-5">Signed in as</p>
              <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                {providerInfo.email}
              </p>
            </div>

            <div className="py-1">
              {!providerInfo.identities && (
                <MenuLink href="/dashboard/account">Account</MenuLink>
              )}
              <MenuLink href="/">Landing page</MenuLink>
            </div>

            <div className="py-1">
              <MenuLink href="/signout">Sign out</MenuLink>
            </div>
          </Menu.Items>
        </Menu>
      }
    >
      {props.children}
    </SidebarHeader>
  );
};

export { Shell };
