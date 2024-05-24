import { Box, Button, Container, Stack, Typography, Modal, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useEffect, useState, useCallback } from 'react';
import { SongCardProps, SongSearchFilter } from '../../types/song.types';
import SongCard from './SongCard';
import SongSearch from './SongSearch';
import { useNavigate, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MusicNote from '@mui/icons-material/MusicNote';

const SongListContainer: FC = (): ReactElement => {
  const [allSongs, setAllSongs] = useState<SongCardProps[]>([]);
  const [songResults, setSongResults] = useState<SongCardProps[]>([]);
  const [filterData, setFilterData] = useState<SongSearchFilter>();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSongResults = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/songs/get');
      if (status === 200) {
        setAllSongs(data);
        const searchQuery = new URLSearchParams(location.search).get('q');
        setFilterData({ ...filterData, search: searchQuery });

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
          setSongResults(filteredSong);
        } else setSongResults(data);
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
    getSongResults();
  }, [getSongResults, filterData]);

  return (
    <>
      <Container fixed sx={{ padding: '5em 24px 24px', height: '100%' }}>
        {/* Toolbar at the top */}
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          pb="10px"
          pl={{ base: '0', md: '15px' }}
        >
          {/* Title */}
          <Typography variant="h1" color="white" sx={{ display: 'flex', alignItems: 'center' }}>
            <MusicNote
              sx={{
                color: 'primary.light',
                backgroundColor: 'primary.dark',
                borderRadius: '50%',
                width: '2em',
                height: '2em',
                padding: '0.5em',
                mr: 3,
              }}
            />
            Songs
          </Typography>

          {/* Add new song button */}
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
            startIcon={<AddIcon />}
            onClick={() => navigate('/songs/add')}
          >
            <Typography variant="subtitle1">New Song</Typography>
          </Button>
        </Stack>

        {/* TODO: Mobile Search bar and filters */}
        <Box display={{ base: 'block', md: 'none' }}></Box>

        {/* Desktop search bar and filters */}
        <Stack direction="row" width="100%" gap={3}>
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
            {songResults.length > 0 ? (
              songResults.map((song, i) => {
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
