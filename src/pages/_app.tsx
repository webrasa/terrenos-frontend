import '../styles/global.css';

import { Amplify, API } from 'aws-amplify';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { SWRConfig } from 'swr';

import { PoweredBy } from '../badge/PoweredBy';
import { AwsConfig } from '../utils/AwsConfig';
import type { NextPageWithLayout } from '../utils/NextLayout';

Amplify.configure({ ...AwsConfig });

// Next JS App props with the shared layout support.
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => API.get('backend', url, {}),
        revalidateOnFocus: false,
      }}
    >
      {getLayout(<Component {...pageProps} />)}

      <PoweredBy />
    </SWRConfig>
  );
};

export default MyApp;
