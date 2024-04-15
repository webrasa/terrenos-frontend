import type { ReactElement } from 'react';

import { AuthProvider } from '@/hooks/UseAuth';
import { AdminShell } from '@/templates/shell/AdminShell';
import { AppConfig } from '@/utils/AppConfig';

import { Meta } from './Meta';
import { RequiredSuperAdmin } from './RequiredSuperAdmin';

// Shared layout for Dashboard pages: https://nextjs.org/docs/basic-features/layouts
// You can also do the same the landing pages if needed.

// eslint-disable-next-line react/display-name
export const getAdminShell = (title: string) => (page: ReactElement) => (
  <>
    <Meta
      title={AppConfig.title}
      description={AppConfig.description}
      image={'imageURL'}
    />
    <AuthProvider>
      <RequiredSuperAdmin>
        <AdminShell title={title}>{page}</AdminShell>
      </RequiredSuperAdmin>
    </AuthProvider>
  </>
);
