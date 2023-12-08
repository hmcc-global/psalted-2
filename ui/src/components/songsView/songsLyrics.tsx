import { Container, Box, Typography, Stack } from '@mui/material';
import { Fragment } from 'react';
import { SongView } from '../../types/song';
import Chip from '@mui/material/Chip';
import { parseNoChords, parseWithChords } from './helpers';

interface SongsLyricsProps {
  chordStatus: boolean;
  changeKey: number;
  song: SongView | undefined;
}

const SongsLyrics = ({ chordStatus, changeKey, song }: SongsLyricsProps) => {
  const songs = song;

  return (
    <>
      <Container>
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: 0,
            borderRadius: 0,
            paddingLeft: 2,
            paddingRight: 2,
            minWidth: '20vh',
          }}
        >
          {chordStatus && (
            <Box width="100%" bgcolor="#FAFAFA" flexWrap={'wrap'}>
              {/* With Chords */}
              {parseWithChords(
                songs && songs.originalKey,
                songs && songs.chordLyrics,
                changeKey
              ).map((line: string, i: number) => {
                const matches = line.match(/\[(.*?)\]/g); // Extract content between [ and ]
                const songParts = line.match(/\{(.*?)\}/g); // matches at the start of #
                let result: any = [];
                if (songParts) {
                  let startIndex: number = line.indexOf('{');
                  let lastIndex: number = line.indexOf('}');
                  line = line.slice(startIndex, lastIndex);
                }
                if (matches) {
                  let lastIndex = 0;
                  matches.forEach((match, matchIndex) => {
                    const matchStartIndex = line.indexOf(match, lastIndex);
                    const matchEndIndex = matchStartIndex + match.length;

                    if (matchStartIndex > lastIndex) {
                      var spaces: string = line.slice(lastIndex, matchStartIndex);
                      spaces = spaces.slice(0, spaces.length - 4); //can adjust integer for spacing of chords chip
                      result.push(spaces);
                    }
                    result.push(
                      <Chip
                        size="small"
                        sx={{
                          height: 'auto',
                          '& .MuiChip-label': {
                            width: 'inline-flex',
                            alignItems: 'center',
                            whiteSpace: 'none',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            borderWidth: '2',
                          },
                        }}
                        style={{
                          borderRadius: 4,
                          backgroundColor: '#EEEFFF',

                          fontSize: '12px',
                        }}
                        key={matchIndex}
                        label={match.slice(1, -1)}
                      />
                    );
                    lastIndex = matchEndIndex;
                  });

                  if (lastIndex < line.length) {
                    const remainingSpaces = line.slice(lastIndex);
                    result.push(remainingSpaces);
                  }
                }

                if (matches && matches.length > 0) {
                  const reducedSpaceResult = result.reduce((acc: any, curr: any) => {
                    if (typeof curr === 'string') {
                      acc.push(curr.trim());
                    } else {
                      acc.push(curr);
                    }
                    return acc;
                  }, []);
                  result = reducedSpaceResult;
                }
                return (
                  <Fragment key={i}>
                    <Fragment>{result}</Fragment>
                    {line.includes('{') && (
                      <Chip
                        variant="outlined"
                        sx={{
                          height: '30px',
                          '& .MuiChip-label': {
                            width: 'inline-flex',
                            alignItems: 'center',
                            whiteSpace: 'none',
                            color: '#A9A9A9',
                            fontWeight: 'bold',
                            borderRadius: 4,
                            backgroundColor: '#FAFAFA',
                            border: '2',
                            fontSize: '12px',
                          },
                        }}
                        label={line.slice(1, line.length)}
                      />
                    )}
                    {!line.includes('{') && !line.includes('[') && (
                      <Typography
                        sx={{
                          letterSpacing: '1px',
                          lineHeight: 'normal',
                        }}
                        flexWrap="wrap"
                        variant="body2"
                      >
                        {line}
                      </Typography>
                    )}
                  </Fragment>
                );
              })}
            </Box>
          )}

          {!chordStatus && (
            <Box bgcolor="#FAFAFA">
              <Stack direction="column">
                {parseNoChords(songs && songs.chordLyrics).map((line: string, i: number) => {
                  const songParts = line.match(/\{(.*?)\}/g); // matches between { }
                  if (songParts) {
                    let startIndex: number = line.indexOf('{');
                    const endIndex = line.indexOf('}');
                    line = line.slice(startIndex, endIndex);
                  }
                  return (
                    <>
                      {line.includes('{') && (
                        <>
                          <Chip
                            variant="outlined"
                            sx={{
                              height: '30px',
                              '& .MuiChip-label': {
                                width: 'inline-flex',
                                alignItems: 'center',
                                whiteSpace: 'none',
                                color: '#A9A9A9',
                                fontWeight: 'bold',
                                borderRadius: 4,
                                backgroundColor: '#FAFAFA',
                                border: '2',
                                fontSize: '12px',
                              },
                            }}
                            label={line.slice(1, line.length)}
                          />
                        </>
                      )}
                      {!line.includes('{') && !line.includes('[') && (
                        <Typography flexWrap="wrap" variant="caption">
                          {line}
                        </Typography>
                      )}
                    </>
                  );
                })}
              </Stack>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};
export default SongsLyrics;
