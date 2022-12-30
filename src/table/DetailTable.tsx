import type { ReactNode } from 'react';

type IDetailTableProps = {
  title: string;
  head: ReactNode;
  emptyDataText?: string;
  buttons?: ReactNode;
  children: ReactNode;
};

/**
 * A table component to display data with all the detailed information.
 * @component
 * @params props - Component props.
 * @param props.title - Table title to display.
 * @param props.head - Table head elements.
 * @param props.buttons - Table action buttons.
 * @param props.children - Children components, table body elements.
 */
const DetailTable = (props: IDetailTableProps) => {
  let children = null;

  if (Array.isArray(props.children) && props.children.length === 0) {
    const ALL_COL_SPAN = 10000; // An arbitrary large number to cover the entire line

    children = (
      <tr>
        <td colSpan={ALL_COL_SPAN} className="text-sm italic">
          {props.emptyDataText ?? 'No data to display'}
        </td>
      </tr>
    );
  } else {
    children = props.children;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">{props.title}</div>

        <div className="flex space-x-2">{props.buttons}</div>
      </div>

      {/*
       * Border style applied to div and not to table.
       * Border style don't work with table.
       */}
      <div className="mt-5 overflow-auto rounded-xl border border-gray-200">
        <table className="mx-auto min-w-full overflow-auto whitespace-nowrap text-left">
          <thead className="border-b border-gray-300 bg-gray-100">
            {props.head}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {children}
          </tbody>
        </table>
      </div>

      {/*
       * Space between does not work in style jsx, so need to use :not(:first-child)
       */}
      <style jsx>
        {`
          table :global(thead th),
          table :global(tbody td) {
            @apply px-6 py-5;
          }

          table :global(a),
          table :global(button) {
            @apply text-primary-500;
          }

          table :global(a:hover),
          table :global(button:hover) {
            @apply text-primary-600;
          }

          table :global(tbody td > *:not(:first-child)) {
            @apply ml-2;
          }
        `}
      </style>
    </div>
  );
};

export { DetailTable };
