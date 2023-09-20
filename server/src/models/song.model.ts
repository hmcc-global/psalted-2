import { Schema, model, models, Types } from 'mongoose';

interface ISong {
  title: string;
  tempo: Types.Array<string>;
  originalKey: string;
  tags: Types.Array<string>;
  artist: string;
  firstLine: string;
  id: Types.ObjectId;
  createdBy: Types.ObjectId; 
  lastUpdatedBy: Types.ObjectId; 
  isVerified: boolean; 
  chordLyric: string; 
  isDeleted: boolean; 
}

const songSchema = new Schema<ISong>({
  title: { type: String, required: true },
  tempo: [{ type: String, required: true }],
  originalKey: { type: String, required: true },
  tags: [{ type: String, required: true }],
  artist: { type: String, required: true },
  firstLine: { type: String, required: true },
  id: { type: Schema.Types.ObjectId },
  createdBy: { type: Schema.Types.ObjectId },
  lastUpdatedBy: { type: Schema.Types.ObjectId },
  isVerified: { type: Boolean, default: false },
  chordLyric: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
},{
  timestamps: true,
});

const Song = models.Song || model<ISong>('Song', songSchema);

export { Song, ISong };