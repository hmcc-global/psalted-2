import { Box, Container } from '@mui/material';
import { FC, ReactElement } from 'react';
import ProfileContainerDesktop from './ProfileContainerDesktop';
import ProfileContainerMobile from './ProfileContainerMobile';

const ProfileContainer: FC = (props: any): ReactElement => {
  return (
    <Box>
      <Container
        sx={{ zIndex: 2, position: 'relative', display: { xs: 'none', sm: 'none', md: 'block' } }}
      >
        <ProfileContainerDesktop />
      </Container>

      <Container
        sx={{ zIndex: 2, position: 'relative', display: { xs: 'block', sm: 'block', md: 'none' } }}
      >
        <ProfileContainerMobile />
      </Container>
    </Box>
  );
};

export default ProfileContainer;
