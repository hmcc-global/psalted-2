import { Types } from 'mongoose';
import { MongoInjectedFields } from './mongo.types';

type SongSchema = {
  title: string;
  tempo: Types.Array<string>;
  originalKey: string;
  themes: Types.Array<string>;
  artist: string;
  year: string;
  code: string;
  lyricsPreview: string;
  createdBy: Types.ObjectId;
  lastUpdatedBy: Types.ObjectId;
  isVerified: boolean;
  chordLyrics: string;
  isDeleted: boolean;
};

type SongDocument = SongSchema & MongoInjectedFields;

export { SongSchema, SongDocument };
