export type SongCardProps = {
  _id: Types.ObjectId;
  title: String;
  tempo: [String];
  originalKey: String;
  themes: [String];
  artist: String;
  lyricsPreview: String;
  createdBy: Types.ObjectId;
  lastUpdatedBy: Types.ObjectId;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
};
