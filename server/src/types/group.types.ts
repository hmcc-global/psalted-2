import { Types } from 'mongoose';
import { MongoInjectedFields } from './mongo.types';

type GroupModel = {
  groupName: string;
  userIds: Types.Array<Types.ObjectId>;
  setlistIds: Types.Array<Types.ObjectId>;
  createdBy: string;
  lastUpdatedBy: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  isDeleted: boolean;
};

type GroupList = {
  _id: string;
  groupName: string;
  userIds?: Types.Array<Types.ObjectId>;
};

type GroupMongoResponse = GroupModel & MongoInjectedFields;

export { GroupModel, GroupList, GroupMongoResponse };
