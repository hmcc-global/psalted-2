import { Box, Chip, Stack, Typography, useMediaQuery } from '@mui/material';
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
  const [paragraph, setParagraph] = useState(0);

  const countParagraph = (inputSong: SongView | undefined) => {
    const lyricsLine = inputSong?.chordLyrics.split('\n');
    let para = 0;
    lyricsLine &&
      lyricsLine.map((line) => (line.includes('{') && line.includes('}') ? para++ : null));
    setParagraph(para);
  };

  // needs improvement
  const groupLyricsToParagraphs = useCallback((inputSong: string[]) => {
    const seperator = '{';
    const result = [];
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
          result.push(currentGroup);
          currentGroup = [inputSong[i]];
        }
      }
    }

    if (currentGroup.length > 0) {
      result.push(currentGroup);
    }
    console.log(result);
    return result;
  }, []);

  const parseLyrics = useCallback(
    (inputSong: SongView | undefined) => {
      const result: ReactNode[] = [];
      const originalChordIndex =
        sharpMusicKeysOptions.indexOf(inputSong?.originalKey ?? 'C') === -1
          ? flatMusicKeysOptions.indexOf(inputSong?.originalKey ?? 'C')
          : sharpMusicKeysOptions.indexOf(inputSong?.originalKey ?? 'C');
      const transpossedChordIndex = changeKey - originalChordIndex;
      const lyricsLine = inputSong?.chordLyrics.split('\n');
      const groupedLyricsLine = groupLyricsToParagraphs(lyricsLine ?? []);
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
    [changeKey, chordStatus, useFlat, groupLyricsToParagraphs]
  );

  useEffect(() => {
    countParagraph(songs);
    const res = parseLyrics(songs);
    setFinalLyrics(res);
  }, [parseLyrics, songs]);
  console.log(paragraph);
  return (
    <>
      <Box>{finalLyrics}</Box>
    </>
  );
};
export default SongsLyrics;
