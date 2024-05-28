import * as React from 'react';

type ITablePropertyProps = {
  country: string;
};

export default function VerticalTable(props: ITablePropertyProps) {
  return (
    <div className="w-full">
      <div className="mb-2 columns-2">
        <div className=" w-full bg-gray-200 p-2 text-left font-medium text-black">
          Country
        </div>
        <div className="w-full p-2 ">Portugal</div>
      </div>
      <div className="mb-2 columns-2">
        <div className=" w-full bg-gray-200 p-2 text-left font-medium text-black">
          Country
        </div>
        <div className="w-full p-2 ">Portugal</div>
      </div>
    </div>
  );
}
