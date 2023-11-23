import { Box, Button, Container, Stack, Typography, TextField, IconButton } from '@mui/material';
import axios from 'axios';
import { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { SongCardProps } from '../../types/song';
import SongCard from './SongCard';

const SongContainer: FC = (): ReactElement => {
  const [songView, setSongView] = useState([] as SongCardProps[]);

  const getSongView = async () => {
    try {
      const { data, status } = await axios.get('/api/songs/get');
      if (status === 200) {
        setSongView(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongView();
  }, []);
  return (
    <>
      <Container fixed sx={{ padding: '24px' }}>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <Box
              component="img"
              alt="Psalted 2.0"
              sx={{ height: '24px', width: '16px' }}
              src={process.env.PUBLIC_URL + `/images/song_logo.svg`}
            />
            <Typography
              color="#4B50B4"
              fontFamily="Roboto"
              fontSize="20px"
              fontStyle="normal"
              fontWeight={700}
              lineHeight="28px"
            >
              SONGS
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            startIcon={<Box component="img" src={process.env.PUBLIC_URL + `/images/add.svg`} />}
          >
            NEW SONG
          </Button>
        </Stack>
        <Stack direction="row" display="flex" justifyContent="space-between" marginTop="12px">
          <TextField />
          <IconButton
            sx={{ backgroundColor: '#4B50B4', borderRadius: 2.5, width: '60px', height: '60px' }}
          >
            <Box component="img" src={process.env.PUBLIC_URL + `/images/filter.svg`} />
          </IconButton>
        </Stack>
        <Button>
          <Typography>SHOW DETAILS</Typography>
        </Button>
        <Stack direction="column" spacing={3}>
          {songView &&
            songView.map((song, i) => {
              return <SongCard key={i} {...song} />;
            })}
        </Stack>
      </Container>
    </>
  );
};

export default SongContainer;
