export type SongCardProps = {
  _id: Types.ObjectId;
  title: string;
  tempo: [string];
  originalKey: string;
  themes: [string];
  artist: string;
  year: string;
  lyricsPreview: string;
  createdBy: Types.ObjectId;
  lastUpdatedBy: Types.ObjectId;
  filterData?: SongSearchFilter;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SongSearchProps = {
  songs: SongCardProps[];
  filterData: SongSearchFilter | undefined;
  setFilterData: React.Dispatch<React.SetStateAction<SongSearchFilter | undefined>>;
  onClose: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export type SongSearchFilter = {
  search?: string;
  tempo?: string[];
  themes?: string[];
  display?: {
    tempo: boolean;
    themes: boolean;
    lyricsPreview: boolean;
    originalKey: boolean;
    year: boolean;
    code: boolean;
  };
};
