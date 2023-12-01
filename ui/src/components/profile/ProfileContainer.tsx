import { Box, Container } from '@mui/material';
import { FC, ReactElement } from 'react';
import ProfileDesktopView from './ProfileDesktopView';
import ProfileMobileView from './ProfileMobileView';

const ProfileContainer: FC = (): ReactElement => {
  return (
    <Box>
      <Container
        sx={{ zIndex: 2, position: 'relative', display: { xs: 'none', sm: 'none', md: 'block' } }}
      >
        <ProfileDesktopView />
      </Container>

      <Container
        sx={{ zIndex: 2, position: 'relative', display: { xs: 'block', sm: 'block', md: 'none' } }}
      >
        <ProfileMobileView />
      </Container>
    </Box>
  );
};

export default ProfileContainer;
