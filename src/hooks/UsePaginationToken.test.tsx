import { mockIsReady } from '__mocks__/next/router';
import { act, renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import type { SetupServerApi } from 'msw/node';
import { setupServer } from 'msw/node';
import type { ReactNode } from 'react';
import { SWRConfig } from 'swr';

import { fetcher } from '@/utils/TestUtils.test';

import { usePaginationToken } from './UsePaginationToken';

type ISwrConfigProps = {
  children: ReactNode;
};

const swrConfigWrapper = (props: ISwrConfigProps) => (
  <SWRConfig
    value={{
      provider: () => new Map(),
      fetcher,
      dedupingInterval: 0,
    }}
  >
    {props.children}
  </SWRConfig>
);

const setServer = (server: SetupServerApi) => {
  server.use(
    rest.get('/url', (_req, res, ctx) => {
      return res(
        ctx.json({
          paginationToken: 'nextToken',
        }),
      );
    }),
  );
};

describe('UsePaginationToken', () => {
  const server = setupServer();

  beforeAll(() => server.listen());

  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
  });

  describe('Render Hook', () => {
    it('should able to get the previous page without error with a empty list', async () => {
      mockIsReady.mockReturnValue(true);
      setServer(server);
      const { result } = renderHook(() => usePaginationToken('/url'), {
        wrapper: swrConfigWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).not.toBeUndefined();
      });

      act(() => {
        result.current.handlePreviousPage();
      });
      expect(result.current.prevTokenList).toEqual([]);
    });

    it('should able to navigate to the next pages and navigate back', async () => {
      mockIsReady.mockReturnValue(true);
      setServer(server);

      const { result } = renderHook(() => usePaginationToken('/url'), {
        wrapper: swrConfigWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).not.toBeUndefined();
      });
      expect(result.current.currentUrl).toEqual('/url');

      act(() => {
        result.current.handleNextPage();
      });
      expect(result.current.currentUrl).toEqual(
        '/url?paginationToken=nextToken',
      );
      expect(result.current.prevTokenList).toEqual([undefined]);

      act(() => {
        result.current.handleNextPage();
      });
      expect(result.current.prevTokenList).toEqual([undefined, 'nextToken']);

      act(() => {
        result.current.handlePreviousPage();
      });
      expect(result.current.prevTokenList).toEqual([undefined]);

      act(() => {
        result.current.handlePreviousPage();
      });
      expect(result.current.currentUrl).toEqual('/url');
      expect(result.current.prevTokenList).toEqual([]);
    });
  });
});
