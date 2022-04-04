import { MouseEventHandler, useState } from 'react';

import { API } from 'aws-amplify';
import Link from 'next/link';
import { mutate } from 'swr';

import { Button } from '../button/Button';
import { ConfirmDialog } from '../dialog/ConfirmDialog';
import { useAsync } from '../hooks/UseAsync';
import { useAuth } from '../hooks/UseAuth';
import { DetailTable } from '../table/DetailTable';
import { ITodo } from '../types/ITodo';

type ITableProps = {
  list: ITodo[];
};

const Table = (props: ITableProps) => {
  const { currentTeam } = useAuth();
  const [openDialogId, setOpenDialogId] = useState('');

  const handleOpenDialog = (id: string) => {
    setOpenDialogId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialogId('');
  };

  const deleteAsync = useAsync(async (openId: string) => {
    await API.del('backend', `/${currentTeam.id}/todo/${openId}`, {});

    await mutate(`/${currentTeam.id}/todo/list`);

    handleCloseDialog();
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
            <th className="w-60">Action</th>
          </tr>
        }
        buttons={
          <>
            <Link href="/dashboard/add-todo">
              <a>
                <Button sm>New Todo</Button>
              </a>
            </Link>
          </>
        }
      >
        {props.list.map((elt) => (
          <tr key={elt.id}>
            <td>{elt.title}</td>
            <td>
              <Link href={`/dashboard/edit-todo/${elt.id}`}>
                <a>Edit</a>
              </Link>
              <button type="button" onClick={() => handleOpenDialog(elt.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </DetailTable>

      <ConfirmDialog
        show={openDialogId !== ''}
        title="Your title here"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu consectetur purus. In laoreet tincidunt libero vitae sagittis."
        handleCancel={handleCloseDialog}
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
