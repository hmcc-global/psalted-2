import { FC, ReactElement, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Container,
  Toolbar,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  AlertTitle,
  Fade,
  Stack,
  TextField,
  FormControl,
  Autocomplete,
  Chip,
  TextareaAutosize,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { SongEditorFields, SongEditorProps } from '#/types/song.types';
import { tempoOptions, musicKeysOptions } from '../../constants';
import SongHelpDialog from './SongHelpDialog';

// ICONS
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InfoIcon from '@mui/icons-material/Info';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const SongEditorMobileView: FC<SongEditorProps> = ({ actionOnEditor }) => {
  // STATES
  const [themes, setThemes] = useState<string[]>([]);
  const [tempo, setTempo] = useState<string[]>([]);
  const [recommendedKeys, setRecommendedKeys] = useState<string[]>([]);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [invalidSong, setInvalidSong] = useState<string>('');

  // FORM HANDLER
  const { register, handleSubmit, formState } = useForm<SongEditorFields>();
  const { errors } = formState;

  // TODO: get theme options from database
  const themeOptions: string[] = ['Love', 'Faith', 'Hope', 'Joy', 'Peace', 'Grace'];

  // editor mode is either ADD NEW or EDIT. default is ADD NEW
  const editorMode = (actionOnEditor: string): ReactElement => {
    return (
      <Typography
        variant="h3"
        fontWeight="700"
        color="primary"
        sx={{ display: 'flex', alignItems: 'center' }}
        gap={1}
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

  return (
    <Container>
      <Toolbar>
        <ArrowBackIosNewIcon color="primary" />
        {editorMode(actionOnEditor)}
      </Toolbar>

      <Box>
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

        <form onSubmit={handleSubmit(handleSaveSong)}>
          <Stack direction="column" spacing={2}>
            {/* Artist Field */}
            <TextField
              fullWidth
              id="artist"
              label="Artist Name"
              error={!!errors.artist}
              helperText={errors?.artist?.message}
              {...register('artist', { required: 'Required' })}
            />

            {/* Song Title Field */}
            <TextField
              fullWidth
              id="title"
              label="Song Title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              {...register('title', { required: 'Required' })}
            />

            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
              <InfoIcon color="primary" />
              Song Details
            </Typography>

            {/* Themes field */}
            <FormControl fullWidth>
              <Autocomplete
                multiple
                id="themes"
                options={themeOptions}
                freeSolo
                filterSelectedOptions
                onChange={(event, newValue) => {
                  setThemes(newValue);
                }}
                value={themes}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Theme"
                    {...register('themes')}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'tempo',
                      required: themes.length === 0,
                    }}
                  />
                )}
              />
            </FormControl>

            {/* Tempo field */}
            <FormControl fullWidth>
              <Autocomplete
                multiple
                id="tempo"
                options={tempoOptions}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={(event, newValue) => {
                  setTempo(newValue);
                }}
                value={tempo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tempo"
                    {...register('tempo')}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'tempo',
                      required: tempo.length === 0,
                    }}
                  />
                )}
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
              <Autocomplete
                multiple
                id="recommended-keys"
                options={musicKeysOptions}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={(event, newValue) => {
                  setRecommendedKeys(newValue);
                }}
                value={recommendedKeys}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Recommended Keys"
                    {...register('recommendedKeys')}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'tempo',
                      required: recommendedKeys.length === 0,
                    }}
                  />
                )}
              />
            </FormControl>

            {/* Year field */}
            <TextField
              fullWidth
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
              fullWidth
              id="code"
              label="Code"
              error={!!errors.code}
              helperText={errors?.code?.message}
              {...register('code', { required: 'Required' })}
            />

            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Typography
                variant="h4"
                sx={{ display: 'flex', alignItems: 'center' }}
                gap={1}
                py={1}
              >
                <LibraryMusicIcon color="primary" />
                Lyrics & Chords
              </Typography>
              <SongHelpDialog />
            </Grid>

            {/* Chord Lyrics field */}
            <TextField
              fullWidth
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

            <Button fullWidth type={'submit'} color={'primary'} variant={'contained'}>
              SAVE
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default SongEditorMobileView;
