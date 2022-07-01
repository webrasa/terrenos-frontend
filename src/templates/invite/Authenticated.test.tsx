import { waitFor } from '@testing-library/react';

import { authProviderRender } from '@/utils/TestUtils';

import { Authenticated } from './Authenticated';

describe('Authenticated', () => {
  describe('Render method', () => {
    it('should start by returning null before reaching the endpoint', async () => {
      const { container } = authProviderRender(<Authenticated />);

      await waitFor(() => {
        expect(container).toBeEmptyDOMElement();
      });
    });
  });
});
