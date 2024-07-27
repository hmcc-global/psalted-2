import { UseFormRegister } from 'react-hook-form';

export type UserEditorFields = {
  fullName: string;
  email: string;
  password: string;
  currentPassword: string;
  newPassword: string;
  id: string;
};

export type UserEditorProps = {
  onBack: () => void;
  onSubmit: () => void;
  register: UseFormRegister<UserEditorFields>;
  onClickEdit: () => void;
  onClickChange: () => void;
  user?: UserEditorFields;
  _doc?: UserEditorFields;
  token?: string;
};

export type HomeProfileProps = Omit<UserEditorProps, 'onSubmit'>;

export type otherProfileProps = Omit<UserEditorProps, 'onClickEdit' | 'onClickChange'>;
