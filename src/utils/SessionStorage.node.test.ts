/**
 * @jest-environment node
 */

import { getSessionStorage } from './SessionStorage';

describe('SessionStorage in node.js (server) environment', () => {
  describe('Get from Session storage', () => {
    it("should return an empty string in server side, sessionStorage doesn't work on server", () => {
      const value = getSessionStorage('Random item');

      expect(value).toEqual('');
    });
  });
});
