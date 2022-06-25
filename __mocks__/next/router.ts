export const mockUseRouterPush = jest.fn();

export const useRouter = () => ({
  push: mockUseRouterPush,
});
