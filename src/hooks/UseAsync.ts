import { useCallback, useEffect, useState } from 'react';

export const useAsync = (
  fn: (...args: any[]) => Promise<any>,
  immediate = false
) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);

  // useCallback ensures useEffect is not called on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (...args: any[]) => {
      setPending(true);
      setValue(null);

      return fn(...args)
        .then((response: any) => setValue(response))
        .finally(() => setPending(false));
    },
    [fn]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    pending,
    value,
  };
};

export type AsyncAction = ReturnType<typeof useAsync>;
