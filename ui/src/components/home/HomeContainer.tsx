import { Box, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

const HomeContainer: FC<any> = (): ReactElement => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3">Home</Typography>
    </Box>
  );
};

export default HomeContainer;
