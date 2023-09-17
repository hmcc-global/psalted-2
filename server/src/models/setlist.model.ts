import { Schema, model, models, Types } from 'mongoose';

interface ISetlist {
  name: string;
  date: string;
  createdBy: Types.ObjectId;
  songs: Types.Array<Types.ObjectId>;
  lastUpdatedBy: Types.ObjectId;
  publicLink: string;
  groupIds: Types.Array<Types.ObjectId>;
}

const setlistSchema = new Schema<ISetlist>(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: Types.ObjectId, ref: 'Song' }],
    lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    publicLink: { type: String, required: true, unique: true },
    groupIds: [{ type: Types.ObjectId, ref: 'Group' }],
  },
  {
    timestamps: true,
  }
);

const Setlist = models.Setlist || model<ISetlist>('Setlist', setlistSchema);

export { Setlist, ISetlist };
