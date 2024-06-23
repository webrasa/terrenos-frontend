import { useEffect } from 'react'
import { useRouter } from 'next/router'
import languageDetector from './languageDetector'

export const useRedirect = (to?: string) => {
  const router = useRouter();
  console.log("TO: ", to);
  
  to = to || router.asPath;
  
  useEffect(() => {
    const detectedLng = languageDetector.detect();
    if (to?.startsWith('/' + detectedLng) && router.route === '/404') {
      router.replace('/' + detectedLng + router.route)
      return
    }
    
    languageDetector.cache(detectedLng)
    console.log("TO after: ", '/' + detectedLng + to);
    router.replace('/' + detectedLng + to)
  })

  return;
};

export const Redirect = () => {
  useRedirect();
  return;
}

// eslint-disable-next-line react/display-name
// export const getRedirect = (to?: string) => () => {
//   useRedirect(to)
//   return <></>
// }