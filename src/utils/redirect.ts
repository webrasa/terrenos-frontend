import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next';

// import languageDetector from './languageDetector'

export const useRedirect = (to?: string) => {
  const router = useRouter();
  // console.log("TO: ", to);
  
  to = to || router.asPath;
  
  useEffect(() => {
    const cookiesParsed = getCookie('language') ?? 'en';
    
    console.log("COOKIES: ", cookiesParsed);

    // router.push(router.asPath, router.asPath, {
    //   locale: cookiesParsed,
    // });
    // return;
    // const detectedLng = languageDetector.detect();
    if (to?.startsWith('/' + cookiesParsed) && router.route === '/404') {
      router.replace('/' + cookiesParsed + router.route)
      return
    }
    
    // languageDetector.cache(detectedLng)
    // console.log("TO after: ", '/' + detectedLng + to);
    router.replace('/' + cookiesParsed + to)
  })

  return;
};

export const Redirect = () => {
  console.log('REdirect');
  
  useRedirect();
  return;
}

// eslint-disable-next-line react/display-name
// export const getRedirect = (to?: string) => () => {
//   useRedirect(to)
//   return <></>
// }