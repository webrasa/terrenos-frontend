export const mockUseRouterPush = jest.fn();

export const mockQuery = jest.fn();

export const mockIsReady = jest.fn();

export const mockReload = jest.fn();

export const useRouter = () => ({
  push: mockUseRouterPush,
  reload: mockReload,
  get query() {
    return mockQuery();
  },
  get isReady() {
    return mockIsReady();
  },
});
