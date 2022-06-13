import { render, screen } from '@testing-library/react';

import { FooterTwoRowsCopyright } from './FooterTwoRowsCopyright';

describe('FooterTwoRowsCopyright', () => {
  describe('Render', () => {
    it('should render with the copyright text', async () => {
      render(
        <FooterTwoRowsCopyright
          siteName="Random name"
          iconList={null}
          verticalLinks={null}
        >
          Random children
        </FooterTwoRowsCopyright>
      );

      const copyrightText = screen.getByText(
        /© Copyright.*All Rights Reserved./
      );

      expect(copyrightText).toBeInTheDocument();
    });
  });
});
