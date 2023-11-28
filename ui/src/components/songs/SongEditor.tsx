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
} from '@mui/material';
import { Info, LibraryMusic, Edit, ArrowBackIosNew, Add } from '@mui/icons-material';
import { PRIMARY_MAIN } from '../../theme';
import { musicKeysOptions, tempoOptions } from '../../constants';

interface SongEditorProps {
  actionOnEditor: string;
}

const SongEditor: FC<SongEditorProps> = ({ actionOnEditor }) => {
  const [theme, setTheme] = useState<string[]>([]);
  const [tempo, setTempo] = useState<string[]>([]);
  const [recommendedKeys, setRecommendedKeys] = useState<string[]>([]);

  const themeOptions: string[] = [];

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
        {/* either ADD NEW or EDIT. default is ADD NEW */}
        {actionOnEditor === 'EDIT' ? (
          <Edit sx={{ color: PRIMARY_MAIN }} />
        ) : (
          <Add sx={{ color: PRIMARY_MAIN }} />
        )}
        {actionOnEditor ? actionOnEditor.toUpperCase() : 'ADD NEW'} SONG
      </Typography>
    );
  };

  return (
    <Container>
      <Toolbar>
        <ArrowBackIosNew sx={{ color: PRIMARY_MAIN }} />
        {titleEditor(actionOnEditor)}
        <Button type={'submit'} color={'primary'} variant={'contained'} sx={{ marginLeft: 'auto' }}>
          SAVE
        </Button>
      </Toolbar>
      <Divider />

      <Box my={2}>
        <Stack direction={['row']} spacing={8}>
          {/* column 1 */}
          <Box width={'30vw'}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                <Info sx={{ color: '#4B50B4' }} />
                Song Details
              </Typography>

              <TextField id="artist" label="Artist Name" />
              <TextField id="song_title" label="Song Title" />

              {/* Themes field */}
              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={themeOptions}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Theme" />
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
                    <TextField {...params} variant="outlined" label="Tempo" />
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
                    <TextField {...params} variant="outlined" label="Original Key" />
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
                    <TextField {...params} variant="outlined" label="Recommended Keys" />
                  )}
                />
              </FormControl>
            </Stack>
          </Box>

          {/* column 2 */}
          <Box width="100%">
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                <LibraryMusic sx={{ color: PRIMARY_MAIN }} />
                Lyrics & Chords
              </Typography>

              <TextareaAutosize minRows={10} placeholder="Enter lyrics & chords here" />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default SongEditor;
