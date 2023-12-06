import { Container, Box, styled, Shadows } from "@mui/material"
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { Song } from "../../types/songs";
import axios, { AxiosResponse } from "axios";
import { ThemeProvider } from "@mui/system";
import customTheme from "../../theme";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from "@mui/material/Chip";
import InfoIcon from '@mui/icons-material/Info';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:'#fff',
    padding: theme.spacing(0),
    textAlign: 'center',
    shadows:'0',
  }));
  

const SongsTitleCard: FC = (): ReactElement => {
    const id: string = "656e196bd1f1ef5572282d8d";
    const [songs, setSongs] = useState<Song>()

    const getSongs = useCallback(async () => {
        const response: AxiosResponse<Song> = await axios.get(`/api/songs/get`, {
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

    return <>
        <ThemeProvider theme = {customTheme}>
            
        <Box
        sx={{
            bgcolor: "white",
            boxShadow: 0,
            borderRadius: 0,
            p: 2,
            minWidth: 150,
        }}
        >
            <Box fontWeight={'Bold'} fontFamily={'Inter'} sx={{ color:'primary.main'}}fontSize={{sm:'28px',md:'34px'}}>
                {songs && songs.title}
            </Box>
            <Box fontWeight={'Regular'} fontFamily={'Inter'} sx={{color:'black'}} fontSize={{sm:'16px',md:'26px'}}>
                {songs && songs.artist}
            </Box>
            <Box>
            <Accordion>
                <Box bgcolor="#FAFAFA">
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography  
                    fontFamily={'Inter'} 
                    fontWeight={'Bold'}>
                        <Typography fontSize={{sm:'12px',md:'18px'}}>
                            <InfoIcon  sx={{marginRight:'2vh'}}fontSize="large" color="primary"/>About The Song</Typography>
                        </Typography>
                </AccordionSummary>
                </Box>

                <AccordionDetails>
                <Box sx={{ flexGrow: 1}} >
               
                    <Grid container spacing={2}>
                        <Grid item xs={3} md={2}>
                            <Typography>
                                Themes
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Item>
                            {songs && songs.themes.map((themes:string, i:number) => {
                                return<Chip label={themes} key={i} />
                            })}
                            </Item>
                        </Grid>
                        <Grid item xs={3} md={2}>
                            <Typography>
                                Tempo
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                        <Item>{songs && songs.tempo}</Item>
                        </Grid>
                        <Grid item xs={3} md={2}>
                            <Typography>
                                Original Key
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                        <Item>{songs && songs.originalKey}</Item>
                        </Grid>
                        <Grid item xs={3} md={2}>
                            <Typography>
                                Year
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                        <Item>{songs && songs.year}</Item>
                        </Grid>
                        <Grid item xs={3} md={2}>
                            <Typography>
                                Code
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                        <Item>{songs && songs.code}</Item>
                        </Grid>
                    </Grid>
                </Box>
              
                
                </AccordionDetails>
            </Accordion>
            </Box>
        </Box>

        </ThemeProvider>
      
    </>
}
export default SongsTitleCard