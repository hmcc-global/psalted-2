import { Schema, model, models, Types } from 'mongoose';

interface IGroup {
  groupName: string;
  userIds: Types.Array<Types.ObjectId>;
  setlistIds: Types.Array<Types.ObjectId>;
  createdBy: string;
  lastUpdatedBy: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  isDeleted: boolean;
}

const groupSchema = new Schema<IGroup>({
  groupName: { type: String, required: true },
  userIds: [{ type: Types.ObjectId, ref: 'User' }],
  setlistIds: [{ type: Types.ObjectId, ref: 'Setlist' }],
  createdBy: { type: String },
  lastUpdatedBy: { type: String },
  createdAt: { type: Date },
  lastUpdatedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
})

const Group = models.Group || model<IGroup>('Group', groupSchema);

export default Group;