import { SongViewSchema } from '#/types/song.types';
import { UserEditorProps } from '#/types/user.types';
import { useSelector } from 'react-redux';

type RootState = {
  user: UserEditorProps
  songs: SongViewSchema[];
};

export const useUser = () => {
  return useSelector((state: RootState) => state.user);

}
export const useSongs = () => {
  return useSelector((state: RootState) =>  state.songs);
};