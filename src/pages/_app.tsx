import '../styles/global.css';

import { Amplify, API } from 'aws-amplify';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import type { NextPageContext } from 'next/types';
import { appWithTranslation } from 'next-i18next';
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
  Translations: Object;
};

interface Context extends NextPageContext, AppContext {
  ctx: NextPageContext;
}

const MyAppSWRConfig = ({
  Component,
  pageProps,
  Translations,
}: AppPropsWithLayout) => {
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
      {getLayout(<Component {...pageProps} {...Translations} />)}
    </SWRConfig>
  );
};

const MyApp = (props: AppPropsWithLayout) => {
  return (
    <ErrorBoundary fallbackRender={() => <FallbackErrorBoundary />}>
      <MyAppSWRConfig {...props} />
    </ErrorBoundary>
  );
};

MyApp.getInitialProps = async (appContext: Context) => {
  const { ctx } = appContext;
  const { pathname } = ctx;
  const initialProps = await App.getInitialProps(appContext);
  const path = pathname === '/' ? '/index' : pathname;

  const Translations = await import(
    `../../public/locales/${ctx.locale}${path}.json`
  );
  return { ...initialProps, Translations };
};

export default appWithTranslation(MyApp);
