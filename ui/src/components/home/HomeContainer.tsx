import { Box, Grid } from '@mui/material';
import { FC, ReactElement } from 'react';
import SongTab from './SongTab';
import SetlistTab from './SetlistTab';
import GroupTab from './GroupTab';
import ResourceTab from './ResourceTab';
const HomeContainer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '80%' },
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 'auto',
        paddingBottom: '1em',
      }}
    >
      <Grid container spacing={4} sx={{ width: '100%' }}>
        <Grid item xs={13} md={13}>
          <SongTab />
        </Grid>
        <Grid item xs={13} md={6}>
          <SetlistTab />
        </Grid>
        <Grid item xs={13} md={6}>
          <GroupTab />
        </Grid>
        <Grid item xs={13} md={13}>
          <ResourceTab />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeContainer;
