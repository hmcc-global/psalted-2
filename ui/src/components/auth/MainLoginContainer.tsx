import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import ResetPasswordContainer from './ResetPasswordContainer';
import RecoverPasswordContainer from './RecoverPasswordContainer';

const MainLoginContainer: React.FC = () => {
  const pathname = window.location.pathname.split('/');
  const pageName = pathname[pathname.length - 1];

  const renderPage = () => {
    switch (pageName) {
      case 'register':
        return <RegisterContainer />;
      case 'recover':
        return <RecoverPasswordContainer />;
      case 'new':
        return <ResetPasswordContainer />;
      default:
        return <LoginContainer />;
    }
  };

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
      <Stack direction="row" width="100%" spacing={2}>
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
          <Typography variant="body1" position="absolute" bottom={35}>
            Harvest Mission Community Church
          </Typography>
        </Box>
        {renderPage()}
      </Stack>
    </Box>
  );
};

export default MainLoginContainer;