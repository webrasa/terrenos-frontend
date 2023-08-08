import { API } from 'aws-amplify';
import Link from 'next/link';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { mutate } from 'swr';

import { Button } from '@/button/Button';
import { ConfirmDialog } from '@/dialog/ConfirmDialog';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { DetailTable } from '@/table/DetailTable';
import { MemberRole } from '@/types/IMember';
import type { ITodo } from '@/types/ITodo';
import { requiredRoles } from '@/utils/Auth';
import { setExceptionToFormGlobal } from '@/utils/Forms';

type ITableProps = {
  list: ITodo[];
  role: MemberRole;
};

/**
 * A detailed table to display Todo.
 * @component
 */
const Table = (props: ITableProps) => {
  const { currentTeam } = useAuth();
  const [openDialogId, setOpenDialogId] = useState('');
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const handleOpenDialog = (id: string) => {
    setOpenDialogId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialogId('');
  };

  const deleteAsync = useAsync(async (openId: string) => {
    try {
      await API.del('backend', `/${currentTeam.id}/todo/${openId}`, {});

      await mutate(`/${currentTeam.id}/todo/list`);

      handleCloseDialog();
    } catch (err) {
      setExceptionToFormGlobal(setFormGlobalError, err);
    }
  });

  const handleDelete: MouseEventHandler = async (event) => {
    event.preventDefault();
    await deleteAsync.execute(openDialogId);
  };

  return (
    <>
      <DetailTable
        title="Todo listing"
        head={
          <tr>
            <th>Title</th>
            {requiredRoles(
              [MemberRole.OWNER, MemberRole.ADMIN],
              props.role,
            ) && <th className="w-20 sm:w-60">Action</th>}
          </tr>
        }
        buttons={
          <>
            {requiredRoles(
              [MemberRole.OWNER, MemberRole.ADMIN],
              props.role,
            ) && (
              <Link href="/dashboard/add-todo">
                <Button sm>New Todo</Button>
              </Link>
            )}
          </>
        }
      >
        {props.list.map((elt) => (
          <tr key={elt.id}>
            <td className="font-semibold text-gray-800">{elt.title}</td>
            {requiredRoles(
              [MemberRole.OWNER, MemberRole.ADMIN],
              props.role,
            ) && (
              <td>
                <Link href={`/dashboard/edit-todo/${elt.id}`}>Edit</Link>
                <button type="button" onClick={() => handleOpenDialog(elt.id)}>
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </DetailTable>

      <ConfirmDialog
        show={openDialogId !== ''}
        title="Your title here"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu consectetur purus. In laoreet tincidunt libero vitae sagittis."
        handleCancel={handleCloseDialog}
        formGlobalError={formGlobalError}
        button={
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteAsync.pending}
          >
            <Button sm red loading={deleteAsync.pending}>
              Delete
            </Button>
          </button>
        }
      />
    </>
  );
};

export { Table };
