import { FC, ReactElement, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { SongEditorFields, SongEditorProps } from '../../types/song.types';
import {
  musicKeysOptions,
  tempoOptions,
  timeSignatureOptions,
  themeSelectionLimit,
  themeOptions,
} from '../../constants';
import SongHelpDialog from './SongHelpDialog';
import {
  Box,
  Container,
  useMediaQuery,
  Typography,
  Grid,
  TextField,
  Stack,
  TextareaAutosize,
  FormControl,
  Toolbar,
  Button,
  Divider,
  Alert,
  AlertTitle,
  Snackbar,
  Fade,
  Chip,
  Autocomplete,
} from '@mui/material';

// ICONS
import InfoIcon from '@mui/icons-material/Info';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AutocompleteInput from '../custom/AutocompleteInput';

const SongEditorContainer: FC<SongEditorProps> = ({ actionOnEditor }) => {
  // hook to detect the window size
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // STATES
  const [timeSignature, setTimeSignature] = useState<string | string[] | null>([]);
  const [recommendedKeys, setRecommendedKeys] = useState<string | string[] | null>([]);

  const [tempoList, setTempoList] = useState<string[]>([]);
  const [disabledTempo, setDisabledTempo] = useState<string[]>(tempoOptions);
  const [themeList, setThemeList] = useState<string[]>([]);
  const [disabledTheme, setDisabledTheme] = useState<string[]>(themeOptions);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [invalidSong, setInvalidSong] = useState<string>('');

  // FORM HANDLER
  const { register, handleSubmit, formState } = useForm<SongEditorFields>();
  const { errors } = formState;

  // editor mode is either ADD NEW or EDIT. default is ADD NEW
  const editorMode = (actionOnEditor: string): ReactElement => {
    return (
      <Typography variant="h3" color="white" sx={{ flexGrow: 1 }} gap={1} mx={2}>
        {actionOnEditor ? actionOnEditor : 'New'} Song
      </Typography>
    );
  };

  const handleSaveSong: SubmitHandler<SongEditorFields> = async (data) => {
    try {
      const payload = await axios.post('/api/songs/create', {
        artist: data.artist,
        title: data.title,
        themes: themeList,
        tempo: tempoList,
        year: data.year,
        code: data.code,
        timeSignature: timeSignature,
        simplifiedChordLyrics: data.simplifiedChordLyrics,
        originalKey: data.originalKey,
        recommendedKeys: recommendedKeys,
        chordLyrics: data.chordLyrics,
        // TODO: figure out how to retrieve proper lyrics preview
        lyricsPreview: data.chordLyrics,
      });

      if (payload.status === 200) {
        setInvalidSong('');
        setSuccessSnackbarOpen(true);
        // TODO: redirect to song view page after saving
        return payload.data;
      }

      setSuccessSnackbarOpen(false);
      setInvalidSong('Error saving song!');
      return;
    } catch (error: any) {
      setInvalidSong(error.response.data);
      setSuccessSnackbarOpen(false);
      console.log(error);
    }
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbarOpen(false);
  };

  const handleDeleteTempo = (chipToDelete: string) => () => {
    setTempoList((chips) => chips.filter((chip) => chip !== chipToDelete));
    setDisabledTempo((prevDisabledChips) => [...prevDisabledChips, chipToDelete]);
  };

  const handleReactivateTempo = (chipToActivate: string) => () => {
    setTempoList((prevTempoList) => [...prevTempoList, chipToActivate]);
    setDisabledTempo((prevDisabledChips) =>
      prevDisabledChips.filter((chip) => chip !== chipToActivate)
    );
  };

  const handleDeleteTheme = (chipToDelete: string) => () => {
    setThemeList((chips) => chips.filter((chip) => chip !== chipToDelete));
    setDisabledTheme((prevDisabledChips) => [...prevDisabledChips, chipToDelete]);
  };

  const handleReactivateTheme = (chipToActivate: string) => () => {
    setThemeList((prevTempoList) => [...prevTempoList, chipToActivate]);
    setDisabledTheme((prevDisabledChips) =>
      prevDisabledChips.filter((chip) => chip !== chipToActivate)
    );
  };

  return (
    <Container sx={{ pt: '5em' }}>
      {/* TODO: Mobile view */}
      {/* <Box display={{ base: 'block', md: 'none' }}></Box> */}

      {/* Desktop view */}
      <Box display={isDesktop ? 'block' : 'none'}>
        <form onSubmit={handleSubmit(handleSaveSong)}>
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
            >
              Cancel
            </Button>
          </Toolbar>
          <Divider />

          <Box my={2}>
            {/* Error message */}
            {invalidSong ? (
              <Typography variant={'body2'} color={'error'}>
                {invalidSong}
              </Typography>
            ) : null}

            {/* Success message */}
            <Snackbar
              open={successSnackbarOpen}
              onClose={handleCloseSuccessSnackbar}
              autoHideDuration={6000}
              TransitionComponent={Fade}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="success" onClose={handleCloseSuccessSnackbar}>
                <AlertTitle>Success</AlertTitle>
                Song successfully saved!
              </Alert>
            </Snackbar>

            <Stack direction={['row']} spacing={8} mt={2}>
              {/* column 1: Song Details */}
              <Box width={'35vw'}>
                <Stack direction="column" spacing={2}>
                  {/* header */}
                  <Typography
                    variant="h4"
                    sx={{ display: 'flex', alignItems: 'center', color: 'secondary.main' }}
                    gap={1}
                  >
                    <InfoIcon />
                    Song Details
                  </Typography>

                  {/* Song Title Field */}
                  <TextField
                    id="title"
                    label="Song Title"
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    {...register('title', { required: 'Required' })}
                  />

                  {/* Artist Field */}
                  <TextField
                    id="artist"
                    label="Artist Name"
                    error={!!errors.artist}
                    helperText={errors?.artist?.message}
                    {...register('artist', { required: 'Required' })}
                  />

                  {/* Themes field */}
                  <FormControl fullWidth>
                    <Box>
                      <Typography variant="h4" sx={{ pb: 1 }}>
                        Themes
                      </Typography>
                      {themeOptions.map((item) => (
                        <Chip
                          sx={{
                            backgroundColor: disabledTheme.includes(item)
                              ? 'secondary.lighter'
                              : 'primary.dark',
                            borderRadius: '8px',
                            m: 0.5,
                          }}
                          key={item}
                          label={item}
                          onDelete={
                            disabledTheme.includes(item) ? undefined : handleDeleteTheme(item)
                          }
                          onClick={
                            disabledTheme.includes(item) ? handleReactivateTheme(item) : undefined
                          }
                        />
                      ))}
                    </Box>
                  </FormControl>

                  {/* Tempo field */}
                  <FormControl fullWidth>
                    <Box>
                      <Typography variant="h4" sx={{ pb: 1 }}>
                        Tempo
                      </Typography>
                      {tempoOptions.map((item) => (
                        <Chip
                          sx={{
                            backgroundColor: disabledTempo.includes(item)
                              ? 'secondary.lighter'
                              : 'primary.dark',
                            borderRadius: '8px',
                            m: 0.5,
                          }}
                          key={item}
                          label={item}
                          onDelete={
                            disabledTempo.includes(item) ? undefined : handleDeleteTempo(item)
                          }
                          onClick={
                            disabledTempo.includes(item) ? handleReactivateTempo(item) : undefined
                          }
                        />
                      ))}
                    </Box>
                  </FormControl>

                  {/* Time Signature field */}
                  <FormControl fullWidth>
                    <AutocompleteInput
                      id="time-signature"
                      options={timeSignatureOptions}
                      label="Time Signature"
                      autoComplete="time-signature"
                      value={timeSignature}
                      onChange={(event, newValue) => {
                        setTimeSignature(newValue);
                      }}
                      register={register}
                      multiple
                    />
                  </FormControl>

                  {/* Original Key field */}
                  <FormControl fullWidth>
                    <Autocomplete
                      id="original-key"
                      options={musicKeysOptions}
                      getOptionLabel={(option) => option}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Original Key"
                          error={!!errors.originalKey}
                          helperText={errors?.originalKey?.message}
                          {...register('originalKey', { required: 'Required' })}
                        />
                      )}
                    />
                  </FormControl>

                  {/* Recommended Keys field */}
                  <FormControl fullWidth>
                    <AutocompleteInput
                      id="recommended-keys"
                      options={musicKeysOptions}
                      label="Recommended Keys"
                      autoComplete="recommended-keys"
                      value={recommendedKeys}
                      onChange={(event, newValue) => {
                        setRecommendedKeys(newValue);
                      }}
                      register={register}
                      multiple
                    />
                  </FormControl>

                  {/* Year field */}
                  <TextField
                    id="year"
                    label="Year"
                    type="number"
                    defaultValue={2023}
                    error={!!errors.year}
                    helperText={errors?.year?.message}
                    {...register('year', { required: 'Required' })}
                  />

                  {/* Code field */}
                  <TextField
                    id="code"
                    label="Code"
                    error={!!errors.code}
                    helperText={errors?.code?.message}
                    {...register('code', { required: 'Required' })}
                  />
                </Stack>
              </Box>

              {/* column 2: Lyrics & Chords */}
              <Box width="100%">
                <Stack direction="column" spacing={2}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="h4"
                      sx={{ display: 'flex', alignItems: 'center', color: 'secondary.main' }}
                      gap={1}
                    >
                      <LibraryMusicIcon />
                      Lyrics & Chords
                    </Typography>
                    <SongHelpDialog />
                  </Grid>

                  <TextField
                    id="chord-lyrics"
                    placeholder="Enter lyrics & chords here"
                    multiline
                    error={!!errors.chordLyrics}
                    helperText={errors?.chordLyrics?.message}
                    {...register('chordLyrics', { required: 'Required' })}
                    InputProps={{
                      inputComponent: TextareaAutosize,
                      inputProps: {
                        minRows: 20,
                        style: {
                          resize: 'vertical',
                        },
                      },
                    }}
                  />
                </Stack>

                {/* columns 2: simplified lyrics & chords */}

                <Stack direction="column" spacing={2} marginTop="16px">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="h4"
                      sx={{ display: 'flex', alignItems: 'center', color: 'secondary.main' }}
                      gap={1}
                    >
                      <LibraryMusicIcon />
                      Simplified Lyrics & Chords
                    </Typography>
                    <Box display="flex" gap="8px">
                      <Typography variant="body2">
                        Simplified version without the fancy chords (i.e. Cadd9/E) if available.
                      </Typography>
                    </Box>
                  </Grid>

                  <TextField
                    id="simplified-chord-lyrics"
                    placeholder="Enter lyrics & chords here"
                    multiline
                    error={!!errors.simplifiedChordLyrics}
                    helperText={errors?.simplifiedChordLyrics?.message}
                    {...register('simplifiedChordLyrics', { required: 'Required' })}
                    InputProps={{
                      inputComponent: TextareaAutosize,
                      inputProps: {
                        minRows: 20,
                        style: {
                          resize: 'vertical',
                        },
                      },
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SongEditorContainer;
