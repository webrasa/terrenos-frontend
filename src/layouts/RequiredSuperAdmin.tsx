import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { useAuth } from '@/hooks/UseAuth';
import { GlobalRole } from '@/types/Auth';

type IRequiredSuperAdmin = {
  children: ReactNode;
};

const RequiredSuperAdmin = (props: IRequiredSuperAdmin) => {
  const { profile } = useAuth();
  const router = useRouter();

  if (profile.globalRole !== GlobalRole.SUPER_ADMIN) {
    router.push('/admin-dashboard/access-denied');
    return null;
  }

  return <>{props.children}</>;
};

export { RequiredSuperAdmin };
