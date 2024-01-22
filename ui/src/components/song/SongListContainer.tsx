import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  IconButton,
  Modal,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useEffect, useState, useCallback } from 'react';
import { SongCardProps, SongSearchFilter } from '../../types/song.types';
import SongCard from './SongCard';
import SongSearch from './SongSearch';
import { useNavigate } from 'react-router-dom';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';

const SongListContainer: FC = (): ReactElement => {
  const [allSongs, setAllSongs] = useState<SongCardProps[]>([]);
  const [songView, setSongView] = useState<SongCardProps[]>([]);
  const [filterData, setFilterData] = useState<SongSearchFilter>();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

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
              ((filterData.search
                ? song.artist && song.artist.includes(filterData.search)
                : true) ||
                (filterData.search ? song.title && song.title.includes(filterData.search) : true) ||
                (filterData.search
                  ? song.lyricsPreview && song.lyricsPreview.includes(filterData.search)
                  : true) ||
                (filterData.search
                  ? song.themes && song.themes.includes(filterData.search)
                  : true)) &&
              (filterData.timeSignature
                ? filterData.timeSignature.every((time) => song.timeSignature.includes(time))
                : true) &&
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

  const modalSearchStyle = {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    bgcolor: 'background.paper',
    p: '32px 16px',
  };

  useEffect(() => {
    getSongView();
  }, [getSongView, filterData]);

  return (
    <>
      <Container fixed sx={{ padding: '0 24px 24px', height: '100%' }}>
        {/* Toolbar at the top */}
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          pb="10px"
          pl={{ base: '0', md: '15px' }}
        >
          {/* Title */}
          <Typography variant="h2" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <AudiotrackRoundedIcon color="primary" fontSize="large" />
            SONGS
          </Typography>

          {/* Add new song button */}
          <Button
            variant="outlined"
            sx={{ borderWidth: '2px', padding: '10px 25px' }}
            startIcon={<AddIcon />}
            onClick={() => navigate('/songs/add')}
          >
            <Typography fontWeight="500">NEW SONG</Typography>
          </Button>
        </Stack>

        {/* Mobile Search bar and filters */}
        <Box display={{ base: 'block', md: 'none' }}>
          <Stack
            spacing={2}
            direction="row"
            display="flex"
            justifyContent="space-between"
            marginTop="12px"
          >
            <TextField
              id="search-bar"
              label="Search"
              variant="filled"
              placeholder="Search by title, artist, lyrics, or theme"
              fullWidth
              sx={{
                backgroundColor: 'primary.lightest',
                borderRadius: '8px',
              }}
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
              <TuneIcon sx={{ color: 'white' }} />
            </IconButton>
          </Stack>

          {/* Show song details or not (option only shows in mobile) */}
          <Button
            variant="outlined"
            sx={{ borderWidth: '2px', margin: '5px 0 15px 0' }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <Typography variant="caption">SHOW DETAILS</Typography>
          </Button>
        </Box>

        {/* Desktop search bar and filters */}
        <Stack direction="row" width="100%">
          <Box display={isDesktop ? 'block' : 'none'}>
            <SongSearch
              filterData={filterData}
              setFilterData={setFilterData}
              onClose={handleClose}
              songs={allSongs}
              setSearch={setSearch}
              isDesktop={isDesktop}
            />
          </Box>

          {/* Song cards search results */}
          <Stack direction="column" spacing={3} height="100%" width="100%">
            {songView.length > 0 ? (
              songView.map((song, i) => {
                return (
                  <SongCard
                    key={i}
                    {...song}
                    showDetails={showDetails}
                    filterData={filterData}
                    isDesktop={isDesktop}
                  />
                );
              })
            ) : (
              // Error message when no songs are found
              <Stack height="80%" display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h2" color="primary.main">
                  Couldn't find "{filterData?.search}"
                </Typography>
                <Typography variant="body2">Try searching again</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>

      {/* Mobile search filters modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalSearchStyle}>
          <SongSearch
            filterData={filterData}
            setFilterData={setFilterData}
            onClose={handleClose}
            songs={allSongs}
            setSearch={setSearch}
            isDesktop={false}
          />
        </Box>
      </Modal>
    </>
  );
};

export default SongListContainer;
