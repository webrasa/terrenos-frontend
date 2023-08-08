import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DisabledTooltip } from './DisabledTooltip';

describe('DisabledTooltip', () => {
  describe('Render method', () => {
    it('should render the children', () => {
      render(
        <DisabledTooltip label="Random label">
          <>Random text</>
        </DisabledTooltip>,
      );

      const children = screen.queryByText('Random text');
      expect(children).toBeInTheDocument();
    });

    it('should hide tooltip label when setting `hideLabel` true', async () => {
      render(
        <DisabledTooltip label="Random label" hideLabel={true}>
          <>Random text</>
        </DisabledTooltip>,
      );

      const children = screen.getByText('Random text');
      await userEvent.hover(children);

      const label = screen.queryByRole('tooltip');
      expect(label).not.toBeInTheDocument();
    });
  });
});
