import { Types } from 'mongoose';
import { MongoInjectedFields } from './mongo.types';

type GroupSchema = {
  groupName: string;
  userIds: Types.Array<Types.ObjectId>;
  setlistIds: Types.Array<Types.ObjectId>;
  createdBy: string;
  lastUpdatedBy: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  isDeleted: boolean;
};

type GroupDocument = GroupSchema & MongoInjectedFields;

export { GroupSchema, GroupDocument };
