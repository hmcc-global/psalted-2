import { Container, Box, styled, Shadows, Typography } from "@mui/material"
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { SongView } from "../../types/song";
import axios, { AxiosResponse } from "axios";
import { ThemeProvider } from "@mui/system";
import customTheme from "../../theme";
import Paper from '@mui/material/Paper';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';

import SongsLyrics from "./songsLyrics";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

interface SongsButtonCardProps {
    chordStatus: boolean;
}  


  
const transposeSingleChord = (originalKey: string, chord: string, transpose: number): string => {
    const rootNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootNotesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    const chordParts = chord.split(/\s+/);
    const transposedParts = chordParts.map(chordPart => {
      const rootNoteRegex = /^([A-G]b?)([#])?(.*)/;
      const rootNoteRegexFlat = /^([A-G]#?)([b])?(.*)/;
    //   ^([A-G])([#b])?(.*)
      const [, rootNoteFlat, modifierFlat, charFlat] = chordPart.match(rootNoteRegexFlat) || [];
      
      const [, rootNote, modifier, char] = chordPart.match(rootNoteRegex) || [];

      const [,orignalKeyFlat] = chordPart.match(rootNoteRegex) || [];
      
      if (modifier == '#'){
        const noteIndex = rootNotes.indexOf(rootNote + '#');//compensate the sharp
        //console.log(noteIndex);
        var transposedIndex = (noteIndex + transpose) % 12;
        if (transposedIndex < 0){
                transposedIndex += 12;
        }
        //console.log(transposedIndex)
        const transposedRoot = rootNotes[transposedIndex];
        return `${transposedRoot}${char || ''}`;
      }
      if (modifierFlat == 'b'){
        const noteIndexFlat = rootNotesFlat.indexOf(rootNoteFlat + 'b');//compensate lost flat
        //console.log(noteIndex);
        var transposedIndex = (noteIndexFlat + transpose) % 12;
        if (transposedIndex < 0){
              transposedIndex += 12;
        }
        //console.log(transposedIndex)
        const transposedRootFlat = rootNotesFlat[transposedIndex];
        return `${transposedRootFlat}${charFlat || ''}`;
      }
      else{
        const noteIndex = rootNotes.indexOf(rootNote);
        //console.log(noteIndex);
        var transposedIndex = (noteIndex + transpose) % 12;
        if (transposedIndex < 0){
                transposedIndex += 12;
        }
        //console.log(transposedIndex)
        const transposedRoot = rootNotes[transposedIndex];
        return `${transposedRoot}${modifier || ''}${char || ''}`;

      }
    
      
    });
    
    return transposedParts.join(' ');
    
  };
const transposeChord = (originalKey: string, chord: string, transpose: number): string => {
    const chordRegex = /\[(.*?)\]/g;
   
    return chord.replace(chordRegex, (_, chordName:string) => {
      return `[${transposeSingleChord(originalKey,chordName, transpose)}]`;
    });
  };
const SongsButtonCard: FC = (): ReactElement => {
    const id: string = "656ed724e6aa73999bd5cf3b";
    const [songs, setSongs] = useState<SongView>()

    const getSongs = useCallback(async () => {
        const response: AxiosResponse<SongView> = await axios.get(`/api/songs/get`, {
            params: { id: id }
        });
        const { data, status } = response;
        try {
            if (status === 200) {
                setSongs(data);
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getSongs();
    }, [getSongs])
    console.log(songs)

    const [state, setState] = useState({
        chord: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsOpen((isOpen) => !isOpen);
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
      const [isOpen, setIsOpen] = useState(false);
      console.log(isOpen)

      const [count, setCount] = useState(0);

      const handleIncrement =  () =>{
         setCount(count + 1);
      };
 
      const handleDecrement = () => {
         setCount(count - 1);
      }
    

      
    return <>
        <ThemeProvider theme = {customTheme}>
            <Box
            sx={{
                bgcolor: 'white',
                p: 2,
              
            }}>
            <Box 
            sx={{
                bgcolor: "#FAFAFA",
                boxShadow: 0,
                borderRadius: 0,
                p: 0,
                width:'100%',
            }}>
                
                <Stack direction="row" spacing={{base: "0",xs: "1vh",sm:'1.5vh',md:'2vh'}}>
                    <Item> 
                    <Box justifyContent={'left'} width={{base: "13vh",xs: "9h",sm:'11vh',md:'12vh'}}>
                        <FormGroup>
                            <FormControlLabel 
                                labelPlacement="start"
                                control=
                                {<Switch 
                                    checked={state.chord} 
                                    onChange={handleChange}
                                    name="chord" />} 
                                label="Chord" />                    
                        </FormGroup>
                    </Box>
                    </Item>
                   
                    <Item>
                    <Stack direction="row" spacing={{base: "0",xs: "0",sm:'1px',md:'2px'}}> 
                        <Box bgcolor={'white'}
                         >
                            <Typography alignItems={'center'} paddingTop='5px'>
                                Key
                            </Typography>
                        </Box>
                        <Box bgcolor="primary.light">
                            <IconButton color="primary" aria-label="down" onClick={handleDecrement}>
                                <KeyboardArrowDownIcon/>
                            </IconButton>
                        </Box>
                            <Chip label={transposeChord('test',String("[" + (songs && songs.originalKey) + "]"),count).slice(1,transposeChord('test',String("[" + (songs && songs.originalKey) + "]"),count).length - 1)} color="primary"/>
                        <Box bgcolor="primary.light">
                        <IconButton color="primary" aria-label="up" onClick={handleIncrement}>
                            <KeyboardArrowUpIcon/>
                        </IconButton>
                        </Box>
                    </Stack>
                    </Item>
                    <Item>
                    <Stack direction="row" spacing={1}>
                        <Box>
                            <Typography alignItems={'center'} paddingTop='5px'>
                                Split
                            </Typography>
                        </Box>
                        <Box bgcolor="primary.light">
                        <IconButton color="primary" aria-label="down">
                            <VerticalSplitIcon/>
                        </IconButton>
                        </Box>
                    </Stack>
                    </Item>
                </Stack>
            </Box>
            </Box>
            <Box  sx={{
                bgcolor: 'pink',
                boxShadow: 0,
                p: 0,
                minWidth: '100%',
            }}>
            <SongsLyrics chordStatus={isOpen} changeKey={count}/>
            </Box>   
          

        </ThemeProvider>
      
    </>
}
export default SongsButtonCard