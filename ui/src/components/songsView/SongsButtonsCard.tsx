import { useEffect, useState } from 'react';
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
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SongsLyrics from './SongsLyrics';
import { flatMusicKeysOptions, sharpMusicKeysOptions } from '../../constants';

type SongsButtonCardProps = {
  song: SongViewSchema | undefined;
};

const SongsButtonsCard = (props: SongsButtonCardProps) => {
  const song = props.song;
  const [chordStatus, setChordStatus] = useState(false);
  const [useFlat, setUseFlat] = useState(false);
  const [count, setCount] = useState(sharpMusicKeysOptions.indexOf(song?.originalKey ?? 'C'));
  const [split, setSplit] = useState(1);
  const isDesktop = useMediaQuery('(min-width:768px)');

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
    <>
      <Container>
        <Box sx={{ bgcolor: 'white', marginTop: '6px' }}>
          <Box
            sx={{
              bgcolor: '#FAFAFA',
              boxShadow: 0,
              borderRadius: 0,
              p: 0,
              width: '100%',
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '4px'
            }}
          >
            <Stack direction="row" spacing={{ base: '5px', xs: '4px', sm: '1.5vh', md: '2vh' }}>
              <Box  fontSize={{ sm: '16px', md: '26px' }} justifyContent="left" bgcolor="white" padding="0px 0px 2px" sx={{width:'120px', height:'40px'}} paddingRight='10px'>
                <FormGroup>
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={chordStatus}
                        onChange={handleChange(setChordStatus)}
                        name="chord"
                       
                        
                      />
                    }
                    label="Chord"
                  />
                </FormGroup>
              </Box>
              <Stack
                direction="row"
                spacing={{ base: '3px', xs: '3px', sm: '1px', md: '2px' }}
                bgcolor="white"
                padding="0px 0px"
                height='40px'
                paddingBottom='2px'
              >
                <Box bgcolor={'white'} justifyContent="center" padding="6px 6px" borderRadius="0px" sx={{width:'40px', height:'40px'}}>
                  <Typography alignItems={'center'} paddingTop="0px">
                    Key
                  </Typography>
                </Box>
                <Box bgcolor="primary.lightest" justifyContent="left" padding="0px 0px" borderRadius="0px" sx={{width:'40px', height:'40px'}}>
                  <IconButton color="primary" aria-label="down" onClick={handleDecrement}>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </Box>
                <Chip
                  label={useFlat ? flatMusicKeysOptions[count] : sharpMusicKeysOptions[count]}
                  color="primary"
                />
                <Box bgcolor="primary.lightest"  justifyContent="left" padding="0px 0px" borderRadius="0px" sx={{width:'40px', height:'40px'}}>
                  <IconButton color="primary" aria-label="up" onClick={handleIncrement}>
                    <KeyboardArrowUpIcon />
                  </IconButton>
                </Box>
              </Stack>
              <Box fontSize={{ sm: '16px', md: '26px' }} justifyContent="left" bgcolor="white" padding="0px 0px 2px" sx={{width:'120px', height:'40px'}} paddingRight='10px'>
                <FormGroup>
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch checked={useFlat} onChange={handleChange(setUseFlat)} name="flat" />
                    }
                    label="Flat"
                  />
                </FormGroup>
              </Box>
              <Stack
                direction="row"
                spacing={1}
                bgcolor="white"
                padding="4px 12px"
                borderRadius="4px"
                display={isDesktop ? 'flex' : 'none'}
              >
                <Box>
                  <Typography alignItems={'center'} paddingTop="5px">
                    Split
                  </Typography>
                </Box>
                <Box
                  border="1px solid #FAFAFA"
                  height="30px"
                  width="30px"
                  borderRadius="2px"
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
                          bgcolor="primary.main"
                          height="15px"
                          width="6px"
                          borderRadius="2px"
                        />
                      );
                    })}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <SongsLyrics
          useFlat={useFlat}
          chordStatus={chordStatus}
          changeKey={count}
          song={song}
          split={split}
        />
      </Container>
    </>
  );
};
export default SongsButtonsCard;
