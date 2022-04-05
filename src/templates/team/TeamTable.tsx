import Link from 'next/link';

import { Button } from '../../button/Button';
import { DetailTable } from '../../table/DetailTable';
import { IMember } from '../../types/IMember';

type ITeamTableProps = {
  list: IMember[];
};

const TeamTable = (props: ITeamTableProps) => (
  <DetailTable
    title="Team members"
    head={
      <tr>
        <th>Email</th>
        <th className="w-60">Status</th>
        <th className="w-60">Action</th>
      </tr>
    }
    buttons={
      <>
        <Link href="/dashboard/add-todo">
          <a>
            <Button sm>Invite member</Button>
          </a>
        </Link>
      </>
    }
  >
    {props.list.map((elt) => (
      <tr key={elt.userId}>
        <td>{elt.email}</td>
        <td>{elt.status}</td>
        <td>
          <button type="button">Delete</button>
        </td>
      </tr>
    ))}
  </DetailTable>
);

export { TeamTable };
