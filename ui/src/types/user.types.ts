import { UseFormGetValues, UseFormRegister } from 'react-hook-form';

export type UserEditorFields = {
  fullName: string;
  email: string;
  password: string;
  currentPassword: string;
  newPassword: string;
  _id: string;
};

export type UserEditorProps = {
  onSubmit: (e: UserEditorFields) => void;
  register: UseFormRegister<UserEditorFields>;
  getFormValues: UseFormGetValues<UserEditorFields>;
  onClickEdit: () => void;
  onClickChange: () => void;
  user?: UserEditorFields;
  _doc?: UserEditorFields;
  token?: string;
};

export type otherProfileProps = Omit<UserEditorProps, 'onClickEdit' | 'onClickChange'> & {
  open: boolean;
  handleClose: () => void;
};
