import type { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type IChartCardProps = {
  title: string;
  children: ReactElement;
};

const ChartCard = (props: IChartCardProps) => (
  <div className="rounded-md border border-gray-200 bg-white py-4 pr-6">
    <div className="mb-5 pl-5 text-lg font-semibold text-gray-800">
      {props.title}
    </div>

    <ResponsiveContainer height={600}>{props.children}</ResponsiveContainer>
  </div>
);

export { ChartCard };
