import { SetlistEditorFields, SetlistEditorProps } from '#/types/setlist.types';
import { SongCardProps, SongSearchFilter } from '#/types/song.types';
import { Add, Check, Info, MoreVert, MusicNote, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SetlistSongCard from './SetlistSongCard';

const SetlistEditorContainer: FC<SetlistEditorProps> = ({ actionOnEditor }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

  // STATES
  const [date, setDate] = useState<Date | null>(null);
  const [search, setSearch] = useState<string>('');
  const [allSongs, setAllSongs] = useState<SongCardProps[]>([]);
  const [songResults, setSongResults] = useState<SongCardProps[]>([]);
  const [filterData, setFilterData] = useState<SongSearchFilter>();
  const [addedSongs, setAddedSongs] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  // FORM HANDLER
  const { register, handleSubmit, formState } = useForm<SetlistEditorFields>();
  const { errors } = formState;

  // editor mode is either NEW or EDIT. default is NEW
  const editorMode = (actionOnEditor: string): ReactElement => {
    return (
      <Typography variant="h3" color="white" sx={{ flexGrow: 1 }} gap={1} mx={2}>
        {actionOnEditor ? actionOnEditor : 'New'} Setlist
      </Typography>
    );
  };

  const getSongResults = useCallback(async () => {
    try {
      const { data, status } = await axios.get('http://localhost:1338/api/songs/get');
      if (status === 200) {
        setAllSongs(data);

        // TODO: filter logic
        if (search !== '') {
          const songs: SongCardProps[] = data;

          const filteredSongs = songs.filter((song) => song.title.includes(search));
          setSongResults(filteredSongs);
        } else setSongResults(data);
      }
    } catch (error) {}
  }, [search]);

  useEffect(() => {
    getSongResults();
  }, [getSongResults]);

  // add the id to the array of clicked items if it doesn't exist but if it does exist remove it
  // this makes sure that double clicking on an item brings it back to normal
  // change <Add /> to <Check /> at "id"
  const handleAddSong = (id: string) => {
    let result = addedSongs.includes(id)
      ? addedSongs.filter((add) => add != id)
      : [...addedSongs, id];
    setAddedSongs(result);
  };

  const filteredSongResults = songResults.filter((song) => addedSongs.includes(song._id));

  const handleSaveSetlist: SubmitHandler<SetlistEditorFields> = async (data) => {};

  return (
    <Container sx={{ pt: '5em' }}>
      <Box>
        <form onSubmit={handleSubmit(handleSaveSetlist)}>
          <Toolbar>
            {editorMode(actionOnEditor)}
            <Button
              type={'submit'}
              color="secondary"
              variant="contained"
              sx={{
                mr: 1,
                textTransform: 'none',
                borderRadius: '100px',
                px: 3,
              }}
            >
              Save
            </Button>
            <Button
              color={'secondary'}
              sx={{
                textTransform: 'none',
                borderRadius: '100px',
                border: 1,
                px: 2,
              }}
              onClick={() => navigate('/setlist')}
            >
              Cancel
            </Button>
          </Toolbar>

          <Stack direction="row" spacing={10}>
            {/* setlist details and info */}
            <Box display="flex" justifyContent="center" width={'35vw'}>
              <Stack direction="column" spacing={2} width={'100%'}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ color: 'primary.light' }}
                >
                  <Info />
                  <Typography variant="h3" alignItems="center">
                    Details
                  </Typography>
                </Stack>

                {/* Setlist Name Field */}
                <TextField
                  id="name"
                  label="Setlist Name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  {...register('name', { required: 'Required' })}
                />

                {/* Date Field */}
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-us">
                  <DateField label="Date" value={date} onChange={(newValue) => setDate(newValue)} />
                </LocalizationProvider>

                {/* TODO: Add to Folder */}
                <TextField label="Add to Folder (Optional)" />

                {/* Added Songs List */}
                <Box sx={{ pt: 3 }}>
                  <Stack direction="column" spacing={1}>
                    {/* song list header */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ color: 'primary.light' }}
                    >
                      <MusicNote />
                      <Typography variant="h3" alignItems="center">
                        Song List
                      </Typography>
                    </Stack>

                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Song Title</TableCell>
                            <TableCell>Key</TableCell>
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {addedSongs.length > 0 ? (
                            filteredSongResults.map((song, i) => (
                              <TableRow key={song._id} sx={{ '& td': { border: 0 } }}>
                                {/* reorder icon */}

                                {/* number */}
                                <TableCell width="10%">{i + 1}</TableCell>

                                <TableCell width="55%">
                                  <Typography variant="h2">{song.title}</Typography>
                                  <Typography variant="subtitle1" sx={{ color: 'secondary.light' }}>
                                    {song.artist}
                                  </Typography>
                                </TableCell>

                                {/* key for song */}
                                <TableCell width="15%">
                                  <Box
                                    alignContent="center"
                                    sx={{
                                      height: '45px',
                                      width: '45px',
                                      backgroundColor: 'primary.main',
                                      borderRadius: '50%',
                                    }}
                                  >
                                    <Typography color="secondary" variant="h3" align="center">
                                      {song.originalKey}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                {/* delete button */}
                                <TableCell width="10%">
                                  <IconButton>
                                    <MoreVert color="secondary" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell width="10%" sx={{ borderBottom: 0 }} />
                              <TableCell width="55%" sx={{ borderBottom: 0 }}>
                                <Typography
                                  variant="subtitle1"
                                  color="secondary.main"
                                  align="center"
                                  sx={{ pt: 2 }}
                                >
                                  No Songs Added
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </Box>
              </Stack>
            </Box>

            {/* search for songs to add */}
            <Box display="flex" justifyContent="center" width={'35vw'}>
              <Stack direction="column" spacing={2} width={'100%'}>
                {/* header */}
                <Typography variant="h4" sx={{ color: 'primary.light' }}>
                  Search to Add Songs
                </Typography>

                {/* search bar */}
                <Stack
                  sx={{
                    alignItems: 'center',
                    boxShadow:
                      '0px 1px 2px 0px rgba(0, 0, 0, 0.20), 0px 0.1px 0.3px 0px rgba(0, 0, 0, 0.10)',
                    background: '#2B2930',
                    borderRadius: '100px',
                  }}
                  direction="row"
                >
                  <IconButton>
                    <Search sx={{ mx: 2, color: '#CAC4D0' }} />
                  </IconButton>
                  <InputBase
                    placeholder="Search"
                    value={search}
                    fullWidth
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    sx={{
                      my: 1.5,
                      color: '#CAC4D0',
                      backgroundColor: '#2B2930',
                      borderRadius: '28px',
                    }}
                  />
                </Stack>

                {/* search results */}
                {songResults.length > 0 ? (
                  songResults.map((song, i) => (
                    // add songs card
                    <SetlistSongCard
                      key={i}
                      {...song}
                      showDetails={showDetails}
                      filterData={filterData}
                      isDesktop={isDesktop}
                      handleAddSong={handleAddSong}
                      addedSongs={addedSongs}
                    />
                  ))
                ) : (
                  <Typography>Couldn't find "{search}"</Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default SetlistEditorContainer;
