import { Box, Chip, Stack, Typography, useMediaQuery } from '@mui/material';
import { SongView } from '../../types/song';
import { flatMusicKeysOptions, sharpMusicKeysOptions } from '../../constants';

interface SongsLyricsProps {
  chordStatus: boolean;
  changeKey: number;
  song: SongView | undefined;
  split: number;
  useFlat: boolean;
}

const SongsLyrics = ({ chordStatus, changeKey, song, split, useFlat }: SongsLyricsProps) => {
  const songs = song;
  const isDesktop = useMediaQuery('(min-width:768px)');
  const originalChordIndex =
    sharpMusicKeysOptions.indexOf(songs?.originalKey ?? 'C') === -1
      ? flatMusicKeysOptions.indexOf(songs?.originalKey ?? 'C')
      : sharpMusicKeysOptions.indexOf(songs?.originalKey ?? 'C');
  const transpossedChordIndex = changeKey - originalChordIndex;

  const noSplit = isDesktop ? split : 1;

  const lyricsLine = songs?.chordLyrics.split('\n');
  console.log(changeKey, originalChordIndex);
  return (
    <>
      <Box>
        {lyricsLine &&
          lyricsLine.map((line, j) => {
            if (line.includes('{') && line.includes('}')) {
              // return chip for verse, chorus, bridge
              const chipLabel = line.replace('{', '').replace('}', '');
              return <Chip key={j} label={chipLabel} />;
            } else if (line === '') {
              // return empty line
              return <br key={j} />;
            } else {
              const splitChar = '[';
              const escapedSplitChar = splitChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const regex = new RegExp(`(?=${escapedSplitChar})`);
              const lyrics = line.split(regex);
              return (
                <Stack key={j} direction="row">
                  {lyrics.map((lyric, i) => {
                    if (lyric.includes('[') && lyric.includes(']')) {
                      const startChord = lyric.indexOf('[');
                      const endChord = lyric.indexOf(']');
                      const chord = lyric.slice(startChord + 1, endChord);
                      const chordIndex = useFlat
                        ? flatMusicKeysOptions.indexOf(chord[0])
                        : sharpMusicKeysOptions.indexOf(chord[0]);
                      const transpossedChord =
                        (useFlat
                          ? flatMusicKeysOptions[(chordIndex + transpossedChordIndex) % 12]
                          : sharpMusicKeysOptions[(chordIndex + transpossedChordIndex) % 12]) +
                        chord.slice(1);
                      const textLyrics = '\u00A0' + lyric.slice(endChord + 1);
                      return (
                        <Box key={i}>
                          {chordStatus ? <Chip label={transpossedChord} /> : null}
                          <Typography>{textLyrics}</Typography>
                        </Box>
                      );
                    } else {
                      return (
                        <Box key={i}>
                          {chordStatus ? <Chip sx={{ visibility: 'hidden' }} /> : null}
                          <Typography>{lyric}</Typography>
                        </Box>
                      );
                    }
                  })}
                </Stack>
              );
            }
          })}
      </Box>
    </>
  );
};
export default SongsLyrics;
