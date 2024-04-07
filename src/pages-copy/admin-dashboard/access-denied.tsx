import Link from 'next/link';
import type { ReactElement } from 'react';

import { Button } from '@/button/Button';
import { AuthProvider, useAuth } from '@/hooks/UseAuth';
import { FullCenterSection } from '@/layouts/FullCenterSection';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

const AccessDenied = () => {
  const { providerInfo } = useAuth();

  return (
    <FullCenterSection
      title="Access Denied"
      description={`Your user ID is ${providerInfo.id}`}
    >
      <Link href="/dashboard">
        <Button full>Go to dashboard</Button>
      </Link>
    </FullCenterSection>
  );
};

AccessDenied.getLayout = (page: ReactElement) => (
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <AuthProvider>{page}</AuthProvider>
  </>
);

export default AccessDenied;
