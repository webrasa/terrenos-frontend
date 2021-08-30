type IUsageStatsProps = {
  title: string;
  count: number;
  limit: string;
};

/**
 * Helps the user to know his current usage of the SaaS products and know the limit.
 * @component
 * @params props - Component props.
 * @param props.title - Usage Stats title to display.
 * @param props.count - Current usage.
 * @param props.limit - Usage limit.
 */
const UsageStats = (props: IUsageStatsProps) => (
  <div>
    <div className="text-xl font-medium">{props.title}</div>
    <div className="text-xl font-bold text-gray-900">{props.count}</div>
    <div className="text-sm">{props.limit}</div>
  </div>
);

export { UsageStats };
