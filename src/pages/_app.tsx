import { ReactElement } from 'react';

import Amplify, { API } from 'aws-amplify';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { AwsConfig } from '../utils/AwsConfig';
import { NextPageWithLayout } from '../utils/NextLayout';

import '../styles/main.css';

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
        fetcher: (url: string) => API.get('backend', url, null),
        revalidateOnFocus: false,
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
};

export default MyApp;
