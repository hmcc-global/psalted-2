import { Box, Typography, TextField } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from '@mui/icons-material/Search';
import { FC, ReactElement } from 'react';

const SongTab: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        padding: '1em',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'primary.light',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '1em',
        }}
      >
        <MusicNoteIcon sx={{ marginX: '1vw' }} color="primary" />
        <Typography variant="h3" color={'primary.main'}>
          Song
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          borderRadius: '0.5rem',
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.20), 0px 0.1px 0.3px 0px rgba(0, 0, 0, 0.10)',
          background: '#FFF',
        }}
      >
        <TextField
          id="search"
          variant="outlined"
          fullWidth
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '0.5vw',
                }}
              >
                <SearchIcon color="primary" />
              </Box>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default SongTab;
