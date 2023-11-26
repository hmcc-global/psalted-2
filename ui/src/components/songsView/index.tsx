import { Container, Box } from "@mui/material"
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { Song } from "../../types/songs";
import axios, { AxiosResponse } from "axios";

const SongsView: FC = (): ReactElement => {
    const id: string = "655b5d36cebd56139435b286";
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
    return <>
        <Container maxWidth='lg'>
            <Box>
                Box 1
                {songs && songs.chordLyrics}
            </Box>
            <Box>
                Box 2a
                asd
                {songs && songs.artist}
            </Box>
            Test
        </Container>
    </>
}
export default SongsView