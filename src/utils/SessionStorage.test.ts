import { getSessionStorage } from './SessionStorage';

describe('SessionStorage in browser environment', () => {
  describe('Get from Session storage', () => {
    it("should call sessionStorage when it's in browser and return an empty string when it isn't in the storage", () => {
      const mockGetItem = jest.fn();

      // Object.getPrototypeOf is the modern way of __proto__
      Object.getPrototypeOf(window.sessionStorage).getItem = mockGetItem;

      const value = getSessionStorage('Random item');

      expect(mockGetItem).toBeCalled();
      expect(mockGetItem.mock.calls[0][0]).toEqual('Random item');
      expect(value).toEqual('');
    });

    it("should call sessionStorage when it's in browser and return the value inside the storage", () => {
      const mockGetItem = jest.fn(() => 'Random value');

      // Object.getPrototypeOf is the modern way of __proto__
      Object.getPrototypeOf(window.sessionStorage).getItem = mockGetItem;

      const value = getSessionStorage('Random item');

      expect(value).toEqual('Random value');
    });
  });
});
