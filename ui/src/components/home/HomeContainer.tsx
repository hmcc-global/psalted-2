import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import HomeTab from './HomeTab';

const HomeContainer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '90%' },
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 'auto',
        paddingBottom: '1em',
        paddingTop: '3em',
      }}
    >
      <Stack direction={'row'} spacing={2}>
        <Box
          sx={{
            padding: '2em',
            borderRadius: '40px',
            background:
              'linear-gradient(158deg, rgba(0, 0, 0, 0.00) 31.44%, rgba(148, 111, 255, 0.20) 80.34%), radial-gradient(111.68% 110.13% at 66.1% 8.28%, rgba(154, 118, 255, 0.20) 36.5%, rgba(0, 0, 0, 0.20) 64%), #1F1F1F',
            width: '50%',
          }}
        >
          <Typography variant="h1">Welcome to Ripple Worship</Typography>
          <Typography variant="body1">
            Here is where you can find lyrics and chords for worship music! Go on and worship God!
          </Typography>
          <Typography variant="body1">Harvest Mission Community Church </Typography>
        </Box>

        <Stack direction={'column'} spacing={2}>
          <HomeTab
            title="Songs"
            description="Find, add, view worship songs with lyrics and chords"
            Icon={MusicNoteIcon}
          />
          <HomeTab
            title="My Setlists"
            description="Create setlists for your worship sessions"
            Icon={QueueMusicIcon}
          />
          <HomeTab
            title="My Groups"
            description="Create setlists with other people in your groups"
            Icon={SupervisedUserCircleIcon}
          />
          <HomeTab title="Resources" description="All things resources" Icon={TextSnippetIcon} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default HomeContainer;
