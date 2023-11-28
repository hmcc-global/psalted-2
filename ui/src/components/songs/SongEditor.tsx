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
import { SubmitHandler, useForm } from 'react-hook-form';
import { SongEditorFields } from '#/types/song.types';
import axios from 'axios';

interface SongEditorProps {
  actionOnEditor: string;
}

const SongEditor: FC<SongEditorProps> = ({ actionOnEditor }) => {
  const [invalidSong, setInvalidSong] = useState<string>('');

  const { register, handleSubmit, formState } = useForm<SongEditorFields>();
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
      const payload = await axios.post('/api/songs/create', {
        artist: data.artist,
        title: data.title,
        themes: data.themes,
        tempo: data.tempo,
        year: data.year,
        code: data.code,
        originalKey: data.originalKey,
        recommendedKeys: data.recommendedKeys,
        chordLyrics: data.chordLyrics,
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
                    id="tags-outlined"
                    options={themeOptions}
                    freeSolo
                    filterSelectedOptions
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
                        error={!!errors.themes}
                        helperText={errors?.themes?.message}
                        {...register('themes', { required: 'Required' })}
                      />
                    )}
                  />
                </FormControl>

                {/* Tempo field */}
                <FormControl fullWidth>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={tempoOptions}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Tempo"
                        error={!!errors.tempo}
                        helperText={errors?.tempo?.message}
                        {...register('tempo', { required: 'Required' })}
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Recommended Keys"
                        {...register('recommendedKeys')}
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

                <TextareaAutosize
                  minRows={10}
                  placeholder="Enter lyrics & chords here"
                  {...register('chordLyrics', { required: 'Required' })}
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
