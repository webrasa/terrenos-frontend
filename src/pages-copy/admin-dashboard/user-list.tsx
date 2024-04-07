import { usePaginationToken } from '@/hooks/UsePaginationToken';
import { getAdminShell } from '@/layouts/AdminShell';
import { Section } from '@/layouts/Section';
import { EditableUserList } from '@/templates/admin/EditableUserList';
import type { IUserList } from '@/types/Admin';

const UserList = () => {
  const {
    data,
    prevTokenList,
    currentUrl,
    handleNextPage,
    handlePreviousPage,
  } = usePaginationToken<IUserList>('/super-admin/list-users');

  if (!data) {
    return null;
  }

  return (
    <>
      <Section>
        <EditableUserList
          data={data}
          prevTokenList={prevTokenList}
          currentUrl={currentUrl}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </Section>
    </>
  );
};

UserList.getLayout = getAdminShell('User List');

export default UserList;
