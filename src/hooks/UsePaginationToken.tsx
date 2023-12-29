import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

export const usePaginationToken = <T extends { paginationToken?: string }>(
  url: string,
) => {
  const router = useRouter();
  const [paginationToken, setPaginationToken] = useState<string | undefined>();
  const [prevTokenList, setPrevTokenList] = useState<Array<string | undefined>>(
    [],
  );
  let currentUrl = url;

  if (paginationToken) {
    currentUrl += `?paginationToken=${encodeURIComponent(paginationToken)}`;
  }

  const { data } = useSWR<T>(router.isReady ? currentUrl : null);

  const handleNextPage = () => {
    setPrevTokenList([...prevTokenList, paginationToken]);
    setPaginationToken(data?.paginationToken);
  };

  const handlePreviousPage = () => {
    const newTokenList = [...prevTokenList];
    const lastToken = newTokenList.pop();
    setPrevTokenList(newTokenList);
    setPaginationToken(lastToken);
  };

  return {
    data,
    prevTokenList,
    currentUrl,
    handleNextPage,
    handlePreviousPage,
  };
};
