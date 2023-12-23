import { Types } from 'mongoose';
import { MongoInjectedFields } from './mongo.types';

type SongOptionSchema = {
  category: string;
  list: Types.Array<string>;
  createdBy: Types.ObjectId;
  lastUpdatedBy: Types.ObjectId;
  isDeleted: boolean;
};

type SongOptionDocument = SongOptionSchema & MongoInjectedFields;

export { SongOptionSchema, SongOptionDocument };
