import { Setlist, SetlistFolder } from '#/types/setlist.types';
import { SongViewSchema } from '#/types/song.types';
import { UserEditorProps } from '#/types/user.types';
import { useSelector } from 'react-redux';

type RootState = {
  user: UserEditorProps
  songs: SongViewSchema[];
  setlists: Setlist[];
  folders: SetlistFolder[];
};

export const useUser = () => {
  return useSelector((state: RootState) => state.user);

}
export const useSongs = () => {
  return useSelector((state: RootState) =>  state.songs);
};

export const useSetlists = () => {
  return useSelector((state: RootState) => state.setlists);
}

export const useFolders = () => {
  return useSelector((state: RootState) => state.folders);
}