import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormDialog } from '@/dialog/FormDialog';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import type { UserInfoSettingsState } from '@/types/UserInfoSettingsState';

type IEnableMFAForm = {
  code: string;
};

type IEnableMFADialogProps = {
  show: boolean;
  handleDialogState: (displayState: UserInfoSettingsState) => void;
  handleCloseDialog: () => void;
};

const EnableMFADialog = (props: IEnableMFADialogProps) => {
  const { register, handleSubmit } = useForm<IEnableMFAForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const enableMFAAsync = useAsync(async (data: IEnableMFAForm) => {});

  const handleSubmitDialog = handleSubmit(async (data) => {
    await enableMFAAsync.execute(data);
  });

  return (
    <FormDialog
      show={props.show}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={enableMFAAsync.pending}
      error={formGlobalError}
      title="Enable Two-Factor Authentication"
      description=""
    >
      <>
        <Label htmlFor="code">Two-Factor code</Label>
        <FormElement>
          <input id="code" type="text" {...register('code')} />
        </FormElement>
      </>
    </FormDialog>
  );
};

export { EnableMFADialog };
