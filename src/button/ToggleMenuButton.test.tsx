import { fireEvent, render, screen } from '@testing-library/react';

import { ToggleMenuButton } from './ToggleMenuButton';

describe('ToggleMenuButton', () => {
  describe('onClick props', () => {
    it('should call the callback when the user click on the button', () => {
      const handler = jest.fn();

      render(<ToggleMenuButton onClick={handler} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handler).toHaveBeenCalled();
    });
  });
});
