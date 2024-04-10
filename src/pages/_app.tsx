import '../styles/global.css';

import { Amplify, API } from 'aws-amplify';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { SWRConfig } from 'swr';

import { FallbackErrorBoundary } from '@/templates/FallbackErrorBoundary';
import { AwsConfig } from '@/utils/AwsConfig';

import type { NextPageWithLayout } from '../utils/NextLayout';

Amplify.configure({ ...AwsConfig });

// Next JS App props with the shared layout support.
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyAppSWRConfig = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const handleError = useErrorHandler();

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => API.get('backend', url, {}),
        revalidateOnFocus: false,
        onError: (error: any) => {
          if (
            error?.response?.status === 500 &&
            error?.response?.data?.errors === 'not_member'
          ) {
            handleError(error);
          }
        },
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
};

const MyApp = (props: AppPropsWithLayout) => (
  <ErrorBoundary fallbackRender={() => <FallbackErrorBoundary />}>
    <MyAppSWRConfig {...props} />
  </ErrorBoundary>
);

export default MyApp;
