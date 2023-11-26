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
import * as React from 'react'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:'#fff',
    padding: theme.spacing(0),
    textAlign: 'center',
    shadows:'0',
  }));
  

const SongsTitleCard: FC = (): ReactElement => {
    const id: string = "656380f7f0f7b1247bcc0834";
    const [songs, setSongs] = useState<Song>()

    const getSongs = useCallback(async () => {
        const response: AxiosResponse<Song> = await axios.get(`http://localhost:1337/api/songs/get?id=${id}`, {
            headers: { "content-type": "application/json" },
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

    function iterate(input: Array<String>){
        const themeList = [];
        for (let i in input){
            themeList.push(input[i] + ' ');
            <Box>
                themeList[i];
            </Box>
        }
        
        return themeList;
    }


    return <>
        <ThemeProvider theme = {customTheme}>
            
        <Box
        sx={{
            bgcolor: 'white',
            boxShadow: 4,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
        }}
        >
           
            <Box fontWeight={'Bold'} fontFamily={'Inter'} sx={{fontSize: 34, color:'primary.main'}}>
                {songs && songs.title}
            </Box>
            <Box fontWeight={'Regular'} fontFamily={'Inter'} sx={{color:'black'}}>
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
                    <Typography  fontFamily={'Inter'} fontWeight={'Bold'}>About The Song</Typography>
                </AccordionSummary>
                </Box>

                <AccordionDetails>
                <Box sx={{ flexGrow: 1}}>
               
                    <Grid container spacing={2}>
                        <Grid item xs={3} md={2}>
                            <Typography>
                                Themes
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                        
                            <Item>
                            {iterate(songs && songs.themes)}
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
                        <Item>{songs && songs.originalKey}</Item>
                        </Grid>
                        <Grid item xs={3} md={2}>
                            <Typography>
                                Code
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                        <Item>xs=6 md=8</Item>
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