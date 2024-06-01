import { Add, SupervisedUserCircle } from '@mui/icons-material';
import { Box, Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { FC, ReactElement, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupListContainer: FC = (): ReactElement => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

  return (
    <Container style={{ paddingTop: '5em', width: '100%', height: '100%' }}>
      {/* Toolbar at the top */}
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-between"
        pb="10px"
        pl={{ base: '0', md: '15px' }}
      >
        {/* Title */}
        <Typography variant="h1" color="white" sx={{ display: 'flex', alignItems: 'center' }}>
          <SupervisedUserCircle
            sx={{
              color: 'primary.light',
              backgroundColor: 'primary.dark',
              borderRadius: '50%',
              width: '2em',
              height: '2em',
              padding: '0.5em',
              mr: 3,
            }}
          />
          Groups
        </Typography>

        {/* Add new song button */}
        <Button
          variant="outlined"
          sx={{
            borderWidth: '2px',
            padding: '10px 25px',
            borderRadius: '40px',
            backgroundColor: 'rgba(208, 188, 255, 0.12)',
            color: '#D0BCFF',
            textTransform: 'none',
          }}
          startIcon={<Add />}
          onClick={() => navigate('/song/add')}
        >
          <Typography variant="subtitle1">New Group</Typography>
        </Button>
      </Stack>

      <Box></Box>
    </Container>
  );
};

export default GroupListContainer;
