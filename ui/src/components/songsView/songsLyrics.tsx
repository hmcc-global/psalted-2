import { Box, Chip, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { SongView } from '../../types/song';
import { flatMusicKeysOptions, sharpMusicKeysOptions } from '../../constants';
import { ReactNode, useCallback, useEffect, useState } from 'react';

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
  const noSplit = isDesktop ? split : 1;
  const [finalLyrics, setFinalLyrics] = useState<ReactNode[]>();

  const countParagraph = (inputSong: SongView | undefined) => {
    const lyricsLine = inputSong?.chordLyrics.split('\n');
    let para = 0;
    lyricsLine &&
      lyricsLine.map((line) => (line.includes('{') && line.includes('}') ? para++ : null));
  };

  const parseLyrics = useCallback(
    (inputSong: SongView | undefined, songChunk: string[]) => {
      const result: ReactNode[] = [];
      const originalChordIndex =
        sharpMusicKeysOptions.indexOf(inputSong?.originalKey ?? 'C') === -1
          ? flatMusicKeysOptions.indexOf(inputSong?.originalKey ?? 'C')
          : sharpMusicKeysOptions.indexOf(inputSong?.originalKey ?? 'C');
      const transpossedChordIndex = changeKey - originalChordIndex;
      const lyricsLine = songChunk;
      // render the lyrics
      lyricsLine &&
        lyricsLine.map((line, j) => {
          if (line.includes('{') && line.includes('}')) {
            // return chip for verse, chorus, bridge
            const chipLabel = line.replace('{', '').replace('}', '');
            return result.push(<Chip key={j} label={chipLabel} />);
          } else if (line === '') {
            // return empty line
            return result.push(<br key={j} />);
          } else {
            // return the lyrics and chords
            // split the lines by chunks of 1 chord and its corresponding lyrics
            const splitChar = '[';
            const escapedSplitChar = splitChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(?=${escapedSplitChar})`);
            const lyrics = line.split(regex);
            return result.push(
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
        });
      return result;
    },
    [changeKey, chordStatus, useFlat]
  );

  // needs improvement
  const groupLyricsToParagraphs = useCallback(
    (song: SongView | undefined) => {
      const seperator = '{';
      const result = [];
      const inputSong = song ? song.chordLyrics.split('\n') : [];
      let currentGroup: string[] = [];

      for (let i = 0; i < inputSong.length; i++) {
        //base case
        if (i === 0 && inputSong[i].includes(seperator)) {
          currentGroup.push(inputSong[i]);
        }

        if (!inputSong[i].includes(seperator)) {
          currentGroup.push(inputSong[i]);
        }

        if (inputSong[i].includes(seperator)) {
          if (i !== 0) {
            const parsedGroup = parseLyrics(song, currentGroup);
            result.push(parsedGroup);
            currentGroup = [inputSong[i]];
          }
        }
      }

      if (currentGroup.length > 0) {
        result.push(parseLyrics(song, currentGroup));
      }
      return result;
    },
    [parseLyrics]
  );

  useEffect(() => {
    countParagraph(songs);
    const res = groupLyricsToParagraphs(songs);
    setFinalLyrics(res);
  }, [parseLyrics, songs, groupLyricsToParagraphs]);
  return (
    <>
      <Grid container>
        {finalLyrics &&
          finalLyrics.map((chunk, i) => {
            return (
              <Grid item xs={12 / noSplit} key={i}>
                {chunk}
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};
export default SongsLyrics;
