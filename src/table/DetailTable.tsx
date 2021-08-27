import { ReactNode } from 'react';

type IDetailTableProps = {
  title: string;
  head: ReactNode;
  buttons: ReactNode;
  children: ReactNode;
};

const DetailTable = (props: IDetailTableProps) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="text-lg font-semibold text-gray-800">{props.title}</div>

      <div className="flex space-x-2">{props.buttons}</div>
    </div>

    {/*
     * Border style applied to div and not to table.
     * Border style don't work with table.
     */}
    <div className="mt-5 border border-gray-200 rounded-xl overflow-auto">
      <table className="min-w-full mx-auto text-left whitespace-nowrap overflow-auto">
        <thead className="bg-gray-100 border-b border-gray-300">
          {props.head}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.children}
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

        table :global(tbody td:first-child) {
          @apply text-gray-800 font-semibold;
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

export { DetailTable };
