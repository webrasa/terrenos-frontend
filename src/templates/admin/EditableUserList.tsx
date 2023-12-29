import { API } from 'aws-amplify';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { mutate } from 'swr';

import { Button } from '@/button/Button';
import { ConfirmDialog } from '@/dialog/ConfirmDialog';
import { useAsync } from '@/hooks/UseAsync';
import { PaginationToken } from '@/navigation/PaginationToken';
import type { IUser, IUserList } from '@/types/Admin';
import { setExceptionToFormGlobal } from '@/utils/Forms';

import { UserListTable } from './UserListTable';

type IUserListProps = {
  data: IUserList;
  prevTokenList: Array<string | undefined>;
  currentUrl: string;
  handleNextPage: MouseEventHandler;
  handlePreviousPage: MouseEventHandler;
};

const EditableUserList = (props: IUserListProps) => {
  const [dialogUsername, setDialogUsername] = useState<IUser | null>(null);
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const handleOpenDialog = (user: IUser) => {
    setDialogUsername(user);
  };

  const handleCloseDialog = () => {
    setDialogUsername(null);
  };

  const editUserStatusAsync = useAsync(async (user: IUser | null) => {
    if (user === null) {
      throw new Error(
        'The dialog should only appears when the user selects one user to enable/disable',
      );
    }

    try {
      await API.put('backend', `/super-admin/user-status/${user.username}`, {
        body: {
          enabled: !user.enabled,
        },
      });

      await mutate(props.currentUrl);

      handleCloseDialog();
    } catch (err) {
      setExceptionToFormGlobal(setFormGlobalError, err);
    }
  });

  const handleEditUserStatus: MouseEventHandler = async (event) => {
    event.preventDefault();
    await editUserStatusAsync.execute(dialogUsername);
  };

  return (
    <>
      <UserListTable
        userList={props.data.userList}
        handleOpenDialog={handleOpenDialog}
      />

      <PaginationToken
        paginationToken={props.data.paginationToken}
        prevTokenList={props.prevTokenList}
        handleNextPage={props.handleNextPage}
        handlePreviousPage={props.handlePreviousPage}
      />

      <ConfirmDialog
        show={dialogUsername !== null}
        title={dialogUsername?.enabled ? 'Disable User' : 'Enable User'}
        description={
          dialogUsername?.enabled
            ? 'Disable user to restrict login access. This action can be undone.'
            : 'Enable user to grant login access. This action can be undone.'
        }
        handleCancel={handleCloseDialog}
        formGlobalError={formGlobalError}
        button={
          <button
            type="button"
            onClick={handleEditUserStatus}
            disabled={editUserStatusAsync.pending}
          >
            <Button sm red loading={editUserStatusAsync.pending}>
              {dialogUsername?.enabled ? 'Disable' : 'Enable'}
            </Button>
          </button>
        }
      />
    </>
  );
};

export { EditableUserList };
