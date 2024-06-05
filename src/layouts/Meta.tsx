import Head from 'next/head';
import { NextSeo } from 'next-seo';

import type { IMetaProps } from '@/types/iMetaProps';
import { AppConfig } from '@/utils/AppConfig';
/**
 * Adding element in the <head> of the page.
 * @component
 * @params props - Component props.
 * @param props.title - Page title for SEO.
 * @param props.description - Page description for SEO.
 * @param props.image - URL of the image to be used for SEO.
 * @param props.canonical - Page canonical url.
 */
const Meta = (props: IMetaProps) => (
  <>
    <Head>
      <meta charSet="UTF-8" key="charset" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
        key="viewport"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" key="apple" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
        key="icon32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
        key="icon16"
      />
      <link rel="icon" href="/favicon.ico" key="favicon" />
    </Head>
    <NextSeo
      title={props.title}
      description={props.description}
      canonical={props.canonical}
      openGraph={{
        title: props.title,
        description: props.description,
        url: props.canonical,
        locale: AppConfig.locale,
        site_name: AppConfig.site_name,
      }}
    />
  </>
);

export { Meta };
