import { Schema, model, models, Types } from 'mongoose';
import { GroupSchema } from '../types/group.types';

const groupSchema = new Schema<GroupSchema>(
  {
    groupName: { type: String, required: true },
    userIds: [{ type: Types.ObjectId, ref: 'User' }],
    setlistIds: [{ type: Types.ObjectId, ref: 'Setlist' }],
    createdBy: { type: String },
    lastUpdatedBy: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Group = models.Group || model<GroupSchema>('Group', groupSchema);

export { Group };
