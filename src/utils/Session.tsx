export const getSessionItem = (key: string) => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    return sessionStorage.getItem(key) || '';
  }

  return '';
};
