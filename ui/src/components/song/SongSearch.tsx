import {
  Container,
  Typography,
  Box,
  Stack,
  TextField,
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
  Alert,
  Grid,
} from '@mui/material';
import { SongSearchProps, SongCardProps } from '#/types/song.types';
import { useState, useEffect, useCallback } from 'react';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import { timeSignatureOptions } from '../../constants';

const SongSearch = (props: SongSearchProps) => {
  const Songs: SongCardProps[] = props.songs;
  const prevFilter = props.filterData;
  const isDesktop = props.isDesktop;
  const [tempoList, setTempoList] = useState<string[]>([]);
  const [themesList, setThemesList] = useState<string[]>([]);
  const [search, setSearch] = useState(prevFilter?.search ?? '');
  const [timeSignature, setTimeSignature] = useState<string[]>(prevFilter?.timeSignature ?? []);
  const [tempo, setTempo] = useState<string[]>(prevFilter?.tempo ?? []);
  const [themes, setThemes] = useState<string[]>(prevFilter?.themes ?? []);
  const [displayResult, setDisplayResult] = useState(
    prevFilter?.display ?? {
      tempo: true,
      themes: true,
      lyricsPreview: true,
      originalKey: true,
      year: true,
      code: true,
    }
  );

  const handleValueChange = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    return (event: React.ChangeEvent<{}>, value: string[]) => {
      setter(value);
    };
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayResult({
      ...displayResult,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    props.setFilterData({
      search: search,
      timeSignature: timeSignature,
      tempo: tempo,
      themes: themes,
      display: displayResult,
    });
    props.onClose();
  };

  const handleClear = () => {
    props.setFilterData({
      search: undefined,
      timeSignature: undefined,
      tempo: undefined,
      themes: undefined,
      display: {
        tempo: true,
        themes: true,
        lyricsPreview: true,
        originalKey: true,
        year: true,
        code: true,
      },
    });
    setSearch('');
    setTimeSignature([]);
    setTempo([]);
    setThemes([]);
    setDisplayResult({
      tempo: true,
      themes: true,
      lyricsPreview: true,
      originalKey: true,
      year: true,
      code: true,
    });
    props.onClose();
  };

  const getSelectOptions = useCallback(() => {
    const tempTempo: string[] = [];
    const tempThemes: string[] = [];
    Songs &&
      Songs.map((song) => {
        tempTempo.push(...song.tempo);
        tempThemes.push(...song.themes);
        return 0;
      });
    setTempoList(Array.from(new Set(tempTempo)));
    setThemesList(Array.from(new Set(tempThemes)));
  }, [Songs]);

  useEffect(() => {
    getSelectOptions();
  }, [getSelectOptions]);

  return (
    <>
      <Container>
        <Stack direction="row" display={isDesktop ? 'none' : 'flex'} justifyContent="space-between">
          <Typography variant="h2" color="primary.main" marginBottom="16px">
            SEARCH SONGS
          </Typography>
          <Box sx={{ height: '24px', width: '16px' }}>
            <AudiotrackRoundedIcon sx={{ color: 'primary.main' }} />
          </Box>
        </Stack>
        <Stack spacing={2}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="search-bar"
              label="Search"
              variant="outlined"
              value={search}
              fullWidth
              onChange={(e) => {
                setSearch(e.target.value);
                props.setSearch(e.target.value);
              }}
            />
          </Box>
          <Autocomplete
            multiple
            id="timeSignature"
            options={timeSignatureOptions}
            value={timeSignature}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Time Signature" placeholder="4/4" />
            )}
            onChange={handleValueChange(setTimeSignature)}
          />
          <Autocomplete
            multiple
            id="tempo"
            options={tempoList}
            value={tempo}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Tempo" placeholder="tempo" />}
            onChange={handleValueChange(setTempo)}
          />
          <Autocomplete
            multiple
            id="themes"
            options={themesList}
            value={themes}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Themes" placeholder="theme" />}
            onChange={handleValueChange(setThemes)}
          />
          <FormControl
            sx={{ m: 1, border: '2px solid #DDE0FF', borderRadius: 4, p: 2 }}
            component="fieldset"
            variant="standard"
          >
            <FormLabel component="legend">Display Results Details (optional)</FormLabel>
            <FormGroup>
              <Grid container columns={8}>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={displayResult.tempo}
                        onChange={handleDisplayChange}
                        name="tempo"
                      />
                    }
                    label="Tempo"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={displayResult.lyricsPreview}
                        onChange={handleDisplayChange}
                        name="lyricsPreview"
                      />
                    }
                    label="Lyrics Preview"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={displayResult.year}
                        onChange={handleDisplayChange}
                        name="year"
                      />
                    }
                    label="Year"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={displayResult.themes}
                        onChange={handleDisplayChange}
                        name="themes"
                      />
                    }
                    label="Themes"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={displayResult.originalKey}
                        onChange={handleDisplayChange}
                        name="originalKey"
                      />
                    }
                    label="Original Key"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={displayResult.code}
                        onChange={handleDisplayChange}
                        name="code"
                      />
                    }
                    label="Code"
                  />
                </Grid>
              </Grid>
              <Alert severity="info">Song Title and Artist will be displayed by default</Alert>
            </FormGroup>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            SEARCH
          </Button>
          <Button sx={{ backgroundColor: '#666666' }} variant="contained" onClick={handleClear}>
            CLEAR
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default SongSearch;
