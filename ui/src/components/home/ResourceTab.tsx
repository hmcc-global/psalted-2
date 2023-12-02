import { Box, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const GroupTab: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        padding: '1em',
        borderRadius: '4px',
        backgroundColor: 'primary.light',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 'auto',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h3" color={'primary.main'}>
          Resources
        </Typography>
        <TextSnippetIcon sx={{ marginX: '1vw' }} color="primary" />
      </Box>
    </Box>
  );
};

export default GroupTab;
