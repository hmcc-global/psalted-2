import { FC, ReactElement, useState, Dispatch, SetStateAction } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Stack,
} from '@mui/material';
import { Info, LibraryMusic } from '@mui/icons-material';
import { PRIMARY_MAIN } from '../../theme';
import { musicKeys } from '../../constants';

const SongEditor: FC = (): ReactElement => {
  const [theme, setTheme] = useState<string[]>([]);
  const [tempo, setTempo] = useState<string[]>([]);
  const [recommendedKeys, setRecommendedKeys] = useState<string[]>([]);

  const handleChange =
    (setter: Dispatch<SetStateAction<string[]>>) => (event: SelectChangeEvent<string[]>) => {
      const {
        target: { value },
      } = event;
      setter(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      );
    };

  return (
    <Container>
      <Stack direction={['row']} spacing={8}>
        <Box width={'30vw'}>
          <Stack direction="column" spacing={2}>
            <Typography>
              <Info sx={{ color: '#4B50B4' }} />
              Song Details
            </Typography>

            <TextField id="artist" label="Artist Name" />
            <TextField id="song_title" label="Song Title" />

            {/* Themes field */}
            <FormControl fullWidth>
              <InputLabel id="theme-label">Theme</InputLabel>
              <Select
                id="theme"
                labelId="theme-label"
                label="Theme"
                multiple
                value={theme}
                onChange={handleChange(setTheme)}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {theme.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Tempo field */}
            <FormControl fullWidth>
              <InputLabel id="tempo-label">Tempo</InputLabel>
              <Select
                id="tempo"
                labelId="tempo-label"
                label="Tempo"
                multiple
                value={tempo}
                onChange={handleChange(setTempo)}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {tempo.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Original Key field */}
            <FormControl fullWidth>
              <InputLabel id="original-key-label">Original Key</InputLabel>
              <Select id="original-key" labelId="original-key-label" label="Original Key">
                {musicKeys.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Recommended Keys field */}
            <FormControl fullWidth>
              <InputLabel id="recommended-keys-label">Recommended Keys</InputLabel>
              <Select
                id="recommended-keys"
                labelId="recommended-keys-label"
                label="Recommended Keys"
                multiple
                value={recommendedKeys}
                onChange={handleChange(setRecommendedKeys)}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {musicKeys.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
        <Box>
          <Stack direction="column" spacing={2}>
            <Typography>
              <LibraryMusic sx={{ color: PRIMARY_MAIN }} />
              Lyrics & Chords
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SongEditor;
