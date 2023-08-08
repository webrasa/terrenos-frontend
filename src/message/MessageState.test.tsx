import { render, screen } from '@testing-library/react';

import { MessageState } from './MessageState';

describe('MessageState', () => {
  describe('Render method', () => {
    it('should render the message state when there is no children as parameter', async () => {
      render(
        <MessageState
          title="Random title"
          description="Long random description"
          cta={<div>CTA</div>}
        />,
      );

      const title = screen.queryByText('Random title');
      expect(title).toBeInTheDocument();

      const description = screen.queryByText('Long random description');
      expect(description).toBeInTheDocument();

      const cta = screen.queryByText('CTA');
      expect(cta).toBeInTheDocument();
    });

    it('should always display the message state even if shouldDisplay returns false when there is no children', () => {
      render(
        <MessageState
          title="Random title"
          description="Long random description"
          cta={<div>CTA</div>}
          shouldDisplay={() => false}
        />,
      );

      const title = screen.queryByText('Random title');
      expect(title).toBeInTheDocument();
    });

    it('should display the message state when shouldDisplay returns true and there is a children', () => {
      render(
        <MessageState
          title="Random title"
          description="Long random description"
          cta={<div>CTA</div>}
          shouldDisplay={() => true}
        >
          <>Children</>
        </MessageState>,
      );

      const title = screen.queryByText('Random title');
      expect(title).toBeInTheDocument();
    });

    it('should render the children when shouldDisplay is undefined', () => {
      render(
        <MessageState
          title="Random title"
          description="Long random description"
          cta={<div>CTA</div>}
        >
          <>Children</>
        </MessageState>,
      );

      const children = screen.queryByText('Children');
      expect(children).toBeInTheDocument();
    });

    it('should render the children when shouldDisplay returns false', () => {
      render(
        <MessageState
          title="Random title"
          description="Long random description"
          cta={<div>CTA</div>}
          shouldDisplay={() => false}
        >
          <>Children</>
        </MessageState>,
      );

      const children = screen.queryByText('Children');
      expect(children).toBeInTheDocument();
    });
  });
});
