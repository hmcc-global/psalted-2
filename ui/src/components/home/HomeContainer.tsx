import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HomeTab from './HomeTab';
import RecommendedSongCard from './RecommendedSongCard';

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
        paddingTop: '2em',
      }}
    >
      <Stack direction={'column'}>
        <Stack direction={'row'} spacing={2}>
          <Box
            sx={{
              py: '2.5em',
              px: '2em',
              borderRadius: '30px',
              background:
                'linear-gradient(158deg, rgba(0, 0, 0, 0.00) 31.44%, rgba(148, 111, 255, 0.20) 80.34%), radial-gradient(111.68% 110.13% at 66.1% 8.28%, rgba(154, 118, 255, 0.20) 36.5%, rgba(0, 0, 0, 0.20) 64%), #1F1F1F',
              width: '50%',
            }}
            position="relative"
          >
            <Typography variant="h1" sx={{ pb: 2, fontSize: '40px' }}>
              Welcome to
              <br />
              Ripple Worship
            </Typography>
            <Typography variant="body1">
              Here is where you can find lyrics and chords for worship music! Go on and worship God!
            </Typography>
            <Typography variant="body1" position="absolute" bottom={35}>
              Harvest Mission Community Church
            </Typography>
          </Box>

          <Stack direction={'column'} spacing={2} width="50%">
            <HomeTab
              title="Songs"
              description="Find, add, view worship songs with lyrics and chords"
              Icon={MusicNoteIcon}
              route="/song"
            />
            <HomeTab
              title="My Setlists"
              description="Create setlists for your worship sessions"
              Icon={QueueMusicIcon}
              route="/setlist"
            />
            <HomeTab
              title="Resources"
              description="Find resources for worship here"
              Icon={TextSnippetIcon}
              route="/resource"
            />
          </Stack>
        </Stack>

        <Box sx={{ pt: 5 }}>
          <Typography variant="h2">Recommended Songs</Typography>

          <Stack direction={'row'} sx={{ py: 2 }} gap={3}>
            {/* TODO: API to generate recommended or newly added songs */}
            <RecommendedSongCard songTitle="Living With A Fire" artistName="Jesus Culture" />
            <RecommendedSongCard
              songTitle="Yesterday, Today, and Forever"
              artistName="Passion, Kristian Stanfill"
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default HomeContainer;
