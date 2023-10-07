type CredentialsSchema = {
  email: string;
  password: string;
};

type GooglePayloadSchema = {
  email: string;
  fullName: string;
};

export { CredentialsSchema, GooglePayloadSchema };
