import { Container, Box, styled, Shadows, Typography, Badge } from "@mui/material"
import { FC, ReactElement, useState, useEffect, useCallback, Fragment } from 'react';
import { SongView } from "../../types/song";
import axios, { AxiosResponse } from "axios";
import { ThemeProvider } from "@mui/system";
import customTheme from "../../theme";
import Paper from '@mui/material/Paper';
import Chip from "@mui/material/Chip";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  interface SongsLyricsProps {
    chordStatus: boolean;
    changeKey: number;
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
 



const SongsLyrics: FC<SongsLyricsProps> = ({chordStatus, changeKey}): ReactElement => {
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

      function replaceCharacter(string: string, index: number, replacement:string) {
        return (
          string.slice(0, index) +
          replacement +
          string.slice(index + replacement.length)
        );
      }
      
    
      
      

      function parseNoChords(a: string | undefined){
       
        var tempStr:string = String(a).replaceAll('{', '\n{')
        tempStr = tempStr.replaceAll('}', '}\n')

        tempStr = tempStr.replace(/\[(.*?)\]/g, " ");
        // to test ReGex: https://regexr.com/397dr
        tempStr = tempStr.replaceAll('[', ' ')
        tempStr = tempStr.replaceAll(']', ' ')

        let lyricsArray: Array<string>;        
        lyricsArray = tempStr.split("\n");

        return lyricsArray;
        
  }

  function parseWithChords(originalKey:string | undefined, a: string | undefined, transpose: number){
        var tempStr:string = String(a).replaceAll('\n', ' \n ')
        tempStr = tempStr.replaceAll('{', "\n{")
        tempStr = tempStr.replaceAll('}', '}\n ')


        let lyricsArray: Array<string>;        
        lyricsArray = tempStr.split("\n");

        var beginIndex:number = 0;
        var endIndex:number = 0;
        var chordStr:string = "";
        var newStr:string = "";
        var prevEndIndex:number=0;
        var lineLength = lyricsArray.length
        var pass:boolean = false
        

        for (let index = 0; index < lineLength; index++) {
            prevEndIndex=0
            // Find if '[' or ']' exists
            // Extract substring in between
            // find the length of the substring
            // push to the end of array - to update array length
            // replace the [ ]
            // change last array position to + 1 of current
            //shift the other ones
            while((beginIndex = lyricsArray[index].indexOf("[")) > 0){
                endIndex = lyricsArray[index].indexOf("]");
                chordStr = lyricsArray[index].substring(beginIndex, endIndex + 1)
                for (let space = 0; space < beginIndex - prevEndIndex; space++) {
                    newStr = newStr.concat(" ");
                }
                newStr = newStr + chordStr;
                
                lyricsArray[index] = lyricsArray[index].replace("[", "<")
                lyricsArray[index] = lyricsArray[index].replace("]", ">")
                prevEndIndex = endIndex;
                pass = true;
            }

            if (lyricsArray[index].match("<")){
                //lyricsArray[index] = transposeChord(lyricsArray[index],transpose) // transpose
            }
           
            
           // console.log(lyricsArray.length);
            if(pass){
                lyricsArray[index] = lyricsArray[index].replace(/\<(.*?)\>/g, " ");
                lyricsArray.push(newStr);
                pass = false;
                newStr = "";
            }
            else{
                lyricsArray.push(" ");
            }
        }
        let lyricsArrayFinal: Array<string> = ['something'];
        for (let i = 0; i < lyricsArray.length; i++) {
            lyricsArrayFinal.push("");
        }

        for (let i = 0; i < (lyricsArray.length / 2);i++){ // lyrics
            lyricsArray[i] = lyricsArray[i].trim();
            lyricsArray[i] = lyricsArray[i].replace(/\s+/g, ' ');
            lyricsArrayFinal[i * 2 + 1] = lyricsArray[i]
        }
        for (let i = 0; i < lyricsArray.length / 2 ;i++){ // chords
            lyricsArray[i + lyricsArray.length / 2] = transposeChord(String(originalKey), lyricsArray[i + lyricsArray.length / 2], transpose)
            lyricsArrayFinal[i * 2] = lyricsArray[i + lyricsArray.length / 2]
        }

         
        //console.log(lyricsArrayFinal);
        return lyricsArrayFinal;

        
        

}
      
    return <>
        <ThemeProvider theme = {customTheme}>
        <Box
            sx={{
                bgcolor: 'white',
                boxShadow: 0,
                borderRadius: 0,
                paddingLeft: 2,
                paddingRight: 2,
                minWidth: '20vh',
            }}
        >
        {chordStatus && <Box width = '100%' bgcolor="#FAFAFA" flexWrap={"wrap"}>
            {/* With Chords */}
            {/* {changeKey}
            {songs && songs.originalKey} */}
            <pre>
            <Typography>
            {parseWithChords((songs && songs.originalKey),(songs && songs.chordLyrics), changeKey).map((line:string, i:number) => {
                                const matches = line.match(/\[(.*?)\]/g); // Extract content between [ and ]
                                const songParts = line.match(/\{(.*?)\}/g); // matches between { }
                                let result:any = [];
                                if (songParts){
                                    let startIndex:number = line.indexOf("{");
                                    const endIndex = line.indexOf("}");
                                    line = line.slice(startIndex, endIndex)
                                }

                                if (matches) {
                                    let lastIndex = 0;
                                    matches.forEach((match, matchIndex) => {
                                      const matchStartIndex = line.indexOf(match, lastIndex);
                                      const matchEndIndex = matchStartIndex + match.length;
                          
                                      if (matchStartIndex > lastIndex) {
                                        var spaces:string = line.slice(lastIndex, matchStartIndex);
                                        spaces = spaces.slice(0,spaces.length - 4) //can adjust integer for spacing of chords chip
                                        result.push(spaces);
                                      }
                          
                                      result.push(<Chip 
                                        size="small"
                                        sx={{
                                            height: 'auto',
                                            '& .MuiChip-label': {
                                                width:'inline-flex',
                                                alignItems:'center',
                                              whiteSpace: 'none',
                                              color: 'primary.main',
                                              fontWeight: 'bold',
                                              borderWidth:'2',
                                              
                                            },}}
                                        style={{
                                            borderRadius: 4, 
                                            backgroundColor: '#EEEFFF',
                                            
                                            fontSize:'12px' }}
                                       
                                       key={matchIndex} label={match.slice(1, -1)} />);
                                      lastIndex = matchEndIndex;
                                    });
                          
                                    if (lastIndex < line.length) {
                                      const remainingSpaces = line.slice(lastIndex);
                                      result.push(remainingSpaces);
                                    }
                                  } 

                                  
                                // Decrease space between chips if there is a chip
                                if (matches && matches.length > 0) {
                                    var spaceWidth:number = -4;
                                    const spaceComponent = <span style={{ width:`${spaceWidth}px`, display: 'inline-block' }} />;
                                    const reducedSpaceResult = result.reduce((acc:any, curr:any) => {
                                    if (typeof curr === 'string') {
                                        acc.push(curr, spaceComponent);
                                    } else {
                                        acc.push(curr);
                                    }
                                    return acc;
                                    }, []);
                                    result = reducedSpaceResult;
                                }
                                return(
                                    <Fragment key={i}>
                                        <Fragment>
                                                {result}
                                        </Fragment>
                                    {line.includes('{') && <p><Chip   variant='outlined'
                                        sx={{
                                            height: '30px',
                                            '& .MuiChip-label': {
                                                width:'inline-flex',
                                                alignItems:'center',
                                            whiteSpace: 'none',
                                            color: '#A9A9A9',
                                            fontWeight: 'bold',                                        
                                            },}}
                                        style={{
                                            
                                            borderRadius: 4, 
                                            backgroundColor: '#FAFAFA',
                                   
                                            border:'2',
                                            fontSize:'12px' }}
                                    
                                    label = {line.slice(1,line.length)}/></p>}
                                     {!line.includes('{') && !line.includes('[') && (
                                    <Typography 
                                        sx={{letterSpacing: '1px', lineHeight: 'normal', fontSize: '12px', fontFamily:'Roboto, sans-serif' }} 
                                        flexWrap = "wrap" 
                                        variant="body1" 
                                        fontSize={{base: "12px",xs: "12px",sm:'14px',md:'14px'}}>
                                        {line}
                                    </Typography>
                                    )}
                                    </Fragment>       
                                );
                            })}
            </Typography>
            </pre>
           
       </Box>}

       {!chordStatus && <Box bgcolor="#FAFAFA">
            <Typography>
            {parseNoChords((songs && songs.chordLyrics)).map((line:string, i:number) => {
                                const songParts = line.match(/\{(.*?)\}/g); // matches between { }
                                let result:any = [];
                                if (songParts){
                                    let startIndex:number = line.indexOf("{");
                                    const endIndex = line.indexOf("}");
                                    line = line.slice(startIndex, endIndex)
                                }
                                return(
                                    <Fragment key={i}>
                                        <Fragment>
                                                {result}
                                        </Fragment>
                                    {line.includes('{') && <p><Chip 
                                        variant='outlined'
                                        sx={{
                                            height: '30px',
                                            '& .MuiChip-label': {
                                                width:'inline-flex',
                                                alignItems:'center',
                                            whiteSpace: 'none',
                                            color: '#A9A9A9',
                                            fontWeight: 'bold',                                        
                                            },}}
                                        style={{
                                            
                                            borderRadius: 4, 
                                            backgroundColor: '#FAFAFA',
                                   
                                            border:'2',
                                            fontSize:'12px' }}
                                        label = {line.slice(1,line.length)}/></p>}
                                     {!line.includes('{') && !line.includes('[') && (
                                    <Typography 
                                        flexWrap = "wrap" variant="body1" 
                                        fontSize={{base: "12px",xs: "12px",sm:'12px',md:'12px'}} 
                                        style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        {line}
                                    </Typography>
                                    )}
                                    </Fragment>
                                );
                            })}
                
            </Typography>
        </Box>}
        </Box>
    </ThemeProvider>
      
    </>
}
export default SongsLyrics