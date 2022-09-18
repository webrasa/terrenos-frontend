import '../styles/global.css';

import { Amplify, API } from 'aws-amplify';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { SWRConfig } from 'swr';

import { DemoBadge } from '@/badge/DemoBadge';
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

      <DemoBadge />
    </SWRConfig>
  );
};

const MyApp = (props: AppPropsWithLayout) => {
  const router = useRouter();

  return (
    <ErrorBoundary
      fallbackRender={({ error }: FallbackProps) => {
        const handleReloadPage = () => {
          router.reload();
        };

        return (
          <div>
            <button onClick={handleReloadPage}>Reload the page</button>
          </div>
        );
      }}
    >
      <MyAppSWRConfig {...props} />
    </ErrorBoundary>
  );
};

export default MyApp;
