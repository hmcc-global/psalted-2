import { Schema, model, models } from 'mongoose';
import { SongSchema } from '../types/song.types';


const songSchema = new Schema<SongSchema>({
  title: { type: String, required: true },
  tempo: [{ type: String, required: true }],
  originalKey: { type: String, required: true },
  themes: [{ type: String, required: true }],
  artist: { type: String, required: true },
  firstLine: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId },
  lastUpdatedBy: { type: Schema.Types.ObjectId },
  isVerified: { type: Boolean, default: false },
  chordLyrics: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
},{
  timestamps: true,
});

const Song = models.Song || model<SongSchema>('Song', songSchema);

export { Song };