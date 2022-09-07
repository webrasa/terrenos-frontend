import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  describe('Render method', () => {
    it('should render the children', async () => {
      render(
        <Tooltip label="Random label">
          <>Random text</>
        </Tooltip>
      );

      const children = screen.queryByText('Random text');
      expect(children).toBeInTheDocument();

      const label = screen.queryByText('Random label');
      expect(label).not.toBeInTheDocument();
    });

    it('should show tooltip label when hovering the children', async () => {
      render(
        <Tooltip label="Random label">
          <>Random text</>
        </Tooltip>
      );

      const children = screen.getByText('Random text');
      await userEvent.hover(children);

      const label = screen.queryByRole('tooltip', { name: 'Random label' });
      expect(label).toBeInTheDocument();
    });

    it('should show tooltip label when focusing the children', async () => {
      render(
        <Tooltip label="Random label">
          <>Random text</>
        </Tooltip>
      );

      const children = screen.getByText('Random text');
      await userEvent.click(children);

      const label = screen.queryByRole('tooltip', { name: 'Random label' });
      expect(label).toBeInTheDocument();
    });

    it('should hide tooltip label when setting `hideLabel` false', async () => {
      render(
        <Tooltip label="Random label" hideLabel={true}>
          <>Random text</>
        </Tooltip>
      );

      const children = screen.getByText('Random text');
      await userEvent.hover(children);

      const label = screen.queryByRole('tooltip', { name: 'Random label' });
      expect(label).not.toBeInTheDocument();
    });
  });
});
