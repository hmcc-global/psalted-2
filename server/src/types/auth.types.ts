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
  expireAt?: Date;
  isUsed?: boolean;
};

type ResetPwdTokenDocument = ResetPwdTokenSchema & MongoInjectedFields;

export { CredentialsSchema, GooglePayloadSchema, ResetPwdTokenSchema, ResetPwdTokenDocument };
