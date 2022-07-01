export const mockUseRouterPush = jest.fn();

export const mockQuery = jest.fn();

export const mockIsReady = jest.fn();

export const useRouter = () => ({
  push: mockUseRouterPush,
  get query() {
    return mockQuery();
  },
  get isReady() {
    return mockIsReady();
  },
});
