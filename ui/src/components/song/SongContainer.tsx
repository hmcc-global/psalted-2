import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  IconButton,
  Modal,
} from '@mui/material';
import axios from 'axios';
import { FC, ReactElement } from 'react';
import { useEffect, useState, useCallback } from 'react';
import { SongCardProps, SongSearchFilter } from '../../types/song';
import SongCard from './SongCard';
import SongSearch from './SongSearch';

const SongContainer: FC = (): ReactElement => {
  const [allSongs, setAllSongs] = useState([] as SongCardProps[]);
  const [songView, setSongView] = useState([] as SongCardProps[]);
  const [filterData, setFilterData] = useState<SongSearchFilter>();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSongView = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/songs/get');
      if (status === 200) {
        setAllSongs(data);
        if (filterData) {
          const songs: SongCardProps[] = data;
          // filter the song based on data
          const filteredSong = songs.filter(
            (song) =>
              ((filterData.search ? song.artist.includes(filterData.search) : true) ||
                (filterData.search ? song.title.includes(filterData.search) : true) ||
                (filterData.search ? song.lyricsPreview.includes(filterData.search) : true) ||
                (filterData.search ? song.themes.includes(filterData.search) : true)) &&
              (filterData.themes
                ? filterData.themes.every((theme) => song.themes.includes(theme))
                : true) &&
              (filterData.tempo
                ? filterData.tempo.every((tempo) => song.tempo.includes(tempo))
                : true)
          );
          setSongView(filteredSong);
        } else setSongView(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [filterData]);

  const style = {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    bgcolor: 'background.paper',
    p: 4,
  };

  useEffect(() => {
    getSongView();
  }, [getSongView, filterData]);
  console.log(songView);
  console.log(filterData);
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
          <TextField
            id="search-bar"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setFilterData({ ...filterData, search: e.target.value });
            }}
          />
          <IconButton
            onClick={handleOpen}
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
              return <SongCard key={i} {...song} filterData={filterData} />;
            })}
        </Stack>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SongSearch
            filterData={filterData}
            setFilterData={setFilterData}
            onClose={handleClose}
            songs={allSongs}
            setSearch={setSearch}
          />
        </Box>
      </Modal>
    </>
  );
};

export default SongContainer;
