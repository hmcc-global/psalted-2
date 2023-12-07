import { Container, Box, Typography } from '@mui/material';
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
              <pre>
                <Typography>
                  {parseWithChords(
                    songs && songs.originalKey,
                    songs && songs.chordLyrics,
                    changeKey
                  ).map((line: string, i: number) => {
                    const matches = line.match(/\[(.*?)\]/g); // Extract content between [ and ]
                    const songParts = line.match(/\{(.*?)\}/g); // matches between { }
                    let result: any = [];
                    if (songParts) {
                      let startIndex: number = line.indexOf('{');
                      const endIndex = line.indexOf('}');
                      line = line.slice(startIndex, endIndex);
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

                    // Decrease space between chips if there is a chip
                    if (matches && matches.length > 0) {
                      var spaceWidth: number = -4;
                      const spaceComponent = (
                        <span style={{ width: `${spaceWidth}px`, display: 'inline-block' }} />
                      );
                      const reducedSpaceResult = result.reduce((acc: any, curr: any) => {
                        if (typeof curr === 'string') {
                          acc.push(curr, spaceComponent);
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
                                },
                              }}
                              style={{
                                borderRadius: 4,
                                backgroundColor: '#FAFAFA',

                                border: '2',
                                fontSize: '12px',
                              }}
                              label={line.slice(1, line.length)}
                            />
                          </>
                        )}
                        {!line.includes('{') && !line.includes('[') && (
                          <Typography
                            sx={{
                              letterSpacing: '1px',
                              lineHeight: 'normal',
                              fontSize: '12px',
                              fontFamily: 'Roboto, sans-serif',
                            }}
                            flexWrap="wrap"
                            variant="body1"
                            fontSize={{ base: '12px', xs: '12px', sm: '14px', md: '14px' }}
                          >
                            {line}
                          </Typography>
                        )}
                      </Fragment>
                    );
                  })}
                </Typography>
              </pre>
            </Box>
          )}

          {!chordStatus && (
            <Box bgcolor="#FAFAFA">
              {parseNoChords(songs && songs.chordLyrics).map((line: string, i: number) => {
                const songParts = line.match(/\{(.*?)\}/g); // matches between { }
                let result: any = [];
                if (songParts) {
                  let startIndex: number = line.indexOf('{');
                  const endIndex = line.indexOf('}');
                  line = line.slice(startIndex, endIndex);
                }
                return (
                  <Fragment key={i}>
                    <Fragment>{result}</Fragment>
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
                            },
                          }}
                          style={{
                            borderRadius: 4,
                            backgroundColor: '#FAFAFA',

                            border: '2',
                            fontSize: '12px',
                          }}
                          label={line.slice(1, line.length)}
                        />
                      </>
                    )}
                    {!line.includes('{') && !line.includes('[') && (
                      <Typography
                        flexWrap="wrap"
                        variant="body1"
                        fontSize={{ base: '12px', xs: '12px', sm: '12px', md: '12px' }}
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        {line}
                      </Typography>
                    )}
                  </Fragment>
                );
              })}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};
export default SongsLyrics;
