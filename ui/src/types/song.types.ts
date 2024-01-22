import { UserEditorFields } from './user.types';

type SongEditorFields = {
  artist: string;
  title: string;
  themes: Array<string>;
  tempo: Array<string>;
  year: number;
  code: string;
  timeSignature: string;
  simplifiedChordLyrics: string;
  originalKey: string;
  recommendedKeys: Array<string>;
  chordLyrics: string;
};

interface SongEditorProps {
  actionOnEditor: string;
}

export type { SongEditorFields, SongEditorProps };

export type SongCardProps = {
  _id: string;
  title: string;
  timeSignature: string[];
  tempo: string[];
  originalKey: string;
  themes: string[];
  artist: string;
  year: string;
  code: string;
  lyricsPreview: string;
  createdBy: string;
  lastUpdatedBy: string;
  filterData?: SongSearchFilter;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
  showDetails?: boolean;
  isDesktop: boolean;
};

export type SongSearchProps = {
  songs: SongCardProps[];
  filterData: SongSearchFilter | undefined;
  setFilterData: React.Dispatch<React.SetStateAction<SongSearchFilter | undefined>>;
  onClose: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isDesktop: boolean;
};

export type SongSearchFilter = {
  search?: string;
  timeSignature?: string[];
  tempo?: string[];
  themes?: string[];
  display?: {
    tempo: boolean;
    themes: boolean;
    lyricsPreview: boolean;
    originalKey: boolean;
    year: boolean;
    code: boolean;
    timeSignature: boolean;
  };
};

export type SongViewSchema = {
  _id: string;
  title: string;
  tempo: string[];
  originalKey: string;
  themes: string[];
  artist: string;
  year: string;
  code: string;
  lyricsPreview: string;
  createdBy: UserEditorFields;
  lastUpdatedBy: UserEditorFields;
  isVerified: boolean;
  chordLyrics: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
