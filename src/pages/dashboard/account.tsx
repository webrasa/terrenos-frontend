import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/UseAuth';
import { getShell } from '../../layout/Shell';
import { UserInfoSettings } from '../../templates/account/UserInfoSettings';
import { NextPageWithLayout } from '../../utils/NextLayout';

const Account: NextPageWithLayout = () => {
  const { providerInfo } = useAuth();
  const router = useRouter();

  // Third-part OAuth shouldn't have access to account page by redirecting to /dashboard page
  if (providerInfo.identities) {
    router.push('/dashboard');
    return null;
  }

  return <UserInfoSettings />;
};

Account.getLayout = getShell('Account');

export default Account;
