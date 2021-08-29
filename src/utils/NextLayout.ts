import { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';

// Next JS pages with the shared layout support.
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
