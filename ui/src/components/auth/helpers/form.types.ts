type LoginFormFields = {
  email: string;
  password: string;
};

type RegisterFormFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RecoverPasswordFields = {
  email: string;
};

type ResetPasswordFields = {
  password: string;
  confirmPassword: string;
};

export type { LoginFormFields, RegisterFormFields, RecoverPasswordFields, ResetPasswordFields };
