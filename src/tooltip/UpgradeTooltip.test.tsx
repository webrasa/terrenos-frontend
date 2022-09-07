import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UpgradeTooltip } from './UpgradeTooltip';

describe('UpgradeTooltip', () => {
  describe('Render method', () => {
    it('should render the children', () => {
      render(
        <UpgradeTooltip>
          <>Random text</>
        </UpgradeTooltip>
      );

      const children = screen.queryByText('Random text');
      expect(children).toBeInTheDocument();
    });

    it('should hide tooltip label when setting `hideLabel` true', async () => {
      render(
        <UpgradeTooltip hideLabel={true}>
          <>Random text</>
        </UpgradeTooltip>
      );

      const children = screen.getByText('Random text');
      await userEvent.hover(children);

      const label = screen.queryByRole('tooltip');
      expect(label).not.toBeInTheDocument();
    });
  });
});
