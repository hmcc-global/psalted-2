import { Box, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

const HomeContainer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/psalted_bg.png)`,
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3">This is Home Page</Typography>
    </Box>
  );
};

export default HomeContainer;
