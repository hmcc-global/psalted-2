import { Schema, model, models, Types } from 'mongoose';
import { SetlistSchema } from '../types/setlist.types';

const setlistSchema = new Schema<SetlistSchema>(
  {
    name: { type: String, required: true },
    date: { type: Date },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    songs: [{ type: Types.ObjectId, ref: 'Song' }],
    lastUpdatedBy: { type: Types.ObjectId, ref: 'User' },
    publicLink: { type: String, required: true, unique: true },
    groupIds: [{ type: Types.ObjectId, ref: 'Group' }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Setlist = models.Setlist || model<SetlistSchema>('Setlist', setlistSchema);

export { Setlist };
