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
} from '@mui/material';
import { SongSearchProps, SongCardProps } from '../../types/song';
import { useState, useEffect, useCallback } from 'react';

const SongSearch = (props: SongSearchProps) => {
  const Songs: SongCardProps[] = props.songs;
  const prevFilter = props.filterData;
  const [tempoList, setTempoList] = useState([] as String[]);
  const [themesList, setThemesList] = useState([] as String[]);
  const [search, setSearch] = useState(prevFilter?.search ?? '');
  const [tempo, setTempo] = useState(prevFilter?.tempo ?? ([] as String[]));
  const [themes, setThemes] = useState(prevFilter?.themes ?? ([] as String[]));
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

  const handleTempoChange = (event: React.ChangeEvent<{}>, value: String[]) => {
    setTempo(value);
  };

  const handleThemeChange = (event: React.ChangeEvent<{}>, value: String[]) => {
    setThemes(value);
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayResult({
      ...displayResult,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    props.setFilterData({ search: search, tempo: tempo, themes: themes, display: displayResult });
    props.onClose();
  };

  const getSelectOptions = useCallback(() => {
    const tempTempo: String[] = [];
    const tempThemes: String[] = [];
    Songs &&
      Songs.map((song) => {
        tempTempo.push(...song.tempo);
        tempThemes.push(...song.themes);
        return 0;
      });
    setTempoList(Array.from(new Set(tempTempo)));
    setThemesList(Array.from(new Set(tempThemes)));
  }, [Songs]);

  // const checkboxStyle = {
  //   color: 'rgba(0, 0, 0, 0.54)',
  //   '&$checked': {
  //     color: 'rgba(0, 0, 0, 0.54)',
  //   },
  //   borderRadius: '50%',
  //   padding: '5px',
  //   border: '2px solid rgba(0, 0, 0, 0.54)',
  // };

  useEffect(() => {
    getSelectOptions();
  }, [getSelectOptions]);
  return (
    <>
      <Container>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Typography
            color="#4B50B4"
            fontFamily="Roboto"
            fontSize="20px"
            fontStyle="normal"
            fontWeight={700}
            lineHeight="28px"
          >
            SEARCH SONGS
          </Typography>
          <Box
            component="img"
            alt="Psalted 2.0"
            sx={{ height: '24px', width: '16px' }}
            src={process.env.PUBLIC_URL + `/images/song_logo.svg`}
          />
        </Stack>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="search-bar"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Box>
        <Autocomplete
          multiple
          id="tempo"
          options={tempoList}
          value={tempo}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Tempo" placeholder="tempo" />}
          onChange={handleTempoChange}
        />
        <Autocomplete
          multiple
          id="themes"
          options={themesList}
          value={themes}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Themes" placeholder="theme" />}
          onChange={handleThemeChange}
        />
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Display Results Details (optional)</FormLabel>
          <FormGroup>
            <Stack direction="row">
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
            </Stack>
            <Stack direction="row">
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
            </Stack>
          </FormGroup>
        </FormControl>
        <Button onClick={handleSubmit}>SEARCH</Button>
      </Container>
    </>
  );
};

export default SongSearch;
