import { render, screen } from '@testing-library/react';

import { LandingSection } from './LandingSection';

describe('LandingSection', () => {
  describe('Render method', () => {
    it('should render children without props', async () => {
      render(<LandingSection>Children</LandingSection>);

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });

    it('should always render children even if the title is defined', () => {
      render(<LandingSection title="Random title">Children</LandingSection>);

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });

    it('should always render children even if the subtitle is defined', () => {
      render(
        <LandingSection subtitle="Random subtitle">Children</LandingSection>,
      );

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });

    it('should always render children even if the description is defined', () => {
      render(
        <LandingSection description="Random description">
          Children
        </LandingSection>,
      );

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });

    it('should always render children even if the title, subtitle and description are defined', () => {
      render(
        <LandingSection
          title="Random title"
          subtitle="Random subtitle"
          description="Random description"
        >
          Children
        </LandingSection>,
      );

      const children = screen.queryByText('Children');

      expect(children).toBeInTheDocument();
    });
  });
});
