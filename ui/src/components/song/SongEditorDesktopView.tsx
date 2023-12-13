import { FC, ReactElement, useCallback, useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  Stack,
  TextareaAutosize,
  Autocomplete,
  Button,
  Divider,
  Toolbar,
  Chip,
  Alert,
  AlertTitle,
  Snackbar,
  Fade,
  Grid,
} from '@mui/material';
import { musicKeysOptions, tempoOptions, timeSignatureOptions } from '../../constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SongEditorFields, SongEditorProps } from '../../types/song.types';
import SongHelpDialog from './SongHelpDialog';
import AutocompleteInput from '../custom/AutocompleteInput';
import axios from 'axios';

// ICONS
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InfoIcon from '@mui/icons-material/Info';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const SongEditorDesktopView: FC<SongEditorProps> = ({ actionOnEditor }) => {
  // STATES
  const [themes, setThemes] = useState<string | string[] | null>([]);
  const [tempo, setTempo] = useState<string | string[] | null>([]);
  const [timeSignature, setTimeSignature] = useState<string | string[] | null>([]);
  const [recommendedKeys, setRecommendedKeys] = useState<string | string[] | null>([]);
  const [themesList, setThemesList] = useState<string[]>([]);
  const [tempoList, setTempoList] = useState<string[]>(tempoOptions);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [invalidSong, setInvalidSong] = useState<string>('');

  // FORM HANDLER
  const { register, handleSubmit, formState } = useForm<SongEditorFields>();
  const { errors } = formState;

  // editor mode is either ADD NEW or EDIT. default is ADD NEW
  const editorMode = (actionOnEditor: string): ReactElement => {
    return (
      <Typography
        variant="h3"
        color="primary"
        sx={{ display: 'flex', alignItems: 'center' }}
        gap={1}
        mx={2}
      >
        {actionOnEditor === 'EDIT' ? <EditIcon color="primary" /> : <AddIcon color="primary" />}
        {actionOnEditor ? actionOnEditor.toUpperCase() : 'ADD NEW'} SONG
      </Typography>
    );
  };

  const handleSaveSong: SubmitHandler<SongEditorFields> = async (data) => {
    try {
      const payload = await axios.post('/api/songs/create', {
        artist: data.artist,
        title: data.title,
        themes: themes,
        tempo: tempo,
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

  const getSongOptions = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/song-options/list');
      if (status === 200) {
        setThemesList(data.theme);
        setTempoList(data.tempo);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSongOptions();
  }, [getSongOptions]);

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSaveSong)}>
        <Toolbar>
          <ArrowBackIosNewIcon color="primary" />
          {editorMode(actionOnEditor)}
          <Button
            type={'submit'}
            color={'primary'}
            variant={'contained'}
            sx={{ marginLeft: 'auto' }}
          >
            SAVE
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
            <Box width={'30vw'}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                  <InfoIcon color="primary" />
                  Song Details
                </Typography>

                {/* Artist Field */}
                <TextField
                  id="artist"
                  label="Artist Name"
                  error={!!errors.artist}
                  helperText={errors?.artist?.message}
                  {...register('artist', { required: 'Required' })}
                />

                {/* Song Title Field */}
                <TextField
                  id="title"
                  label="Song Title"
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                  {...register('title', { required: 'Required' })}
                />

                {/* Themes field */}
                <FormControl fullWidth>
                  <AutocompleteInput
                    id="themes"
                    options={themesList}
                    label="Theme"
                    autoComplete="themes"
                    value={themes}
                    onChange={(event, newValue) => {
                      setThemes(newValue);
                    }}
                    register={register}
                    multiple
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                  />
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

                {/* Tempo field */}
                <FormControl fullWidth>
                  <AutocompleteInput
                    id="tempo"
                    options={tempoList}
                    label="Tempo"
                    autoComplete="tempo"
                    value={tempo}
                    onChange={(event, newValue) => {
                      setTempo(newValue);
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
                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                    <LibraryMusicIcon color="primary" />
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
                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                    <LibraryMusicIcon color="primary" />
                    Simplified Lyrics & Chords
                  </Typography>
                  <Box display="flex" gap="8px">
                    <Typography variant="body2" color="rgba(0,0,0,0.6)">
                      Simplified version without the fancy chords (i.e. Cadd9/E) if available.
                    </Typography>
                    <HelpOutlineIcon color="secondary" />
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
    </Container>
  );
};

export default SongEditorDesktopView;
