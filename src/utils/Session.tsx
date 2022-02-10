/**
 * Retrieve data from the browser SessionStorage.
 * @param key - The name of the key to retrieve the value of.
 */
export const getSessionItem = (key: string) => {
  const isBrowser = typeof window !== 'undefined';

  // sessionStorage is only available in the browser
  if (isBrowser) {
    return sessionStorage.getItem(key) || '';
  }

  return '';
};
