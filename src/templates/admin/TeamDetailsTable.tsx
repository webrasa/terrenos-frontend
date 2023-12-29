import { DetailTable } from '@/table/DetailTable';
import type { IAdminMemberList } from '@/types/Admin';
import { MemberRoleLabel, MemberStatusLabel } from '@/types/IMember';

type ITeamListTableProps = {
  memberList: IAdminMemberList;
};

const TeamDetailsTable = (props: ITeamListTableProps) => (
  <DetailTable
    title={`Team Members - ${props.memberList.name}`}
    head={
      <tr>
        <th className="w-1/6">ID</th>
        <th>Email</th>
        <th className="w-20 md:w-40">Role</th>
        <th className="w-20 md:w-40">Status</th>
        <th className="w-20 md:w-52">Action</th>
      </tr>
    }
  >
    {props.memberList.memberList.map((elt) => (
      <tr key={elt.memberId}>
        <td>{elt.memberId}</td>
        <td className="font-semibold text-gray-800">{elt.email}</td>
        <td>{MemberRoleLabel[elt.role]}</td>
        <td>{MemberStatusLabel[elt.status]}</td>
        <td>
          <a href={`mailto:${elt.email}`}>Contact</a>
        </td>
      </tr>
    ))}
  </DetailTable>
);

export { TeamDetailsTable };
