import { useCallback, useEffect, useRef, useState } from 'react';

const useIsMounted = (): (() => boolean) => {
  const ref = useRef<boolean>(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return () => ref.current;
};

/**
 * Run asynchronously fn function and know if the function is currently running.
 * @hook
 * @param fn - Async function to run.
 * @param immediate - Indicates if the async function needs to be run immediately.
 * @returns result - The function returns an Object.
 * @return result.execute - The function to execute to trigger the async function.
 * @return result.pending - Indicates if the async is currently running.
 * @return result.value - Result returned by the async function.
 */
export const useAsync = (
  fn: (...args: any[]) => Promise<any>,
  immediate = false
) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const isMounted = useIsMounted();

  // useCallback ensures useEffect is not called on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (...args: any[]) => {
      setPending(true);
      setValue(null);

      return fn(...args)
        .then((response: any) => isMounted() && setValue(response))
        .finally(() => isMounted() && setPending(false));
    },
    [fn, isMounted]
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
