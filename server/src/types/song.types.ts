import { Types } from 'mongoose';
import { MongoInjectedType } from './mongo.types';

type SongSchema = {
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
};

type SongDocument = SongSchema & MongoInjectedType;

export { SongSchema, SongDocument };