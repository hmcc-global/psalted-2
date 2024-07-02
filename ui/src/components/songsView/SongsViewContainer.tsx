import { Container, Box, Grid, Stack, Typography, Button } from '@mui/material';
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SongViewSchema } from '../../types/song.types';
import axios, { AxiosResponse } from 'axios';
import SongsTitleCard from './SongsTitleCard';
import SongsButtonCard from './SongsButtonsCard';
import SongsInfoCard from './SongsInfoCard';

const SongsViewContainer: FC = (): ReactElement => {
  const navigate = useNavigate();

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
      <Container style={{ paddingTop: '5em', width: '100%' }}>
        <Button
          variant="outlined"
          sx={{
            borderWidth: '2px',
            padding: '10px 25px',
            borderRadius: '40px',
            backgroundColor: 'rgba(208, 188, 255, 0.12)',
            color: '#D0BCFF',
            textTransform: 'none',
          }}
          onClick={() => navigate(`/song/edit/${id}`)}
        >
          <Typography variant="subtitle1">Edit Song</Typography>
        </Button>

        <Grid container justifyContent="left">
          <Grid item>
            {/* song title and artist */}
            <Box sx={{ width: '100' }}>
              <SongsTitleCard song={song} />
            </Box>

            <Stack direction={['row']}>
              <Box sx={{ marginBottom: '15vh' }}>
                <SongsButtonCard song={song} />
              </Box>

              <Box width={['30%']}>
                <SongsInfoCard song={song} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default SongsViewContainer;
