import type { NextPage } from 'next';
import type { ReactElement } from 'react';

export type NextPageWithLayoutAndProps<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};
