type SongEditorFields = {
  artist: string;
  title: string;
  themes: Array<string>;
  tempo: Array<string>;
  year: number;
  code: string;
  originalKey: string;
  recommendedKeys: Array<string>;
  chordLyrics: string;
};

interface SongEditorProps {
  actionOnEditor: string;
}

type SongCardProps = {
  _id: Types.ObjectId;
  title: string;
  tempo: string[];
  originalKey: string;
  themes: string[];
  artist: string;
  year: string;
  code: string;
  lyricsPreview: string;
  createdBy: Types.ObjectId;
  lastUpdatedBy: Types.ObjectId;
  filterData?: SongSearchFilter;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
  showDetails?: boolean;
  isDesktop: boolean;
};

type SongSearchProps = {
  songs: SongCardProps[];
  filterData: SongSearchFilter | undefined;
  setFilterData: React.Dispatch<React.SetStateAction<SongSearchFilter | undefined>>;
  onClose: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isDesktop: boolean;
};

type SongSearchFilter = {
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

type SongView = {
  _id: string;
  title: string;
  tempo: string[];
  originalKey: string;
  themes: string[];
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

export type { SongCardProps, SongView, SongSearchFilter, SongSearchProps, SongEditorFields, SongEditorProps };
