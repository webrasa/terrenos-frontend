import { act, renderHook, waitFor } from '@testing-library/react';

import { useAsync } from './UseAsync';

describe('UseAsync', () => {
  describe('Render hook', () => {
    it("shouldn't trigger the callback or return any value at initialization", () => {
      const fn = jest.fn();
      const { result } = renderHook(() => useAsync(fn));

      expect(result.current.pending).toBeFalsy();
      expect(result.current.value).toBeNull();
    });

    it('should force the trigger of the callback and update the hook state', async () => {
      const fn = async () => {
        return 'RANDOM_RETURNED_VALUE';
      };
      const { result } = renderHook(() => useAsync(fn));

      act(() => {
        result.current.execute();
      });

      expect(result.current.pending).toBeTruthy();

      await waitFor(() => {
        expect(result.current.value).toEqual('RANDOM_RETURNED_VALUE');
      });
    });
  });
});
