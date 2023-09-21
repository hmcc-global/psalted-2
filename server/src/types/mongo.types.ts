import { Types } from 'mongoose';

type MongoInjectedFields = {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export { MongoInjectedFields };
