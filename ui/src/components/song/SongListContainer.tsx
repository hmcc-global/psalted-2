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
import { SongSchema, SongSearchFilter } from '../../types/song.types';
import SongCard from './SongCard';
import SongSearch from './SongSearch';
import { useNavigate, useLocation } from 'react-router-dom';
import { Add, MusicNote } from '@mui/icons-material';
import PageHeader from '../navigation/PageHeader';
import { getFirstLineLyrics } from '../../helpers/song';
import axios from 'axios';
import { useSongs, useUser } from '../../helpers/customHooks';

const SongListContainer: FC = (): ReactElement => {
  const { user } = useUser();
  const [songResults, setSongResults] = useState<SongSchema[]>([]);
  const [filterData, setFilterData] = useState<SongSearchFilter>();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => setOpen(false);

  const allSongs = useSongs() as SongSchema[];

  const getSongResults = useCallback(async () => {
    if (filterData) {
      console.log(filterData);
      try {
        const payload = await axios.get('/api/songs/search', {
          params: {
            keyword: filterData.search,
            themes: filterData.themes,
            tempo: filterData.tempo,
          },
        });
        console.log(payload.data);
        setSongResults(payload.data);
      } catch (error: any) {
        if (error?.response) {
          if (error.response.status === 404) {
            console.log('No songs found');
            setSongResults([]);
          } else if (error.response.status === 500 || error.response.status === 401) {
            // Handle 500 or 401 errors as needed
          }
        } else {
          console.log('An unexpected error occurred:', error);
        }
      }
    } else {
      setSongResults(allSongs);
    }
  }, [filterData]);

  useEffect(() => {
    const shouldQuery =
      filterData &&
      (filterData.search?.trim() ||
        (filterData.themes && filterData.themes.length > 0) ||
        filterData.tempo);
    if (shouldQuery) {
      const timer = setTimeout(() => {
        getSongResults();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
    return;
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
        sx={{
          py: '1rem',
          px: '1.5rem',
          maxHeight: '100vh',
          height: '100%',
          minWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <PageHeader
          title="Songs"
          icon={<MusicNote />}
          actionButtons={
            <Button
              variant="outlined"
              disabled={user?.accessType !== 'admin'}
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
        <Stack direction="row" maxWidth="100%" height="90vh" width="100%" gap={'1%'}>
          <Box display={isDesktop ? 'flex' : 'none'}>
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
          <Box display="flex" height="100%">
            <Container
              sx={{
                py: '1em',
                background: '#000',
                borderRadius: '16px',
                width: '100%',
                height: '100%',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={'space-between'}
                pb={'1em'}
                height="3%"
                spacing="space-between"
                maxWidth="100%"
              >
                <Typography variant="h3" color="#FFFFFF">
                  Search Results
                </Typography>
                <ButtonGroup variant="outlined">{/* Button group code */}</ButtonGroup>
              </Stack>
              <Stack direction="column" spacing={3} height="97%" overflow="auto" maxWidth="100%">
                {songResults.length > 0 ? (
                  songResults.map((song, i) => {
                    return (
                      <SongCard
                        key={i}
                        {...song}
                        showDetails={showDetails}
                        filterData={filterData}
                        isDesktop={isDesktop}
                        firstLine={getFirstLineLyrics(song.chordLyrics)}
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
