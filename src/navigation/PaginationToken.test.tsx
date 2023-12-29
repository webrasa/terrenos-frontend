import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PaginationToken } from './PaginationToken';

describe('PaginationToken', () => {
  describe('Render method', () => {
    it('should disable the next button when paginationToken is not defined', async () => {
      const handleNextPage = jest.fn();

      render(
        <PaginationToken
          prevTokenList={[]}
          handleNextPage={handleNextPage}
          handlePreviousPage={() => {}}
        />,
      );

      const nextButton = screen.getByRole('button', { name: 'Next' });
      await userEvent.click(nextButton);

      expect(handleNextPage).not.toHaveBeenCalled();
    });

    it('should able to click the next button when paginationToken is defined', async () => {
      const handleNextPage = jest.fn();

      render(
        <PaginationToken
          paginationToken="token"
          prevTokenList={[]}
          handleNextPage={handleNextPage}
          handlePreviousPage={() => {}}
        />,
      );

      const nextButton = screen.getByRole('button', { name: 'Next' });
      await userEvent.click(nextButton);

      expect(handleNextPage).toHaveBeenCalled();
    });

    it('should disable the previous button when prevTokenList is emptied', async () => {
      const handlePreviousPage = jest.fn();

      render(
        <PaginationToken
          prevTokenList={[]}
          handleNextPage={() => {}}
          handlePreviousPage={handlePreviousPage}
        />,
      );

      const previousButton = screen.getByRole('button', { name: 'Previous' });
      await userEvent.click(previousButton);

      expect(handlePreviousPage).not.toHaveBeenCalled();
    });

    it('should able to click the previous button when paginationToken contains tokens', async () => {
      const handlePreviousPage = jest.fn();

      render(
        <PaginationToken
          prevTokenList={['token1', 'token2']}
          handleNextPage={() => {}}
          handlePreviousPage={handlePreviousPage}
        />,
      );

      const previousButton = screen.getByRole('button', { name: 'Previous' });
      await userEvent.click(previousButton);

      expect(handlePreviousPage).toHaveBeenCalled();
    });
  });
});
