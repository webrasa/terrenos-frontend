import { Menu } from '@headlessui/react';
import Avvvatars from 'avvvatars-react';

import { MenuLink } from '@/avatar/MenuLink';
import { useAuth } from '@/hooks/UseAuth';
import { AppConfig } from '@/utils/AppConfig';

/**
 * A dropdown menu using avatar (user profile) as trigger.
 * @component
 */
const AvatarMenu = () => {
  const { providerInfo } = useAuth();
  const isEmailAuth = !providerInfo.identities;

  return (
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

      <Menu.Items className="absolute right-4 w-56 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-lg outline-none">
        <div className="py-3 px-4">
          <p className="text-sm leading-5">Signed in as</p>
          <p className="truncate text-sm font-medium leading-5 text-gray-900">
            {providerInfo.email}
          </p>
        </div>

        <div className="py-1">
          {isEmailAuth && (
            <MenuLink href="/dashboard/account">Account</MenuLink>
          )}
          <MenuLink href="/">Landing Page</MenuLink>
          <MenuLink href={`mailto:${AppConfig.mailto_contact}`}>
            Need Helps?
          </MenuLink>
        </div>

        <div className="py-1">
          <MenuLink href="/dashboard/logout">Sign Out</MenuLink>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export { AvatarMenu };
