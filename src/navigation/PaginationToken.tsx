import type { MouseEventHandler } from 'react';

type IPaginationTokenProps = {
  paginationToken?: string;
  prevTokenList: Array<string | undefined>;
  handleNextPage: MouseEventHandler;
  handlePreviousPage: MouseEventHandler;
};

const PaginationToken = (props: IPaginationTokenProps) => (
  <div className="mt-5 flex justify-end gap-x-3 text-sm">
    <button
      className="text-primary-500 hover:enabled:text-primary-600"
      onClick={props.handlePreviousPage}
      disabled={props.prevTokenList.length === 0}
    >
      Previous
    </button>

    <button
      className="text-primary-500 hover:enabled:text-primary-600"
      onClick={props.handleNextPage}
      disabled={!props.paginationToken}
    >
      Next
    </button>
  </div>
);

export { PaginationToken };
