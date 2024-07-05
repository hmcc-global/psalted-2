import { Setlist } from '#/types/setlist.types';
import { SongViewSchema } from '#/types/song.types';
import { Box, Container, Grid, Stack, Typography, styled } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import SongsButtonsCard from '../songsView/SongsButtonsCard';

const HeaderSetlistView = styled(Box)({
  borderRadius: '16px',
  padding: '24px 0px',
  margin: '24px',
  display: 'flex',
  justifyContent: 'center',
  background:
    'linear-gradient(158deg, rgba(0, 0, 0, 0.00) 31.44%, rgba(148, 111, 255, 0.20) 80.34%), radial-gradient(111.68% 110.13% at 66.1% 8.28%, rgba(154, 118, 255, 0.20) 36.5%, rgba(0, 0, 0, 0.20) 64%), #1F1F1F',
});

const SongSelectTable = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  borderRadius: '16px',
  '& div:last-child': {
    borderBottom: 'none',
  },
}));

const SongSelectRow = styled(Box)(({ theme }) => ({
  padding: '16px 24px',
  borderBottom: `1px solid ${theme.palette.secondary.dark}`,
}));

const SetlistViewFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  background: theme.palette.background.paper,
  width: '100%',
  padding: '16px',
  marginTop: '16px',
}));

const SetlistViewContainer: FC = (): ReactElement => {
  const setlistId = window.location.pathname.split('/').reverse()[0];
  const [setlist, setSetlist] = useState<Setlist>();
  const [songs, setSongs] = useState<SongViewSchema[]>();
  const [selectedSong, setSelectedSong] = useState<SongViewSchema>();

  const getSetlist = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`/api/setlists/get`, {
        params: { id: setlistId },
      });
      if (status === 200) {
        setSetlist(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [setlistId]);

  const getSongs = useCallback(async () => {
    if (setlist?.songs) {
      try {
        const songPromises: Promise<AxiosResponse<SongViewSchema>>[] = setlist.songs.map((songId) =>
          axios.get(`/api/songs/get`, { params: { id: songId } })
        );
        const songResults = await Promise.all<AxiosResponse<SongViewSchema>>(songPromises);
        if (songResults) setSongs(songResults.map((result) => result.data));
      } catch (e) {
        console.log(e);
      }
    }
  }, [setlist]);

  const handleSelectSong = (song: SongViewSchema) => {
    setSelectedSong(song);
  };

  useEffect(() => {
    getSetlist();
  }, []);

  useEffect(() => {
    if (setlist) {
      getSongs();
    }
  }, [setlist]);

  useEffect(() => {
    if (songs) {
      setSelectedSong(songs[0]);
    }
  }, [songs]);

  // TO-DO: add option to redirect to a selected song from link
  return (
    <Container style={{ maxWidth: '100vw', width: '100vw', padding: '0' }}>
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
        {setlist && songs ? (
          <Container maxWidth="lg">
            {/* Header */}
            <HeaderSetlistView>
              <Typography variant="h3">{setlist.name}</Typography>
            </HeaderSetlistView>
            {/* Setlist body */}
            <Grid container>
              {/* Song choice */}
              <Grid item xs={3}>
                <SongSelectTable>
                  {songs.map((song) => {
                    return (
                      <SongSelectRow onClick={() => handleSelectSong(song)} key={song._id}>
                        {song.title}
                      </SongSelectRow>
                    );
                  })}
                </SongSelectTable>
              </Grid>
              {/* Song lyrics */}
              <Grid item xs={9}>
                <Stack>
                  <SongsButtonsCard song={selectedSong} userView={true} userHeader={true} />
                </Stack>
              </Grid>
            </Grid>
          </Container>
        ) : (
          'loading'
        )}
        <SetlistViewFooter>
          <Typography>Created by HMCC T3CH</Typography>
        </SetlistViewFooter>
      </Box>
    </Container>
  );
};

export default SetlistViewContainer;
