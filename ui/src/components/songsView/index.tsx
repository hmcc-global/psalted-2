import { Container, Box } from '@mui/material';
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { SongViewSchema } from '../../types/song.types';
import axios, { AxiosResponse } from 'axios';
import SongsTitleCard from './SongsTitleCard';
import SongsButtonCard from './SongsButtonsCard';

const SongsView: FC = (): ReactElement => {
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
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'white', width: '100%' }}>
          <SongsTitleCard song={song} />
        </Box>
        <Box sx={{ marginBottom: '15vh', width: '100%' }}>
          <SongsButtonCard song={song} />
        </Box>
      </Container>
    </>
  );
};
export default SongsView;
