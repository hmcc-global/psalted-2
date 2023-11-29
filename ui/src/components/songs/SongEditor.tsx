import { FC, ReactElement, useState } from 'react';
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
} from '@mui/material';
import { Info, LibraryMusic, Edit, ArrowBackIosNew, Add } from '@mui/icons-material';
import { PRIMARY_MAIN } from '../../theme';
import { musicKeysOptions, tempoOptions } from '../../constants';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { SongEditorFields } from '#/types/song.types';
import axios from 'axios';

interface SongEditorProps {
  actionOnEditor: string;
}

const SongEditor: FC<SongEditorProps> = ({ actionOnEditor }) => {
  const [themes, setThemes] = useState<string[]>([]);
  const [tempo, setTempo] = useState<string[]>([]);
  const [recommendedKeys, setRecommendedKeys] = useState<string[]>([]);
  const [invalidSong, setInvalidSong] = useState<string>('');

  const { register, handleSubmit, formState, control } = useForm<SongEditorFields>();
  const { errors } = formState;

  const themeOptions: string[] = ['Love', 'Faith', 'Hope', 'Joy', 'Peace', 'Grace'];

  // either ADD NEW or EDIT. default is ADD NEW
  const titleEditor = (actionOnEditor: string): ReactElement => {
    return (
      <Typography
        variant="h3"
        fontWeight="700"
        color="primary"
        sx={{ display: 'flex', alignItems: 'center' }}
        gap={1}
        mx={2}
      >
        {actionOnEditor === 'EDIT' ? (
          <Edit sx={{ color: PRIMARY_MAIN }} />
        ) : (
          <Add sx={{ color: PRIMARY_MAIN }} />
        )}
        {actionOnEditor ? actionOnEditor.toUpperCase() : 'ADD NEW'} SONG
      </Typography>
    );
  };

  const handleSaveSong: SubmitHandler<SongEditorFields> = async (data) => {
    try {
      console.log('themes', data.themes);
      console.log('tempo', tempo);

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
        lyricsPreview: data.chordLyrics,
      });

      if (payload.status === 200) {
        console.log('Successfully saved song!');
        setInvalidSong('');
        return payload.data;
      }
      console.log('Error saving song!');
      setInvalidSong('Error saving song!');
      return;
    } catch (error: any) {
      setInvalidSong(error.response.data);
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSaveSong)}>
        <Toolbar>
          <ArrowBackIosNew sx={{ color: PRIMARY_MAIN }} />
          {titleEditor(actionOnEditor)}
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

          <Stack direction={['row']} spacing={8}>
            {/* column 1: Song Details */}
            <Box width={'30vw'}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                  <Info sx={{ color: '#4B50B4' }} />
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
                <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                  <LibraryMusic sx={{ color: PRIMARY_MAIN }} />
                  Lyrics & Chords
                </Typography>

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

export default SongEditor;
