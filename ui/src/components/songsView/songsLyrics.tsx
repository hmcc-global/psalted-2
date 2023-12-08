import { useMediaQuery } from '@mui/material';
import { SongView } from '../../types/song';

interface SongsLyricsProps {
  chordStatus: boolean;
  changeKey: number;
  song: SongView | undefined;
  split: number;
}

const SongsLyrics = ({ chordStatus, changeKey, song, split }: SongsLyricsProps) => {
  // const songs = song;
  // const isDesktop = useMediaQuery('(min-width:768px)');
  // let paragraph = 0;

  return (
    <>
      
    </>
  );
};
export default SongsLyrics;
