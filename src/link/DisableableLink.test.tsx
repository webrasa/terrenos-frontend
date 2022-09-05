import { render, screen } from '@testing-library/react';

import { DisableableLink } from './DisableableLink';

describe('DisableableLink', () => {
  describe('Render method', () => {
    it('should', async () => {
      render(<DisableableLink href="/">Homepage</DisableableLink>);

      const link = screen.queryByRole('link', {
        name: 'Homepage',
      });
      expect(link).toBeInTheDocument();
    });
  });
});
