type RegisterFormFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginFormFields = Omit<RegisterFormFields, 'fullName' | 'confirmPassword'>;

type RecoverPasswordFields = Omit<LoginFormFields, 'password'>;

type ResetPasswordFields = Omit<RegisterFormFields, 'fullName' | 'email'>;

export type { LoginFormFields, RegisterFormFields, RecoverPasswordFields, ResetPasswordFields };
