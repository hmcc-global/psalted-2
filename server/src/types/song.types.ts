import { Types } from 'mongoose';
import { MongoInjectedFields } from './mongo.types';

type SongSchema = {
  title: string;
  tempo: Types.Array<string>;
  originalKey: string;
  recommendedKeys: Types.Array<string>;
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

type SongOptions = {
  themes: string[];
  tempo: string[];
};

export { SongSchema, SongDocument, SongOptions };
