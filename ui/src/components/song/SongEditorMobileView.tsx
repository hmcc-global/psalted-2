// TODO: Can we use the same component for both mobile and desktop?
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
import AutocompleteInput from '../custom/AutocompleteInput';

// ICONS
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InfoIcon from '@mui/icons-material/Info';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const SongEditorMobileView: FC<SongEditorProps> = ({ actionOnEditor }) => {
  // STATES
  const [themes, setThemes] = useState<string | string[] | null>([]);
  const [tempo, setTempo] = useState<string | string[] | null>([]);
  const [recommendedKeys, setRecommendedKeys] = useState<string | string[] | null>([]);

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
        // make the preview from the start of the first # to right before the second #
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
              <AutocompleteInput
                id="themes"
                options={themeOptions}
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

            {/* Tempo field */}
            <FormControl fullWidth>
              <AutocompleteInput
                id="tempo"
                options={tempoOptions}
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
