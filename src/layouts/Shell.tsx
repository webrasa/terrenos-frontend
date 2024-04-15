import type { ReactElement } from 'react';

import { AuthProvider } from '@/hooks/UseAuth';
import { Footer } from '@/templates/Footer';
import { Shell } from '@/templates/shell/Shell';

import { Meta } from './Meta';

type ShellProps = {
  title: string;
  description: string;
  image: string;
};

// Shared layout for Dashboard pages: https://nextjs.org/docs/basic-features/layouts
// You can also do the same the landing pages if needed.

// eslint-disable-next-line react/display-name
export const getShell = (props: ShellProps) => (page: ReactElement) => (
  <>
    <Meta
      title={props.title}
      description={props.description}
      image={props.image}
    />
    <AuthProvider>
      <Shell title={props.title}>{page}</Shell>
      <Footer />
    </AuthProvider>
  </>
);
