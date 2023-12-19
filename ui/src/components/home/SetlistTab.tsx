import { Box, List, ListItem, ListItemText, Typography, Fab } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AddIcon from '@mui/icons-material/Add';
import { FC, ReactElement } from 'react';

const SongTab: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '1em',
        borderRadius: '4px',
        backgroundColor: 'primary.light',
        height: '40vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1em',
          width: '100%',
        }}
      >
        <Typography variant="h3" fontWeight="500" color="primary">
          My Setlist
        </Typography>
        <QueueMusicIcon color="primary" sx={{ marginLeft: '1em' }} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <List>
          <ListItem>
            <ListItemText primary="Setlist 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Setlist 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Setlist 3" />
          </ListItem>
        </List>
      </Box>
      <Fab //: floating action button, button component with styling by default
        color="primary"
        aria-label="Add"
        size="medium"
        sx={{
          marginLeft: 'auto',
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default SongTab;
