import type { ReactElement } from 'react';

import { AuthProvider } from '@/hooks/UseAuth';
import { Shell } from '@/templates/shell/Shell';
import { AppConfig } from '@/utils/AppConfig';

import { Meta } from './Meta';

// Shared layout for Dashboard pages: https://nextjs.org/docs/basic-features/layouts
// You can also do the same the landing pages if needed.

// eslint-disable-next-line react/display-name
export const getShell = (title: string) => (page: ReactElement) => (
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <AuthProvider>
      <Shell title={title}>{page}</Shell>
    </AuthProvider>
  </>
);
