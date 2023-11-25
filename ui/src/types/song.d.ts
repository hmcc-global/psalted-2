export type SongCardProps = {
  _id: Types.ObjectId;
  title: String;
  tempo: [String];
  originalKey: String;
  themes: [String];
  artist: String;
  year: String;
  lyricsPreview: String;
  createdBy: Types.ObjectId;
  lastUpdatedBy: Types.ObjectId;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SongSearchProps = {
  songs: SongCardProps[];
  filterData: SongSearchFilter | undefined;
  setFilterData: React.Dispatch<React.SetStateAction<SongSearchFilter | undefined>>;
  onClose: () => void;
};

export type SongSearchFilter = {
  search: String;
  tempo: String[];
  themes: String[];
  display: {
    tempo: boolean | undefined;
    themes: boolean | undefined;
    lyricsPreview: boolean | undefined;
    originalKey: boolean | undefined;
    year: boolean | undefined;
    code: boolean | undefined;
  };
};
