import { MongoInjectedFields } from './mongo.types';

type CredentialsSchema = {
  email: string;
  password: string;
};

type GooglePayloadSchema = {
  email: string;
  fullName: string;
};

type ResetPwdTokenSchema = {
  email: string;
  token: string;
  expiresAt: number;
  isUsed?: boolean;
};

type ResetPwdTokenDocument = ResetPwdTokenSchema & MongoInjectedFields;

export { CredentialsSchema, GooglePayloadSchema, ResetPwdTokenSchema, ResetPwdTokenDocument };
