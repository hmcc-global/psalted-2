import { Setlist } from '#/types/setlist.types';
import { SongViewSchema } from '#/types/song.types';
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import SongsButtonsCard from '../songsView/SongsButtonsCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  HeaderSetlistView,
  SongSelectRow,
  SongSelectTable,
  SetlistViewFooter,
} from './SetlistViewPaper';
import SetlistViewMenu from './SetlistViewMenu';

const SetlistViewContainer: FC = (): ReactElement => {
  const [setlist, setSetlist] = useState<Setlist>();
  const [songs, setSongs] = useState<SongViewSchema[]>();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedSong, setSelectedSong] = useState<SongViewSchema>();

  const setlistId = window.location.pathname.split('/').reverse()[0];
  const openMenu = Boolean(menuAnchor);

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

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
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
              <Box />
              <Typography variant="h3">{setlist.name}</Typography>
              <Button onClick={handleOpenMenu} color="secondary">
                <MoreVertIcon />
              </Button>
              <SetlistViewMenu anchorEl={menuAnchor} open={openMenu} onClose={handleCloseMenu} />
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
          <Skeleton>loading ...</Skeleton>
        )}
        <SetlistViewFooter>
          <Typography>Created by HMCC T3CH</Typography>
        </SetlistViewFooter>
      </Box>
    </Container>
  );
};

export default SetlistViewContainer;
