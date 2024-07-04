import { Setlist } from '#/types/setlist.types';
import { SongViewSchema } from '#/types/song.types';
import { Container, Grid, Stack, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { MouseEvent, FC, ReactElement, useCallback, useEffect, useState } from 'react';
import SongsButtonsCard from '../songsView/SongsButtonsCard';

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
    <Container maxWidth="lg">
      {setlist && songs ? (
        <Stack>
          {/* Header */}
          <Typography>{setlist.name}</Typography>
          {/* Setlist body */}
          <Grid container>
            {/* Song choice */}
            <Grid item xs={3}>
              <Stack>
                {songs.map((song) => {
                  return (
                    <Typography onClick={() => handleSelectSong(song)} key={song._id}>
                      {song.title}
                    </Typography>
                  );
                })}
              </Stack>
            </Grid>
            {/* Song lyrics */}
            <Grid item xs={9}>
              <Stack>
                <SongsButtonsCard song={selectedSong} userView={true} userHeader={true} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      ) : (
        'loading'
      )}
    </Container>
  );
};

export default SetlistViewContainer;
