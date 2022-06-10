import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

// Next JS pages with the shared layout support.
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
