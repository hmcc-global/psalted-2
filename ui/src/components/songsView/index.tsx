import { Container, Box } from '@mui/material';
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { SongView } from '../../types/song';
import axios, { AxiosResponse } from 'axios';
import SongsTitleCard from './songsTitleCard';
import SongsButtonCard from './songsButtonsCard';
import SongsLyrics from './songsLyrics';

const SongsView: FC = (): ReactElement => {
  const id: string = '6564a92b5a811dfaa8637b41';
  const [songs, setSongs] = useState<SongView>();

  const getSongs = useCallback(async () => {
    const response: AxiosResponse<SongView> = await axios.get(`/api/songs/get`, {
      params: { id: id },
    });
    const { data, status } = response;
    try {
      if (status === 200) {
        setSongs(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSongs();
  }, [getSongs]);
  console.log(songs);
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'white', width: '100%' }}>
          <SongsTitleCard></SongsTitleCard>
        </Box>
        <Box sx={{ marginBottom: '15vh', width: '100%' }}>
          <SongsButtonCard></SongsButtonCard>
        </Box>
      </Container>
    </>
  );
};
export default SongsView;
