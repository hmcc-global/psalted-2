import { Types } from 'mongoose';

type MongoInjectedType = {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export { MongoInjectedType };