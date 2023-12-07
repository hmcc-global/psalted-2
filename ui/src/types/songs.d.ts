import { MongoInjectedFields } from "./global";

export type SongSchema = {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export type Song = SongSchema & MongoInjectedFields