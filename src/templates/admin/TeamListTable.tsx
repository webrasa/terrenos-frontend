import Link from 'next/link';

import { DetailTable } from '@/table/DetailTable';
import type { ITeam } from '@/types/Admin';

type ITeamListTableProps = {
  teamList: ITeam[];
};

const TeamListTable = (props: ITeamListTableProps) => (
  <DetailTable
    head={
      <tr>
        <th className="w-1/6">ID</th>
        <th className="w-3/6">Name</th>
        <th className="w-1/6">Subscription</th>
        <th className="w-1/6">Action</th>
      </tr>
    }
  >
    {props.teamList.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td className="font-semibold text-gray-800">{user.displayName}</td>
        <td>{user.planName}</td>
        <td>
          <Link href={`/admin-dashboard/team/${user.id}`}>Details</Link>
        </td>
      </tr>
    ))}
  </DetailTable>
);

export { TeamListTable };
