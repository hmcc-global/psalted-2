import { Types } from 'mongoose';
import { MongoInjectedType } from './mongo.types';

type UserType = {
  fullName: string;
  email: string;
  password: string;
  accessType: string;
  groupIds: Types.Array<Types.ObjectId>;
  setlistIds: Types.Array<Types.ObjectId>;
  isDeleted: boolean;
};

type UserMongoType = UserType & MongoInjectedType;

export { UserType, UserMongoType };
