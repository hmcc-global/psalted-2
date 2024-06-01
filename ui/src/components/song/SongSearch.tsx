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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import { SongSearchProps, SongCardProps } from '../../types/song.types';
import { useState, useEffect, useCallback } from 'react';
import {
  timeSignatureOptions,
  tempoOptions,
  themeOptions,
  displayResultOptions,
} from '../../constants';
import { Info, Refresh, Tune } from '@mui/icons-material';

const SongSearch = (props: SongSearchProps) => {
  const Songs: SongCardProps[] = props.songs;
  const prevFilter = props.filterData;
  const isDesktop = props.isDesktop;

  const [tempoList, setTempoList] = useState<string[]>([]);
  const [disabledTempo, setDisabledTempo] = useState<string[]>(tempoOptions);
  const [themeList, setThemeList] = useState<string[]>([]);
  const [disabledTheme, setDisabledTheme] = useState<string[]>(themeOptions);
  const [displayResultList, setDisplayResultList] = useState<string[]>([]);
  const [disabledDisplayResult, setDisabledDisplayResult] =
    useState<string[]>(displayResultOptions);

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
      timeSignature: true,
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
        timeSignature: true,
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
      timeSignature: true,
    });
    props.onClose();
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

  const handleDeleteDisplayResult = (chipToDelete: string) => () => {
    setDisplayResultList((chips) => chips.filter((chip) => chip !== chipToDelete));
    setDisabledDisplayResult((prevDisabledChips) => [...prevDisabledChips, chipToDelete]);
  };

  const handleReactivateDisplayResult = (chipToActivate: string) => () => {
    setDisplayResultList((prevTempoList) => [...prevTempoList, chipToActivate]);
    setDisabledDisplayResult((prevDisabledChips) =>
      prevDisabledChips.filter((chip) => chip !== chipToActivate)
    );
  };

  return (
    <Container sx={{ py: '2em', background: '#000', borderRadius: '16px' }}>
      <Box sx={{ color: '#9E9E9E' }}>
        {/* filter heading and reset button */}
        <Stack direction="row" alignItems="center" pb={3} gap={1} spacing="space-between">
          <Tune />
          <Typography variant="h3">Filter</Typography>
          <Button
            sx={{
              padding: '10px 25px',
              borderRadius: '16px',
              backgroundColor: '#000',
              color: 'secondary.main',
              textTransform: 'none',
              width: '10em',
            }}
            startIcon={<Refresh />}
            onClick={handleClear}
          >
            Reset All
          </Button>
        </Stack>

        <Stack direction="column" gap={2.5}>
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
                onDelete={disabledTempo.includes(item) ? undefined : handleDeleteTempo(item)}
                onClick={disabledTempo.includes(item) ? handleReactivateTempo(item) : undefined}
              />
            ))}
          </Box>

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
                onDelete={disabledTheme.includes(item) ? undefined : handleDeleteTheme(item)}
                onClick={disabledTheme.includes(item) ? handleReactivateTheme(item) : undefined}
              />
            ))}
          </Box>

          <Box>
            <Typography variant="h4" sx={{ pb: 1 }}>
              Display Results Details
            </Typography>
            {displayResultOptions.map((item) => (
              <Chip
                sx={{
                  backgroundColor: disabledDisplayResult.includes(item)
                    ? 'secondary.lighter'
                    : 'primary.dark',
                  borderRadius: '8px',
                  m: 0.5,
                }}
                key={item}
                label={item}
                onDelete={
                  disabledDisplayResult.includes(item) ? undefined : handleDeleteDisplayResult(item)
                }
                onClick={
                  disabledDisplayResult.includes(item)
                    ? handleReactivateDisplayResult(item)
                    : undefined
                }
              />
            ))}
          </Box>

          <Stack
            sx={{ border: 1, p: 1, borderRadius: '4px', borderColor: '#625B71' }}
            direction="row"
            alignItems="center"
            gap={1}
          >
            <Info sx={{ color: '#E8DEF8' }} />
            <Typography variant="body1">Song Title will be displayed by default</Typography>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default SongSearch;
