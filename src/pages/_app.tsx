import { ReactElement } from 'react';

import { API, Amplify } from 'aws-amplify';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { PoweredBy } from '../badge/PoweredBy';
import { AwsConfig } from '../utils/AwsConfig';
import { NextPageWithLayout } from '../utils/NextLayout';

import '../styles/global.css';

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
