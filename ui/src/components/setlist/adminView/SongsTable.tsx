import { SongCardProps } from '#/types/song.types';
import { Divider, Grid, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  songs: SongCardProps[];
};

const SongsTable = ({ songs }: Props) => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid item xs={1}>
          {' '}
          <Typography>#</Typography>
        </Grid>
        <Grid item xs={10}>
          {' '}
          <Typography>Song Title</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Key</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {songs.map((song, index) => (
        <Grid container item xs={12} key={song._id}>
          <Grid item xs={1}>
            <Typography>{index + 1}</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{song.title}</Typography>
            <Typography>{song.artist}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>{song.originalKey}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SongsTable;
