import { StatsCard } from '@/stats/StatsCard';

export type IStats = {
  estimatedTotalUsers: string;
  customers: string;
  mrr: string;
  totalRevenue: string;
  revenue: {
    date: string;
    value: string;
  }[];
};

const Stats = (props: IStats) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
    <StatsCard
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" />
        </svg>
      }
      text="Estimated Total Users"
    >
      {props.estimatedTotalUsers}
    </StatsCard>
    <StatsCard
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="m3 17 6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      }
      text="Customers"
    >
      {props.customers}
    </StatsCard>
    <StatsCard
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path d="M0 0h24v24H0z" stroke="none" />
          <rect x="7" y="9" width="14" height="10" rx="2" />
          <circle cx="14" cy="14" r="2" />
          <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" />
        </svg>
      }
      text="MRR"
    >
      ${props.mrr}
    </StatsCard>
    <StatsCard
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M18 16v2a1 1 0 0 1-1 1H6l6-7-6-7h11a1 1 0 0 1 1 1v2" />
        </svg>
      }
      text="Total Revenue"
    >
      ${props.totalRevenue}
    </StatsCard>
  </div>
);

export { Stats };
