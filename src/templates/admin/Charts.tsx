import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/chart/ChartCard';

type ICharts = {
  revenue: {
    date: string;
    value: string;
  }[];
};

const Charts = (props: ICharts) => (
  <ChartCard title="Revenue (random)">
    <AreaChart
      data={props.revenue.map((elt) => ({
        date: new Date(elt.date).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
        value: elt.value,
      }))}
    >
      <XAxis dataKey="date" tickLine={false} axisLine={false} dy={5} />
      <YAxis tickLine={false} axisLine={false} />
      <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="value"
        name="Revenue"
        strokeWidth={5}
        stroke="#ED8936"
        fill="#ED8936"
        fillOpacity={0.25}
      />
    </AreaChart>
  </ChartCard>
);

export { Charts };
