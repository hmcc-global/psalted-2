import { Container, Box, Grid } from '@mui/material';
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { SongViewSchema } from '../../types/song.types';
import axios, { AxiosResponse } from 'axios';
import SongsTitleCard from './SongsTitleCard';
import SongsButtonCard from './SongsButtonsCard';

const SongsViewContainer: FC = (): ReactElement => {
  const id: string = window.location.pathname.split('/')[2];
  const [song, setSong] = useState<SongViewSchema>();

  const getSongs = useCallback(async () => {
    const response: AxiosResponse<SongViewSchema> = await axios.get(`/api/songs/get`, {
      params: { id: id },
    });
    const { data, status } = response;
    try {
      if (status === 200) {
        setSong(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  return (
    <>
      <Container maxWidth="lg" style={{ background: 'white' }}>
        <Grid container justifyContent="left">
        <Grid item xs={12} sm={12} md={15} lg={20}>
          <Box sx={{ bgcolor: 'white', width: 'auto' }}>
            <SongsTitleCard song={song} />
          </Box>
          <Box sx={{ marginBottom: '15vh', width: 'auto'}}>
            <SongsButtonCard song={song} />
          </Box>
        </Grid>
        </Grid>
      </Container>
      
    </>
  );
};
export default SongsViewContainer;
