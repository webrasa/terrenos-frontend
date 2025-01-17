import '../styles/global.css';

import { Amplify, API } from 'aws-amplify';
import { getCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { type ReactElement, useEffect } from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { SWRConfig } from 'swr';

import { AuthProvider } from '@/hooks/UseAuth';
import { CurrencyProvider } from '@/store/currencyContext';
import { UserLocationProvider } from '@/store/locationContext';
import { poolProviders } from '@/store/poolContext';
import { UnitProvider } from '@/store/unitContext';
import { WatchListProvider } from '@/store/watchListContext';
import { FallbackErrorBoundary } from '@/templates/FallbackErrorBoundary';
import { AwsConfig } from '@/utils/AwsConfig';

import type { NextPageWithLayout } from '../utils/NextLayout';

Amplify.configure({ ...AwsConfig });

const PoolProviders = poolProviders(
  UnitProvider,
  WatchListProvider,
  CurrencyProvider,
  UserLocationProvider,
);

// Next JS App props with the shared layout support.
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyAppSWRConfig = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const handleError = useErrorHandler();
  const router = useRouter();

  // useEffect(() => {
  //   const cookiesParsed = getCookie('language') ?? 'en';
  //   // router.push(router.asPath, router.asPath, {
  //   //   locale: cookiesParsed,
  //   // });
  //   router.replace('/' + cookiesParsed + router.asPath)
  // }, []);

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
      <AuthProvider requireAuth={false}>
        <PoolProviders>{getLayout(<Component {...pageProps} />)}</PoolProviders>
      </AuthProvider>
    </SWRConfig>
  );
};

const MyApp = (props: AppPropsWithLayout) => (
  <ErrorBoundary fallbackRender={() => <FallbackErrorBoundary />}>
    <MyAppSWRConfig {...props} />
  </ErrorBoundary>
);

export default appWithTranslation(MyApp);
