import { DetailTable } from '@/table/DetailTable';
import type { IUser } from '@/types/Admin';

type IUserListTableProps = {
  userList: IUser[];
  handleOpenDialog: (user: IUser) => void;
};

const UserListTable = (props: IUserListTableProps) => (
  <DetailTable
    head={
      <tr>
        <th className="w-1/6">Username</th>
        <th className="w-2/6">Email</th>
        <th className="w-1/6">Create date</th>
        <th className="w-1/6">Status</th>
        <th className="w-1/6">Action</th>
      </tr>
    }
  >
    {props.userList.map((user) => (
      <tr key={user.username}>
        <td className="font-semibold text-gray-800">{user.username}</td>
        <td>{user.email}</td>
        <td>{user.createDate}</td>
        <td>{user.enabled ? 'Enabled' : 'Disabled'}</td>
        <td>
          <a href={`mailto:${user.email}`}>Contact</a>

          <button onClick={() => props.handleOpenDialog(user)}>
            {user.enabled ? 'Disable' : 'Enable'}
          </button>
        </td>
      </tr>
    ))}
  </DetailTable>
);

export { UserListTable };
