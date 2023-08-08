import { render, screen } from '@testing-library/react';

import { DisableableLink } from './DisableableLink';

describe('DisableableLink', () => {
  describe('Render method', () => {
    it('should render the link by default', async () => {
      render(<DisableableLink href="/">Homepage</DisableableLink>);

      const link = screen.queryByRole('link', {
        name: 'Homepage',
      });
      expect(link).toBeInTheDocument();
    });

    it('should disable the link and make it not clickable', async () => {
      render(
        <DisableableLink href="/" disabled>
          Homepage
        </DisableableLink>,
      );

      const button = screen.queryByRole('button', {
        name: 'Homepage',
      });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});
