import { SongSearchFilter } from './song.types';
import { UserEditorFields } from './user.types';

interface SetlistEditorFields {
  name: string;
  date: Date;
  songs: string[];
  groupIds: string[];
}

interface SetlistEditorProps {
  actionOnEditor: string;
}

export type SetlistSongCardProps = {
  _id: string;
  title: string;
  timeSignature: string[];
  tempo: string[];
  originalKey: string;
  themes: string[];
  artist: string;
  year: string;
  code: string;
  createdBy: UserEditorFields;
  lastUpdatedBy: UserEditorFields;
  filterData?: SongSearchFilter;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
  showDetails?: boolean;
  isDesktop: boolean;
  handleAddSong: (id: string) => void;
  addedSongs: string[];
};

export type Setlist = {
  _id: string;
  name: string;
  date: Date;
  sharedUserIds: string[];
};

export type SetlistFolder = {
  _id: string;
  groupName: string;
  userIds: string[];
  setlistIds: string[];
};

export type SetlistFolderMember = {
  _id: string;
  fullName: string;
  email: string;
};

export type { SetlistEditorFields, SetlistEditorProps };
