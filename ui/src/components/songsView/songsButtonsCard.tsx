import { useState } from 'react';
import { SongView } from '../../types/song';
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
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { transposeChord } from './helpers';
import SongsLyrics from './songsLyrics';

type SongsButtonCardProps = {
  chordStatus: boolean;
  song: SongView | undefined;
};

const SongsButtonCard = (props: SongsButtonCardProps) => {
  const songs = props.song;
  const [state, setState] = useState({ chord: false });
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [split, setSplit] = useState(1);
  const isDesktop = useMediaQuery('(min-width:768px)')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen((isOpen) => !isOpen);
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleSplit = () => {
    if (split < 3) setSplit(split + 1);
    else setSplit(1);
  };

  return (
    <>
      <Container>
        <Box sx={{ bgcolor: 'white', p: 2 }}>
          <Box
            sx={{
              bgcolor: '#FAFAFA',
              boxShadow: 0,
              borderRadius: 0,
              p: 0,
              width: '100%',
              padding:"12px"
            }}
          >
            <Stack direction="row" spacing={{ base: '0', xs: '1vh', sm: '1.5vh', md: '2vh' }}>
              <Box
                justifyContent='left'
                bgcolor="white"
                padding="4px 12px"
                borderRadius="4px"
              >
                <FormGroup>
                  <FormControlLabel
                    labelPlacement="start"
                    control={<Switch checked={state.chord} onChange={handleChange} name="chord" />}
                    label="Chord"
                  />
                </FormGroup>
              </Box>
              <Stack
                direction="row"
                spacing={{ base: '0', xs: '0', sm: '1px', md: '2px' }}
                bgcolor="white"
                padding="4px 12px"
                borderRadius="4px"
              >
                <Box bgcolor={'white'}>
                  <Typography alignItems={'center'} paddingTop="5px">
                    Key
                  </Typography>
                </Box>
                <Box bgcolor="primary.lightest">
                  <IconButton color="primary" aria-label="down" onClick={handleDecrement}>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </Box>
                <Chip
                  label={transposeChord(
                    'test',
                    String('[' + (songs && songs.originalKey) + ']'),
                    count
                  ).slice(
                    1,
                    transposeChord('test', String('[' + (songs && songs.originalKey) + ']'), count)
                      .length - 1
                  )}
                  color="primary"
                />
                <Box bgcolor="primary.lightest">
                  <IconButton color="primary" aria-label="up" onClick={handleIncrement}>
                    <KeyboardArrowUpIcon />
                  </IconButton>
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                bgcolor="white"
                padding="4px 12px"
                borderRadius="4px"
                display={isDesktop ? "flex" : "none"}
              >
                <Box>
                  <Typography alignItems={'center'} paddingTop="5px">
                    Split
                  </Typography>
                </Box>
                <Box
                  border="1px solid #FAFAFA"
                  height="40px"
                  width="40px"
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
                        <Box bgcolor="primary.main" height="15px" width="6px" borderRadius="2px" />
                      );
                    })}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <SongsLyrics chordStatus={isOpen} changeKey={count} song={songs} split={split} />
      </Container>
    </>
  );
};
export default SongsButtonCard;
