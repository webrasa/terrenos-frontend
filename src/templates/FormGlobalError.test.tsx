import { render, screen } from '@testing-library/react';

import { FormGlobalError } from './FormGlobalError';

describe('FormGlobalError', () => {
  describe('render method', () => {
    it("should return null when there isn't any error", () => {
      const { container } = render(<FormGlobalError error={null} />);

      expect(container).toBeEmptyDOMElement();
    });

    it('should return the default error message', () => {
      render(<FormGlobalError error="RANDOM_ERROR_MESSAGE" />);

      const errorMessage = screen.queryByText(
        'Unexpected error occurred, please try again',
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("should return a message when the member ID doesn't exist", () => {
      render(<FormGlobalError error="incorrect_member_id" />);

      const errorMessage = screen.queryByText(
        "You can't perform this action, the member doesn't exist",
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
