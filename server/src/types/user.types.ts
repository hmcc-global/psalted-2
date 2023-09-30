import { Types } from 'mongoose';
import { MongoInjectedFields } from './mongo.types';

type UserSchema = {
  fullName: string;
  email: string;
  password: string;
  accessType: string;
  groupIds?: Types.Array<Types.ObjectId>;
  setlistIds?: Types.Array<Types.ObjectId>;
  isDeleted: boolean;
};

type UserDocument = UserSchema & MongoInjectedFields;

export { UserSchema, UserDocument };
