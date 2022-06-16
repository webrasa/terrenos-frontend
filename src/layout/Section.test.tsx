import { render, screen } from '@testing-library/react';

import { Section } from './Section';

describe('Section', () => {
  describe('Render method', () => {
    it('should render children without props', async () => {
      render(<Section>Children</Section>);

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });

    it('should always render children even if the title is defined', () => {
      render(<Section title="Random title">Children</Section>);

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });

    it('should always render children even if the description is defined', () => {
      render(<Section description="Random description">Children</Section>);

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });

    it('should always render children even if the title and description are both defined', () => {
      render(
        <Section title="Random title" description="Random description">
          Children
        </Section>
      );

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });
  });
});
