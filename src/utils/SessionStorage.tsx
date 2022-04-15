/**
 * Retrieve data from the browser SessionStorage.
 * FYI, `useSessionStorage` and `getSessionStorage` is different.
 * `useSessionStorage` contains a React State and it also store item.
 * 'Automatically' storing item isn't what we always want.
 * getSessionStorage is extremely trivial.
 * @param key - The name of the key to retrieve the value of.
 */
export const getSessionStorage = (key: string) => {
  const isBrowser = typeof window !== 'undefined';

  // `sessionStorage` is only available in the browser
  if (isBrowser) {
    return sessionStorage.getItem(key) ?? '';
  }

  return '';
};
