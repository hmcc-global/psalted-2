import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SongViewSchema } from '../../types/song.types';
import {
  Container,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
  Chip,
  IconButton,
  useMediaQuery,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SongsLyrics from './SongsLyrics';
import { flatMusicKeysOptions, sharpMusicKeysOptions } from '../../constants';
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import { Share } from '@mui/icons-material';
import SongsInfoCard from './SongsInfoCard';

type SongsButtonCardProps = {
  song: SongViewSchema | undefined;
  userView?: boolean;
  userHeader?: boolean;
};

const SongsButtonsCard = ({ song, userView = false, userHeader = false }: SongsButtonCardProps) => {
  const [chordStatus, setChordStatus] = useState(false);
  const [useFlat, setUseFlat] = useState(false);
  const [count, setCount] = useState(sharpMusicKeysOptions.indexOf(song?.originalKey ?? 'C'));
  const [split, setSplit] = useState(1);
  const theme = useTheme();

  const isDesktop = useMediaQuery('(min-width:768px)');
  const navigate = useNavigate();
  const buttonClass = {
    display: 'flex',
    justifyContent: 'center',
    background: '#141218',
    padding: '1px 12px',
    borderRadius: '4px',
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (event: React.ChangeEvent<{}>, value: boolean) => {
      setter(value);
    };
  };

  const handleIncrement = () => {
    if (count < 11) setCount(count + 1);
    else setCount(0);
  };

  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
    else setCount(11);
  };

  const handleSplit = () => {
    if (split < 3) setSplit(split + 1);
    else setSplit(1);
  };

  useEffect(() => {
    setCount(sharpMusicKeysOptions.indexOf(song?.originalKey ?? 'C'));
  }, [song]);

  return (
    <Container style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          width: '100%',
          py: 2,
          pl: '4px',
        }}
      >
        <Stack direction="row" spacing={1}>
          {/* key settings */}
          <Stack
            direction="row"
            spacing={{ sm: 1, md: 1.5 }}
            alignItems={'center'}
            sx={{ background: '#141218', p: 1, borderRadius: '4px' }}
          >
            <Box padding="6px 6px" sx={{ width: '40px', height: '40px' }}>
              <Typography color="secondary.main">Key</Typography>
            </Box>

            {/* key - down arrow */}
            <Box bgcolor="primary.main" sx={{ borderRadius: '4px' }}>
              <IconButton aria-label="down" onClick={handleDecrement}>
                <KeyboardArrowDownIcon sx={{ color: 'primary.lightest' }} />
              </IconButton>
            </Box>

            <Chip
              label={useFlat ? flatMusicKeysOptions[count] : sharpMusicKeysOptions[count]}
              sx={{ background: '#322F35' }}
            />

            {/* key - up arrow */}
            <Box bgcolor="primary.main" sx={{ borderRadius: '4px' }}>
              <IconButton aria-label="up" onClick={handleIncrement}>
                <KeyboardArrowUpIcon sx={{ color: 'primary.lightest' }} />
              </IconButton>
            </Box>
          </Stack>

          {/* chords toggle */}
          <Box fontSize={{ sm: '16px', md: '26px' }} style={buttonClass}>
            <FormGroup style={{ justifyContent: 'center' }}>
              <FormControlLabel
                labelPlacement="start"
                sx={{ color: 'secondary.main' }}
                control={
                  <Switch
                    checked={chordStatus}
                    onChange={handleChange(setChordStatus)}
                    name="chords"
                  />
                }
                label="Chords"
              />
            </FormGroup>
          </Box>

          {/* flat toggle */}
          <Box fontSize={{ sm: '16px', md: '26px' }} style={buttonClass}>
            <FormGroup style={{ justifyContent: 'center' }}>
              <FormControlLabel
                labelPlacement="start"
                sx={{ color: 'secondary.main' }}
                control={
                  <Switch checked={useFlat} onChange={handleChange(setUseFlat)} name="flat" />
                }
                label="Flat"
              />
            </FormGroup>
          </Box>

          {/* split columns settings */}
          <Stack
            direction="row"
            spacing={2}
            display={isDesktop ? 'flex' : 'none'}
            alignItems={'center'}
            sx={{ background: '#141218', p: 1, borderRadius: '4px' }}
          >
            <Box>
              <Typography color="secondary.main">Split</Typography>
            </Box>
            <Box
              bgcolor={'primary.main'}
              height="30px"
              width="30px"
              borderRadius="4px"
              onClick={handleSplit}
            >
              <Stack
                direction="row"
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={0.2}
              >
                {Array.from({ length: split }, (e, i) => {
                  return (
                    <Box
                      key={i}
                      bgcolor="primary.lightest"
                      height="15px"
                      width="6px"
                      borderRadius="2px"
                    />
                  );
                })}
              </Stack>
            </Box>
          </Stack>

          {/* add to setlist button */}
          {userView ? null : (
            <Button
              variant="outlined"
              sx={{
                borderWidth: '1px',
                borderColor: '#332D41',
                padding: '10px 25px',
                borderRadius: '40px',
                color: 'secondary.main',
                textTransform: 'none',
              }}
              startIcon={<PlaylistAdd />}
            >
              <Typography variant="subtitle1">Add to Setlist</Typography>
            </Button>
          )}

          {/* share button */}
          {userView ? null : (
            <Box
              alignItems="center"
              justifyContent="center"
              border="1px solid #332D41"
              sx={{ borderRadius: '100px', p: 1 }}
            >
              <IconButton>
                <Share aria-label="share" sx={{ color: 'secondary.main' }} />
              </IconButton>
            </Box>
          )}
        </Stack>
      </Box>
      {/* render header */}
      {userHeader ? (
        <Box sx={{ width: '100%', padding: '12px 12px 12px 0' }}>
          <Typography variant="h2">{song?.title}</Typography>
          <Typography
            variant="subtitle2"
            style={{ color: theme.palette.secondary.main, margin: '8px 0' }}
          >
            {song?.artist}
          </Typography>
          <Divider style={{ borderColor: theme.palette.secondary.dark }} />
        </Box>
      ) : null}
      {/* render lyrics */}
      <Box sx={{ width: '100%', display: 'flex', overflow: 'auto' }}>
        <SongsLyrics
          useFlat={useFlat}
          chordStatus={chordStatus}
          changeKey={count}
          song={song}
          split={split}
        />
      </Box>
    </Container>
  );
};
export default SongsButtonsCard;
