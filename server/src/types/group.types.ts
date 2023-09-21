import { Types } from 'mongoose';

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

export type { GroupModel };
