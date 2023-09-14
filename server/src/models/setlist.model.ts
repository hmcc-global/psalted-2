import { Schema, model, models, Types } from 'mongoose';

interface ISetlist {
  name: string;
  date: string;
  createdBy: string;
  songs: Types.Array<Types.ObjectId>;
  lastUpdatedBy: string;
  publicLink: string;
  groupIds: Types.Array<Types.ObjectId>;
}

const setlistSchema = new Schema<ISetlist>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  createdBy: { type: String },
  songs: [{ type: Types.ObjectId, ref: 'Song' }],
  lastUpdatedBy: { type: String },
  publicLink : { type: String, required: true, unique: true },
  groupIds: [{ type: Types.ObjectId, ref: 'Group' }],
});

const Setlist = models.Setlist || model<ISetlist>('Setlist', setlistSchema);

export default Setlist;
