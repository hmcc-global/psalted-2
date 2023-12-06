import { MongoInjectedFields } from "./global";

export type SongSchema = {
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
}

export type Song = SongSchema & MongoInjectedFields