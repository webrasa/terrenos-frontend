type IUsageStatsProps = {
  title: string;
  count: number;
  limit: string;
};

const UsageStats = (props: IUsageStatsProps) => (
  <div>
    <div className="text-xl font-medium">{props.title}</div>
    <div className="text-xl font-bold text-gray-900">{props.count}</div>
    <div className="text-sm">{props.limit}</div>
  </div>
);

export { UsageStats };
