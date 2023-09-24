import { ObjectId, Types } from 'mongoose';
import { MongoInjectedFields } from './mongo.types';

type SetlistSchema = {
  name: string;
  date: Date;
  createdBy: ObjectId;
  songs: Types.Array<Types.ObjectId>;
  lastUpdatedBy: ObjectId;
  publicLink: string;
  groupIds: Types.Array<Types.ObjectId>;
  isDeleted: boolean;
};

type SetlistMongoSchema = SetlistSchema & MongoInjectedFields;

export { SetlistSchema, SetlistMongoSchema };
