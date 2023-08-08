import { render, screen } from '@testing-library/react';

import { DetailTable } from './DetailTable';

describe('DetailTable', () => {
  describe('Render method', () => {
    it('should render children when there is data', () => {
      render(
        <DetailTable
          title="Detail table"
          head={
            <tr>
              <th>Title</th>
            </tr>
          }
        >
          <tr>
            <td>Content</td>
          </tr>
        </DetailTable>,
      );

      const children = screen.queryByText('Content');

      expect(children).toBeInTheDocument();
    });

    it('should render the default no data message', () => {
      render(
        <DetailTable
          title="Detail table"
          head={
            <tr>
              <th>Title</th>
            </tr>
          }
        >
          {[]}
        </DetailTable>,
      );

      const children = screen.queryByText('No data to display');

      expect(children).toBeInTheDocument();
    });

    it('should change the no data message and render it', () => {
      render(
        <DetailTable
          title="Detail table"
          head={
            <tr>
              <th>Title</th>
            </tr>
          }
          emptyDataText={'Empty data text'}
        >
          {[]}
        </DetailTable>,
      );

      const children = screen.queryByText('Empty data text');

      expect(children).toBeInTheDocument();
    });
  });
});
