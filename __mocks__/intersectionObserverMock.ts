// Need this mock to avoid warning/error with IntersectionObserver: https://stackoverflow.com/questions/57008341/jest-testing-react-component-with-react-intersection-observer
export const intersectionObserverMock = () => ({
  observe: jest.fn(),

  disconnect: jest.fn(),

  unobserve: jest.fn(),
});

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

window.ResizeObserver = jest.fn().mockImplementation(intersectionObserverMock);
