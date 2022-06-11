import { render } from '@testing-library/react';

import { ToggleMenuButton } from './ToggleMenuButton';

describe('TogglemenuButton', () => {
  describe('onClick props', () => {
    it('should call the callback', () => {
      const handler = jest.fn();

      render(<ToggleMenuButton onClick={handler} />);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
