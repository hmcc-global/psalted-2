import { Setlist } from '../../types/setlist.types';
import { SongViewSchema } from '../../types/song.types';
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { FC, ReactElement, useEffect, useState } from 'react';
import SongsButtonsCard from '../songsView/SongsButtonsCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  HeaderSetlistView,
  SongSelectRow,
  SongSelectTable,
  SetlistViewFooter,
} from './SetlistViewPaper';
import SetlistViewMenu from './SetlistViewMenu';
import { useSetlists } from '../../helpers/customHooks';

const SetlistViewContainer: FC = (): ReactElement => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedSong, setSelectedSong] = useState<SongViewSchema>();

  const setlistId = window.location.pathname.split('/').reverse()[0];
  const openMenu = Boolean(menuAnchor);
  const setlist = useSetlists(setlistId) as Setlist;
  const songs = setlist && setlist.songs;

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
    if (songs) {
      setSelectedSong(songs[0]);
    }
  }, [songs]);

  // TO-DO: add option to redirect to a selected song from link
  return (
    <Container
      style={{
        maxWidth: '100vw',
        width: '100%',
        padding: '0',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        maxHeight="100vh"
      >
        {setlist && songs ? (
          <Container
            maxWidth="xl"
            style={{
              height: '100vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
            <Grid container height="85%">
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
              <Grid item xs={9} height="100%">
                <Stack height="100%">
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
