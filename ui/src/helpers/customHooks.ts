import { Setlist, SetlistFolder } from '../types/setlist.types';
import { SongSchema, SongViewSchema } from '../types/song.types';
import { UserEditorProps } from '../types/user.types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

type RootState = {
  user: UserEditorProps;
  songs: SongSchema[] | SongViewSchema[];
  setlists: Setlist[];
  folders: SetlistFolder[];
};

export const useUser = () => {
  const { token, _doc } = useSelector((state: RootState) => state.user);
  return useMemo(() => ({ token, user: _doc }), [token, _doc]);
};
export const useSongs = (id?: string) => {
  const allSongs = useSelector((state: RootState) => state.songs);
  if (id) {
    const song = allSongs.find((song) => song._id === id);
    return song;
  }
  return allSongs;
};

export const useSetlists = (id?: string) => {
  const allSetlists = useSelector((state: RootState) => state.setlists);
  if (id) {
    const setlist = allSetlists.find((setlist) => setlist._id === id);
    return setlist;
  }
  return allSetlists;
};

export const useFolders = (id?: string) => {
  const allFolders = useSelector((state: RootState) => state.folders);
  if (id) {
    const folder = allFolders.find((folder) => folder._id === id);
    return folder;
  }
  return allFolders;
};
