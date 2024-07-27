import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Modal,
  useMediaQuery,
  ButtonGroup,
} from '@mui/material';
import { FC, ReactElement, useEffect, useState, useCallback } from 'react';
import { SongSearchFilter, SongViewSchema } from '../../types/song.types';
import SongCard from './SongCard';
import SongSearch from './SongSearch';
import { useNavigate, useLocation } from 'react-router-dom';
import { Add, MusicNote } from '@mui/icons-material';
import PageHeader from '../navigation/PageHeader';
import { getFirstLineLyrics } from '../../helpers/song';
import { useSongs } from '../../helpers/customHooks';

const SongListContainer: FC = (): ReactElement => {
  const [songResults, setSongResults] = useState<SongViewSchema[]>([]);
  const [filterData, setFilterData] = useState<SongSearchFilter>();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const allSongs = useSongs() as SongViewSchema[];

  const getSongResults = useCallback(async () => {
    if (filterData) {
      // filter the song based on data
      const filteredSong = allSongs.filter(
        (song) =>
          ((filterData.search
            ? song.artist && song.artist.toLowerCase().includes(filterData.search.toLowerCase())
            : true) ||
            (filterData.search
              ? song.title && song.title.toLowerCase().includes(filterData.search.toLowerCase())
              : true) ||
            (filterData.search
              ? song.lyricsPreview &&
                song.lyricsPreview.toLowerCase().includes(filterData.search.toLowerCase())
              : true) ||
            (filterData.search
              ? song.themes &&
                song.themes.map((t) => t.toLowerCase()).includes(filterData.search.toLowerCase())
              : true)) &&
          (filterData.timeSignature
            ? filterData.timeSignature.every((time) => song.timeSignature.includes(time))
            : true) &&
          (filterData.themes && filterData.themes.length > 0
            ? filterData.themes.some((theme) => song.themes?.includes(theme))
            : true) &&
          (filterData.tempo && filterData.tempo.length > 0
            ? filterData.tempo.some((tempo) =>
                song.tempo.map((t) => t.toLowerCase()).includes(tempo.toLowerCase())
              )
            : true)
      );
      setSongResults(filteredSong);
    } else setSongResults(allSongs);
  }, [filterData]);

  useEffect(() => {
    getSongResults();
  }, [filterData]);

  useEffect(() => {
    if (location.search) {
      const searchQuery = new URLSearchParams(location.search).get('q');
      setFilterData({ ...filterData, search: searchQuery });
    }
  }, [location.search]);

  const modalSearchStyle = {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    bgcolor: 'background.paper',
    p: '32px 16px',
  };

  const [viewOption, setViewOption] = useState<string>('cards');

  return (
    <>
      <Container
        fixed
        sx={{ py: '1rem', px: '1.5rem', height: '100%', minWidth: '100%', overflow: 'auto' }}
      >
        <PageHeader
          title="Songs"
          icon={<MusicNote />}
          actionButtons={
            <Button
              variant="outlined"
              sx={{
                border: 0,
                padding: '10px 25px',
                borderRadius: '40px',
                backgroundColor: '#D0BCFF',
                color: '#381E72',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#D0BCFF',
                  opacity: '0.95',
                },
                transition: 'all 0.1s ease-in-out',
              }}
              startIcon={<Add />}
              onClick={() => navigate('/song/add')}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                New Song
              </Typography>
            </Button>
          }
        />

        {/* TODO: Mobile Search bar and filters */}
        <Box display={{ base: 'block', md: 'none' }}></Box>

        {/* Desktop filter menu */}
        <Stack direction="row" maxWidth="100%" width="100%" gap={'1%'}>
          <Box flex="0 0 28%" display={isDesktop ? 'flex' : 'none'}>
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
          <Box flex="0 0 71%" display="flex">
            <Container
              sx={{
                py: '1em',
                background: '#000',
                borderRadius: '16px',
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={'space-between'}
                pb={'1em'}
                spacing="space-between"
                maxWidth="100%"
              >
                <Typography variant="h3" color="#FFFFFF">
                  Search Results
                </Typography>
                <ButtonGroup variant="outlined">{/* Button group code */}</ButtonGroup>
              </Stack>
              <Stack direction="column" spacing={3} height="100%" maxWidth="100%">
                {songResults.length > 0 ? (
                  songResults.map((song, i) => {
                    return (
                      <SongCard
                        key={i}
                        {...song}
                        showDetails={showDetails}
                        filterData={filterData}
                        isDesktop={isDesktop}
                        firstLine={getFirstLineLyrics(song.lyricsPreview)}
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
            </Container>
          </Box>
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
